# 🏗️ ARCHITECTURE - Sweet Psilocybe Landing Page

**Last Updated**: November 8, 2025  
**Version**: 2.0 (Post-97/100 Upgrade)

---

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Age Gate   │→ │ Home Page    │→ │ Email Capture    │   │
│  └────────────┘  └──────────────┘  └──────────────────┘   │
└────────────┬────────────────────────────────────────────────┘
             │
             ↓ HTTPS + Security Headers
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Next.js Middleware (Rate Limiting)        │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────┬────────────────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────────────────┐
│                  Next.js 16 App Router                       │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │ Static Pages │  │ API Routes   │  │ Server Actions  │  │
│  │ (SSG)        │  │ (Dynamic)    │  │ (Age Verify)    │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└────────────┬────────────────────────────────────────────────┘
             │
             ↓ (Optional)
┌─────────────────────────────────────────────────────────────┐
│                    Supabase PostgreSQL                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         email_signups table (email, list, timestamp)   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Decisions

### Framework: Next.js 16 (App Router)

**Why Next.js?**
- Server-side rendering for SEO and age gate
- Static site generation for performance
- API routes for backend logic
- Built-in optimization (images, fonts, scripts)
- Vercel deployment integration

**Why App Router over Pages Router?**
- Modern React patterns (Server Components)
- Better data fetching with async/await
- Improved routing with file-system conventions
- Native support for layouts and error boundaries
- Future-proof (Pages Router is legacy)

**Version 16 Specific Features Used**:
- Enhanced middleware (rate limiting)
- Improved type safety
- Better build performance
- Turbopack in development

### Styling: Dual System (Transitioning)

**Current State**:
- **Styled-Components 6.x**: Existing UI components
- **Tailwind CSS 3.x**: New components (404, loading)

**Rationale**:
- Styled-Components chosen in Raft original
- React 19 + SSR issues with Styled-Components
- Tailwind for new components to avoid SSR complexity
- Gradual migration path to full Tailwind

**Future Direction**:
- Migrate all components to Tailwind
- Remove styled-components dependency
- Reduce bundle size (~50KB savings)
- Simplify build process

### State Management: React Hooks + Local State

**Why No Redux/Zustand?**
- No complex global state requirements
- Form state handled by React Hook Form
- Server state minimal (age verification, email signup)
- Prop drilling not a problem with component depth

**State Patterns**:
- Local component state with `useState`
- Form state with React Hook Form
- Server state with async/await in API routes
- URL state with Next.js router

### Database: Supabase (Optional)

**Why Supabase?**
- PostgreSQL with real-time subscriptions
- Built-in auth (future expansion)
- Row-level security
- Free tier sufficient for landing page
- REST and GraphQL APIs

**Demo Mode Design**:
- Works without database configured
- Graceful degradation
- Console logging for development
- Easy transition to production

**Schema**:
```sql
CREATE TABLE email_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  list TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);
```

### Forms: React Hook Form + Zod

**Why React Hook Form?**
- Minimal re-renders
- Built-in validation
- TypeScript support
- Small bundle size (8.5KB)

**Why Zod?**
- Runtime type validation
- Schema-based validation
- TypeScript inference
- Composable schemas

**Pattern**:
```typescript
const schema = z.object({
  email: z.string().email('Invalid email'),
});
type FormData = z.infer<typeof schema>;
const { register, handleSubmit } = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

---

## Security Architecture

### Defense in Depth

**Layer 1: Network (Vercel Edge)**
- DDoS protection
- SSL/TLS termination
- CDN caching

**Layer 2: Middleware (Rate Limiting)**
- 30 requests/minute per IP (general)
- 10 requests/minute per IP (API routes)
- Automatic cleanup of expired entries
- In-memory store (sufficient for single-instance)

**Layer 3: HTTP Headers**
```javascript
{
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-analytics.com; ...",
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}
```

**Layer 4: Application (Age Gate)**
- Server-side verification
- HTTP-only cookies (not accessible via JavaScript)
- 30-day expiration
- Birth date validation (18+ requirement)

**Layer 5: Input Validation**
- Zod schema validation
- Email format validation
- Sanitization of user inputs
- SQL injection prevention (Supabase parameterized queries)

### Age Verification Flow

```
User visits site
     ↓
Check cookie: age_verified
     ↓
┌────NO────┐            ┌────YES───┐
│ Show     │            │ Grant    │
│ Age Gate │            │ Access   │
└────┬─────┘            └──────────┘
     │
User enters birthdate
     ↓
POST /api/age-verify
     ↓
Calculate age
     ↓
┌──<18?──┐
│        │
YES     NO
│        │
403    Set HTTP-only cookie
│      age_verified=true
│      maxAge=30 days
│           ↓
│      Grant access
└───────────┘
```

---

## Data Flow

### Email Signup Flow

```
User fills form
     ↓
