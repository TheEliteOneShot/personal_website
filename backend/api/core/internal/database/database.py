from typing import AsyncGenerator
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
# Use Async Engine for a real database
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import core.config as config

global_settings = config.get_settings()
# Async connection to a local SQLITE database
db_url = f"postgresql+asyncpg://{global_settings.DATABASE_USER}:{global_settings.DATABASE_PASSWORD}@{global_settings.DATABASE_HOST}"
print('Database Connection String: ', global_settings.DATABASE_URL)
engine = create_async_engine(
    global_settings.DATABASE_URL,
    future=True,
    echo=True,
)

async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

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