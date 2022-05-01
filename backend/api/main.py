import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.api import authentication, healthcheck, user
from core.config import get_settings
from initialize_database import initialize_database

logging.basicConfig(level=get_settings().LOGGING_LEVEL)

app = FastAPI(title=get_settings().API_TILE,
              version=get_settings().API_VERSION)

app.include_router(authentication)
app.include_router(healthcheck)
app.include_router(user)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_settings().CORS_ORIGINS,
    allow_credentials=get_settings().CORS_ALLOW_CREDENTIALS,
    allow_methods=get_settings().CORS_ALLOW_METHODS,
    allow_headers=get_settings().CORS_ALLOW_HEADERS,
)


@app.on_event("startup")
async def startup_event():
    await initialize_database()


@app.on_event("shutdown")
async def shutdown_event():
    pass
