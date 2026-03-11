# backend/typesense_sync.py
"""
Typesense Search Index Sync

Syncs articles from Supabase → Typesense Cloud for full-text search.

Usage:
    # Full re-index (all published articles)
    python backend/typesense_sync.py

    # Can also be triggered via admin API endpoint:
    # POST /api/admin/search/reindex

Environment Variables:
    TYPESENSE_HOST          - Typesense Cloud host (e.g., xyz.a1.typesense.net)
    TYPESENSE_API_KEY       - Admin API key (for indexing)
    TYPESENSE_SEARCH_KEY    - Search-only API key (exposed to frontend)
    SUPABASE_URL            - Supabase project URL
    SUPABASE_KEY            - Supabase API key
    R2_PUBLIC_URL           - R2 public URL for image paths
"""

import os
import re
import sys
import unicodedata
from pathlib import Path
from datetime import datetime

# Add parent to path when running standalone
sys.path.insert(0, str(Path(__file__).parent))

import typesense

from database import get_client


# =============================================================================
# Configuration
# =============================================================================

COLLECTION_NAME = "articles"

# Fields that Typesense will index and make searchable
COLLECTION_SCHEMA = {
    "name": COLLECTION_NAME,
    "fields": [
        # --- Searchable text fields ---
        {"name": "title", "type": "string", "facet": False},
        {"name": "headline_line_1", "type": "string", "facet": False, "optional": True},
        {"name": "headline_line_2", "type": "string", "facet": False, "optional": True},
        {"name": "ai_summary", "type": "string", "facet": False},
        {"name": "source_name", "type": "string", "facet": True},

        # --- Tags (filterable + searchable) ---
        {"name": "tags", "type": "string[]", "facet": True},

        # --- Filter / sort fields ---
        {"name": "is_studio", "type": "bool", "facet": True},
        {"name": "published_date", "type": "string", "facet": False, "sort": True, "optional": True},
        {"name": "fetch_timestamp", "type": "int64", "facet": False, "sort": True},

        # --- Display fields (not searched, just returned) ---
        {"name": "slug", "type": "string", "index": False, "optional": True},
        {"name": "source_id", "type": "string", "index": False, "optional": True},
        {"name": "url", "type": "string", "index": False, "optional": True},
        {"name": "image_url", "type": "string", "index": False, "optional": True},
        {"name": "category", "type": "string", "index": False, "optional": True},
        {"name": "edition_date", "type": "string", "index": False, "optional": True},

        # --- Translation fields (returned, not searched) ---
        {"name": "headline_translations", "type": "object", "index": False, "optional": True},
        {"name": "headline_line_1_translations", "type": "object", "index": False, "optional": True},
        {"name": "headline_line_2_translations", "type": "object", "index": False, "optional": True},
        {"name": "ai_summary_translations", "type": "object", "index": False, "optional": True},
    ],
    # Default fields to search when user types a query
    "default_sorting_field": "fetch_timestamp",
    "enable_nested_fields": True,
    "token_separators": ["/", "-"],
    "symbols_to_index": ["#"],
}


# =============================================================================
# Typesense Client
# =============================================================================

_ts_client = None


def get_typesense_client() -> typesense.Client:
    """Get or create Typesense client."""
    global _ts_client

    if _ts_client is None:
        host = os.getenv("TYPESENSE_HOST", "")
        api_key = os.getenv("TYPESENSE_API_KEY", "")

        if not host or not api_key:
            raise ValueError(
                "TYPESENSE_HOST and TYPESENSE_API_KEY must be set. "
                "Get these from your Typesense Cloud dashboard."
            )

        _ts_client = typesense.Client({
            "api_key": api_key,
            "nodes": [{
                "host": host,
                "port": "443",
                "protocol": "https",
            }],
            "connection_timeout_seconds": 10,
        })

    return _ts_client


# =============================================================================
# Slug Generation (mirrors public.py)
# =============================================================================