Client-side validation (Zod)
     ↓
┌──Valid?──┐
│          │
NO        YES
│          │
Show      Submit to
error     Supabase client
│          ↓
│     Check if configured
│          ↓
│     ┌────Configured?────┐
│     │                   │
│    YES                 NO
│     │                   │
│     │              Demo mode
│     │              (console.log)
│     ↓                   │
│  Insert into            │
│  email_signups          │
│     ↓                   │
│  ┌─Success?──┐          │
│  │           │          │
│ YES         NO          │
│  │           │          │
│  │      Check error     │
│  │      code 23505      │
│  │      (duplicate)     │
│  │           ↓          │
│  │      Show error      │
│  │           │          │
└──┴───────────┴──────────┘
       ↓
Show success message
```

---

## Component Architecture

### Component Hierarchy

```
RootLayout (src/app/layout.tsx)
├── GlobalStyles
├── StyledComponentsRegistry
├── Analytics (Vercel)
├── WebVitals
└── Layout (src/components/Layout/index.tsx)
    ├── AgeGate
    ├── Preloader
    ├── Header
    ├── [Page Content]
    └── Footer

HomePage (src/app/(home)/page.tsx)
├── HeroSection
├── BrandStrip
├── IntroText
├── ProductShowcase
├── FAQ
└── EmailCapture
```

### Component Patterns

**1. Container/Presenter Pattern**
```typescript
// Container (index.tsx)
const Component = () => {
  const [state, setState] = useState();
  const handleAction = () => { /* logic */ };
  return <Presenter state={state} onAction={handleAction} />;
};

// Presenter (styles.ts)
export const Presenter = styled.div`
  /* styles */
`;
```

**2. Compound Components**
```typescript
// Used in FAQ
<Accordion>
  <Accordion.Item>
    <Accordion.Title />
    <Accordion.Content />
  </Accordion.Item>
</Accordion>
```

**3. Render Props**
```typescript
// Used in ParallaxImages
<ParallaxImages>
  {(transform) => <Image style={{ transform }} />}
</ParallaxImages>
```

**4. Custom Hooks**
```typescript
// libs/useIsMobile.tsx
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { /* resize logic */ }, []);
  return isMobile;
};
```

### Animation Strategy

**GSAP (GreenSock)**
- Scroll-triggered animations
- Complex timeline sequences
- Performance-critical animations
- Used in: ProductShowcase, HeroSection

**Framer Motion**
- Enter/exit animations
- Simple interactions
- Declarative API
- Used in: AgeGate modal, buttons

**Lenis**
- Smooth scrolling
- Custom scrollbar
- Scroll-based parallax
- Used in: Global layout

**CSS Transitions**
- Hover states
- Simple color changes
- Transform animations
- Used in: Buttons, links

---

## API Design

### Endpoint Patterns

**Age Verification**
```
GET  /api/age-verify     - Check verification status
POST /api/age-verify     - Submit birth date
```

**Analytics**
```
POST /api/analytics      - Log Web Vitals metrics
```

### API Response Format

**Success**:
```json
{
  "success": true,
  "data": { /* payload */ },
  "message": "Operation successful"
}
```

**Error**:
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Error Handling

**Client-Side**:
```typescript
try {
  const response = await fetch('/api/endpoint');
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  // Handle success
} catch (error) {
  console.error(error);
  setError(error.message);
}
```

**Server-Side**:
```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validation
    if (!body.field) {
      return NextResponse.json(
        { error: 'Field is required' },
        { status: 400 }
      );
    }
    // Process request
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## Performance Optimization

### Build Optimization

**Next.js Config**:
```javascript
{
  output: 'standalone',          // Smaller Docker images
  compress: true,                // Gzip compression
  compiler: {
    styledComponents: true,      // SSR styled-components
  },
}
```

**Bundle Analysis**:
- Run `npm run build` to see bundle sizes
- Target: < 250KB first load JS
- Current: ~210KB (optimized)

### Runtime Optimization

**Image Optimization**:
- Next.js Image component (lazy loading, srcset)
- WebP format with PNG fallback
- Responsive sizes
- Blur-up placeholders (future)

**Code Splitting**:
- Automatic with Next.js App Router
- Dynamic imports for heavy components
- Route-based splitting

**Caching Strategy**:
- Static pages: Cache-Control: public, max-age=31536000, immutable
- API routes: No caching (dynamic)
- Images: CDN cached, 1 year

### Monitoring

**Vercel Analytics**:
- Page views
- User sessions
- Geographic distribution

**Web Vitals**:
- LCP (Largest Contentful Paint): Target < 2.5s
- FID (First Input Delay): Target < 100ms
- CLS (Cumulative Layout Shift): Target < 0.1

**Custom Metrics**:
- Age gate conversion rate
- Email signup conversion rate
- Product image load times

---

## TypeScript Strategy

### Configuration

