# 🚀 SETUP INSTRUCTIONS - Start Here!

**Welcome to Sweet Psilocybe!** This file will get you from zero to deployed in under 1 hour.

---

## ✅ What's Already Done

Your project has been completely transformed with:
- ✅ Sweet Psilocybe branding (pink, green, cream colors)
- ✅ All new components (AgeGate, EmailCapture, BrandStrip, ProductShowcase)
- ✅ Database integration (Supabase - needs your credentials)
- ✅ Store integration (Shopware - needs separate setup)
- ✅ Complete documentation files

---

## 🎯 Your Mission: 3 Simple Steps

### ⏱️ Total Time: 15-60 minutes (depending on how deep you go)

---

## Step 1: Install & Run (5 minutes)

### A. Install Dependencies

Open terminal/command prompt in the project folder:

```bash
npm install
```

**What this does:** Installs all required packages (Supabase, form libraries, Tailwind, etc.)

### B. Start Development Server

```bash
npm run dev
```

**What this does:** Starts local server at http://localhost:3000

### C. Open in Browser

Visit: **http://localhost:3000**

**You should see:**
- ✅ Age verification modal (click "I'm 18 or Older" to enter)
- ✅ Sweet Psilocybe hero section
- ✅ Pink and green colors throughout
- ✅ Smooth scrolling
- ✅ Email capture form

**If you see errors:**
- Make sure Node.js 18+ is installed: `node --version`
- Delete `node_modules` folder and run `npm install` again
- Check for error messages in terminal

---

## Step 2: Add Your Images (10 minutes)

**Current State:** Site uses placeholder gradients because images folder is empty.

### A. Prepare Images

You need these files (examples):
- `hero-background.jpg` - Main background image (mushrooms, nature scene)
- `logo.svg` or `logo.png` - Your logo
- `product-tshirt-1.jpg` - T-shirt product photo
- `product-hoodie-1.jpg` - Hoodie product photo
- `product-hat-1.jpg` - Hat product photo
- `product-sticker-1.jpg` - Sticker product photo

**Don't have images yet?**
- Use free stock photos from https://unsplash.com/s/photos/mushroom
- Or create simple designs in Canva: https://canva.com

### B. Compress Images

**IMPORTANT:** Large images slow down your site!

1. Go to: https://tinypng.com
2. Upload your images
3. Download compressed versions
4. **Target sizes:**
   - Hero background: Under 500KB
   - Products: Under 200KB each
   - Logo: Under 50KB

### C. Add to Project

1. Copy your images
2. Paste into: `/public/images/` folder
3. Restart dev server (Ctrl+C, then `npm run dev`)
4. Refresh browser

**Naming rules:** See `IMAGE-NAMING-GUIDE.md` for exact requirements

---

## Step 3: Setup Database (Optional - 15 minutes)

