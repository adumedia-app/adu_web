# backend/config.py
"""
Configuration for ADUmedia Website Backend

Loads environment variables with validation.
"""

import os
from dataclasses import dataclass, field
from typing import Optional, List


@dataclass
class Config:
    """Application configuration from environment variables."""
    
    # Supabase
    supabase_url: str
    supabase_anon_key: str
    supabase_service_key: Optional[str] = None
    
    # Cloudflare R2 (for images)
    r2_public_url: str = ""
    
    # Authentication
    admin_password: str = ""
    jwt_secret: str = ""
    jwt_algorithm: str = "HS256"
    jwt_expiry_hours: int = 24
    
    # Webhook
    webhook_secret: str = ""
    
    # Server
    port: int = 8080
    debug: bool = False
    
    # CORS origins
    cors_origins: List[str] = field(default_factory=list)
    
    def __post_init__(self):
        if not self.cors_origins:
            self.cors_origins = [
                "http://localhost:5173",      # Vite dev
                "http://localhost:3000",      # Alternative dev
                "https://adu.media",          # Production domain
                "https://www.adu.media",      # www variant
            ]


def load_config() -> Config:
    """
    Load configuration from environment variables.
    
    Returns:
        Config object
        
    Raises:
        ValueError: If required variables are missing
    """
    # Required variables
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY") or os.getenv("SUPABASE_ANON_KEY")
    
    if not supabase_url:
        raise ValueError("SUPABASE_URL environment variable is required")
    if not supabase_key:
        raise ValueError("SUPABASE_KEY or SUPABASE_ANON_KEY environment variable is required")
    
    # Optional with defaults
    port = int(os.getenv("PORT", "8080"))
    debug = os.getenv("DEBUG", "").lower() in ("true", "1", "yes")
    
    # Parse CORS origins from comma-separated string
    cors_env = os.getenv("CORS_ORIGINS", "")
    cors_origins = [o.strip() for o in cors_env.split(",") if o.strip()] if cors_env else []
    
    return Config(
        supabase_url=supabase_url,
        supabase_anon_key=supabase_key,
        supabase_service_key=os.getenv("SUPABASE_SERVICE_KEY"),
        r2_public_url=os.getenv("R2_PUBLIC_URL", ""),
        admin_password=os.getenv("ADMIN_PASSWORD", ""),
        jwt_secret=os.getenv("JWT_SECRET", "change-me-in-production"),
        jwt_expiry_hours=int(os.getenv("JWT_EXPIRY_HOURS", "24")),
        webhook_secret=os.getenv("WEBHOOK_SECRET", ""),
        port=port,
        debug=debug,
        cors_origins=cors_origins,
    )


# Singleton config instance
_config: Optional[Config] = None


def get_config() -> Config:
    """Get or create config singleton."""
    global _config
    if _config is None:
        _config = load_config()
    return _config
