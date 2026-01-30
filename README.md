# ADUmedia Website

Architecture news digest website with automatic content publishing.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADUmedia System                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  adu_rss (21:45) ──┐                                                │
│                    ├──→ R2 + Supabase ──→ adu_telegram (22:00)      │
│  adu_scrapers ─────┘                            │                    │
│                                                 │                    │
│                                                 ▼                    │
│                                          adu_website                 │
│                                   (reads from Supabase)              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
adu_website/
├── backend/                    # Python FastAPI backend
│   ├── main.py                # Application entry point
│   ├── config.py              # Environment configuration
│   ├── database.py            # Supabase client
│   ├── auth.py                # JWT authentication
│   ├── models.py              # Pydantic models
│   └── routes/
│       ├── public.py          # Public API endpoints
│       ├── admin.py           # Admin API endpoints
│       └── webhook.py         # Supabase webhooks
│
├── frontend/                   # React TypeScript frontend
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # React Query hooks
│   │   └── lib/               # Utilities
│   ├── package.json
│   └── vite.config.ts
│
├── Dockerfile                  # Multi-stage build
├── railway.json               # Railway deployment config
└── .env.example               # Environment template
```

## API Endpoints

### Public API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/editions` | List editions (paginated) |
| GET | `/api/editions/today` | Today's or latest digest |
| GET | `/api/editions/latest` | Most recent digest |
| GET | `/api/editions/{date}` | Specific date (YYYY-MM-DD) |
| GET | `/api/articles/{id}` | Single article |
| GET | `/api/sitemap.xml` | SEO sitemap |
| GET | `/api/robots.txt` | Search engine rules |
| GET | `/api/health` | Health check |

### Admin API (JWT Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Get access token |
| GET | `/api/admin/me` | Verify token |
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/editions` | List editions |
| GET | `/api/admin/editions/{id}` | Edition details |
| PATCH | `/api/admin/editions/{id}` | Update edition |
| DELETE | `/api/admin/editions/{id}/articles/{aid}` | Remove article |
| GET | `/api/admin/articles?q=search` | Search articles |
| GET | `/api/admin/articles/{id}` | Article details |
| PATCH | `/api/admin/articles/{id}` | Update article |
| DELETE | `/api/admin/articles/{id}` | Delete article |

### Webhooks

| Endpoint | Trigger |
|----------|---------|
| `/api/webhook/edition-published` | Supabase INSERT on editions |
| `/api/webhook/article-updated` | Supabase UPDATE on all_articles |

---

## Deployment to Railway

### Step 1: Create Repository

1. Create a new GitHub repo: `adu_website`
2. Clone and add all files from this package
3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - ADUmedia website"
git remote add origin https://github.com/latvis980/adu_website.git
git push -u origin main
```

### Step 2: Create Railway Service

1. Go to your Railway project dashboard
2. Click **"+ New"** → **"GitHub Repo"**
3. Select `latvis980/adu_website`
4. Railway will auto-detect the Dockerfile

### Step 3: Configure Environment Variables

In Railway, go to **Variables** tab and add:

**Required:**
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
R2_PUBLIC_URL=https://your-bucket.r2.dev
ADMIN_PASSWORD=your-secure-admin-password
JWT_SECRET=your-32-char-random-string
```

**Optional:**
```
DEBUG=false
SITE_URL=https://adu.media
WEBHOOK_SECRET=your-webhook-secret
```

**Generate JWT_SECRET:**
```bash
openssl rand -hex 32
```

### Step 4: Deploy

Railway will automatically:
1. Build the frontend (Node.js)
2. Build the backend (Python)
3. Combine them into one container
4. Deploy and expose on port 8080

### Step 5: Configure Custom Domain (Optional)

1. In Railway, go to **Settings** → **Networking**
2. Add custom domain: `adu.media`
3. Add DNS records at your registrar:
   - CNAME: `@` → `your-app.railway.app`
   - CNAME: `www` → `your-app.railway.app`

---

## Local Development

### Backend Only

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env from .env.example
cp ../.env.example .env
# Edit .env with your credentials

python main.py
```

Backend runs at: http://localhost:8080

### Frontend Only

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

### Full Stack

```bash
# Terminal 1: Backend
cd backend && python main.py

# Terminal 2: Frontend
cd frontend && npm run dev
```

---

## Supabase Webhook Setup (Optional)

To receive notifications when new editions are published:

1. Go to Supabase Dashboard → **Database** → **Webhooks**
2. Create new webhook:
   - Name: `edition-published`
   - Table: `editions`
   - Events: `INSERT`
   - URL: `https://your-app.railway.app/api/webhook/edition-published`
   - Headers: `x-webhook-secret: your-webhook-secret`

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SUPABASE_URL` | Yes | - | Supabase project URL |
| `SUPABASE_KEY` | Yes | - | Supabase anon key |
| `R2_PUBLIC_URL` | Yes | - | R2 public bucket URL |
| `ADMIN_PASSWORD` | Yes | - | Admin login password |
| `JWT_SECRET` | Yes | - | JWT signing secret |
| `PORT` | No | 8080 | Server port |
| `DEBUG` | No | false | Enable API docs |
| `SITE_URL` | No | https://adu.media | Public URL |
| `WEBHOOK_SECRET` | No | - | Webhook auth |
| `CORS_ORIGINS` | No | - | Extra CORS origins |

---

## Troubleshooting

### Build Fails

**"npm: command not found"**
- The Dockerfile uses multi-stage build with Node.js stage first

**"Module not found"**
- Check that all Python files have proper imports
- Verify requirements.txt has all dependencies

### Runtime Issues

**Database connection failed**
- Verify SUPABASE_URL and SUPABASE_KEY are correct
- Check Supabase dashboard for connection issues

**Images not loading**
- Verify R2_PUBLIC_URL is the public bucket URL
- Check R2 bucket CORS settings

**Admin login fails**
- Verify ADMIN_PASSWORD is set correctly
- Check JWT_SECRET is configured

### Logs

View Railway logs:
```bash
railway logs
```

Or in Railway dashboard: **Deployments** → **View Logs**

---

## License

MIT
