# 🤖 Medusa Store + Autonomous Sales Avatar Setup Guide

**Complete integration guide for the Sweet Psilocybe Medusa backend with AI-powered sales avatar**

---

## 📋 Overview

This implementation adds:

1. **Medusa Backend** - E-commerce backend at `/backend/medusa`
2. **Blog Module** - Content management for educational articles
3. **AI Sales Avatar** - Autonomous chat-based sales assistant
4. **Avatar API** - Endpoints for avatar communication
5. **Scheduled Outbound** - Respectful automated campaigns

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Frontend (Port 3000)              │
│  ┌────────────────────┐  ┌─────────────────────────────┐   │
│  │ AvatarChat Widget  │  │  Blog Display Components    │   │
│  │ (FloatingButton)   │  │  (to be implemented)        │   │
│  └────────┬───────────┘  └───────────┬─────────────────┘   │
│           │                           │                      │
│           │ POST /api/store/ai/chat   │ GET /api/store/blog │
└───────────┼───────────────────────────┼──────────────────────┘
            │                           │
            ↓                           ↓
┌─────────────────────────────────────────────────────────────┐
│              Medusa Backend (Port 9000)                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Blog Module                                           │ │
│  │  - BlogPost & BlogTag entities                         │ │
│  │  - Storefront routes: /store/blog/posts               │ │
│  │  - Admin routes: /admin/blog/posts                    │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Avatar API                                            │ │
│  │  - POST /store/ai/chat (storefront chat)              │ │
│  │  - CrewGatewayService (avatar communication)          │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Scheduled Jobs                                        │ │
│  │  - ai-sales-daily-outbound (cron job)                 │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────┬───────────────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────────────────┐
│         Avatar Engine / CrewAI (Port 8080)                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Tools:                                                │ │
│  │  - tool_get_products                                   │ │
│  │  - tool_manage_cart                                    │ │
│  │  - tool_get_customer_and_orders                        │ │
│  │  - tool_blog_read                                      │ │
│  │  - tool_blog_write                                     │ │
│  │  - tool_avatar_channel                                 │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- Redis server running (for Medusa event bus and cache)
- (Optional) Avatar engine / CrewAI service

### Step 1: Install Medusa Backend Dependencies

```bash
cd backend/medusa
npm install
```

### Step 2: Configure Database

Create a PostgreSQL database:

```bash
# Using psql
createdb medusa-store

# Or with Docker
docker run -d \
  --name medusa-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=medusa-store \
  -p 5432:5432 \
  postgres:14
```

### Step 3: Configure Environment Variables

Copy `.env.example` to `.env` in `/backend/medusa`:

```bash
cd backend/medusa
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa-store
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_random_secret_here
COOKIE_SECRET=your_random_cookie_secret
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:7000,http://localhost:7001
CREW_GATEWAY_URL=http://localhost:8080
AVATAR_ENGINE_API_KEY=your_avatar_api_key
```

### Step 4: Run Migrations

```bash
cd backend/medusa
npm run migrate
```

This creates the Medusa tables plus custom `blog_post` and `blog_tag` tables.

### Step 5: Start Medusa Backend

```bash
cd backend/medusa
npm run dev
```

Medusa will start on `http://localhost:9000`

Admin dashboard: `http://localhost:7000/app`

### Step 6: Configure Next.js Frontend

In the main project directory, update `.env.local`:

```env
MEDUSA_BACKEND_URL=http://localhost:9000
CREW_GATEWAY_URL=http://localhost:8080
AVATAR_ENGINE_API_KEY=your_avatar_api_key
```

### Step 7: Start Next.js Frontend

```bash
npm run dev
```

Next.js will start on `http://localhost:3000`

### Step 8: Test Avatar Chat

1. Visit `http://localhost:3000`
2. Look for the floating mushroom button 🍄 in the bottom-right
3. Click to open the avatar chat
4. Test a message (will show fallback if avatar engine not running)

---

## 📦 What's Included

### Backend Files Created

```
backend/medusa/
├── package.json                      # Medusa dependencies
├── medusa-config.js                  # Medusa configuration
├── tsconfig.json                     # TypeScript config
├── .env.example                      # Environment template
└── src/
    ├── models/
    │   ├── blog-post.ts             # BlogPost entity
    │   └── blog-tag.ts              # BlogTag entity
    ├── repositories/
    │   ├── blog-post.ts             # BlogPost repository
    │   └── blog-tag.ts              # BlogTag repository
    ├── services/
    │   ├── blog.ts                  # Blog service (CRUD)
    │   └── crew-gateway.ts          # Avatar communication service
    ├── api/
    │   ├── store/
    │   │   ├── blog/
    │   │   │   ├── posts/route.ts   # GET /store/blog/posts
    │   │   │   ├── posts/[slug]/route.ts
    │   │   │   └── tags/route.ts
    │   │   └── ai/
    │   │       └── chat/route.ts    # POST /store/ai/chat
    │   └── admin/
    │       └── blog/
    │           └── posts/
    │               ├── route.ts     # GET/POST /admin/blog/posts
    │               └── [id]/route.ts # GET/PATCH/DELETE
    ├── jobs/
    │   └── ai-sales-daily-outbound.ts # Scheduled outbound job
    └── loaders/
        └── jobs.ts                  # Jobs loader
```

