# 📸 Image Naming Guide for Sweet Psilocybe

**Where to put images:** `/public/images/` folder in your project

---

## Quick Reference

| What For | File Name | Size Recommendation |
|----------|-----------|-------------------|
| Main hero background | `hero-background.jpg` | 2400x1600px, under 500KB |
| Logo (SVG preferred) | `logo.svg` or `logo.png` | 512x512px, transparent |
| Small logo for preloader | `logo-icon.svg` or `logo-icon.png` | 128x128px, transparent |
| About section image | `about-mushrooms.jpg` | 1200x800px |
| Research pillar image | `pillar-research.jpg` | 800x600px |
| Play pillar image | `pillar-play.jpg` | 800x600px |
| Shop pillar image | `pillar-shop.jpg` | 800x600px |

### Product Images (for shop showcase)
- `product-tshirt-1.jpg` (600x600px)
- `product-tshirt-2.jpg` (600x600px)
- `product-hoodie-1.jpg` (600x600px)
- `product-hoodie-2.jpg` (600x600px)
- `product-hat-1.jpg` (600x600px)
- `product-sticker-1.jpg` (600x600px)

---

## Naming Rules

### ✅ Good Names
- `hero-background.jpg`
- `product-tshirt-black.jpg`
- `about-section.png`
- `logo.svg`

### ❌ Bad Names
- `IMG_1234.jpg` (not descriptive)
- `my photo.jpg` (has spaces)
- `Product.JPG` (inconsistent capitalization)
- `hero background.png` (has spaces)

### Rules:
1. **Lowercase only:** `hero.jpg` not `Hero.jpg`
2. **Use hyphens, not spaces:** `my-image.jpg` not `my image.jpg`
3. **Be descriptive:** `mushroom-hero.jpg` not `image1.jpg`
4. **Include number if multiple:** `product-1.jpg`, `product-2.jpg`

---

## Image Guidelines

### File Formats
- **Photos:** Use `.jpg` (smaller file size)
- **Graphics/Icons:** Use `.svg` (scales perfectly) or `.png` (if transparency needed)
- **Logo:** Always `.svg` if possible (or `.png` with transparency)

### File Sizes (IMPORTANT!)
- **Hero images:** Under 500KB (use https://tinypng.com to compress)
- **Product images:** Under 200KB each
- **Icons/small images:** Under 50KB

### Dimensions
- **Hero background:** 2400x1600px (landscape)
- **Product photos:** 600x600px (square)
- **Logo:** 512x512px (square)
- **Section images:** 1200x800px (landscape)

---

## How the Website Uses Images

The website automatically looks for images by name. Here's how:

### Hero Section
Looks for: `hero-background.jpg`, `hero-background.png`, or `hero-mushroom.jpg`

### Logo
Looks for: `logo.svg`, `logo.png` (shows in header and preloader)

### Product Showcase
Looks for files starting with `product-`:
- `product-tshirt-1.jpg`
- `product-hoodie-1.jpg`
- etc.

---

## Example File Structure

```
public/
  images/
    ├── logo.svg
    ├── logo-icon.svg
    ├── hero-background.jpg
    ├── about-mushrooms.jpg
    ├── pillar-research.jpg
    ├── pillar-play.jpg
    ├── pillar-shop.jpg
    ├── product-tshirt-1.jpg
    ├── product-tshirt-2.jpg
    ├── product-hoodie-1.jpg
    ├── product-hoodie-2.jpg
    ├── product-hat-1.jpg
    └── product-sticker-1.jpg
```

---

## Where to Get Images

### Temporary Placeholders (Free)
- **Unsplash:** https://unsplash.com/s/photos/mushroom
- **Pexels:** https://www.pexels.com/search/psilocybin/

### Custom Photography
- Take your own photos of mushrooms in nature
- Use a macro lens for detailed shots
- Natural lighting works best

### Graphic Design
- **Canva:** https://canva.com (easy drag-and-drop)
- **Figma:** https://figma.com (more advanced)

---

## Image Optimization Tools

### Before uploading, compress images:

1. **TinyPNG** (best for photos)
   - Go to: https://tinypng.com
   - Drag your images
   - Download compressed versions
   - Usually 50-70% smaller with no visible quality loss

2. **Squoosh** (advanced options)
   - Go to: https://squoosh.app
   - Upload image
   - Adjust quality slider (80% is usually perfect)
   - Download

---

## Adding New Images

1. **Save** your image with the correct name (see naming rules above)
2. **Compress** it using TinyPNG
3. **Move** it to `/public/images/` folder
4. **Restart** your dev server (stop with Ctrl+C, then run `npm run dev` again)
5. **Check** your website - image should appear automatically!

---

## Quick Checklist

Before adding images to the project:

- [ ] File name is lowercase with hyphens
- [ ] File name is descriptive (not IMG_1234.jpg)
- [ ] Image is compressed (under size limits above)
- [ ] Image has correct dimensions
- [ ] Logo is SVG format (or PNG with transparency)
- [ ] Hero image is under 500KB
- [ ] Product images are square (600x600px)

---

## 🎨 Brand Colors for Reference

When editing images or creating graphics, use these Sweet Psilocybe brand colors:

- **Ink (Dark Black):** `#0B0B0B`
- **Petal (Pink - PRIMARY):** `#F6AFCF`
- **Spore (Soft Pink):** `#FFEDEE`
- **Fern (Sage Green):** `#A9C0B0`
- **Cream (Warm Cream):** `#F7F3EF`

---

**Need help?** Just add your images to `/public/images/` and name them clearly. The website will find them!

**Last updated:** November 2025
