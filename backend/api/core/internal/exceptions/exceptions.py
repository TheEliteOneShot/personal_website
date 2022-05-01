from fastapi import HTTPException, status


class BadRequestHTTPException(HTTPException):
    def __init__(self, msg: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=msg if msg else "BAD_REQUEST",
        )


class RoleUnauthorizedHTTPException(HTTPException):
    def __init__(self, msg: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=msg if msg else "ROLE_UNAUTHORIZED",
        )


class InactiveUserHTTPException(HTTPException):
    def __init__(self, msg: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=msg if msg else "INACTIVE_USER",
        )


class CredentialsInvalidHTTPException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="CREDENTIALS_INVALID",
            headers={"WWW-Authenticate": "Basic"},
        )


class RefreshTokenInvalidHTTPException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="REFRESH_TOKEN_INVALID",
        )


class AccessTokenExpiredHTTPException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="ACCESS_TOKEN_EXPIRED",
            headers={"WWW-Authenticate": "Bearer"},
        )


class ForbiddenHTTPException(HTTPException):
    def __init__(self, msg: str):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=msg if msg else "RESOURCE_FORBIDDEN",
        )


class NotFoundHTTPException(HTTPException):
    def __init__(self, msg: str):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=msg if msg else "RESOURCE_NOT_FOUND",
        )


class ConflictHTTPException(HTTPException):
    def __init__(self, msg: str):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=msg if msg else "RESOURCE_CONFLICT",
        )


class ServiceNotAvailableHTTPException(HTTPException):
    def __init__(self, msg: str):
        super().__init__(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=msg if msg else "SERVICE_UNAVAILABLE",
        )
