# 🍄 Sweet Psilocybe - Complete Project Documentation

**Client:** Female entrepreneur (first paid client waiting)  
**Project:** Educational mushroom research platform + merch empire  
**Timeline:** 7 days to "Coming Soon" launch → 4 weeks to full MVP  
**Budget:** $0 (free tiers: Vercel + Supabase)

---

## 📚 Documentation Index

### 1. [SWEET-PSILOCYBE-SUMMARY.md](./SWEET-PSILOCYBE-SUMMARY.md)
**Start here** - Executive summary, business strategy, timeline, deliverables

**Key Sections:**
- Business model (merch-first, NOT selling mushrooms)
- Brand identity (colors from logo)
- Tech stack overview
- Success metrics
- Pre-launch checklist

**Read this first if:** You need the big picture

---

### 2. [SWEET-PSILOCYBE-PRD.md](./SWEET-PSILOCYBE-PRD.md)
**Product Requirements Document** - Complete feature specifications

**Key Sections:**
- Mission & principles
- Audience personas (learners, researchers, healers)
- Feature set (MVP → v1 → v2)
- Information architecture (page structure)
- Content system (MDX + Supabase)
- Compliance & safety (age gate, disclaimers, geofencing)
- Data models (Prisma schemas)
- API endpoints
- SEO & content operations
- Monetization strategy
- Delivery plan (3 sprints)

**Read this if:** You need feature details or technical specs

---

### 3. [SWEET-PSILOCYBE-SETUP.md](./SWEET-PSILOCYBE-SETUP.md)
**Step-by-Step Implementation Guide** - How to build it (30-45 minutes)

**Key Sections:**
- Fork & clone instructions
- Supabase setup (database + RLS policies)
- Environment variables
- File-by-file code (Hero, EmailCapture, BrandStrip)
- Lenis smooth scroll integration
- GSAP animation examples
- Deploy to Vercel checklist
- Troubleshooting common issues

**Read this if:** You're ready to build

---

### 4. [SWEET-PSILOCYBE-SNIPPETS.md](./SWEET-PSILOCYBE-SNIPPETS.md)
**Code Snippets Reference** - Copy-paste ready code

**Key Sections:**
- Brand tokens (Tailwind config)
- Supabase email capture (API route)
- GSAP parallax (reusable hook)
- Framer Motion variants
- Lenis global setup
- Reduced motion support
- Next.js image optimization
- SEO meta tags
- Supabase RLS policies
- Google Analytics setup
- TypeScript types
- Test commands

**Read this if:** You need quick code examples

---

### 5. [SWEET-PSILOCYBE-ARCHITECTURE.md](./SWEET-PSILOCYBE-ARCHITECTURE.md)
**System Architecture Diagrams** - Visual overview

**Key Sections:**
- Phase 1: Coming Soon (Vercel + Supabase)
- Phase 2: Full MVP (+ Printful + AI)
- Phase 3: Advanced (Avatar system + UGC)
- Data flow diagrams
- Security & compliance layers
- Tech stack summary
- File structure overview
- Deployment pipeline
- Performance targets
- Revenue projections
- Risk mitigation

**Read this if:** You want visual/conceptual understanding

---

## 🚀 Quick Start (30 Minutes)

### Prerequisites
- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] Vercel account (free)
- [ ] Supabase account (free)
- [ ] Text editor (VS Code recommended)

