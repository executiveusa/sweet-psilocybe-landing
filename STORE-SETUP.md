# 🛍️ Store Setup Guide (Shopware Frontends)

**Separate Repository:** The store is a completely separate project from your main landing page.

---

## Overview

Your Sweet Psilocybe website will have TWO parts:

1. **Main Landing Page** (this project)
   - Educational content
   - Email signup
   - Blog (future)
   - Links to store

2. **E-commerce Store** (separate project - Shopware Frontends)
   - Product catalog
   - Shopping cart
   - Checkout
   - Printful integration

---

## Why Separate?

- **Different technologies:** Landing page uses Next.js, store uses Vue.js (Shopware)
- **Different deployments:** Can update one without affecting the other
- **Better performance:** Store only loads when customers want to shop
- **Easier management:** Clear separation of concerns

---

## Step 1: Fork Shopware Frontends Repository

### A. Go to GitHub
- Visit: https://github.com/shopware/frontends

### B. Fork the Repository
1. Click "Fork" button (top right)
2. Choose your GitHub account
3. Name it: `sweet-psilocybe-store`
4. Click "Create fork"

✅ **You now have your own copy of the store template**

---

## Step 2: Clone to Your Computer

### A. Open Terminal
Navigate to where you want the store project (NOT inside your landing page folder):

```bash
cd ~/Projects  # Or wherever you keep projects
```

### B. Clone Your Fork
```bash
git clone https://github.com/YOUR-USERNAME/sweet-psilocybe-store.git
cd sweet-psilocybe-store
```

### C. Install Dependencies
```bash
npm install
```

⏱️ **This will take 2-3 minutes**

---

## Step 3: Configure Shopware Backend

Shopware Frontends needs a Shopware backend. You have two options:

### Option A: Use Shopware Demo Store (Quick Start)

This is a free demo backend provided by Shopware:

1. Open `nuxt.config.ts` in the store project
2. Find the `shopware` section
3. Use these demo credentials:

```typescript
shopware: {
  endpoint: "https://demo-frontends.shopware.store",
  accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW"
}
```

✅ **You can start immediately with demo products**

### Option B: Set Up Your Own Shopware Backend (Recommended for Production)

For a real store, you'll want your own Shopware instance:

1. **Sign up for Shopware Cloud** (free trial)
   - Go to: https://www.shopware.com/en/pricing/
   - Choose "Rise" plan (starts at €0 for small stores)

2. **Create a sales channel**
   - In Shopware admin: Settings > Sales Channels > Add
   - Type: "Headless"
   - Copy the API Access Key

3. **Update `nuxt.config.ts`:**
   ```typescript
   shopware: {
     endpoint: "https://your-store.shopware.store",
     accessToken: "YOUR-ACCESS-KEY"
   }
   ```

---

## Step 4: Customize Branding

### A. Update Colors

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-primary': '#F6AFCF',  // Petal pink
        'brand-secondary': '#A9C0B0', // Fern green
        'brand-dark': '#0B0B0B',     // Ink
        'brand-light': '#F7F3EF',    // Cream
      }
    }
  }
}
```

### B. Add Logo

Replace `public/logo.svg` with your Sweet Psilocybe logo

### C. Update Site Name

Edit `nuxt.config.ts`:

```typescript
app: {
  head: {
    title: 'Sweet Psilocybe Store',
    meta: [
      { name: 'description', content: 'Official Sweet Psilocybe merchandise' }
    ]
  }
}
```

---

## Step 5: Connect Printful (Print-on-Demand)

### A. Create Printful Account
1. Go to: https://www.printful.com
2. Sign up for free account
3. Connect your store (Shopware)

### B. Install Shopware-Printful Plugin
1. In Shopware admin: Extensions > My Extensions
2. Search "Printful"
3. Install and activate
4. Enter your Printful API key: `D1joQqLW4m9V7wxy60VpdGtUzzGShoYTeilMX9hB`

### C. Sync Products
1. Design products in Printful (t-shirts, hoodies, etc.)
2. Push to Shopware
3. Products automatically appear in your store

---

## Step 6: Test Locally

```bash
npm run dev
```

Visit: http://localhost:3000

You should see:
- ✅ Store homepage
- ✅ Product listings
- ✅ Working cart
- ✅ Checkout flow

---

## Step 7: Deploy Store

### Option A: Vercel (Recommended)

1. Push your store to GitHub:
   ```bash
   git add .
   git commit -m "Initial store setup"
   git push origin main
   ```

2. Go to: https://vercel.com
3. Click "New Project"
4. Import `sweet-psilocybe-store` repository
5. Framework Preset: "Nuxt.js"
6. Add environment variables:
   ```
   SHOPWARE_ENDPOINT=https://your-store.shopware.store
   SHOPWARE_ACCESS_TOKEN=your-access-key
   ```
7. Click "Deploy"

⏱️ **Wait 3-5 minutes**

✅ **Your store is now live!**

### Option B: Netlify

1. Go to: https://netlify.com
2. Click "Add new site" > "Import existing project"
3. Connect GitHub
4. Choose `sweet-psilocybe-store`
5. Build command: `npm run generate`
6. Publish directory: `dist`
7. Add environment variables (same as above)
8. Click "Deploy"

---

## Step 8: Connect Store to Landing Page

### A. Get Your Store URL

After deployment, copy your store URL:
- Vercel: `https://sweet-psilocybe-store.vercel.app`
- Netlify: `https://sweet-psilocybe-store.netlify.app`
- Custom domain: `https://store.sweetpsilocybe.com` (if you set one up)

