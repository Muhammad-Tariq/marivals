# Marvel Rivals Blog - Complete Sitemap

## Overview
This document provides a complete sitemap of all pages and routes in the Marvel Rivals blog application.

**Total Pages**: 92 static pages
**Base URL**: http://localhost:3000 (Development)

---

## Main Navigation Pages

### 1. Home Page
- **URL**: `/`
- **Description**: Landing page with hero section, featured content, leaderboard preview, and latest updates
- **Features**: 
  - Hero banner with CTA
  - Featured guides preview
  - Leaderboard preview (top 5 players)
  - Latest news and updates
  - Quick stats overview

### 2. Agents Hub
- **URL**: `/agents`
- **Description**: Browse all 44 Marvel Rivals heroes
- **Features**:
  - Grid view of all agents
  - Filter by role (Duelist, Vanguard, Strategist)
  - Filter by difficulty (Easy, Medium, Hard)
  - Search functionality
  - Agent cards with portraits and basic info

### 3. Weapons Hub
- **URL**: `/weapons`
- **Description**: Explore all weapons and their stats
- **Features**:
  - Grid view of 10 weapons
  - Filter by weapon type
  - Filter by agent
  - Weapon cards with images and stats
  - Damage, fire rate, and handling info

### 4. Maps Hub
- **URL**: `/maps`
- **Description**: Detailed map information and strategies
- **Features**:
  - Grid view of 14 maps
  - Filter by game mode
  - Filter by biome
  - Map cards with images
  - Callouts and strategy info

### 5. Guides Hub
- **URL**: `/guides`
- **Description**: Comprehensive gameplay guides
- **Features**:
  - 6 detailed guides
  - Filter by difficulty
  - Filter by role
  - Read time indicators
  - Featured guides section

### 6. Master Classes Hub
- **URL**: `/master-classes`
- **Description**: In-depth training courses
- **Features**:
  - 4 comprehensive courses
  - Course duration and chapter count
  - Difficulty badges
  - Progress tracking
  - Role-specific training

### 7. Leaderboard
- **URL**: `/leaderboard`
- **Description**: Competitive rankings
- **Features**:
  - Top 25 players
  - Filter by platform (PC, PlayStation, Xbox)
  - Filter by region
  - Win rates and main agents
  - Rank change indicators

---

## Agent Detail Pages (44 Total)

**Base URL**: `/agents/[slug]`

### Vanguards (15 agents)
1. `/agents/bruce-banner` - Bruce Banner (Hulk)
2. `/agents/captain-america` - Captain America
3. `/agents/doctor-strange` - Doctor Strange
4. `/agents/groot` - Groot
5. `/agents/magneto` - Magneto
6. `/agents/peni-parker` - Peni Parker
7. `/agents/thor` - Thor
8. `/agents/venom` - Venom
9. `/agents/captain-marvel` - Captain Marvel
10. `/agents/colossus` - Colossus
11. `/agents/juggernaut` - Juggernaut
12. `/agents/mister-fantastic` - Mister Fantastic
13. `/agents/namor` - Namor
14. `/agents/thing` - The Thing
15. `/agents/wolverine` - Wolverine

### Duelists (15 agents)
16. `/agents/angela` - Angela
17. `/agents/black-panther` - Black Panther
18. `/agents/black-widow` - Black Widow
19. `/agents/hawkeye` - Hawkeye
20. `/agents/hela` - Hela
21. `/agents/iron-man` - Iron Man
22. `/agents/magik` - Magik
23. `/agents/moon-knight` - Moon Knight
24. `/agents/namor` - Namor
25. `/agents/psylocke` - Psylocke
26. `/agents/punisher` - Punisher
27. `/agents/scarlet-witch` - Scarlet Witch
28. `/agents/spider-man` - Spider-Man
29. `/agents/squirrel-girl` - Squirrel Girl
30. `/agents/star-lord` - Star-Lord
31. `/agents/storm` - Storm
32. `/agents/winter-soldier` - Winter Soldier

### Strategists (14 agents)
33. `/agents/adam-warlock` - Adam Warlock
34. `/agents/cloak-and-dagger` - Cloak & Dagger
35. `/agents/emma-frost` - Emma Frost
36. `/agents/invisible-woman` - Invisible Woman
37. `/agents/jeff-the-land-shark` - Jeff the Land Shark
38. `/agents/loki` - Loki
39. `/agents/luna-snow` - Luna Snow
40. `/agents/mantis` - Mantis
41. `/agents/rocket-raccoon` - Rocket Raccoon
42. `/agents/human-torch` - Human Torch
43. `/agents/iron-fist` - Iron Fist
44. `/agents/daredevil` - Daredevil

