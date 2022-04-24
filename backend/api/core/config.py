from functools import lru_cache
from pydantic import BaseSettings
import os

class Settings(BaseSettings):
    """

    BaseSettings, from Pydantic, validates the data so that when we create an instance of Settings,
     environment and testing will have types of str and bool, respectively.

    Parameters:

    Returns:
    instance of Settings

    """
    LOGGING_LEVEL="DEBUG"

    ACCESS_TOKEN_SECRET_KEY = "ACCESS_TOKEN_SECRET_KEY_HERE"
    REFRESH_TOKEN_SECRET_KEY = "REFRESH_TOKEN_SECRET_KEY_HERE"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 5
    REFRESH_TOKEN_EXPIRE_MINUTES = 60

    DATABASE_HOST = os.getenv('DATABASE_HOST')
    DATABASE_PORT = os.getenv('DATABASE_PORT')
    DATABASE_USER = os.getenv('DATABASE_USER')
    DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')
    DATABASE_URL = f"postgresql+asyncpg://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}"

    API_TILE = "Example API"
    API_VERSION = 1.0

    API_ROOT_PATH = "/api/v1"
    USER_API_PREFIX = API_ROOT_PATH + "/user"
    AUTHENTICATION_API_PREFIX = API_ROOT_PATH + "/auth"
    HEALTHCHECK_API_PREFIX = API_ROOT_PATH + "/healthcheck"

    NEW_USER_ENABLED_BY_DEFAULT=True

    # CORS
    CORS_ORIGINS = [
    "*",
    ]

    CORS_ALLOW_CREDENTIALS=True
    CORS_ALLOW_METHODS=["*"]
    CORS_ALLOW_HEADERS=["*"]


@lru_cache
def get_settings():
    return Settings()
