from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.api import router as authentication_router
from core.api import router as healthcheck_router
from core.config import get_settings
from initialize_database import initialize_database

app = FastAPI(title=get_settings().API_TILE, version=get_settings().API_VERSION)

app.include_router(authentication_router)
app.include_router(healthcheck_router)

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
