import { Guide, MasterClass, GuideFilters } from '@/lib/types';

// Sample data for now - in production this would come from a CMS or API
const sampleGuides: Guide[] = [
  {
    title: "Spider-Man Complete Guide",
    slug: "spider-man-complete-guide",
    excerpt: "Master Spider-Man's mobility and positioning with this comprehensive guide covering abilities, combos, and advanced techniques.",
    image: "/images/agents/Marvel_Rivals_hero_Spider_Man.png",
    body: `# Spider-Man Complete Guide

Spider-Man is one of the most mobile duelists in Marvel Rivals, excelling at vertical control and pick potential. This comprehensive guide covers everything you need to master the web-slinger.

## Abilities Overview

### Web Shot (Primary)
- **Damage**: 65 per shot
- **Fire Rate**: 450 RPM  
- **Range**: 25m
- **Notes**: Rapid fire web projectiles with slight spread

### Web Swing (Utility)
- **Cooldown**: 10 seconds
- **Range**: 30m
- **Notes**: Swing to target location, can cancel early

### Spider Sense (Utility)  
- **Cooldown**: 18 seconds
- **Notes**: Brief invulnerability and movement speed boost

### Maximum Spider (Ultimate)
- **Cooldown**: 120 seconds
- **Notes**: Enhanced abilities and web dome area control

## Advanced Techniques

1. **Web Swing Canceling**: Cancel your web swing early to maintain momentum
2. **Vertical Positioning**: Use walls and ceilings for unexpected angles  
3. **Ability Combos**: Combine Spider Sense with Web Swing for safe escapes

## Team Synergies

- **Iron Man**: Coordinate aerial attacks for devastating combos
- **Doctor Strange**: Use portals to extend web swing range

## Counters and How to Deal with Them

- **Hawkeye**: Stay mobile and use cover to avoid long-range shots
- **Hulk**: Keep your distance and use vertical advantage`,
    tags: ["duelist", "mobility", "beginner"],
    relatedAgents: ["Spider-Man"],
    relatedMaps: ["Sanctum Sanctorum", "Hellfire Gala"],
    difficulty: "Medium",
    readTime: 8,
    patch: "Season 1",
    updatedAt: "2025-01-08T00:00:00Z",
    author: "Marvel Rivals HQ",
    featured: true
  },
  {
    title: "Map Control Fundamentals",
    slug: "map-control-fundamentals",
    excerpt: "Essential positioning and map awareness tactics for competitive play.",
    image: "/images/maps/Marvel_Rivals_map_Central_Park.jpg",
    body: `# Map Control Fundamentals

Understanding map control is crucial for success in Marvel Rivals. This guide covers the essential concepts of positioning, map awareness, and territorial control.

## Key Concepts

### High Ground Advantage
- Always prioritize high ground positions when possible
- High ground provides better sightlines and escape routes
- Forces enemies to look up, limiting their awareness

### Chokepoint Control
- Identify and control key chokepoints on each map
- Use area denial abilities to block enemy movement
- Coordinate with team to maintain chokepoint pressure

### Rotation Timing
- Learn optimal rotation paths between objectives
- Time rotations with team ability cooldowns
- Avoid rotating through enemy-controlled territory

## Map-Specific Tips

### Sanctum Sanctorum
- Control the central platform for map dominance
- Use the side rooms for flanking opportunities
- Watch for enemy rotations through the portal areas

### Hydra Base
- The upper walkways provide excellent overwatch positions
- Control the central bridge to limit enemy movement
- Use the side corridors for safe rotations`,
    tags: ["strategy", "positioning", "intermediate"],
    relatedAgents: [],
    relatedMaps: ["Hydra Base", "Sanctum Sanctorum"],
    difficulty: "Easy",
    readTime: 6,
    patch: "Season 1",
    updatedAt: "2025-01-07T00:00:00Z",
    author: "Marvel Rivals HQ",
    featured: true
  },
  {
    title: "Team Composition Guide",
    slug: "team-composition-guide",
    excerpt: "Building synergistic team compositions for maximum effectiveness.",
    image: "/images/agents/Marvel_Rivals_hero_Doctor_Strange.png",
    body: `# Team Composition Guide

Building effective team compositions is essential for competitive success in Marvel Rivals. This guide covers the fundamentals of team building and synergy optimization.

## Core Composition Framework

### Standard 2-2-2 Format
- 2 Duelists (Damage dealers)
- 2 Vanguards (Tanks/Frontline)  
- 2 Strategists (Support/Utility)

### Role Synergies

#### Duelist Combinations
- **Spider-Man + Iron Man**: Aerial dominance and mobility
- **Hawkeye + Black Widow**: Long-range pressure and picks
- **Hulk + Thor**: Heavy frontline presence

#### Support Synergies  
- **Doctor Strange + Mantis**: Utility and healing balance
- **Adam Warlock + Luna Snow**: Resurrection and crowd control
- **Loki + Emma Frost**: Mind games and area denial

## Advanced Team Building

### Win Conditions
- Identify your team's primary win condition
- Build around key ultimates and ability combinations
- Consider map-specific advantages

### Counter-Picking
- Analyze enemy composition weaknesses
- Adapt picks based on enemy strategy
- Maintain team synergy while counter-picking

### Communication Requirements
- Establish clear shot-calling hierarchy
- Coordinate ultimate usage timing
- Practice team fight execution`,
    tags: ["strategy", "teamwork", "advanced"],
    relatedAgents: ["Spider-Man", "Doctor Strange", "Hulk"],
    relatedMaps: [],
    difficulty: "Hard",
    readTime: 12,
    patch: "Season 1",
    updatedAt: "2025-01-06T00:00:00Z",
    author: "Marvel Rivals HQ",
    featured: true
  },
  {
    title: "Ranked Climbing Mindset",
    slug: "ranked-climbing-mindset",
    excerpt: "Mental strategies and psychological approaches for competitive climbing.",
    image: "/images/agents/Marvel_Rivals_gameasset_hero_Magneto.png",
    body: "Mindset guide content here...",
    tags: ["psychology", "ranked", "intermediate"],
    relatedAgents: [],
    relatedMaps: [],
    difficulty: "Medium",
    readTime: 10,
    patch: "Season 1",
    updatedAt: "2025-01-05T00:00:00Z",
    author: "Marvel Rivals HQ",
    featured: false
  }
];