### Steps
1. **Fork repo:** `git clone https://github.com/Temitayo-spec/Raft-Landing-Page.git sweet-psilocybe`
2. **Install deps:** `npm install && npm install @studio-freight/lenis @supabase/supabase-js`
3. **Setup Supabase:** Create project + run SQL from [SETUP.md](./SWEET-PSILOCYBE-SETUP.md#b-create-subscribers-table)
4. **Add env vars:** Copy `.env.example` → `.env.local`, add Supabase keys
5. **Replace code:** Copy components from [SNIPPETS.md](./SWEET-PSILOCYBE-SNIPPETS.md)
6. **Test:** `npm run dev` → test email capture
7. **Deploy:** Push to GitHub → connect Vercel → add env vars → deploy!

**Expected time:** 30-45 minutes (excluding design assets)

---

## 🎯 Key Decisions Made

### 1. Repo Choice: Raft-Landing-Page
**Why:** Has GSAP + Framer Motion already integrated (your requirement)

**Alternatives considered:**
- Next.js SaaS Landing (Tailwind-first) - ❌ No GSAP built-in
- Smooth-Scroll Next.js - ❌ Too minimal, no animations
- Build from scratch - ❌ Too slow

---

### 2. Backend: Supabase (NOT Railway/Encore)
**Why:** Client preference + free tier + easy management + GUI access

**Alternatives considered:**
- Railway (Postgres) - ❌ Client wanted Supabase
- Encore Cloud - ❌ Leap.new default, but client preferred Supabase
- Firebase - ❌ More expensive, less PostgreSQL-native

---

### 3. Business Model: Merch-First (NOT Mushroom Sales)
**Why:** Legal compliance (no Schedule I substance sales)

**Revenue streams:**
1. **Primary:** Printful POD → TikTok Shop + Amazon
2. **Secondary:** Affiliate links (books, courses)
3. **Future:** Game cosmetics, season passes

**Traffic drivers:**
- SEO (educational content)
- Interactive games (Mushroom Clicker)
- Social media (TikTok, Instagram)

---

### 4. Content Strategy: Educational Only
**Why:** Legal safety + build trust before monetization

**Rules:**
- ✅ Research summaries with citations
- ✅ Harm reduction information
- ✅ Legality map with sources
- ❌ NO cultivation guides
- ❌ NO medical advice
- ❌ NO dosing instructions

---

### 5. Design: Brand Colors from Logo
**Colors extracted:**
```css
--ink: #0B0B0B      /* Deep black */
--petal: #F6AFCF    /* Pink cap (PRIMARY) */
--spore: #FFEDEE    /* Soft pink */
--fern: #A9C0B0     /* Sage green */
--cream: #F7F3EF    /* Warm cream */
```

**Typography:**
- Display: Bricolage Grotesque (organic, scientific)
- Body: Inter (clean, accessible)

---

## 📊 Project Phases

### Phase 1: Coming Soon (Week 1) ← **START HERE**
**Goal:** Launch beautiful scroll-driven landing page

**Features:**
- Hero with parallax mushroom background
- Brand strip (3 pillars: Research, Play, Shop)
- Email capture (Supabase)
- Mobile responsive
- Lighthouse 95+

**Deliverables:**
- ✅ Live URL (Vercel)
- ✅ Email list building
- ✅ Social preview ready

**Success:** 100+ signups in first week

---

### Phase 2: Full MVP (Weeks 2-4)
**Goal:** Launch complete research + merch platform

**Features:**
- Research hub (articles, studies, legality map)
- Mushroom Clicker game (Phaser 3)
- Merch store (Printful integration)
- Blog system (MDX)
- Directory (healers/experts)

**Deliverables:**
- ✅ 10+ research articles
- ✅ 1 playable game
- ✅ 10 merch designs live
- ✅ Blog with RSS feed

**Success:** 5K visitors, 50 merch orders

---

### Phase 3: Growth (Months 2-3)
**Goal:** Scale traffic + optimize conversions

**Features:**
- Advanced games (trivia, memory match)
- UGC system (moderated)
- Avatar creation (3D onboarding)
- Comic book section
- AI research agent (OpenRouter + Gemma 3)

**Deliverables:**
- ✅ 3 games live
- ✅ UGC enabled with moderation
- ✅ 50+ directory listings
- ✅ 10 comic issues

**Success:** 50K visitors, $10K revenue/mo

---

## ⚠️ Critical Compliance Notes

### Legal Requirements
- **18+ age gate** (full site only, not coming soon)
- **Disclaimers on every page:**
  - "Educational content only"
  - "No medical advice"
  - "Laws vary by jurisdiction"
- **Geofencing:** Hide commerce in restricted regions
- **No cultivation guides:** Content focuses on research, safety, legality

### Safety Protocols
- Supabase RLS policies (prevent data leaks)
- Input validation (Zod)
- Rate limiting (prevent spam)
- Content moderation (UGC Phase 3)

### Privacy
- GDPR/CCPA compliant
- Cookie consent banner
- Clear privacy policy
- User data deletion on request

---

## 📈 Success Metrics

### Week 1 (Coming Soon)
| Metric | Target | How to Track |
|--------|--------|--------------|
| Email signups | 100+ | Supabase dashboard |
| Bounce rate | < 40% | Google Analytics |
| Avg. session | > 45s | GA |
| Mobile traffic | > 60% | GA |
| Lighthouse | 95+ | Vercel Analytics |

### Month 1 (MVP Launch)
| Metric | Target | How to Track |
|--------|--------|--------------|
| Unique visitors | 5K+ | Plausible |
| Merch orders | 50+ | Printful dashboard |
| Email subscribers | 500+ | Supabase |
| Blog posts | 10+ | Manual count |

### Month 3 (Growth)
| Metric | Target | How to Track |
|--------|--------|--------------|
| Monthly visitors | 20K+ | Plausible |
| Merch orders/mo | 200+ | Printful |
| Email list | 2K+ | Supabase |
| Game sessions/day | 1K+ | PostHog |

---

## 🛠 Tech Stack Summary

### Phase 1 (Coming Soon)
```
Frontend:  Next.js 15 + Tailwind CSS
Animation: GSAP + Framer Motion + Lenis
Database:  Supabase (PostgreSQL)
Hosting:   Vercel
```

### Phase 2 (Full MVP)
```
+ Content:  MDX + Contentlayer
+ Games:    Phaser 3
+ Merch:    Printful API + Nano Banana
+ Email:    Resend/SendGrid
+ Analytics: Plausible (privacy-first)
```

### Phase 3 (Advanced)
```
+ AI:       OpenRouter + Ollama + Gemma 3 270M
+ 3D:       Three.js + Ready Player Me
+ UGC:      Supabase + moderation queue
+ Comics:   Custom PDF/web reader
```

---

## 📦 Required Assets (From Client)

### Must Have (Week 1)
- [ ] Sweet Psilocybe logo (SVG preferred)
- [ ] Hero mushroom image (2400x1600px, optimized)
- [ ] Domain name (if custom, e.g., sweetpsilocybe.com)
- [ ] Approval of brand colors (extracted from logo)
- [ ] Final copy for hero tagline

### Nice to Have (Week 1)
- [ ] Favicon (512x512px)
- [ ] Social preview image (1200x630px)
- [ ] About page copy (brief)
- [ ] Email confirmation copy

### Phase 2 (Weeks 2-4)
- [ ] 10 research article drafts (1000-2000 words each)
- [ ] Initial merch design concepts (or use AI generation)
- [ ] Healer directory content (50+ listings)
- [ ] Blog post ideas (10 topics)

---

## 🔗 External Resources

### Repos
- **Base:** [Raft-Landing-Page](https://github.com/Temitayo-spec/Raft-Landing-Page)
- **Smooth Scroll:** [Lenis](https://github.com/studio-freight/lenis)
- **Database:** [Supabase](https://supabase.com)

### Docs
- [Next.js 15](https://nextjs.org/docs)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Printful API](https://developers.printful.com/)

### Inspiration
- [Raft Demo](https://raft-landing-page.vercel.app/)
- [Lenis Demo](https://lenis.studiofreight.com/)
- [Mushroom Observer](https://mushroomobserver.org/) (UX reference)

---

## 🎓 Learning Resources (Optional)

### GSAP + ScrollTrigger
- [Official Docs](https://greensock.com/docs/)
- [Beginner Tutorial](https://greensock.com/get-started/)
- [Scroll-driven animations](https://greensock.com/scrolltrigger/)

### Supabase
- [Quick Start](https://supabase.com/docs/guides/getting-started)
- [Auth Tutorial](https://supabase.com/docs/guides/auth)
- [RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)

### Next.js 15
- [App Router](https://nextjs.org/docs/app)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

---

## 💬 FAQ

### Q: Why NOT sell mushrooms directly?
**A:** Legal compliance. Psilocybin is Schedule I in most jurisdictions. Educational + merch model avoids legal risk while building brand.

### Q: Why Supabase over Firebase?
**A:** Client preference + PostgreSQL (more powerful than Firestore) + free tier is generous + RLS built-in.

### Q: Why fork Raft instead of starting from scratch?
**A:** Speed. Raft has GSAP + Framer Motion + Next.js already wired. Saves 2-3 days of setup.

### Q: How do we handle age verification?
**A:** Simple modal on first visit asking "Are you 18+?" with Yes/No buttons. Store consent in localStorage (or cookie). Not foolproof, but legally defensible.

### Q: What if Printful fulfillment is slow?
**A:** Set expectations (7-14 day shipping) + offer tracking + diversify with Amazon MoD backup.

### Q: Can we add a blog later?
**A:** Yes, Phase 2 includes MDX blog system. Easy to add posts via markdown files.

### Q: What about SEO?
**A:** Next.js metadata API + structured data + sitemaps + fast load times = strong SEO foundation.

---

## 🎬 Next Actions

### For Developer (You)
1. ✅ Review all 5 docs (start with SUMMARY.md)
2. ✅ Fork Raft-Landing-Page repo
3. ✅ Set up Supabase project
4. ✅ Copy code from SNIPPETS.md into repo
5. ✅ Test locally (`npm run dev`)
6. ✅ Deploy to Vercel
7. ✅ Share preview URL with client

### For Client
1. ⏳ Provide logo files (SVG)
2. ⏳ Provide hero mushroom image
3. ⏳ Approve brand colors
4. ⏳ Approve copy for coming soon page
5. ⏳ Provide domain name (if custom)
6. ⏳ Review deployed preview
7. ⏳ Approve launch

### For Both
1. ⏳ Final review call (30 min)
2. ⏳ Launch coming soon page
3. ⏳ Promote on social media
4. ⏳ Monitor email signups
5. ⏳ Plan Phase 2 features
6. ⏳ Celebrate! 🎉

---

## 📞 Support & Contact

If you need help during setup:
1. Check [SWEET-PSILOCYBE-SETUP.md](./SWEET-PSILOCYBE-SETUP.md) troubleshooting section
2. Review [SWEET-PSILOCYBE-SNIPPETS.md](./SWEET-PSILOCYBE-SNIPPETS.md) for code examples
3. Test Supabase connection in browser console (`console.log(supabase)`)
4. Verify environment variables in Vercel dashboard

**Estimated Total Time:** 30-45 minutes setup + 2-3 days for assets/review

---

## ✅ Pre-Launch Checklist

### Technical
- [ ] Repo forked and dependencies installed
- [ ] Supabase project created + subscribers table
- [ ] Environment variables added to `.env.local`
- [ ] Hero component working with parallax
- [ ] Email capture submits to Supabase
- [ ] Mobile responsive (test on real device)
- [ ] Lighthouse Performance 90+
- [ ] Smooth scroll working (Lenis)
- [ ] GSAP animations triggering correctly
- [ ] No console errors

### Content
- [ ] Logo added to `/public/logo.svg`
- [ ] Hero mushroom image added to `/public/hero-mushroom.jpg`
- [ ] Brand colors applied in `globals.css`
- [ ] Copy updated in Hero.tsx
- [ ] Legal disclaimers in footer
- [ ] Social preview image added (1200x630px)

### Deployment
- [ ] Pushed to GitHub
- [ ] Connected to Vercel
- [ ] Environment variables added to Vercel
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (Vercel auto)
- [ ] Preview URL tested in production

### Post-Launch
- [ ] Client approval obtained
- [ ] Social media posts scheduled
- [ ] Email list export set up (Supabase)
- [ ] Analytics tracking verified
- [ ] Monitor signup rate (target: 100+ Week 1)

---

## 🏆 Project Goals Recap

### Week 1: Launch Coming Soon
**Goal:** Beautiful scroll-driven landing page capturing emails

**Success = 100+ signups + Lighthouse 95+ + Client approval**

### Month 1: Launch Full MVP
**Goal:** Complete research hub + merch store + games

**Success = 5K visitors + 50 merch orders + 10+ articles**

### Month 3: Scale & Optimize
**Goal:** High-traffic educational platform with multiple revenue streams

**Success = 50K visitors + $10K revenue/mo + 2K+ email subscribers**

---

## 🍄 Brand Essence

**Voice:** Curious, warm, evidence-based (like a mycology professor who's also a cool aunt)

**Mission:** Make psilocybin research accessible, engaging, and safe for everyone 18+

**Values:**
- Science first (cite all sources)
- Harm reduction (safety over sensation)
- Legal compliance (no cultivation guides)
- Community building (faceless avatar network)
- Artistic expression (POD merch empire)

**Tagline:** "Play. Learn. Grow — Research-First Plant Medicine Hub"

---

**Ready to build? Start with [SWEET-PSILOCYBE-SETUP.md](./SWEET-PSILOCYBE-SETUP.md) Step 1 →**

---

*Last Updated: 2025-01-07*  
*Version: 1.0*  
*Project: Sweet Psilocybe Coming Soon + Full MVP*  
*Client: First paid client (mushroom education entrepreneur)*