def generate_slug(title: str, max_length: int = 80) -> str:
    """Generate URL-friendly slug from title."""
    if not title:
        return "untitled"

    slug = unicodedata.normalize("NFKD", title)
    slug = slug.encode("ascii", "ignore").decode("ascii")
    slug = slug.lower()
    slug = re.sub(r"[''`]", "", slug)
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    slug = re.sub(r"-+", "-", slug)
    slug = slug.strip("-")

    if len(slug) > max_length:
        slug = slug[:max_length].rsplit("-", 1)[0]

    return slug or "untitled"


# =============================================================================
# Data Transform
# =============================================================================

def article_to_typesense_doc(article: dict, edition_date: str = "") -> dict:
    """
    Transform a Supabase article row into a Typesense document.

    Args:
        article: Raw article dict from Supabase all_articles table
        edition_date: Optional edition date string (YYYY-MM-DD)

    Returns:
        Dict ready for Typesense indexing
    """
    r2_url = os.getenv("R2_PUBLIC_URL", "")

    # Image path — prefer thumbnail for search results
    image_path = (
        article.get("r2_thumbnail_path")
        or article.get("r2_image_path")
        or article.get("image_key")
    )
    image_url = f"{r2_url}/{image_path}" if image_path and r2_url else ""

    # Title — prefer headline over original_title
    title = article.get("headline") or article.get("original_title") or ""

    # Tags — normalize: strip # prefix, lowercase
    raw_tags = article.get("tags") or []
    if isinstance(raw_tags, str):
        raw_tags = [raw_tags]
    tags = [t.lstrip("#").strip().lower() for t in raw_tags if t and t.strip()]

    # Fetch date as unix timestamp for sorting
    fetch_date_str = article.get("fetch_date") or article.get("created_at") or ""
    try:
        if "T" in str(fetch_date_str):
            dt = datetime.fromisoformat(str(fetch_date_str).replace("Z", "+00:00"))
        else:
            dt = datetime.fromisoformat(str(fetch_date_str))
        fetch_timestamp = int(dt.timestamp())
    except (ValueError, TypeError):
        fetch_timestamp = 0

    return {
        "id": str(article.get("id", "")),
        "title": title,
        "headline_line_1": article.get("headline_line_1") or "",
        "headline_line_2": article.get("headline_line_2") or "",
        "ai_summary": article.get("ai_summary") or "",
        "source_name": article.get("source_name") or "",
        "source_id": article.get("source_id") or "",
        "tags": tags,
        "is_studio": bool(article.get("is_studio", False)),
        "published_date": article.get("original_publish_date") or "",
        "fetch_timestamp": fetch_timestamp,
        "slug": generate_slug(title),
        "url": article.get("article_url") or "",
        "image_url": image_url,
        "category": article.get("selection_category") or "",
        "edition_date": edition_date,
        "headline_translations": article.get("headline_translations") or {},
        "headline_line_1_translations": article.get("headline_line_1_translations") or {},
        "headline_line_2_translations": article.get("headline_line_2_translations") or {},
        "ai_summary_translations": article.get("ai_summary_translations") or {},
    }


# =============================================================================
# Collection Management
# =============================================================================

def ensure_collection(client: typesense.Client, drop_existing: bool = False):
    """
    Create the articles collection if it doesn't exist.

    Args:
        client: Typesense client
        drop_existing: If True, delete and recreate the collection
    """
    if drop_existing:
        try:
            client.collections[COLLECTION_NAME].delete()
            print(f"[TYPESENSE] Deleted existing collection '{COLLECTION_NAME}'")
        except typesense.exceptions.ObjectNotFound:
            pass

    try:
        client.collections[COLLECTION_NAME].retrieve()
        print(f"[TYPESENSE] Collection '{COLLECTION_NAME}' already exists")
    except typesense.exceptions.ObjectNotFound:
        client.collections.create(COLLECTION_SCHEMA)
        print(f"[TYPESENSE] Created collection '{COLLECTION_NAME}'")


# =============================================================================
# Sync Functions
# =============================================================================