const sampleMasterClasses: MasterClass[] = [
  {
    title: "Duelist Mastery Course",
    slug: "duelist-mastery-course",
    description: "Complete course covering all aspects of playing duelist heroes effectively in Marvel Rivals.",
    chapters: [
      {
        id: "fundamentals",
        title: "Duelist Fundamentals",
        content: "Learn the core principles of playing duelist heroes including positioning, target prioritization, and ability usage."
      },
      {
        id: "advanced-techniques",
        title: "Advanced Techniques",
        content: "Master advanced duelist techniques including animation canceling, combo execution, and team fight positioning."
      }
    ],
    difficulty: "Hard",
    estimatedTime: 120,
    tags: ["duelist", "advanced", "positioning"],
    patch: "Season 1",
    updatedAt: "2025-01-08T00:00:00Z",
    author: "Marvel Rivals HQ",
    featured: true
  }
];

// Cache for processed content
let guidesCache: Guide[] | null = null;
let masterClassesCache: MasterClass[] | null = null;

/**
 * Load and process all guides
 */
function loadGuides(): Guide[] {
  if (guidesCache) {
    return guidesCache;
  }

  // Use sample data for now - in production this would come from a CMS or API
  guidesCache = [...sampleGuides];
  return guidesCache;
}

/**
 * Load and process all master classes
 */
function loadMasterClasses(): MasterClass[] {
  if (masterClassesCache) {
    return masterClassesCache;
  }

  // Use sample data for now - in production this would come from a CMS or API
  masterClassesCache = [...sampleMasterClasses];
  return masterClassesCache;
}

/**
 * Get all guides with optional filtering and sorting
 */
export function getGuides(
  filters?: GuideFilters,
  sortBy: keyof Guide = 'updatedAt',
  sortOrder: 'asc' | 'desc' = 'desc'
): Guide[] {
  let guides = loadGuides();

  // Apply filters
  if (filters) {
    guides = guides.filter(guide => {
      if (filters.role && !guide.relatedAgents.some(agent => 
        // This would need to be enhanced with actual agent role lookup
        true // Placeholder - would check agent roles
      )) return false;
      
      if (filters.map && !guide.relatedMaps.includes(filters.map)) return false;
      if (filters.difficulty && guide.difficulty !== filters.difficulty) return false;
      if (filters.patch && guide.patch !== filters.patch) return false;
      
      if (filters.readTime) {
        const readTime = guide.readTime;
        switch (filters.readTime) {
          case 'short':
            if (readTime >= 5) return false;
            break;
          case 'medium':
            if (readTime < 5 || readTime > 15) return false;
            break;
          case 'long':
            if (readTime <= 15) return false;
            break;
        }
      }
      
      return true;
    });
  }

  // Apply sorting
  guides.sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];

    if (sortBy === 'updatedAt') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  return guides;
}

