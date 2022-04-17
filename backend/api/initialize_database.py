from core.internal.database import engine
from core.models.base import Base
from core.models.auth import UserModel
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import AsyncSession

async def initialize_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
        await create_users(conn)
    await engine.dispose()
    pass

async def create_users(engine):
    """
    Adds default users to the database
    :return:
    """
    async_session = sessionmaker(
        engine, expire_on_commit=False, class_=AsyncSession
    )
    
    async with async_session() as session:
        async with session.begin():
            session.add_all(
                [
                    UserModel(username="admin", hashed_password="$2b$12$f7w7QQSwiUh7OMnGw8xXNe3itDtC0pTyowGxZbETBOKYOMKrxJ08y", email="webmaster@domain.com", disabled=False),
                    UserModel(username="testuser", hashed_password="$2b$12$f7w7QQSwiUh7OMnGw8xXNe3itDtC0pTyowGxZbETBOKYOMKrxJ08y", firstname="mary", lastname="jane", email="test@domain.com", disabled=False)
                ]
            )
            