### Frontend Files Created

```
src/
├── app/
│   └── api/
│       └── store/
│           ├── ai/
│           │   └── chat/route.ts    # Proxy to Medusa
│           └── blog/route.ts        # Proxy to Medusa
└── components/
    └── UI/
        └── AvatarChat/
            ├── index.tsx            # Chat widget component
            └── FloatingChatButton.tsx # Floating button
```

---

## 🎨 Brand Styling

The avatar chat widget uses Sweet Psilocybe brand colors:

- **Petal (Pink)**: `#F6AFCF` - Primary brand color
- **Fern (Green)**: `#A9C0B0` - Secondary/accent color
- **Ink (Black)**: `#0B0B0B` - Text and dark elements
- **Cream**: `#F7F3EF` - Background and light elements
- **Spore (Soft Pink)**: `#FFEDEE` - Subtle accents

The chat interface matches the existing landing page design with:
- Rounded corners and soft shadows
- Gradient header (petal → fern)
- Smooth animations and transitions
- Mobile-responsive design

---

## 🔌 Avatar Engine Integration

### Option 1: Mock Avatar (for testing)

If you don't have a CrewAI/avatar engine running, the system gracefully falls back to a built-in error message. To test without an avatar engine:

1. Start only Medusa and Next.js
2. Open chat widget
3. Send a message
4. You'll see: "I apologize, but I'm having trouble connecting right now..."

### Option 2: Integrate with CrewAI

To integrate with a real avatar engine:

1. **Deploy CrewAI service** with the tools defined in the spec:
   - `tool_get_products`
   - `tool_manage_cart`
   - `tool_get_customer_and_orders`
   - `tool_blog_read`
   - `tool_blog_write`
   - `tool_lead_source_query`
   - `tool_send_message`
   - `tool_avatar_channel`

2. **Configure endpoint** in `.env`:
   ```env
   CREW_GATEWAY_URL=https://your-crew-gateway.com
   AVATAR_ENGINE_API_KEY=your_secret_key
   ```

3. **Avatar engine should expect** POST requests to:
   - `/crews/medusa-store-avatar/storefront_chat`
   - `/crews/medusa-store-avatar/daily_outbound`

4. **Request format** (storefront_chat):
   ```json
   {
     "conversation_id": "conv_123...",
     "message": "I'm looking for psilocybin research resources",
     "avatar_id": "sweet-psilocybe-avatar",
     "customer": { "locale": "en-US" },
     "cart_id": null,
     "client_view": {
       "page": "landing",
       "url": "https://...",
       "device": "desktop"
     },
     "context": {
       "tools_available": [...],
       "store_info": { ... },
       "customer": { ... },
       "cart": { ... }
     }
   }
   ```

5. **Expected response**:
   ```json
   {
     "conversation_id": "conv_123...",
     "avatar_reply": {
       "reply_text": "I'd be happy to help you...",
       "emotion": "happy",
       "animation_key": null,
       "speech_hint": "normal"
     },
     "cart_delta": {
       "action": "none"
     },
     "suggested_actions": []
   }
   ```

---

## 📝 Blog Module Usage

### Admin: Create a Blog Post

```bash
curl -X POST http://localhost:9000/admin/blog/posts \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "psilocybin-101",
    "title": "Psilocybin 101: Understanding the Basics",
    "excerpt": "A beginner-friendly guide to psilocybin research",
    "body_markdown": "# Psilocybin 101\n\nPsilocybin is...",
    "status": "published",
    "tag_slugs": ["education", "research"],
    "seo_title": "Psilocybin 101 - Complete Beginner Guide",
    "seo_description": "Learn the basics of psilocybin..."
  }'
```

### Storefront: List Published Posts

```bash
curl http://localhost:9000/store/blog/posts?limit=10
```

### Storefront: Get Single Post

```bash
curl http://localhost:9000/store/blog/posts/psilocybin-101
```

---

## ⏰ Scheduled Jobs

### Daily Outbound Campaign

The `ai-sales-daily-outbound` job runs daily at 10:00 AM to:

1. Query opt-in lead segments (abandoned carts, repeat buyers, etc.)
2. Draft personalized messages
3. Send respectful outreach with frequency caps
4. Log results

**Configure schedule** in `.env`:

```env
AI_OUTBOUND_SCHEDULE="0 10 * * *"  # Daily at 10 AM
ENABLE_SCHEDULED_JOBS=true          # Enable in production
```

**Cron format**: `minute hour day month weekday`

