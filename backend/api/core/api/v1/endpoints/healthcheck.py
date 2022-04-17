from fastapi import APIRouter, status
from core.config import get_settings

API_PREFIX = get_settings().HEALTHCHECK_API_PREFIX

router = APIRouter(prefix=API_PREFIX)


@router.get("/", status_code=status.HTTP_200_OK)
async def health_check():
    return "All good"