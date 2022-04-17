from typing import AsyncGenerator

from fastapi import HTTPException
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import SQLAlchemyError
# Use Async Engine for a real database
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from typing import Dict
import core.config as config

global_settings = config.get_settings()
# Async connection to a local SQLITE database
db_url = f"postgresql+asyncpg://{global_settings.DATABASE_USER}:{global_settings.DATABASE_PASSWORD}@{global_settings.DATABASE_HOST}"
print('Database Connection String: ', db_url)
engine = create_async_engine(
    db_url,
    future=True,
    echo=True,
)

async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

Base = declarative_base()

# Async
async def get_db() -> AsyncGenerator:
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except SQLAlchemyError as sql_ex:
            await session.rollback()
            raise sql_ex
        except HTTPException as http_ex:
            await session.rollback()
            raise http_ex
        finally:
            await session.close()

async def get_fake_user_db() -> Dict:
    fake_users_db = {
        "johndoe": {
            "username": "johndoe",
            "full_name": "John Doe",
            "email": "johndoe@example.com",
            "hashed_password": "$2b$12$jTZc7r4RHuGQqdR96p86XuUw0S7E2DKjEFHu7MqiFk/8wiG.Q.jIa",
            "disabled": False,
        }
    }
    return fake_users_db
