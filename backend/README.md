# Sweet Psilocybe Backend

This directory contains the Medusa e-commerce backend with blog module and autonomous sales avatar integration.

## Directory Structure

```
backend/
└── medusa/                    # Medusa backend application
    ├── src/
    │   ├── models/           # Data models (BlogPost, BlogTag)
    │   ├── repositories/     # Database repositories
    │   ├── services/         # Business logic (blog, crew-gateway)
    │   ├── api/              # HTTP endpoints
    │   │   ├── store/        # Storefront API (public)
    │   │   └── admin/        # Admin API (authenticated)
    │   ├── jobs/             # Scheduled jobs
    │   └── loaders/          # Custom loaders
    ├── data/                 # Seed data
    ├── package.json          # Dependencies
    ├── medusa-config.js      # Medusa configuration
    └── tsconfig.json         # TypeScript config
```

## Quick Start

See [MEDUSA-AVATAR-SETUP.md](../MEDUSA-AVATAR-SETUP.md) in the root directory for complete setup instructions.

### Prerequisites

- Node.js 18+
- PostgreSQL
- Redis

### Install & Run

```bash
cd backend/medusa
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
npm run dev
```

Medusa will start on http://localhost:9000

## Key Features

### Blog Module
- **Models**: BlogPost, BlogTag
- **Storefront API**: GET /store/blog/posts, GET /store/blog/posts/:slug, GET /store/blog/tags
- **Admin API**: Full CRUD for blog posts

### Avatar Integration
- **Endpoint**: POST /store/ai/chat
- **Service**: CrewGatewayService for avatar communication
- **Tools**: Integrates with product catalog, cart, customer data, and blog

### Scheduled Jobs
- **ai-sales-daily-outbound**: Daily campaign job (10:00 AM by default)
- Configurable via AI_OUTBOUND_SCHEDULE env var

## Development

```bash
# Development with auto-reload
npm run dev

# Build TypeScript
npm run build

# Run in production
npm start

# Run migrations
npm run migrate
```

## Environment Variables

See `.env.example` for all required configuration.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - Secret for JWT tokens
- `COOKIE_SECRET` - Secret for cookies
- `CREW_GATEWAY_URL` - Avatar engine URL
- `AVATAR_ENGINE_API_KEY` - Avatar API key

## API Documentation

Full API documentation available in [MEDUSA-AVATAR-SETUP.md](../MEDUSA-AVATAR-SETUP.md#-api-reference).

## Deployment

The Medusa backend can be deployed separately from the Next.js frontend.

Recommended platforms:
- Railway
- Render
- DigitalOcean App Platform
- Self-hosted with Docker

See deployment section in setup guide for details.

---

**Last Updated**: December 2024