```json
{
  "compilerOptions": {
    "target": "ES2015",              // For Map.entries() support
    "strict": true,                  // All strict checks enabled
    "downlevelIteration": true,      // For-of loops on Maps
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/libs/*": ["./libs/*"],
      "@/app/*": ["./src/app/*"]
    }
  }
}
```

### Type Patterns

**Component Props**:
```typescript
interface Props {
  title: string;
  count?: number;              // Optional
  onAction: () => void;        // Required function
  children?: React.ReactNode;  // Optional children
}

const Component: React.FC<Props> = ({ title, count = 0, onAction, children }) => {
  // Implementation
};
```

**API Types**:
```typescript
type ApiResponse<T> = {
  success: true;
  data: T;
  message?: string;
} | {
  success: false;
  error: string;
  code?: string;
};
```

**Form Types (Zod Inference)**:
```typescript
const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

type FormData = z.infer<typeof schema>;
// Automatically: { email: string; name: string; }
```

---

## Deployment Architecture

### Vercel Configuration

**Framework**: Next.js  
**Build Command**: `npm run build`  
**Output Directory**: `.next`  
**Install Command**: `npm ci --legacy-peer-deps`  
**Node Version**: 20.x

**Environment Variables** (in Vercel):
```
NEXT_PUBLIC_SITE_URL=https://sweetpsilocybe.com
NEXT_PUBLIC_SUPABASE_URL=[OPTIONAL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[OPTIONAL]
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### CI/CD Pipeline

**GitHub Actions** (`.github/workflows/ci.yml`):
1. **Lint**: ESLint on all TypeScript files
2. **Type Check**: `tsc --noEmit`
3. **Build**: `npm run build` (Node 18.x, 20.x)
4. **Security Audit**: `npm audit`
5. **Artifact Upload**: Store `.next` directory

**Deployment Flow**:
```
Push to main
     ↓
GitHub Actions runs
     ↓
Vercel webhook triggered
     ↓
Vercel builds & deploys
     ↓
Production live
```

**Rollback Strategy**:
- Vercel dashboard: instant rollback to previous deployment
- Git: revert commit and push
- Manual: `vercel rollback` CLI command

---

## Testing Strategy (Future)

### Unit Tests (Planned)
- **Framework**: Jest + React Testing Library
- **Coverage Target**: 80%
- **Focus**: Utility functions, validation logic

### Integration Tests (Planned)
- **Framework**: Playwright
- **Focus**: User flows (age gate → signup)
- **Environments**: Desktop, mobile, tablet

### E2E Tests (Planned)
- **Framework**: Playwright
- **Focus**: Critical paths
- **CI Integration**: Run on PR

---

## Future Architecture Considerations

### Scalability

**Current**: Single-region Vercel deployment  
**Future**: Multi-region with edge caching

**Current**: In-memory rate limiting  
**Future**: Redis-based rate limiting

**Current**: Optional Supabase  
**Future**: Required database with user accounts

### Features

**Current**: Static landing page  
**Future**: Dynamic content CMS

**Current**: Email signup only  
**Future**: User accounts, profiles

**Current**: Product showcase  
**Future**: E-commerce integration

### Performance

**Current**: ~210KB first load  
**Future**: < 150KB with Tailwind migration

**Current**: Manual image optimization  
**Future**: Automatic image pipeline

---

## Decision Rationale

### Why Server-Side Age Gate?
**Problem**: localStorage easily bypassed (DevTools)  
**Solution**: HTTP-only cookies + server validation  
**Benefit**: Legal compliance, actual security

### Why Rate Limiting in Middleware?
**Problem**: API abuse, DoS attacks  
**Solution**: Edge middleware with IP-based limits  
**Benefit**: Protects without backend infrastructure

### Why Dual Styling Systems?
**Problem**: SSR issues with Styled-Components + React 19  
**Solution**: Keep existing, use Tailwind for new  
**Benefit**: No rewrite required, gradual migration

### Why Zod for Validation?
**Problem**: Runtime validation + TypeScript types  
**Solution**: Single source of truth (schema)  
**Benefit**: DRY, type-safe, composable

### Why Vercel over Self-Hosting?
**Problem**: DevOps overhead, scaling complexity  
**Solution**: Managed platform with CDN  
**Benefit**: Focus on features, not infrastructure

---

## Architecture Principles

1. **Progressive Enhancement**: Works without JavaScript, enhances with it
2. **Defense in Depth**: Multiple security layers
3. **Performance by Default**: Optimize during development, not after
4. **Type Safety**: TypeScript strict mode everywhere
5. **Graceful Degradation**: Demo mode when services unavailable
6. **Separation of Concerns**: UI, logic, data clearly separated
7. **Convention over Configuration**: Follow Next.js patterns
8. **Documentation as Code**: Keep docs in sync with code

---

*End of Architecture Document - Last updated by AI Cofounder on November 8, 2025*
