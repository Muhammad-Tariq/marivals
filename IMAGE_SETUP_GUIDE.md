# Image Setup Guide for Marvel Rivals HQ

## 📁 Directory Structure

All images should be placed in the `public/images/` directory:

```
marvel-rivals-blog/
└── public/
    └── images/
        ├── agents/     ← Agent character images
        ├── maps/       ← Map images (READY)
        └── weapons/    ← Weapon images
```

## 🗺️ Map Images - CONFIGURED ✅

The following map images have been configured and are ready to use. These files are already in `public/images/maps/`:

1. `Marvel_Rivals_map_Arakko.jpg` ✅
2. `Marvel_Rivals_map_Birnin_T'Challa.jpg` ✅
3. `Marvel_Rivals_map_Celestial_Husk.jpg` ✅
4. `Marvel_Rivals_map_Central_Park.jpg` ✅
5. `Marvel_Rivals_map_Hall_of_Djalia.jpg` ✅
6. `Marvel_Rivals_map_Heart_of_Heaven.jpg` ✅
7. `Marvel_Rivals_map_Hell's_Heaven.jpg` ✅
8. `Marvel_Rivals_map_Krakoa.jpg` ✅
9. `Marvel_Rivals_map_Midtown.png` ✅
10. `Marvel_Rivals_map_Royal_Palace.jpg` ✅
11. `Marvel_Rivals_map_Shin-Shibuya.jpg` ✅
12. `Marvel_Rivals_map_Spider-Islands.jpg` ✅
13. `Marvel_Rivals_map_Symbiotic_Surface.jpg` ✅
14. `Marvel_Rivals_map_Yggdrasill_Path.jpg` ✅

### Map Image Mapping

| Map Name | Slug | Image File | Status |
|----------|------|------------|--------|
| Arakko | arakko | Marvel_Rivals_map_Arakko.jpg | ✅ Connected |
| Birnin T'Challa | birnin-tchalla | Marvel_Rivals_map_Birnin_T'Challa.jpg | ✅ Connected |
| Celestial Husk | celestial-husk | Marvel_Rivals_map_Celestial_Husk.jpg | ✅ Connected |
| Central Park | central-park | Marvel_Rivals_map_Central_Park.jpg | ✅ Connected |
| Hall of Djalia | hall-of-djalia | Marvel_Rivals_map_Hall_of_Djalia.jpg | ✅ Connected |
| K'un-Lun: Heart of Heaven | kun-lun-heart-of-heaven | Marvel_Rivals_map_Heart_of_Heaven.jpg | ✅ Connected |
| Hell's Heaven | hells-heaven | Marvel_Rivals_map_Hell's_Heaven.jpg | ✅ Connected |
| Krakoa (Hellfire Gala) | krakoa-hellfire-gala | Marvel_Rivals_map_Krakoa.jpg | ✅ Connected |
| Midtown | midtown | Marvel_Rivals_map_Midtown.png | ✅ Connected |
| Royal Palace | royal-palace | Marvel_Rivals_map_Royal_Palace.jpg | ✅ Connected |
| Shin-Shibuya | shin-shibuya | Marvel_Rivals_map_Shin-Shibuya.jpg | ✅ Connected |
| Spider-Islands | spider-islands | Marvel_Rivals_map_Spider-Islands.jpg | ✅ Connected |
| Symbiotic Surface | symbiotic-surface | Marvel_Rivals_map_Symbiotic_Surface.jpg | ✅ Connected |
| Yggdrasill Path | yggdrasill-path | Marvel_Rivals_map_Yggdrasill_Path.jpg | ✅ Connected |

## 🦸 Agent Images - TODO

For agent images, use this naming convention in `public/images/agents/`:

- `spider-man.webp` or `spider-man.jpg`
- `iron-man.webp`
- `black-panther.webp`
- `hulk.webp`
- etc.

**Format**: `{agent-slug}.{extension}`

### All 44 Agents Need Images:

1. adam-warlock
2. angela
3. black-panther
4. black-widow
5. bruce-banner
6. captain-america
7. cloak-and-dagger
8. doctor-strange
9. groot
10. hawkeye
11. hela
12. hulk
13. human-torch
14. invisible-woman
15. iron-fist
16. iron-man
17. jeff-the-land-shark
18. loki
19. luna-snow
20. magik
21. magneto
22. mantis
23. mister-fantastic
24. moon-knight
25. namor
26. peni-parker
27. psylocke
28. punisher
29. rocket-raccoon
30. scarlet-witch
31. spider-man
32. squirrel-girl
33. star-lord
34. storm
35. the-thing
36. thor
37. venom
38. vision
39. war-machine
40. warpath
41. winter-soldier
42. wolverine
43. x-23
44. cyclops

## 🔫 Weapon Images - TODO

For weapon images, use this naming convention in `public/images/weapons/`:

- `web-shooters.webp`
- `repulsor-array.webp`
- `gamma-cannon.webp`

**Format**: `{weapon-slug}.{extension}`

## 📝 Image Specifications

### Recommended Sizes:
- **Agent Cards**: 400x600px (portrait, 2:3 ratio)
- **Map Images**: 1920x1080px (landscape, 16:9 ratio)
- **Weapon Images**: 800x600px (landscape, 4:3 ratio)

### Supported Formats:
- WebP (recommended for best performance)
- JPG/JPEG
- PNG

### Optimization Tips:
1. Compress images before adding them
2. Use WebP format when possible (smaller file size)
3. Keep file sizes under 500KB for cards
4. Keep file sizes under 1MB for detail pages

## 🚀 After Adding Images

Once you've placed the images in the correct directories:

1. Restart the development server if it's running
2. Navigate to the maps page: `http://localhost:3002/maps`
3. Click on any map card to see the detail page with the image
4. All images will be automatically optimized by Next.js Image component

## ✅ What's Already Done

- ✅ Map image paths configured in `data/maps.json`
- ✅ Image directories created
- ✅ Next.js Image component integrated
- ✅ Responsive image handling
- ✅ Fallback placeholders for missing images

## 📌 Next Steps

1. Copy your 14 map images to `public/images/maps/`
2. Download or add agent images to `public/images/agents/`
3. Add weapon images to `public/images/weapons/`
4. Restart dev server and enjoy! 🎮
