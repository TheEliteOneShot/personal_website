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

    DATABASE_HOST = os.getenv('DATABASE_HOST')
    DATABASE_PORT = os.getenv('DATABASE_PORT')
    DATABASE_USER = os.getenv('DATABASE_USER')
    DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')

    API_TILE = "Example API"
    API_VERSION = 1.0

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
