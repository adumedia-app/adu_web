# backend/main.py
"""
ADUmedia Website Backend

FastAPI application serving the website API and static frontend files.

Features:
- Public API for editions and articles
- Admin API with JWT authentication
- Webhook handlers for Supabase
- Static file serving for React SPA

Usage:
    python backend/main.py
    
Environment Variables:
    PORT                - Server port (default: 8080)
    SUPABASE_URL        - Supabase project URL
    SUPABASE_KEY        - Supabase API key
    R2_PUBLIC_URL       - Cloudflare R2 public URL for images
    ADMIN_PASSWORD      - Password for admin login
    JWT_SECRET          - Secret for JWT tokens
    WEBHOOK_SECRET      - Secret for webhook authentication
    DEBUG               - Enable debug mode (true/false)
"""

import os
import uvicorn
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse

from .routes import public_router, admin_router, webhook_router
from .database import test_connection


# =============================================================================
# Application Setup
# =============================================================================

app = FastAPI(
    title="ADUmedia API",
    description="Architecture news digest website API",
    version="1.0.0",
    docs_url="/api/docs" if os.getenv("DEBUG", "").lower() == "true" else None,
    redoc_url="/api/redoc" if os.getenv("DEBUG", "").lower() == "true" else None,
)


# =============================================================================
# CORS Configuration
# =============================================================================

# Parse CORS origins from environment
cors_env = os.getenv("CORS_ORIGINS", "")
cors_origins = [o.strip() for o in cors_env.split(",") if o.strip()] if cors_env else []

# Default origins for development and production
default_origins = [
    "http://localhost:5173",     # Vite dev server
    "http://localhost:3000",     # Alternative dev
    "http://localhost:8080",     # Local backend
    "https://adu.media",         # Production
    "https://www.adu.media",     # WWW variant
]

all_origins = list(set(cors_origins + default_origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=all_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =============================================================================
# Include Routers
# =============================================================================

app.include_router(public_router)
app.include_router(admin_router)
app.include_router(webhook_router)


# =============================================================================
# Health Check
# =============================================================================

@app.get("/api/health")
async def health_check():
    """
    Health check endpoint.
    
    Returns database connection status.
    """
    db_ok = test_connection()
    
    return {
        "status": "healthy" if db_ok else "unhealthy",
        "database": "connected" if db_ok else "disconnected",
        "version": "1.0.0",
    }


# =============================================================================
# Error Handlers
# =============================================================================

@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    """
    Handle 404 errors.
    
    For API routes, return JSON error.
    For other routes, serve the SPA index.html for client-side routing.
    """
    if request.url.path.startswith("/api"):
        return JSONResponse(
            status_code=404,
            content={"detail": "Not found"},
        )
    
    # Serve SPA for client-side routing
    index_path = Path(__file__).parent.parent / "frontend" / "dist" / "index.html"
    if index_path.exists():
        return FileResponse(index_path)
    
    return JSONResponse(
        status_code=404,
        content={"detail": "Not found"},
    )


@app.exception_handler(500)
async def server_error_handler(request: Request, exc):
    """Handle 500 errors."""
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


# =============================================================================
# Static Files (Frontend)
# =============================================================================

# Serve static files from the built React app
frontend_path = Path(__file__).parent.parent / "frontend" / "dist"

if frontend_path.exists():
    # Mount static assets first
    assets_path = frontend_path / "assets"
    if assets_path.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_path)), name="assets")
    
    # Serve index.html for root
    @app.get("/")
    async def serve_root():
        return FileResponse(frontend_path / "index.html")
    
    # Catch-all for SPA routing (except /api routes)
    @app.get("/{path:path}")
    async def serve_spa(path: str):
        # Check if it's a static file
        file_path = frontend_path / path
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)
        
        # Otherwise serve index.html for SPA routing
        return FileResponse(frontend_path / "index.html")

else:
    # No frontend built yet - serve placeholder
    @app.get("/")
    async def no_frontend():
        return JSONResponse({
            "message": "ADUmedia API is running",
            "api_docs": "/api/docs" if os.getenv("DEBUG") else None,
            "health": "/api/health",
            "note": "Frontend not built. Run 'npm run build' in frontend directory.",
        })


# =============================================================================
# Entry Point
# =============================================================================

def main():
    """Run the application."""
    port = int(os.getenv("PORT", "8080"))
    debug = os.getenv("DEBUG", "").lower() == "true"
    
    print(f"")
    print(f"  ADUmedia Website Backend")
    print(f"  ========================")
    print(f"  Port: {port}")
    print(f"  Debug: {debug}")
    print(f"  Frontend: {'Found' if frontend_path.exists() else 'Not built'}")
    print(f"")
    
    uvicorn.run(
        "backend.main:app",
        host="0.0.0.0",
        port=port,
        reload=debug,
    )


if __name__ == "__main__":
    main()