Examples:
- `"0 10 * * *"` - Daily at 10:00 AM
- `"0 9,17 * * *"` - Twice daily at 9 AM and 5 PM
- `"0 10 * * 1"` - Every Monday at 10 AM

---

## 🧪 Testing

### Test Blog API

```bash
# Create a test post
curl -X POST http://localhost:9000/admin/blog/posts \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "test-post",
    "title": "Test Post",
    "body_markdown": "# Test\n\nThis is a test."
  }'

# List posts
curl http://localhost:9000/store/blog/posts

# Get specific post
curl http://localhost:9000/store/blog/posts/test-post
```

### Test Avatar Chat

```bash
curl -X POST http://localhost:3000/api/store/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_id": null,
    "message": "Tell me about your products",
    "avatar_id": "sweet-psilocybe-avatar"
  }'
```

---

## 🔧 Troubleshooting

### Medusa won't start

**Problem**: Database connection error  
**Solution**: Check PostgreSQL is running and DATABASE_URL is correct

**Problem**: Redis connection error  
**Solution**: Check Redis is running on port 6379

### Avatar chat not working

**Problem**: "Failed to communicate with avatar service"  
**Solution**: This is expected if avatar engine isn't running. Check:
- MEDUSA_BACKEND_URL is correct in Next.js `.env.local`
- Medusa backend is running on port 9000
- (Optional) Avatar engine is running and accessible

### Blog posts not appearing

**Problem**: No posts returned from API  
**Solution**: 
- Check posts have `status: "published"`
- Verify migrations ran successfully
- Check database has `blog_post` and `blog_tag` tables

### Scheduled jobs not running

**Problem**: Daily outbound not executing  
**Solution**:
- Check `ENABLE_SCHEDULED_JOBS=true` in `.env`
- Verify cron expression is valid
- Check Medusa logs for job registration

---

## 📚 API Reference

### Storefront Endpoints

#### Blog

- `GET /store/blog/posts` - List published posts
  - Query: `q`, `tag`, `limit`, `offset`
- `GET /store/blog/posts/:slug` - Get single post
- `GET /store/blog/tags` - List all tags

#### Avatar

- `POST /store/ai/chat` - Chat with avatar
  - Body: `{ conversation_id, message, avatar_id, customer, cart_id, client_view }`

### Admin Endpoints

#### Blog

- `GET /admin/blog/posts` - List all posts (any status)
  - Query: `status`, `q`, `tag`, `limit`, `offset`
- `POST /admin/blog/posts` - Create post
- `GET /admin/blog/posts/:id` - Get post by ID
- `PATCH /admin/blog/posts/:id` - Update post
- `DELETE /admin/blog/posts/:id` - Delete post

---

## 🚢 Deployment

### Production Checklist

Backend (Medusa):
- [ ] Set production DATABASE_URL
- [ ] Set production REDIS_URL
- [ ] Generate secure JWT_SECRET and COOKIE_SECRET
- [ ] Configure STORE_CORS with production domain
- [ ] Set CREW_GATEWAY_URL to production avatar engine
- [ ] Enable scheduled jobs: `ENABLE_SCHEDULED_JOBS=true`
- [ ] Run migrations: `npm run migrate`
- [ ] Build: `npm run build`
- [ ] Start: `npm start`

Frontend (Next.js):
- [ ] Set MEDUSA_BACKEND_URL to production Medusa URL
- [ ] Update CREW_GATEWAY_URL if needed
- [ ] Build: `npm run build`
- [ ] Deploy to Vercel

Avatar Engine:
- [ ] Deploy CrewAI service with required tools
- [ ] Configure API key authentication
- [ ] Set up monitoring and logging

### Recommended Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Vercel (Next.js Frontend)                                   │
│  - https://sweetpsilocybe.com                                │
└────────────┬────────────────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────────────────┐
│  Railway / Render (Medusa Backend)                           │
│  - https://api.sweetpsilocybe.com                            │
└────────────┬────────────────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────────────────┐
│  Modal / Replicate (Avatar Engine)                           │
│  - https://avatar.sweetpsilocybe.com                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Next Steps

1. **Add Avatar Engine**: Deploy CrewAI service with the defined tools
2. **Seed Blog Posts**: Create initial educational content
3. **Test Full Flow**: User chat → product recommendation → cart → checkout
4. **Customize Copy**: Update avatar welcome message and personality
5. **Add Analytics**: Track chat interactions and conversions
6. **Create Blog UI**: Build frontend components to display blog posts
7. **Test Outbound**: Verify scheduled campaigns work correctly

---

## 🆘 Support

- **Medusa Docs**: https://docs.medusajs.com
- **CrewAI Docs**: https://docs.crewai.com
- **Next.js Docs**: https://nextjs.org/docs

---

**Built with:** Medusa • Next.js • CrewAI • TypeScript  
**Last Updated:** December 2024
