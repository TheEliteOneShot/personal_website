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

    
    SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

    DATABASE_HOST = os.getenv('DATABASE_HOST')
    DATABASE_PORT = os.getenv('DATABASE_PORT')
    DATABASE_USER = os.getenv('DATABASE_USER')
    DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')

    API_TILE = "Example API"
    API_VERSION = 1.0

    AUTHENTICATION_API_PREFIX = "/auth"
    NONSENSE_API_PREFIX = "/nonsense"
    STUFF_API_PREFIX= "/stuff"
    HEALTHCHECK_API_PREFIX = "/healthcheck"

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
