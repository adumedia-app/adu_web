# backend/auth.py
"""
Authentication Module for ADUmedia Admin Panel

Simple JWT-based authentication for the admin dashboard.
"""

import os
import jwt
from datetime import datetime, timedelta
from typing import Optional
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


# Security scheme
security = HTTPBearer(auto_error=False)


def get_jwt_secret() -> str:
    """Get JWT secret from environment."""
    secret = os.getenv("JWT_SECRET")
    if not secret:
        raise ValueError("JWT_SECRET not configured")
    return secret


def get_admin_password() -> str:
    """Get admin password from environment."""
    password = os.getenv("ADMIN_PASSWORD")
    if not password:
        raise ValueError("ADMIN_PASSWORD not configured")
    return password


def verify_password(password: str) -> bool:
    """
    Verify admin password.
    
    Args:
        password: Password to verify
    
    Returns:
        True if password matches
    """
    return password == get_admin_password()


def create_access_token(
    expires_delta: Optional[timedelta] = None,
) -> str:
    """
    Create a JWT access token.
    
    Args:
        expires_delta: Token expiration time (default: 24 hours)
    
    Returns:
        JWT token string
    """
    if expires_delta is None:
        expires_hours = int(os.getenv("JWT_EXPIRY_HOURS", "24"))
        expires_delta = timedelta(hours=expires_hours)
    
    expire = datetime.utcnow() + expires_delta
    
    payload = {
        "sub": "admin",
        "exp": expire,
        "iat": datetime.utcnow(),
        "type": "access",
    }
    
    token = jwt.encode(
        payload,
        get_jwt_secret(),
        algorithm="HS256",
    )
    
    return token


def decode_token(token: str) -> Optional[dict]:
    """
    Decode and verify a JWT token.
    
    Args:
        token: JWT token string
    
    Returns:
        Token payload if valid, None otherwise
    """
    try:
        payload = jwt.decode(
            token,
            get_jwt_secret(),
            algorithms=["HS256"],
        )
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(security),
) -> dict:
    """
    FastAPI dependency to verify authentication.
    
    Args:
        credentials: Bearer token from request
    
    Returns:
        Token payload
    
    Raises:
        HTTPException: If token is invalid
    """
    if credentials is None:
        raise HTTPException(
            status_code=401,
            detail="Authentication required",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    payload = decode_token(credentials.credentials)
    
    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return payload


def verify_webhook_secret(secret: str) -> bool:
    """
    Verify webhook secret.
    
    Args:
        secret: Secret from webhook request
    
    Returns:
        True if secret matches
    """
    expected = os.getenv("WEBHOOK_SECRET", "")
    if not expected:
        return True  # No secret configured, accept all
    return secret == expected
