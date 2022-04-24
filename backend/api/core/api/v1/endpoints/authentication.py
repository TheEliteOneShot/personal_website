from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from core.config import get_settings
from core.api.deps import get_db
from core.internal.auth import refresh_access_token
from core.schemas.auth import RefreshTokenSchema, TokenSchema
from core.internal.auth import authenticate_user, create_access_token

API_PREFIX = get_settings().AUTHENTICATION_API_PREFIX

router = APIRouter(prefix=API_PREFIX)


@router.post("/token", response_model=TokenSchema)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db_session=Depends(get_db)):
    user = await authenticate_user(db_session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    tokens = await create_access_token(db_session, data={"sub": user.username})
    return {"access_token": tokens["access_token"], "refresh_token": tokens["refresh_token"], "token_type": "bearer"}


@router.post("/token/refresh", response_model=TokenSchema)
async def token_refresh(payload: RefreshTokenSchema, db_session=Depends(get_db)):
    tokens = await refresh_access_token(db_session, payload.refresh_token)
    return {"access_token": tokens["access_token"], "refresh_token": tokens["refresh_token"], "token_type": "bearer"}
