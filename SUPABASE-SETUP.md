# 🍄 Supabase Setup Guide for Sweet Psilocybe

**Time Required:** 10-15 minutes  
**Technical Level:** Beginner-friendly (no coding knowledge needed)

---

## What is Supabase?

Supabase is a free database service that will store email addresses when visitors sign up on your website. Think of it like a spreadsheet in the cloud that your website can write to automatically.

---

## Step 1: Create Your Free Supabase Account

1. **Go to:** https://supabase.com
2. **Click** the green "Start your project" button (top right)
3. **Sign up with GitHub:**
   - Click "Continue with GitHub"
   - Log in to your GitHub account (or create one if you don't have it)
   - Click "Authorize Supabase"

✅ **You should now see the Supabase dashboard**

---

## Step 2: Create a New Project

1. **Click** "New Project" (green button)
2. **Fill in these fields:**
   - **Name:** `sweet-psilocybe` (or anything you like)
   - **Database Password:** Create a strong password and **SAVE IT SOMEWHERE SAFE** (you'll need this later)
   - **Region:** Choose the region closest to your audience (e.g., "US East" if most visitors are in USA)
   - **Pricing Plan:** Keep "Free" selected

3. **Click** "Create new project"

⏱️ **Wait 2-3 minutes** while Supabase sets up your database (you'll see a loading screen)

✅ **When complete, you'll see your project dashboard**

---

## Step 3: Create the Email Subscribers Table

This is where visitor emails will be stored.

### A. Open the SQL Editor

1. On the left sidebar, **click** the icon that looks like `</>` (called "SQL Editor")
2. **Click** "+ New query" button

### B. Copy and Paste This Code

Copy the entire code block below and paste it into the SQL editor:

```sql
-- Create subscribers table
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'website',
  confirmed BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT new subscribers (sign up)
CREATE POLICY "Allow public to insert subscribers"
  ON public.subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users can read subscribers (for your admin access later)
CREATE POLICY "Only authenticated users can read subscribers"
  ON public.subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Add index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);

-- Add index for sorting by date
CREATE INDEX IF NOT EXISTS idx_subscribers_subscribed_at ON public.subscribers(subscribed_at DESC);
```

### C. Run the Code

1. **Click** the green "Run" button (bottom right of editor)
2. **You should see:** "Success. No rows returned"

✅ **Your database table is now created!**

---

## Step 4: Get Your API Keys

Now we need to copy two special codes that let your website talk to your database.

### A. Navigate to API Settings

1. On the left sidebar, **click** the ⚙️ **Settings** icon (near bottom)
2. **Click** "API" in the submenu

### B. Copy Your Keys

You'll see a section called "Project API keys". You need TWO values:

#### 1. Project URL
- **Look for:** "Project URL" section at the top
- **Example:** `https://abcdefghijklmnop.supabase.co`
- **Copy** the entire URL

#### 2. Anon Public Key
- **Look for:** "Project API keys" section
- **Find** the key labeled `anon` `public`
- **Click** the 👁️ (eye icon) to reveal the key
- **Copy** the entire key (it's very long, starts with `eyJ...`)

⚠️ **IMPORTANT:** Keep these keys safe! Don't share them publicly.

---

## Step 5: Add Keys to Your Website

Now we'll add these keys to your website's environment file.

### A. Open Your Project Folder

1. Open your Sweet Psilocybe project folder on your computer
2. Find the file called `.env.local`

### B. Add Your Keys

Open `.env.local` in any text editor and fill in the blanks:

```bash
# Paste your Project URL here (between the = sign and nothing else)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co

# Paste your Anon Public key here
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Leave these as-is for now
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Sweet Psilocybe"
NEXT_PUBLIC_STORE_URL=
```

**Save the file** (Ctrl+S or Cmd+S)

✅ **Your website can now connect to your database!**

---

## Step 6: Test Your Setup

### A. Start Your Website Locally

1. Open terminal/command prompt in your project folder
2. Run: `npm run dev`
3. Open browser to: http://localhost:3000

### B. Test the Email Signup Form

1. Scroll down to the "Be the First to Know" section
2. Enter a test email (like `test@example.com`)
3. Click "Notify Me"
4. **You should see:** "🎉 You're on the list! Check your email soon."

### C. Verify in Supabase

1. Go back to your Supabase dashboard
2. On left sidebar, click the **Table icon** (looks like a grid)
3. Click "subscribers" table
4. **You should see:** Your test email in the table!

✅ **Success! Your email capture system is working!**

---

## 🎉 You're Done!

Your Supabase database is now set up and connected to your website. Every time someone signs up, their email will automatically appear in your Supabase dashboard.

---

## 📊 How to View Your Email List

Anytime you want to see who's signed up:

1. Go to: https://supabase.com/dashboard
2. Click your "sweet-psilocybe" project
3. Click the **Table icon** (left sidebar)
4. Click "subscribers"
5. You'll see all emails with signup dates

### Export Emails to CSV

1. In the subscribers table view
2. Click "⋯" (three dots) in top right
3. Click "Download as CSV"
4. Open in Excel/Google Sheets

---

## 🚨 Troubleshooting

### "Failed to fetch" error on website

**Problem:** API keys not added correctly  
**Solution:** 
- Check `.env.local` has no extra spaces
- Make sure you copied the FULL keys (anon key is 200+ characters)
- Restart your dev server: Stop (Ctrl+C) and run `npm run dev` again

### "Duplicate key value" error

**Problem:** Email already exists in database  
**Solution:** This is normal! It means someone already signed up with that email

### Can't see subscribers table

**Problem:** SQL didn't run correctly  
**Solution:** 
- Go back to SQL Editor in Supabase
- Re-run the SQL code from Step 3
- Check for green "Success" message

---

## 🔒 Security Notes

- **Your Anon Public key is safe to use in browser** - it's designed for public access
- **Row Level Security (RLS) is enabled** - visitors can only INSERT emails, not read others
- **Never share your Service Role key** (different from Anon key - not used in this project)

---

## 📧 Next Steps

After you have 100+ subscribers, consider:
- Setting up welcome emails (using Supabase Edge Functions + Resend)
- Adding email confirmation (double opt-in)
- Exporting to Mailchimp/ConvertKit for newsletters

---

**Need help?** Check the Supabase documentation: https://supabase.com/docs

**Last updated:** November 2025