**Features on Agent Detail Pages**:
- Full agent portrait
- Role and difficulty badges
- Complete ability breakdown with cooldowns
- Strengths and limitations
- Team synergies and counters
- Best maps and strategies
- Patch information

---

## Weapon Detail Pages (10 Total)

**Base URL**: `/weapons/[slug]`

1. `/weapons/web-shooters` - Web Shooters (Spider-Man)
2. `/weapons/repulsor-array` - Repulsor Array (Iron Man)
3. `/weapons/gamma-cannon` - Gamma Cannon (Hulk)
4. `/weapons/mjolnir` - Mjolnir (Thor)
5. `/weapons/vibranium-claws` - Vibranium Claws (Black Panther)
6. `/weapons/widows-bite` - Widow's Bite (Black Widow)
7. `/weapons/hawkeyes-bow` - Hawkeye's Bow (Hawkeye)
8. `/weapons/pym-particles` - Pym Particles (Ant-Man)
9. `/weapons/captain-americas-shield` - Captain America's Shield
10. `/weapons/stormbreaker` - Stormbreaker/Jarnbjorn (Thor)

**Features on Weapon Detail Pages**:
- Weapon image
- Damage stats (base, headshot, falloff)
- Fire rate and range
- Handling stats (recoil, accuracy, mobility)
- Perks and special abilities
- Best users and map compatibility
- Pros and cons analysis
- Detailed description

---

## Map Detail Pages (14 Total)

**Base URL**: `/maps/[slug]`

1. `/maps/arakko` - Arakko
2. `/maps/birnin-tchalla` - Birnin T'Challa
3. `/maps/celestial-husk` - Celestial Husk
4. `/maps/central-park` - Central Park
5. `/maps/hall-of-djalia` - Hall of Djalia
6. `/maps/hellfire-gala` - Hellfire Gala
7. `/maps/hydra-base` - Hydra Base
8. `/maps/midtown` - Midtown
9. `/maps/royal-palace` - Royal Palace
10. `/maps/sanctum-sanctorum` - Sanctum Sanctorum
11. `/maps/spider-islands` - Spider Islands
12. `/maps/tokyo-2099` - Tokyo 2099
13. `/maps/wakanda` - Wakanda
14. `/maps/yggdrasill-path` - Yggdrasill Path

**Features on Map Detail Pages**:
- Map image
- Biome and game modes
- Callout locations
- Chokepoints and flanking routes
- Destructible elements
- Recommended team compositions
- Strategic tips
- Patch information

---

## Guide Detail Pages (6 Total)

**Base URL**: `/guides/[slug]`

1. `/guides/spider-man-complete-guide` - Spider-Man Complete Guide
   - Difficulty: Medium
   - Read Time: 8 minutes
   - Tags: duelist, mobility, beginner

2. `/guides/iron-man-complete-guide` - Iron Man Complete Guide
   - Difficulty: Hard
   - Read Time: 12 minutes
   - Tags: duelist, flight, energy, advanced

3. `/guides/thor-complete-guide` - Thor Complete Guide
   - Difficulty: Medium
   - Read Time: 10 minutes
   - Tags: vanguard, melee, tank, intermediate

4. `/guides/map-control-fundamentals` - Map Control Fundamentals
   - Difficulty: Easy
   - Read Time: 6 minutes
   - Tags: strategy, positioning, intermediate

5. `/guides/team-composition-guide` - Team Composition Guide
   - Difficulty: Hard
   - Read Time: 12 minutes
   - Tags: strategy, teamwork, advanced

6. `/guides/ranked-climbing-mindset` - Ranked Climbing Mindset
   - Difficulty: Medium
   - Read Time: 10 minutes
   - Tags: psychology, ranked, intermediate

**Features on Guide Detail Pages**:
- Full guide content in MDX format
- Table of contents
- Related agents and maps
- Difficulty and read time
- Author information
- Tags for categorization

---

## Master Class Detail Pages (4 Total)

**Base URL**: `/master-classes/[slug]`

1. `/master-classes/vanguard-mastery` - Vanguard Mastery
   - Role: Vanguard
   - Difficulty: Medium
   - Duration: 180 minutes
   - Chapters: 6
   - Featured: Yes

2. `/master-classes/strategist-mastery` - Strategist Mastery
   - Role: Strategist
   - Difficulty: Medium
   - Duration: 175 minutes
   - Chapters: 6
   - Featured: Yes