def fetch_all_published_articles() -> list:
    """
    Fetch all published articles from Supabase with their edition dates.

    Returns:
        List of (article_dict, edition_date) tuples
    """
    client = get_client()

    # Step 1: Get all editions to map article_id → edition_date
    print("[SYNC] Fetching editions...")
    editions_result = client.table("editions") \
        .select("edition_date, article_ids") \
        .order("edition_date", desc=True) \
        .execute()

    # Build article_id → edition_date map
    article_edition_map = {}
    for edition in (editions_result.data or []):
        ed_date = edition.get("edition_date", "")
        for aid in (edition.get("article_ids") or []):
            article_edition_map[str(aid)] = ed_date

    # Step 2: Fetch all published articles in batches
    print("[SYNC] Fetching articles...")
    all_articles = []
    batch_size = 1000
    offset = 0

    while True:
        result = client.table("all_articles") \
            .select("*") \
            .eq("status", "published") \
            .order("fetch_date", desc=True) \
            .range(offset, offset + batch_size - 1) \
            .execute()

        batch = result.data or []
        if not batch:
            break

        for article in batch:
            aid = str(article.get("id", ""))
            edition_date = article_edition_map.get(aid, "")
            all_articles.append((article, edition_date))

        if len(batch) < batch_size:
            break

        offset += batch_size

    print(f"[SYNC] Found {len(all_articles)} published articles")
    return all_articles


def full_reindex():
    """
    Full re-index: drop collection, recreate, and index all articles.

    This is the safest way to sync — ensures no stale documents.
    Takes ~10-30 seconds for a few thousand articles.
    """
    client = get_typesense_client()

    # Recreate collection
    ensure_collection(client, drop_existing=True)

    # Fetch all articles from Supabase
    articles_with_dates = fetch_all_published_articles()

    if not articles_with_dates:
        print("[SYNC] No articles to index")
        return {"indexed": 0, "errors": 0}

    # Transform to Typesense documents
    documents = []
    for article, edition_date in articles_with_dates:
        try:
            doc = article_to_typesense_doc(article, edition_date)
            documents.append(doc)
        except Exception as e:
            print(f"[SYNC] Error transforming article {article.get('id')}: {e}")

    # Bulk import
    print(f"[SYNC] Indexing {len(documents)} documents...")
    results = client.collections[COLLECTION_NAME].documents.import_(
        documents,
        {"action": "upsert"},
    )

    # Count successes and failures
    success_count = sum(1 for r in results if r.get("success", False))
    error_count = len(results) - success_count

    if error_count > 0:
        # Print first few errors for debugging
        errors = [r for r in results if not r.get("success", False)]
        for err in errors[:5]:
            print(f"[SYNC] Index error: {err}")

    print(f"[SYNC] Done: {success_count} indexed, {error_count} errors")
    return {"indexed": success_count, "errors": error_count}


def index_single_article(article: dict, edition_date: str = ""):
    """
    Index or update a single article in Typesense.

    Useful for webhook-triggered incremental updates.

    Args:
        article: Raw article dict from Supabase
        edition_date: Edition date string
    """
    client = get_typesense_client()
    doc = article_to_typesense_doc(article, edition_date)

    try:
        client.collections[COLLECTION_NAME].documents.upsert(doc)
        print(f"[TYPESENSE] Indexed article: {doc['id']}")
    except Exception as e:
        print(f"[TYPESENSE] Error indexing {doc['id']}: {e}")
        raise


def delete_single_article(article_id: str):
    """Remove a single article from the Typesense index."""
    client = get_typesense_client()

    try:
        client.collections[COLLECTION_NAME].documents[article_id].delete()
        print(f"[TYPESENSE] Deleted article: {article_id}")
    except typesense.exceptions.ObjectNotFound:
        pass  # Already gone
    except Exception as e:
        print(f"[TYPESENSE] Error deleting {article_id}: {e}")


def get_search_config() -> dict:
    """
    Return Typesense connection info for the frontend.

    Uses the SEARCH-ONLY key (safe to expose publicly).
    """
    return {
        "host": os.getenv("TYPESENSE_HOST", ""),
        "search_key": os.getenv("TYPESENSE_SEARCH_KEY", ""),
        "collection": COLLECTION_NAME,
    }


# =============================================================================
# CLI Entry Point
# =============================================================================

if __name__ == "__main__":
    print("=" * 60)
    print("ADUmedia — Typesense Full Re-index")
    print("=" * 60)

    result = full_reindex()

    print(f"\nResult: {result['indexed']} articles indexed, {result['errors']} errors")
