from datetime import datetime, timedelta

from core.api.deps import get_db
from core.config import get_settings
from core.internal.exceptions import (AccessTokenExpiredHTTPException,
                                      CredentialsInvalidHTTPException,
                                      InactiveUserHTTPException,
                                      RefreshTokenInvalidHTTPException)
from core.internal.user import get_user_by_username
from core.models.auth import RefreshToken
from core.models.user import UserModel
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


async def get_password_hash(password):
    return pwd_context.hash(password)


async def authenticate_user(db_session, username: str, password: str):
    user: UserModel = await get_user_by_username(db_session, username)
    if not user:
        return False
    if not await verify_password(password, user.password):
        return False
    return user


async def create_access_token(db_session, data: dict):
    refresh_token_expires_delta = timedelta(
        minutes=get_settings().REFRESH_TOKEN_EXPIRE_MINUTES)
    refresh_token_to_encode = data.copy()
    refresh_token_expires = datetime.utcnow() + refresh_token_expires_delta

    refresh_token_uuid = await RefreshToken.create_for_username(db_session, refresh_token_expires, data["sub"])

    refresh_token_to_encode.update({
        "exp": refresh_token_expires,
        "id": refresh_token_uuid
    })

    refresh_token_encoded_jwt = jwt.encode(refresh_token_to_encode, get_settings(
    ).REFRESH_TOKEN_SECRET_KEY, algorithm=get_settings().ALGORITHM)

    access_token_expires_delta = timedelta(
        minutes=get_settings().ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token_to_encode = data.copy()
    access_token_expires = datetime.utcnow() + access_token_expires_delta
    access_token_to_encode.update({"exp": access_token_expires})
    access_token_encoded_jwt = jwt.encode(access_token_to_encode, get_settings(
    ).ACCESS_TOKEN_SECRET_KEY, algorithm=get_settings().ALGORITHM)

    return {"access_token": access_token_encoded_jwt, "refresh_token": refresh_token_encoded_jwt}


async def refresh_access_token(db_session, refresh_token):
    try:
        payload = jwt.decode(refresh_token, get_settings(
        ).REFRESH_TOKEN_SECRET_KEY, algorithms=[get_settings().ALGORITHM])
        if await RefreshToken.get_by_uuid(db_session, payload['id']) is None:
            raise RefreshTokenInvalidHTTPException()
        to_encode = {}
        to_encode.update({"sub": payload["sub"]})
    except:
        raise RefreshTokenInvalidHTTPException()
    return await create_access_token(db_session, to_encode)


async def get_current_user(token: str = Depends(oauth2_scheme), db_session: AsyncSession = Depends(get_db)):
    try:
        payload = jwt.decode(token, get_settings().ACCESS_TOKEN_SECRET_KEY, algorithms=[
                             get_settings().ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise CredentialsInvalidHTTPException()
    except CredentialsInvalidHTTPException as exc:
        raise exc
    except:
        raise AccessTokenExpiredHTTPException()
    user = await get_user_by_username(db_session, username)
    if user is None:
        raise CredentialsInvalidHTTPException()
    return user


async def get_current_active_user(current_user: UserModel = Depends(get_current_user)):
    print(current_user.disabled)
    if current_user.disabled:
        raise InactiveUserHTTPException()
    return current_user