**Current State:** Email form works in "demo mode" (shows success but doesn't save emails).

### Why Do This?

- ✅ Save visitor emails to your database
- ✅ Export email list anytime
- ✅ Build audience before launch

### How to Do It

**Full guide:** `SUPABASE-SETUP.md`

**Quick summary:**
1. Create free Supabase account: https://supabase.com
2. Create new project
3. Run SQL to create `subscribers` table (copy-paste provided)
4. Get API keys from dashboard
5. Add to `.env.local` file
6. Restart dev server

**Time:** 10-15 minutes (step-by-step guide is beginner-friendly)

---

## 🎉 You're Done! What Now?

### Test Everything

- [ ] Age gate appears on first visit
- [ ] Hero section looks good
- [ ] Images load (if you added them)
- [ ] Smooth scrolling works
- [ ] Email form accepts email
- [ ] Email saves to database (if Supabase setup)
- [ ] Mobile works (resize browser or test on phone)

### Deploy to Internet

**Option A: Vercel (Recommended - Free)**

1. Create GitHub repository
2. Push your code:
   ```bash
   git add .
   git commit -m "Sweet Psilocybe ready for deployment"
   git push origin main
   ```
3. Go to https://vercel.com
4. Click "New Project"
5. Import your repository
6. Add environment variables (from `.env.local`)
7. Click "Deploy"
8. **Done!** Your site is live

**Time:** 10 minutes

---

## 🛍️ Optional: Setup Store (30-45 minutes)

**Current State:** "Visit Our Store" button shows "Coming Soon"

### Why Do This?

- ✅ Sell merchandise (print-on-demand)
- ✅ Integrate with Printful (no upfront costs)
- ✅ Full e-commerce site (separate from main site)

### How to Do It

**Full guide:** `STORE-SETUP.md`

**Quick summary:**
1. Fork Shopware Frontends repository
2. Connect to Printful (API key provided: `D1joQqLW4m9V7wxy60VpdGtUzzGShoYTeilMX9hB`)
3. Design products in Printful
4. Deploy store to Vercel
5. Add store URL to main site `.env.local`

**Time:** 30-45 minutes (it's a separate project)

---

## 📊 Success Checklist

### Minimum Viable Launch
- [ ] Images added to `/public/images/`
- [ ] Site runs locally (`npm run dev`)
- [ ] No console errors
- [ ] Deployed to Vercel
- [ ] Live URL works

### Full Launch
- [ ] All images added
- [ ] Supabase database configured
- [ ] Email capture tested and working
- [ ] Store setup and linked
- [ ] Custom domain configured (optional)
- [ ] Privacy Policy page created
- [ ] Terms of Use page created

---

## 🐛 Common Issues

### "npm install" fails

**Solution:** 
- Update Node.js to version 18+: https://nodejs.org
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Age gate shows every time

**Solution:** 
- Check browser console for errors (F12)
- Make sure localStorage is enabled
- Try different browser

### Images don't show

**Solution:**
- Check file names match `IMAGE-NAMING-GUIDE.md`
- Images must be in `/public/images/` folder
- Restart dev server after adding images

### Email form stuck in demo mode

**Solution:**
- Follow `SUPABASE-SETUP.md` to add database credentials
- Check `.env.local` has correct Supabase URL and key
- Restart dev server after editing `.env.local`

---

## 📚 Additional Resources

### Documentation in This Project
- `README.md` - Project overview
- `SUPABASE-SETUP.md` - Database setup (detailed)
- `IMAGE-NAMING-GUIDE.md` - Image guidelines
- `STORE-SETUP.md` - E-commerce setup (detailed)

### External Resources
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Vercel Deployment:** https://vercel.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## 🎯 Recommended Order of Operations

### Day 1 (Today)
1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. ✅ Verify site loads
4. ✅ Add images (if ready)

### Day 2
1. ✅ Setup Supabase (follow guide)
2. ✅ Test email capture
3. ✅ Deploy to Vercel

### Day 3-7
1. ✅ Setup store (Shopware + Printful)
2. ✅ Design 5-10 products
3. ✅ Create Privacy Policy and Terms pages
4. ✅ Launch publicly

### Week 2+
1. ✅ Add blog content (future: MDX system)
2. ✅ Create educational games
3. ✅ Build research hub
4. ✅ Marketing & SEO

---

## 💬 Need Help?

### If Stuck
1. Check browser console for errors (F12)
2. Read relevant documentation file
3. Search error message online
4. Try restarting dev server

### Technical Issues
- Detailed guides in `SUPABASE-SETUP.md`, `STORE-SETUP.md`
- Next.js community: https://github.com/vercel/next.js/discussions
- Supabase community: https://github.com/supabase/supabase/discussions

---

## 🎉 You Got This!

**The hardest part is already done** - the entire codebase has been transformed for you.

All you need to do:
1. Add images
2. (Optionally) setup database
3. Deploy

**Total time:** 15-60 minutes depending on how deep you want to go.

---

**Ready?** Start with Step 1 above and work your way through. Good luck! 🍄

**Last updated:** November 8, 2025  
**Version:** 1.0
