import datetime
import logging
import uuid

from core.models.base import Base
from fastapi import HTTPException, status
from sqlalchemy import Column, DateTime, String, select, delete
from sqlalchemy.dialects.postgresql import UUID, insert
from sqlalchemy.ext.asyncio import AsyncSession


class RefreshToken(Base):
    __tablename__ = "iam_session"
    username = Column(String, primary_key=True)
    token_id = Column(UUID(as_uuid=True), default=uuid.uuid4)
    expires = Column(DateTime, nullable=False,
                     default=datetime.datetime.utcnow)

    @classmethod
    async def create_for_username(cls, db_session: AsyncSession, expires: DateTime, username):
        """

        :param db_session:
        :return refreshTokenId:
        """
        insert_stmt = insert(cls).values(
            username=username, expires=expires).returning(cls.token_id)
        do_update_stmt = insert_stmt.on_conflict_do_update(
            index_elements=[cls.username],
            set_=dict(token_id=uuid.uuid4(), expires=expires),
            where=(cls.username == username)
        )
        result = await db_session.execute(do_update_stmt)
        await db_session.commit()
        refresh_token_id = result.scalars().first()
        logging.getLogger(__name__).info(
            f"Created a new Refresh Token session (ID: {refresh_token_id})")
        if refresh_token_id is None:
            logging.getLogger(__name__).error(
                "The creation of the refresh token failed due to a database error")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={
                    "Refresh token not created": "The creation for the refresh token failed due to a database error"},
            )
        return str(refresh_token_id)

    @classmethod
    async def get_by_uuid(cls, db_session: AsyncSession, refresh_token_id: str):
        """

        :param db_session:
        :param id:
        :return RefreshToken:
        """
        stmt = select(cls).where(cls.token_id == refresh_token_id)
        result = await db_session.execute(stmt)
        return result.scalar()
    
    @classmethod
    async def delete_by_username(cls, db_session: AsyncSession, username: str):
        """

        :param db_session:
        :param id:
        :return RefreshToken:
        """
        stmt = delete(cls).where(cls.username == username)
        await db_session.execute(stmt)

    @classmethod
    async def all(cls, db_session: AsyncSession):
        """

        :param db_session:
        :return list[RefreshToken]:
        """
        stmt = select(cls)
        return await db_session.execute(stmt)

    async def toDict(self):
        return {
            'id': self.id,
            'password': self.password,
            'username': self.username,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'disabled': self.disabled
        }
