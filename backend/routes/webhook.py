# backend/routes/webhook.py
"""
Webhook Routes for ADUmedia Website

Handles webhooks from Supabase database triggers.
"""

from fastapi import APIRouter, HTTPException, Header
from typing import Optional

from ..auth import verify_webhook_secret
from ..models import WebhookPayload


router = APIRouter(prefix="/api/webhook", tags=["webhook"])


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
    Can trigger notifications, cache invalidation, etc.
    """
    if not verify_webhook_secret(x_webhook_secret or ""):
        raise HTTPException(status_code=401, detail="Invalid webhook secret")
    
    if payload.type != "INSERT" or payload.table != "editions":
        return {"status": "ignored", "reason": "Not an edition insert"}
    
    record = payload.record or {}
    edition_date = record.get("edition_date", "")
    edition_type = record.get("edition_type", "")
    article_count = record.get("articles_selected", 0)
    
    print(f"[WEBHOOK] New {edition_type} edition published: {edition_date} ({article_count} articles)")
    
    # Future: Send notifications, invalidate cache, etc.
    
    return {
        "status": "processed",
        "edition_date": edition_date,
        "edition_type": edition_type,
    }


@router.post("/article-updated")
async def article_updated(
    payload: WebhookPayload,
    x_webhook_secret: Optional[str] = Header(None),
):
    """
    Handle article update webhook.
    
    Called by Supabase when an article is updated.
    """
    if not verify_webhook_secret(x_webhook_secret or ""):
        raise HTTPException(status_code=401, detail="Invalid webhook secret")
    
    if payload.table != "all_articles":
        return {"status": "ignored", "reason": "Not an article update"}
    
    record = payload.record or {}
    article_id = record.get("id", "")
    status = record.get("status", "")
    
    print(f"[WEBHOOK] Article updated: {article_id} -> {status}")
    
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
