# Deploy Sweet Psilocybe to Coolify

## Prerequisites
- Coolify instance running (self-hosted or cloud)
- GitHub/GitLab repository with this code
- Domain name (optional but recommended)

## Step 1: Push to Git Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial Sweet Psilocybe site"

# Add your remote (GitHub/GitLab)
git remote add origin YOUR_GIT_REPO_URL
git push -u origin main
```

## Step 2: Connect to Coolify

1. **Log into your Coolify dashboard**
   - Access your Coolify instance (e.g., https://coolify.yourdomain.com)

2. **Create New Project**
   - Click "+ New" → "Project"
   - Name it "Sweet Psilocybe"

3. **Add New Resource**
   - Click "+ New Resource"
   - Select "Public Repository" or connect your Git provider

## Step 3: Configure Deployment

### Repository Settings
- **Repository URL**: Your GitHub/GitLab repo URL
- **Branch**: `main`
- **Build Pack**: Docker (it will auto-detect the Dockerfile)

### Environment Variables
Add these in Coolify's environment settings:

```env
# Required for production
NODE_ENV=production

# Optional: Supabase (if you set it up)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Store integration
NEXT_PUBLIC_STORE_URL=https://your-store-domain.com
```

### Build Settings
- **Port**: 3000 (default)
- **Dockerfile Path**: `./Dockerfile` (root of project)
- **Auto Deploy**: ✅ Enable (deploy on git push)

## Step 4: Domain Configuration

1. **Add Domain in Coolify**
   - Go to your application settings
   - Add domain: `sweetpsilocybe.com` (or your domain)
   - Coolify will auto-configure SSL with Let's Encrypt

2. **DNS Settings** (at your domain registrar)
   ```
   Type: A
   Name: @ (or www)
   Value: YOUR_COOLIFY_SERVER_IP
   ```

## Step 5: Deploy

1. Click **"Deploy"** button in Coolify
2. Watch the build logs
3. Once complete, visit your domain!

## Troubleshooting

### Build Fails
- Check build logs in Coolify dashboard
- Verify all dependencies in package.json
- Ensure Node version compatibility (18+)

### Images Not Showing
- Add images to `/public/images/` folder
- Commit and push to trigger rebuild
- Follow IMAGE-NAMING-GUIDE.md

### Database Not Connected
- Verify Supabase environment variables
- Site works in demo mode without database
- Follow SUPABASE-SETUP.md for database setup

### Port Issues
- Default port is 3000 (configured in Dockerfile)
- Coolify handles external port mapping automatically

## Post-Deployment Checklist

- [ ] Site loads at your domain
- [ ] Age gate modal appears
- [ ] All sections render correctly
- [ ] Email form works (if Supabase configured)
- [ ] Images display (after adding them)
- [ ] Mobile responsive
- [ ] SSL certificate active (https://)

## Updating the Site

```bash
# Make changes locally
git add .
git commit -m "Update: description of changes"
git push

# Coolify will auto-deploy if enabled
```

## Performance Tips

1. **Enable CDN** in Coolify settings for static assets
2. **Add caching headers** for images
3. **Monitor resource usage** in Coolify dashboard
4. **Scale horizontally** if traffic increases

## Support

- Coolify Docs: https://coolify.io/docs
- Sweet Psilocybe Issues: See README.md
- Supabase Setup: See SUPABASE-SETUP.md
