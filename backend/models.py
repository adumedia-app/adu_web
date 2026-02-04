
Copy

# backend/models.py
"""
Pydantic Models for ADUmedia Website API

Request and response models for the API endpoints.
"""

from datetime import date, datetime
from typing import Optional, List
from pydantic import BaseModel, Field


# =============================================================================
# Authentication
# =============================================================================

class LoginRequest(BaseModel):
    """Admin login request."""
    password: str = Field(..., min_length=1)


class LoginResponse(BaseModel):
    """Admin login response."""
    access_token: str
    token_type: str = "bearer"
    expires_in: int  # seconds


class UserInfo(BaseModel):
    """Current user info."""
    role: str = "admin"
    authenticated_at: datetime


# =============================================================================
# Articles
# =============================================================================

class ArticleBase(BaseModel):
    """Base article fields."""
    id: str
    title: str
    source_id: str
    source_name: str
    url: str
    published_date: Optional[str] = None
    ai_summary: Optional[str] = None
    image_url: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    headline_translations: dict = Field(default_factory=dict)
    ai_summary_translations: dict = Field(default_factory=dict)


class ArticleDetail(ArticleBase):
    """Full article details."""
    status: str
    fetch_date: str
    project_id: Optional[str] = None
    project_name: Optional[str] = None
    architect: Optional[str] = None
    location: Optional[str] = None
    category: Optional[str] = None
    editor_notes: Optional[str] = None


class ArticleUpdate(BaseModel):
    """Article update request."""
    ai_summary: Optional[str] = None
    editor_notes: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None


# =============================================================================
# Editions
# =============================================================================

class EditionBase(BaseModel):
    """Base edition fields."""
    id: str
    edition_type: str  # daily, weekend, weekly
    edition_date: str  # "2026-01-30"
    article_count: int


class EditionSummary(EditionBase):
    """Edition summary for lists."""
    date_formatted: str  # "30 January 2026"
    day_of_week: str  # "Thursday"


class EditionDetail(EditionBase):
    """Full edition details with articles."""
    articles: List[ArticleBase]
    date_formatted: str
    day_of_week: str
    edition_summary: Optional[str] = None
    created_at: Optional[str] = None


class EditionUpdate(BaseModel):
    """Edition update request."""
    edition_summary: Optional[str] = None
    article_ids: Optional[List[str]] = None


# =============================================================================
# API Responses
# =============================================================================

class PaginatedResponse(BaseModel):
    """Generic paginated response."""
    data: List
    total: int
    limit: int
    offset: int
    has_more: bool


class EditionsResponse(BaseModel):
    """List of editions."""
    editions: List[EditionSummary]
    total: int
    has_more: bool


class StatsResponse(BaseModel):
    """Admin dashboard statistics."""
    total_editions: int
    total_articles_published: int
    total_projects: int
    recent_editions: List[EditionSummary]


# =============================================================================
# Webhook
# =============================================================================

class WebhookPayload(BaseModel):
    """Generic webhook payload from Supabase."""
    type: str  # INSERT, UPDATE, DELETE
    table: str
    record: Optional[dict] = None
    old_record: Optional[dict] = None
    schema_name: str = "public"


# =============================================================================
# Errors
# =============================================================================

class ErrorResponse(BaseModel):
    """Error response."""
    detail: str
    code: Optional[str] = None