3. `/master-classes/duelist-mastery` - Duelist Mastery
   - Role: Duelist
   - Difficulty: Hard
   - Duration: 170 minutes
   - Chapters: 6
   - Featured: Yes

4. `/master-classes/competitive-fundamentals` - Competitive Fundamentals
   - Role: General
   - Difficulty: Easy
   - Duration: 120 minutes
   - Chapters: 5
   - Featured: No

**Features on Master Class Detail Pages**:
- Course overview
- Chapter list with durations
- Progress tracking
- Course content
- Downloadable resources
- Related courses
- Completion certificates

---

## Legal & Support Pages

### 8. Privacy Policy
- **URL**: `/privacy`
- **Description**: Privacy policy and data handling information
- **Features**:
  - Data collection practices
  - Cookie policy
  - User rights
  - Contact information

### 9. Terms of Service
- **URL**: `/terms`
- **Description**: Terms and conditions for using the site
- **Features**:
  - User agreements
  - Content usage rights
  - Liability disclaimers
  - Governing law

### 10. Contact
- **URL**: `/contact`
- **Description**: Contact form and support information
- **Features**:
  - Interactive contact form
  - Category selection
  - Response time indicators
  - FAQ section
  - Social media links

---

## Site Statistics

### Content Summary
- **Total Pages**: 92
- **Agents**: 44 (15 Vanguards, 15 Duelists, 14 Strategists)
- **Weapons**: 10
- **Maps**: 14
- **Guides**: 6
- **Master Classes**: 4
- **Leaderboard Entries**: 25 players
- **Main Navigation Pages**: 7
- **Legal/Support Pages**: 3

### Content by Category
- **Hero Content**: 44 agent pages
- **Equipment Content**: 10 weapon pages
- **Map Content**: 14 map pages
- **Educational Content**: 10 pages (6 guides + 4 master classes)
- **Community Content**: 1 leaderboard page
- **Utility Pages**: 4 pages (home, contact, privacy, terms)

### Image Assets
- **Agent Images**: 44 portraits
- **Weapon Images**: 11 files (10 connected, 1 unused)
- **Map Images**: 14 images
- **Guide Images**: 6 featured images
- **Master Class Images**: 4 course images

---

## Navigation Structure

```
Home (/)
├── Agents (/agents)
│   └── [44 agent detail pages]
├── Weapons (/weapons)
│   └── [10 weapon detail pages]
├── Maps (/maps)
│   └── [14 map detail pages]
├── Guides (/guides)
│   └── [6 guide detail pages]
├── Master Classes (/master-classes)
│   └── [4 course detail pages]
├── Leaderboard (/leaderboard)
├── Contact (/contact)
├── Privacy Policy (/privacy)
└── Terms of Service (/terms)
```

---

## SEO & Technical Details

### Meta Information
- All pages have unique titles and descriptions
- Proper canonical URLs
- Open Graph tags for social sharing
- Structured data (JSON-LD) for rich snippets
- Breadcrumb navigation

### Performance
- Static Site Generation (SSG) for all pages
- Optimized images with Next.js Image component
- Code splitting and lazy loading
- Core Web Vitals optimized
- Fast page load times

### Accessibility
- WCAG AA compliant
- Keyboard navigation support
- Screen reader friendly
- Proper ARIA labels
- Focus indicators

---

## Future Expansion Opportunities

### Potential New Pages
1. **News/Blog Section**: Latest updates and patch notes
2. **Tier Lists**: Community-driven hero rankings
3. **Build Calculator**: Custom loadout creator
4. **Match History**: Player statistics tracking
5. **Team Finder**: LFG functionality
6. **Tournament Hub**: Competitive event information
7. **Patch Notes Archive**: Historical game updates
8. **Community Highlights**: Featured plays and content
9. **Streamer Directory**: Content creator listings
10. **Wiki Section**: Detailed game mechanics

### Content Expansion
- More agent-specific guides (38 remaining agents)
- Map-specific strategy guides
- Role-specific advanced courses
- Seasonal content updates
- Community-contributed guides
- Video tutorial integration

---

## Development URLs

- **Local Development**: http://localhost:3000
- **Network Access**: http://192.168.1.31:3000

---

## Last Updated
January 2025 - Season 1

---

## Notes
- All routes are statically generated at build time
- Dynamic routes use `generateStaticParams` for SSG
- Images are optimized and served via Next.js Image component
- All content is type-safe with TypeScript
- Responsive design works on all devices
- Dark theme optimized for gaming aesthetic
