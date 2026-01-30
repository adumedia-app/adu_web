# backend/database.py
"""
Supabase Database Client for ADUmedia Website

Handles all database operations for the website API.
"""

import os
from datetime import date, datetime, timedelta
from typing import Optional, List, Dict, Any
from supabase import create_client, Client


# Global client instance
_client: Optional[Client] = None


def get_client() -> Client:
    """Get or create Supabase client."""
    global _client
    
    if _client is None:
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_KEY") or os.getenv("SUPABASE_ANON_KEY")
        
        if not url or not key:
            raise ValueError("Supabase credentials not configured")
        
        _client = create_client(url, key)
        print("[DB] Connected to Supabase")
    
    return _client


# =============================================================================
# Editions
# =============================================================================

def get_editions(
    limit: int = 20,
    offset: int = 0,
    edition_type: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """
    Get list of editions (digests).
    
    Args:
        limit: Max results
        offset: Pagination offset
        edition_type: Filter by type (daily, weekend, weekly)
    
    Returns:
        List of edition records
    """
    client = get_client()
    
    query = client.table("editions")\
        .select("*")\
        .order("edition_date", desc=True)\
        .range(offset, offset + limit - 1)
    
    if edition_type:
        query = query.eq("edition_type", edition_type)
    
    result = query.execute()
    return result.data or []


def get_edition_by_date(edition_date: date) -> Optional[Dict[str, Any]]:
    """
    Get edition for a specific date.
    
    Args:
        edition_date: Date to look up
    
    Returns:
        Edition record or None
    """
    client = get_client()
    
    result = client.table("editions")\
        .select("*")\
        .eq("edition_date", edition_date.isoformat())\
        .limit(1)\
        .execute()
    
    return result.data[0] if result.data else None


def get_today_edition() -> Optional[Dict[str, Any]]:
    """Get today's edition."""
    return get_edition_by_date(date.today())


def get_latest_edition() -> Optional[Dict[str, Any]]:
    """Get the most recent edition."""
    editions = get_editions(limit=1)
    return editions[0] if editions else None


def get_edition_by_id(edition_id: str) -> Optional[Dict[str, Any]]:
    """Get edition by UUID."""
    client = get_client()
    
    result = client.table("editions")\
        .select("*")\
        .eq("id", edition_id)\
        .limit(1)\
        .execute()
    
    return result.data[0] if result.data else None


def update_edition(edition_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Update an edition record.
    
    Args:
        edition_id: UUID of edition
        updates: Fields to update
    
    Returns:
        Updated edition or None
    """
    client = get_client()
    
    # Don't allow updating certain fields
    protected = ["id", "created_at"]
    updates = {k: v for k, v in updates.items() if k not in protected}
    
    result = client.table("editions")\
        .update(updates)\
        .eq("id", edition_id)\
        .execute()
    
    return result.data[0] if result.data else None


# =============================================================================
# Articles
# =============================================================================

def get_articles_by_ids(article_ids: List[str]) -> List[Dict[str, Any]]:
    """
    Get multiple articles by their UUIDs.
    
    Args:
        article_ids: List of article UUIDs
    
    Returns:
        List of article records
    """
    if not article_ids:
        return []
    
    client = get_client()
    
    result = client.table("all_articles")\
        .select("*")\
        .in_("id", article_ids)\
        .execute()
    
    # Preserve order from article_ids
    articles_map = {str(a["id"]): a for a in (result.data or [])}
    return [articles_map[aid] for aid in article_ids if aid in articles_map]


def get_article_by_id(article_id: str) -> Optional[Dict[str, Any]]:
    """Get single article by UUID."""
    client = get_client()
    
    result = client.table("all_articles")\
        .select("*")\
        .eq("id", article_id)\
        .limit(1)\
        .execute()
    
    return result.data[0] if result.data else None


def search_articles(
    query: str,
    limit: int = 20,
    offset: int = 0,
) -> List[Dict[str, Any]]:
    """
    Search articles by title.
    
    Args:
        query: Search query
        limit: Max results
        offset: Pagination offset
    
    Returns:
        List of matching articles
    """
    client = get_client()
    
    result = client.table("all_articles")\
        .select("*")\
        .ilike("original_title", f"%{query}%")\
        .order("fetch_date", desc=True)\
        .range(offset, offset + limit - 1)\
        .execute()
    
    return result.data or []


def update_article(article_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Update an article record.
    
    Args:
        article_id: UUID of article
        updates: Fields to update
    
    Returns:
        Updated article or None
    """
    client = get_client()
    
    # Don't allow updating certain fields
    protected = ["id", "created_at", "article_url"]
    updates = {k: v for k, v in updates.items() if k not in protected}
    
    result = client.table("all_articles")\
        .update(updates)\
        .eq("id", article_id)\
        .execute()
    
    return result.data[0] if result.data else None


def delete_article(article_id: str) -> bool:
    """
    Soft-delete an article (mark as archived).
    
    Args:
        article_id: UUID of article
    
    Returns:
        True if successful
    """
    result = update_article(article_id, {"status": "archived"})
    return result is not None


def remove_article_from_edition(edition_id: str, article_id: str) -> bool:
    """
    Remove an article from an edition's article_ids array.
    
    Args:
        edition_id: UUID of edition
        article_id: UUID of article to remove
    
    Returns:
        True if successful
    """
    edition = get_edition_by_id(edition_id)
    if not edition:
        return False
    
    article_ids = edition.get("article_ids", [])
    if article_id not in article_ids:
        return False
    
    article_ids.remove(article_id)
    
    client = get_client()
    result = client.table("editions")\
        .update({
            "article_ids": article_ids,
            "articles_selected": len(article_ids),
        })\
        .eq("id", edition_id)\
        .execute()
    
    return bool(result.data)


# =============================================================================
# Projects
# =============================================================================

def get_project_by_id(project_id: str) -> Optional[Dict[str, Any]]:
    """Get project by UUID."""
    client = get_client()
    
    result = client.table("projects")\
        .select("*")\
        .eq("id", project_id)\
        .limit(1)\
        .execute()
    
    return result.data[0] if result.data else None


# =============================================================================
# Statistics
# =============================================================================

def get_stats() -> Dict[str, Any]:
    """Get overall statistics for admin dashboard."""
    client = get_client()
    
    # Count editions
    editions_result = client.table("editions")\
        .select("id", count="exact")\
        .execute()
    
    # Count published articles
    articles_result = client.table("all_articles")\
        .select("id", count="exact")\
        .eq("status", "published")\
        .execute()
    
    # Count projects
    projects_result = client.table("projects")\
        .select("id", count="exact")\
        .execute()
    
    # Recent editions
    recent_editions = get_editions(limit=5)
    
    return {
        "total_editions": editions_result.count or 0,
        "total_articles_published": articles_result.count or 0,
        "total_projects": projects_result.count or 0,
        "recent_editions": recent_editions,
    }


# =============================================================================
# Health Check
# =============================================================================

def test_connection() -> bool:
    """Test database connection."""
    try:
        client = get_client()
        client.table("editions").select("id").limit(1).execute()
        return True
    except Exception as e:
        print(f"[DB] Connection test failed: {e}")
        return False
