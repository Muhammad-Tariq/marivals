# Weapon Images Guide - Marvel Rivals Hub

## 📸 How to Source Weapon Images Legally

This guide explains how to properly source and attribute images for your Marvel Rivals weapons database.

---

## ⚖️ Legal Image Sources

### 1. Official Marvel Rivals Assets
**Best Option - Always Preferred**

- **Source**: Official Marvel Rivals press kit or media resources
- **Website**: Check NetEase Games official channels
- **License**: Usually provided for fan sites and community resources
- **Attribution**: "Image courtesy of NetEase Games / Marvel Rivals"

### 2. Create Your Own Screenshots
**Recommended for Authenticity**

- Take in-game screenshots of weapons
- Use photo mode if available
- Capture high-quality images during gameplay
- Edit and crop for consistency
- **License**: You own these images
- **Attribution**: Not required (your own content)

### 3. Community-Created Assets
**With Permission Only**

- Contact artists on DeviantArt, ArtStation
- Request permission explicitly
- Provide proper attribution
- Link back to original artist
- **Attribution**: "Artwork by [Artist Name] - Used with permission"

### 4. Creative Commons Images
**Check License Carefully**

- Search on:
  - Wikimedia Commons
  - Flickr (CC licensed)
  - Unsplash (for generic weapon concepts)
- Verify license allows commercial use
- Follow attribution requirements
- **Attribution**: As specified by license

---

## ❌ What NOT to Do

### Do NOT Use Without Permission:
- ❌ Images from Fandom wikis (copyrighted)
- ❌ Fan art without artist permission
- ❌ Screenshots from other websites
- ❌ Google Images (most are copyrighted)
- ❌ Pinterest images (often stolen)
- ❌ Instagram/Twitter posts without permission

---

## 📁 Image Specifications

### Recommended Dimensions:
- **Weapon Cards**: 800x600px (4:3 ratio)
- **Detail Pages**: 1200x800px (3:2 ratio)
- **Thumbnails**: 400x300px (4:3 ratio)

### File Format:
- **Primary**: WebP (best compression)
- **Fallback**: JPG (high quality, 85-90%)
- **Transparent**: PNG (for weapon icons)

### File Naming Convention:
```
/public/images/weapons/
  ├── mjolnir.webp
  ├── mjolnir.jpg (fallback)
  ├── vibranium-claws.webp
  ├── hawkeyes-bow.webp
  └── ...
```

---

## 🎨 Creating Placeholder Images

Until you have official images, use placeholders:

### Option 1: Solid Color Backgrounds
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Option 2: Icon + Text
- Use weapon name as text overlay
- Add weapon type icon
- Use Marvel-themed colors

### Option 3: Silhouettes
- Create simple weapon silhouettes
- Use SVG for scalability
- Add glow effects for visual interest

---

## 📝 Attribution Template

When using images that require attribution, use this format:

```markdown
### Image Credits

**Mjolnir**
- Source: [Source Name]
- License: [License Type]
- Attribution: [Required Attribution Text]
- Link: [Original URL]

**Vibranium Claws**
- Source: Official Marvel Rivals Press Kit
- License: Press/Media Use
- Attribution: Image courtesy of NetEase Games / Marvel Rivals
```

---

## 🔍 Where to Find Official Assets

### Official Channels:
1. **Marvel Rivals Official Website**
   - Press/Media section
   - Downloads area
   - Community resources

2. **NetEase Games Press Center**
   - Official press releases
   - Media kits
   - High-resolution assets

3. **Marvel Games**
   - Official Marvel gaming portal
   - Asset libraries
   - Brand guidelines

4. **Social Media**
   - Official Twitter/X account
   - Official Instagram
   - Official Discord (community resources)

---

## 🛠️ Image Optimization

### Before Adding to Your Site:

1. **Resize** to appropriate dimensions
2. **Compress** using tools like:
   - TinyPNG
   - Squoosh.app
   - ImageOptim
3. **Convert** to WebP format
4. **Keep** original as backup
5. **Test** loading speed

### Optimization Tools:
```bash
# Using Sharp (Node.js)
npm install sharp

# Convert to WebP
sharp input.jpg
  .webp({ quality: 85 })
  .toFile('output.webp')
```

---

## 📋 Image Checklist

Before adding any weapon image:

- [ ] Verified source is legal to use
- [ ] Obtained permission if required
- [ ] Prepared proper attribution
- [ ] Optimized file size
- [ ] Created WebP version
- [ ] Added alt text for accessibility
- [ ] Tested on mobile devices
- [ ] Documented source in credits file

---

## 🎯 Best Practices

### 1. Consistency
- Use same aspect ratio for all weapons
- Maintain consistent lighting/style
- Apply uniform borders or frames

### 2. Quality
- Minimum 800px width for detail pages
- High resolution for zoom functionality
- Clear, unobstructed view of weapon

### 3. Accessibility
- Always include descriptive alt text
- Provide text descriptions alongside images
- Ensure images work with screen readers

### 4. Performance
- Lazy load images below the fold
- Use responsive images (srcset)
- Implement progressive loading
- Cache images appropriately

---

## 📞 Requesting Permission

### Email Template for Artists:

```
Subject: Permission Request - Marvel Rivals Fan Site

Hi [Artist Name],

I'm creating a community resource website for Marvel Rivals players 
at [your-domain.com]. I came across your amazing artwork of [weapon name] 
and would love to feature it on the site.

Would you be willing to grant permission for me to use this image? 
I will provide full attribution with your name and a link back to 
your portfolio/social media.

The site is non-commercial and purely for the Marvel Rivals community.

Thank you for considering!

Best regards,
[Your Name]
```

---

## 🔗 Useful Resources

### Image Tools:
- **Squoosh**: https://squoosh.app (image compression)
- **Remove.bg**: https://remove.bg (background removal)
- **Photopea**: https://photopea.com (free Photoshop alternative)

### Legal Resources:
- **Creative Commons**: https://creativecommons.org
- **Copyright Basics**: https://copyright.gov/help/faq

### Marvel Resources:
- **Marvel Games**: https://games.marvel.com
- **NetEase Games**: https://www.neteasegames.com

---

## ⚠️ Important Reminders

1. **When in doubt, don't use it** - If you're unsure about licensing, don't use the image
2. **Always attribute** - Even when not required, it's good practice
3. **Keep records** - Document where each image came from
4. **Update regularly** - Replace placeholders with official assets when available
5. **Respect artists** - Always credit and link to original creators

---

## 📊 Current Weapon Image Status

| Weapon | Image Status | Source | Attribution Required |
|--------|-------------|--------|---------------------|
| Web Shooters | ⏳ Placeholder | TBD | TBD |
| Repulsor Array | ⏳ Placeholder | TBD | TBD |
| Gamma Cannon | ⏳ Placeholder | TBD | TBD |
| Mjolnir | ⏳ Placeholder | TBD | TBD |
| Vibranium Claws | ⏳ Placeholder | TBD | TBD |
| Widow's Bite | ⏳ Placeholder | TBD | TBD |
| Hawkeye's Bow | ⏳ Placeholder | TBD | TBD |
| Pym Particles | ⏳ Placeholder | TBD | TBD |
| Captain America's Shield | ⏳ Placeholder | TBD | TBD |
| Stormbreaker | ⏳ Placeholder | TBD | TBD |

**Legend:**
- ✅ Official Asset
- 🎨 Community (with permission)
- 📸 Screenshot
- ⏳ Placeholder

---

*Last Updated: January 2025*
*Remember: Respecting copyright and intellectual property is crucial for maintaining a legitimate community resource!*
