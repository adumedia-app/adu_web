# backend/routes/admin.py
"""
Admin API Routes for ADUmedia Website

Protected endpoints for the admin dashboard.
"""

from datetime import datetime
from typing import Optional
from fastapi import APIRouter, HTTPException, Query, Depends

from auth import get_current_user, verify_password, create_access_token
from database import (
    get_editions,
    get_edition_by_id,
    update_edition,
    get_article_by_id,
    search_articles,
    update_article,
    delete_article,
    remove_article_from_edition,
    get_stats,
)
from models import (
    LoginRequest,
    LoginResponse,
    UserInfo,
    ArticleUpdate,
    EditionUpdate,
)
from routes.public import transform_article, transform_edition


router = APIRouter(prefix="/api/admin", tags=["admin"])


# =============================================================================
# Authentication
# =============================================================================

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """
    Admin login endpoint.
    
    Args:
        request: LoginRequest with password
    
    Returns:
        JWT access token
    """
    if not verify_password(request.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid password",
        )
    
    token = create_access_token()
    expires_hours = 24  # Default
    
    return LoginResponse(
        access_token=token,
        token_type="bearer",
        expires_in=expires_hours * 3600,  # seconds
    )


@router.get("/me", response_model=UserInfo)
async def get_me(user: dict = Depends(get_current_user)):
    """
    Get current user info.
    
    Verifies token is valid.
    """
    return UserInfo(
        role="admin",
        authenticated_at=datetime.fromtimestamp(user.get("iat", 0)),
    )


# =============================================================================
# Dashboard
# =============================================================================

@router.get("/stats")
async def get_dashboard_stats(user: dict = Depends(get_current_user)):
    """Get statistics for admin dashboard."""
    stats = get_stats()
    
    # Transform recent editions
    stats["recent_editions"] = [
        transform_edition(e) for e in stats.get("recent_editions", [])
    ]
    
    return stats


# =============================================================================
# Editions
# =============================================================================

@router.get("/editions")
async def list_editions_admin(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    user: dict = Depends(get_current_user),
):
    """List editions for admin dashboard."""
    editions = get_editions(limit=limit, offset=offset)
    
    return {
        "editions": [transform_edition(e) for e in editions],
        "total": len(editions),
    }


@router.get("/editions/{edition_id}")
async def get_edition_admin(
    edition_id: str,
    user: dict = Depends(get_current_user),
):
    """Get single edition with full details."""
    from database import get_articles_by_ids
    
    edition = get_edition_by_id(edition_id)
    
    if not edition:
        raise HTTPException(status_code=404, detail="Edition not found")
    
    article_ids = edition.get("article_ids", [])
    articles = get_articles_by_ids(article_ids) if article_ids else []
    
    return transform_edition(edition, articles)


@router.patch("/editions/{edition_id}")
async def update_edition_admin(
    edition_id: str,
    updates: EditionUpdate,
    user: dict = Depends(get_current_user),
):
    """Update an edition."""
    edition = get_edition_by_id(edition_id)
    
    if not edition:
        raise HTTPException(status_code=404, detail="Edition not found")
    
    update_data = updates.model_dump(exclude_unset=True)
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No updates provided")
    
    result = update_edition(edition_id, update_data)
    
    if not result:
        raise HTTPException(status_code=500, detail="Update failed")
    
    return {"message": "Edition updated", "id": edition_id}


@router.delete("/editions/{edition_id}/articles/{article_id}")
async def remove_from_edition(
    edition_id: str,
    article_id: str,
    user: dict = Depends(get_current_user),
):
    """Remove an article from an edition."""
    success = remove_article_from_edition(edition_id, article_id)
    
    if not success:
        raise HTTPException(
            status_code=404,
            detail="Edition or article not found",
        )
    
    return {"message": "Article removed from edition"}


# =============================================================================
# Articles
# =============================================================================

@router.get("/articles")
async def search_articles_admin(
    q: str = Query("", min_length=0, max_length=200),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    user: dict = Depends(get_current_user),
):
    """Search articles by title."""
    if not q:
        raise HTTPException(status_code=400, detail="Search query required")
    
    articles = search_articles(q, limit=limit, offset=offset)
    
    return {
        "articles": [transform_article(a) for a in articles],
        "query": q,
        "total": len(articles),
    }


@router.get("/articles/{article_id}")
async def get_article_admin(
    article_id: str,
    user: dict = Depends(get_current_user),
):
    """Get single article with full details."""
    article = get_article_by_id(article_id)
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    # Include extra fields for admin
    result = transform_article(article)
    result.update({
        "status": article.get("status", ""),
        "fetch_date": article.get("fetch_date", ""),
        "project_id": str(article.get("project_id", "")) if article.get("project_id") else None,
        "editor_notes": article.get("editor_notes", ""),
    })
    
    return result


@router.patch("/articles/{article_id}")
async def update_article_admin(
    article_id: str,
    updates: ArticleUpdate,
    user: dict = Depends(get_current_user),
):
    """Update an article."""
    article = get_article_by_id(article_id)
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    update_data = updates.model_dump(exclude_unset=True)
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No updates provided")
    
    result = update_article(article_id, update_data)
    
    if not result:
        raise HTTPException(status_code=500, detail="Update failed")
    
    return {"message": "Article updated", "id": article_id}


@router.delete("/articles/{article_id}")
async def delete_article_admin(
    article_id: str,
    user: dict = Depends(get_current_user),
):
    """Soft-delete an article."""
    article = get_article_by_id(article_id)
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    success = delete_article(article_id)
    
    if not success:
        raise HTTPException(status_code=500, detail="Delete failed")
    
    return {"message": "Article deleted", "id": article_id}
