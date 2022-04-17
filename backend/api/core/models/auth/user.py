from fastapi import HTTPException, status
from sqlalchemy import Column, Integer, String, Boolean, select
from sqlalchemy.ext.asyncio import AsyncSession
from core.models.base import Base
from sqlalchemy import event

class UserModel(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    hashed_password = Column(String, nullable=False)
    username = Column(String, nullable=False)
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String)
    disabled = Column(Boolean, nullable=False, default=False)

    @classmethod
    async def find_by_username(cls, db_session: AsyncSession, username: str):
        """

        :param db_session:
        :param name:
        :return User:
        """
        stmt = select(cls)
        result = await db_session.execute(stmt)
        instance = result.scalars().all()
        print('here')
        print(instance)
        stmt = select(cls).where(cls.username == username)
        result = await db_session.execute(stmt)
        instance = result.scalars().first()
        if instance is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"Username not found": f"There is no record for the requested username: {username}"},
            )
        else:
            return instance
        
    @classmethod
    async def find_by_id(cls, db_session: AsyncSession, id: int):
        """

        :param db_session:
        :param name:
        :return User:
        """
        stmt = select(cls).where(cls.id == id)
        result = await db_session.execute(stmt)
        instance = result.scalars().first()
        if instance is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"User ID not found": f"There is no record for the requested ID: {id}"},
            )
        else:
            return instance
    
    @classmethod
    async def all(cls, db_session: AsyncSession):
        """

        :param db_session:
        :return:
        """
        stmt = select(cls)
        result = await db_session.execute(stmt)
        print(result)
        return await db_session.commit()
    
    async def toDict(self):
        return {
                'id': self.id,
                'hashed_password': self.hashed_password,
                'username': self.username,
                'firstname': self.firstname,
                'lastname': self.lastname,
                'email': self.email,
                'disabled': self.disabled
        }

@event.listens_for(UserModel.__table__, 'after_create')
def create_users(*args, **kwargs):
    pass