### B. Update Landing Page

1. Open your **main landing page project** (not the store)
2. Edit `.env.local`:
   ```bash
   NEXT_PUBLIC_STORE_URL=https://sweet-psilocybe-store.vercel.app
   ```
3. Restart your dev server

✅ **"Visit Store" buttons will now work!**

---

## Step 9: Custom Domain (Optional)

### A. Buy Domain
- Namecheap, Google Domains, or Cloudflare

### B. Point Subdomain to Store
1. In your DNS settings, add CNAME record:
   - **Name:** `store`
   - **Value:** `cname.vercel-dns.com` (for Vercel) or your Netlify DNS
   - **TTL:** Automatic

2. In Vercel/Netlify dashboard:
   - Go to project settings
   - Add custom domain: `store.sweetpsilocybe.com`
   - Follow verification steps

⏱️ **DNS propagation: 15 minutes to 24 hours**

---

## Product Workflow

### Adding New Products

1. **Design in Printful:**
   - Create mockup
   - Set prices
   - Add product details

2. **Push to Shopware:**
   - In Printful dashboard: "Push to Store"
   - Choose Shopware
   - Confirm sync

3. **Product appears in store automatically!**

### Managing Orders

1. Customer orders on your store
2. Shopware sends order to Printful
3. Printful prints and ships
4. Customer receives tracking
5. You get paid (Shopware - Printful costs = Profit)

---

## 💰 Pricing & Costs

### Free Tier (Testing)
- **Shopware Demo:** Free, demo products only
- **Printful:** No upfront costs (you pay per order)
- **Vercel/Netlify:** Free for small stores

### Paid Tier (When You Launch)
- **Shopware Rise:** €0-€29/month (depends on sales volume)
- **Printful:** No monthly fee (you pay production cost per item)
- **Domain:** ~$12/year
- **Vercel Pro (if needed):** $20/month

**Example Profit:**
- You sell t-shirt for $29.99
- Printful charges you $12.50 (production + shipping)
- Shopware fee: ~3% = $0.90
- **Your profit:** $16.59 per shirt

---

## 🚨 Troubleshooting

### Store won't load
**Problem:** Shopware endpoint incorrect  
**Solution:** Double-check `SHOPWARE_ENDPOINT` in env vars

### Products not showing
**Problem:** No products synced from Printful  
**Solution:** Push at least one product from Printful dashboard

### Checkout fails
**Problem:** Payment gateway not configured  
**Solution:** In Shopware admin, enable Stripe or PayPal

---

## 📚 Resources

- **Shopware Frontends Docs:** https://frontends.shopware.com
- **Printful Integration:** https://www.printful.com/integrations/shopware
- **Shopware Admin Guide:** https://docs.shopware.com

---

## ✅ Deployment Checklist

Before going live:

- [ ] Store deployed to Vercel/Netlify
- [ ] Custom domain configured (optional)
- [ ] At least 5 products added
- [ ] Test order completed successfully
- [ ] Printful API key verified
- [ ] Store URL added to landing page `.env.local`
- [ ] Branding matches landing page (colors, logo)
- [ ] Payment gateway enabled (Stripe/PayPal)
- [ ] Shipping rates configured
- [ ] Legal pages added (privacy, terms, returns)

---

## 🎯 Next Steps After Setup

1. **Design 10+ products** in Printful
2. **Sync to Shopware**
3. **Test full checkout flow**
4. **Promote store link** on landing page
5. **Drive traffic** via TikTok, Instagram, educational content

---

**Need help?** The Shopware Frontends community is active on Discord and GitHub Discussions.

**Last updated:** November 2025
