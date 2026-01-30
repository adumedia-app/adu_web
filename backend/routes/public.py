# backend/routes/public.py
"""
Public API Routes for ADUmedia Website

Unauthenticated endpoints for the public website.
"""

import os
from datetime import date, datetime
from typing import Optional
from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import Response

from database import (
    get_editions,
    get_edition_by_date,
    get_latest_edition,
    get_articles_by_ids,
    get_article_by_id,
)


router = APIRouter(prefix="/api", tags=["public"])


# =============================================================================
# Helper Functions
# =============================================================================

def format_date(d: date) -> str:
    """Format date as '30 January 2026'."""
    return d.strftime("%-d %B %Y")


def get_day_of_week(d: date) -> str:
    """Get day of week name."""
    return d.strftime("%A")


def transform_article(article: dict) -> dict:
    """Transform database article to API format."""
    r2_url = os.getenv("R2_PUBLIC_URL", "")
    image_key = article.get("image_key", "")
    
    return {
        "id": str(article.get("id", "")),
        "title": article.get("original_title", ""),
        "source_id": article.get("source_id", ""),
        "source_name": article.get("source_name", ""),
        "url": article.get("article_url", ""),
        "published_date": article.get("original_published", ""),
        "ai_summary": article.get("ai_summary", ""),
        "image_url": f"{r2_url}/{image_key}" if image_key and r2_url else None,
        "tags": article.get("ai_tags") or [],
        "category": article.get("ai_category", ""),
    }


def transform_edition(edition: dict, articles: list = None) -> dict:
    """Transform database edition to API format."""
    edition_date = date.fromisoformat(edition["edition_date"])
    
    result = {
        "id": str(edition.get("id", "")),
        "edition_type": edition.get("edition_type", "daily"),
        "edition_date": edition.get("edition_date", ""),
        "article_count": edition.get("articles_selected", 0),
        "date_formatted": format_date(edition_date),
        "day_of_week": get_day_of_week(edition_date),
    }
    
    if articles is not None:
        result["articles"] = [transform_article(a) for a in articles]
        result["edition_summary"] = edition.get("edition_summary", "")
    
    return result


# =============================================================================
# Editions
# =============================================================================

@router.get("/editions")
async def list_editions(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    type: Optional[str] = Query(None, pattern="^(daily|weekend|weekly)$"),
):
    """
    List editions (digests) with pagination.
    
    Args:
        limit: Max results (1-100)
        offset: Pagination offset
        type: Filter by edition type
    
    Returns:
        List of edition summaries
    """
    editions = get_editions(limit=limit + 1, offset=offset, edition_type=type)
    
    has_more = len(editions) > limit
    if has_more:
        editions = editions[:limit]
    
    return {
        "editions": [transform_edition(e) for e in editions],
        "total": len(editions),
        "has_more": has_more,
    }


@router.get("/editions/today")
async def get_today():
    """
    Get today's edition.
    
    Returns the latest edition if today has no edition.
    """
    # Try today first
    edition = get_edition_by_date(date.today())
    
    # Fall back to latest
    if not edition:
        edition = get_latest_edition()
    
    if not edition:
        raise HTTPException(status_code=404, detail="No editions found")
    
    # Get articles
    article_ids = edition.get("article_ids", [])
    articles = get_articles_by_ids(article_ids) if article_ids else []
    
    return transform_edition(edition, articles)


@router.get("/editions/latest")
async def get_latest():
    """Get the most recent edition."""
    edition = get_latest_edition()
    
    if not edition:
        raise HTTPException(status_code=404, detail="No editions found")
    
    # Get articles
    article_ids = edition.get("article_ids", [])
    articles = get_articles_by_ids(article_ids) if article_ids else []
    
    return transform_edition(edition, articles)


@router.get("/editions/{edition_date}")
async def get_by_date(edition_date: str):
    """
    Get edition for a specific date.
    
    Args:
        edition_date: Date in YYYY-MM-DD format
    """
    try:
        d = date.fromisoformat(edition_date)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    edition = get_edition_by_date(d)
    
    if not edition:
        raise HTTPException(status_code=404, detail=f"No edition for {edition_date}")
    
    # Get articles
    article_ids = edition.get("article_ids", [])
    articles = get_articles_by_ids(article_ids) if article_ids else []
    
    return transform_edition(edition, articles)


# =============================================================================
# Articles
# =============================================================================

@router.get("/articles/{article_id}")
async def get_article(article_id: str):
    """
    Get single article by ID.
    
    Args:
        article_id: Article UUID
    """
    article = get_article_by_id(article_id)
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    return transform_article(article)


# =============================================================================
# SEO
# =============================================================================

@router.get("/sitemap.xml", response_class=Response)
async def sitemap():
    """Generate sitemap.xml for search engines."""
    base_url = os.getenv("SITE_URL", "https://adu.media")
    
    editions = get_editions(limit=100)
    
    urls = [
        f'  <url><loc>{base_url}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>',
        f'  <url><loc>{base_url}/archive</loc><changefreq>daily</changefreq><priority>0.8</priority></url>',
        f'  <url><loc>{base_url}/about</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>',
    ]
    
    for edition in editions:
        edition_date = edition.get("edition_date", "")
        urls.append(
            f'  <url><loc>{base_url}/digest/{edition_date}</loc><changefreq>never</changefreq><priority>0.7</priority></url>'
        )
    
    xml = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(urls)}
</urlset>'''
    
    return Response(content=xml, media_type="application/xml")


@router.get("/robots.txt", response_class=Response)
async def robots():
    """Generate robots.txt."""
    base_url = os.getenv("SITE_URL", "https://adu.media")
    
    content = f"""User-agent: *
Allow: /

Sitemap: {base_url}/api/sitemap.xml
"""
    
    return Response(content=content, media_type="text/plain")