/**
 * Get all master classes with optional filtering and sorting
 */
export function getMasterClasses(
  sortBy: keyof MasterClass = 'updatedAt',
  sortOrder: 'asc' | 'desc' = 'desc'
): MasterClass[] {
  let masterClasses = loadMasterClasses();

  // Apply sorting
  masterClasses.sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];

    if (sortBy === 'updatedAt') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  return masterClasses;
}

/**
 * Get a single guide by slug
 */
export function getGuideBySlug(slug: string): Guide | null {
  const guides = loadGuides();
  return guides.find(guide => guide.slug === slug) || null;
}

/**
 * Get a single master class by slug
 */
export function getMasterClassBySlug(slug: string): MasterClass | null {
  const masterClasses = loadMasterClasses();
  return masterClasses.find(masterClass => masterClass.slug === slug) || null;
}

/**
 * Get featured guides
 */
export function getFeaturedGuides(limit = 4): Guide[] {
  const guides = loadGuides();
  return guides
    .filter(guide => guide.featured)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
}

/**
 * Get featured master classes
 */
export function getFeaturedMasterClasses(limit = 3): MasterClass[] {
  const masterClasses = loadMasterClasses();
  return masterClasses
    .filter(masterClass => masterClass.featured)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
}

/**
 * Search guides by title, excerpt, or content
 */
export function searchGuides(query: string): Guide[] {
  if (!query.trim()) return [];

  const guides = loadGuides();
  const searchTerm = query.toLowerCase();

  return guides.filter(guide => 
    guide.title.toLowerCase().includes(searchTerm) ||
    guide.excerpt.toLowerCase().includes(searchTerm) ||
    guide.body.toLowerCase().includes(searchTerm) ||
    guide.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

/**
 * Search master classes by title, description, or content
 */
export function searchMasterClasses(query: string): MasterClass[] {
  if (!query.trim()) return [];

  const masterClasses = loadMasterClasses();
  const searchTerm = query.toLowerCase();

  return masterClasses.filter(masterClass => 
    masterClass.title.toLowerCase().includes(searchTerm) ||
    masterClass.description.toLowerCase().includes(searchTerm) ||
    masterClass.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    masterClass.chapters.some(chapter => 
      chapter.title.toLowerCase().includes(searchTerm) ||
      chapter.content.toLowerCase().includes(searchTerm)
    )
  );
}

/**
 * Get related guides for an agent
 */
export function getGuidesForAgent(agentName: string): Guide[] {
  const guides = loadGuides();
  return guides.filter(guide => 
    guide.relatedAgents.includes(agentName)
  );
}

/**
 * Get related guides for a map
 */
export function getGuidesForMap(mapName: string): Guide[] {
  const guides = loadGuides();
  return guides.filter(guide => 
    guide.relatedMaps.includes(mapName)
  );
}

/**
 * Get content statistics
 */
export function getContentStats() {
  const guides = loadGuides();
  const masterClasses = loadMasterClasses();
  
  const guideStats = {
    total: guides.length,
    byDifficulty: guides.reduce((acc, guide) => {
      acc[guide.difficulty] = (acc[guide.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    averageReadTime: Math.round(guides.reduce((sum, guide) => sum + guide.readTime, 0) / guides.length),
    featured: guides.filter(guide => guide.featured).length,
  };

  const masterClassStats = {
    total: masterClasses.length,
    byDifficulty: masterClasses.reduce((acc, masterClass) => {
      acc[masterClass.difficulty] = (acc[masterClass.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    averageTime: Math.round(masterClasses.reduce((sum, masterClass) => sum + masterClass.estimatedTime, 0) / masterClasses.length),
    totalChapters: masterClasses.reduce((sum, masterClass) => sum + masterClass.chapters.length, 0),
    featured: masterClasses.filter(masterClass => masterClass.featured).length,
  };

  return {
    guides: guideStats,
    masterClasses: masterClassStats,
    lastUpdated: Math.max(
      ...guides.map(guide => new Date(guide.updatedAt).getTime()),
      ...masterClasses.map(masterClass => new Date(masterClass.updatedAt).getTime())
    )
  };
}

/**
 * Invalidate content cache
 */
export function invalidateContentCache(): void {
  guidesCache = null;
  masterClassesCache = null;
}