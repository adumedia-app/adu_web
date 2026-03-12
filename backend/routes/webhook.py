# backend/routes/webhook.py
"""
Webhook Routes for ADUmedia Website
Handles webhooks from Supabase database triggers.
"""

import asyncio
from fastapi import APIRouter, HTTPException, Header
from typing import Optional

from auth import verify_webhook_secret
from models import WebhookPayload
from database import get_client
from typesense_sync import index_single_article, delete_single_article


router = APIRouter(prefix="/api/webhook", tags=["webhook"])


# =============================================================================
# Helpers
# =============================================================================

def _get_edition_date_for_article(article_id: str) -> str:
    """Find the edition_date for an article by looking it up in the editions table."""
    try:
        client = get_client()
        result = client.table("editions") \
            .select("edition_date") \
            .contains("article_ids", [article_id]) \
            .order("edition_date", desc=True) \
            .limit(1) \
            .execute()
        if result.data:
            return result.data[0].get("edition_date", "")
    except Exception as e:
        print(f"[WEBHOOK] Could not find edition_date for article {article_id}: {e}")
    return ""


def _sync_edition_articles(edition_date: str, article_ids: list):
    """Fetch articles for an edition and index them into Typesense."""
    if not article_ids:
        return
    try:
        client = get_client()
        result = client.table("all_articles") \
            .select("*") \
            .in_("id", article_ids) \
            .execute()

        articles = result.data or []
        indexed = 0
        for article in articles:
            try:
                index_single_article(article, edition_date)
                indexed += 1
            except Exception as e:
                print(f"[WEBHOOK] Failed to index article {article.get('id')}: {e}")

        print(f"[WEBHOOK] Synced {indexed}/{len(article_ids)} articles for edition {edition_date}")
    except Exception as e:
        print(f"[WEBHOOK] Error syncing edition {edition_date}: {e}")


# =============================================================================
# Webhooks
# =============================================================================

@router.post("/edition-published")
async def edition_published(
    payload: WebhookPayload,
    x_webhook_secret: Optional[str] = Header(None),
):
    """
    Handle new edition published webhook.

    Called by Supabase when a new edition is inserted.
    Automatically syncs the edition's articles into Typesense search index.
    """
    if not verify_webhook_secret(x_webhook_secret or ""):
        raise HTTPException(status_code=401, detail="Invalid webhook secret")

    if payload.type != "INSERT" or payload.table != "editions":
        return {"status": "ignored", "reason": "Not an edition insert"}

    record = payload.record or {}
    edition_date = record.get("edition_date", "")
    edition_type = record.get("edition_type", "")
    article_ids = record.get("article_ids") or []
    article_count = record.get("articles_selected", 0)

    print(f"[WEBHOOK] New {edition_type} edition published: {edition_date} ({article_count} articles)")

    # Sync articles to Typesense in background (don't block the webhook response)
    if edition_date and article_ids:
        loop = asyncio.get_event_loop()
        loop.run_in_executor(None, _sync_edition_articles, edition_date, article_ids)
        print(f"[WEBHOOK] Typesense sync queued for {len(article_ids)} articles")

    return {
        "status": "processed",
        "edition_date": edition_date,
        "edition_type": edition_type,
        "articles_queued_for_indexing": len(article_ids),
    }


@router.post("/article-updated")
async def article_updated(
    payload: WebhookPayload,
    x_webhook_secret: Optional[str] = Header(None),
):
    """
    Handle article update webhook.

    Called by Supabase when an article is updated.
    Keeps Typesense in sync when articles are edited in the admin dashboard.
    """
    if not verify_webhook_secret(x_webhook_secret or ""):
        raise HTTPException(status_code=401, detail="Invalid webhook secret")

    if payload.table != "all_articles":
        return {"status": "ignored", "reason": "Not an article update"}

    record = payload.record or {}
    article_id = str(record.get("id", ""))
    status = record.get("status", "")

    print(f"[WEBHOOK] Article updated: {article_id} -> {status}")

    # Re-index if published, remove from index if archived/filtered
    if status == "published" and article_id:
        edition_date = _get_edition_date_for_article(article_id)
        try:
            index_single_article(record, edition_date)
            print(f"[WEBHOOK] Re-indexed article {article_id}")
        except Exception as e:
            print(f"[WEBHOOK] Failed to re-index article {article_id}: {e}")

    elif status in ("archived", "filtered_out") and article_id:
        try:
            delete_single_article(article_id)
            print(f"[WEBHOOK] Removed article {article_id} from index")
        except Exception as e:
            print(f"[WEBHOOK] Failed to remove article {article_id}: {e}")

    return {
        "status": "processed",
        "article_id": article_id,
    }


# =============================================================================
# Health Check for Webhooks
# =============================================================================

@router.get("/health")
async def webhook_health():
    """Health check for webhook endpoint."""
    return {"status": "ok", "service": "webhook"}