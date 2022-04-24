from fastapi import HTTPException, status
from sqlalchemy import Column, Integer, String, Boolean, select, insert, delete
from sqlalchemy.ext.asyncio import AsyncSession
from core.models.base import Base
from sqlalchemy import event
from core.config import get_settings
import logging

class UserModel(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    password = Column(String, nullable=False)
    username = Column(String, nullable=False)
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String)
    role = Column(String, nullable=False, default="user")
    disabled = Column(Boolean, nullable=False, default=get_settings().NEW_USER_ENABLED_BY_DEFAULT)

    @classmethod
    async def delete_by_username(cls, db_session: AsyncSession, username):
        """

        :param db_session:
        :param **kwargs:
        :return:
        """
        stmt = delete(cls).where(cls.username == username)
        result = await db_session.execute(stmt)
        await db_session.commit()
        logging.getLogger(__name__).info(f"Attempted to delete a user by username (USERNAME: {username})")
        return result.rowcount > 0
    
    @classmethod
    async def create(cls, db_session: AsyncSession, **kwargs):
        """

        :param db_session:
        :param **kwargs:
        :return newUserId:
        """
        stmt = insert(cls).values(**kwargs).returning(cls.id)
        result = await db_session.execute(stmt)
        await db_session.commit()
        newUserId = result.scalars().first()
        logging.getLogger(__name__).info(f"Created a new user (ID: {newUserId})", kwargs)
        if newUserId is None:
            logging.getLogger(__name__).error("The creation for the user failed due to a database error", kwargs)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={"User was not created": "The creation for the user failed due to a database error"},
           )
        return newUserId

    @classmethod
    async def find_by_username(cls, db_session: AsyncSession, username: str):
        """

        :param db_session:
        :param username:
        :return UserModel:
        """
        stmt = select(cls).where(cls.username == username)
        result = await db_session.execute(stmt)
        return result.scalars().first()
        
    @classmethod
    async def find_by_id(cls, db_session: AsyncSession, id: int):
        """

        :param db_session:
        :param id:
        :return UserModel:
        """
        stmt = select(cls).where(cls.id == id)
        result = await db_session.execute(stmt)
        user = result.scalars().first()
        if user is None:
            logging.getLogger(__name__).debug(f"There is no record for the requested ID: {id}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"User ID not found": f"There is no record for the requested ID: {id}"},
            )
        else:
            return user
    
    @classmethod
    async def all(cls, db_session: AsyncSession):
        """

        :param db_session:
        :return list[UserModel]:
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

@event.listens_for(UserModel.__table__, 'after_create')
def create_users(*args, **kwargs):
    pass