from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.nonsense import router as nonsense_router
from routes.stuff import router as stuff_router
from routes.healthcheck import router as healthcheck_router
from database import engine
from models.base import Base
from config import get_settings

app = FastAPI(title=get_settings().API_TILE, version=get_settings().API_VERSION)

app.include_router(stuff_router)
app.include_router(nonsense_router)
app.include_router(healthcheck_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_settings().CORS_ORIGINS,
    allow_credentials=get_settings().CORS_ALLOW_CREDENTIALS,
    allow_methods=get_settings().CORS_ALLOW_METHODS,
    allow_headers=get_settings().CORS_ALLOW_HEADERS,
)

async def start_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await engine.dispose()


@app.on_event("startup")
async def startup_event():
    await start_db()


@app.on_event("shutdown")
async def shutdown_event():
    pass
