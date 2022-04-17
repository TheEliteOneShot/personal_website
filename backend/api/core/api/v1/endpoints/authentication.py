from datetime import timedelta
from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from core.config import get_settings
from core.api.deps import get_db, get_current_active_user
from core.schemas.auth.token import Token
from core.schemas.auth import UserSchema, UserResponse
from core.internal.auth import authenticate_user, create_access_token

API_PREFIX = get_settings().AUTHENTICATION_API_PREFIX

router = APIRouter(prefix=API_PREFIX)

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db_session = Depends(get_db)):
    user = await authenticate_user(db_session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=get_settings().ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = await create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/me/", response_model=UserResponse)
async def read_users_me(current_user: UserSchema = Depends(get_current_active_user)):
    return current_user

@router.get("/users/me/items/")
async def read_own_items(current_user: UserSchema = Depends(get_current_active_user)):
    return [{"item_id": "Foo", "owner": current_user.username}]

