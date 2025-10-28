// Re-export all data functions for easy importing
export * from './agents';
export * from './maps';
export * from './weapons';
export * from './content';

// Combined search functionality
import { searchAgents } from './agents';
import { searchMaps } from './maps';
import { searchWeapons } from './weapons';
import { searchGuides, searchMasterClasses } from './content';

export interface SearchResult {
  type: 'agent' | 'map' | 'weapon' | 'guide' | 'masterClass';
  title: string;
  slug: string;
  description: string;
  url: string;
  relevance: number;
}

/**
 * Global search across all content types
 */
export function globalSearch(query: string, limit = 20): SearchResult[] {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];

  // Search agents
  const agents = searchAgents(query);
  agents.forEach(agent => {
    results.push({
      type: 'agent',
      title: agent.name,
      slug: agent.slug,
      description: agent.summary,
      url: `/agents/${agent.slug}`,
      relevance: calculateRelevance(query, agent.name + ' ' + agent.summary)
    });
  });

  // Search maps
  const maps = searchMaps(query);
  maps.forEach(map => {
    results.push({
      type: 'map',
      title: map.name,
      slug: map.slug,
      description: map.description,
      url: `/maps/${map.slug}`,
      relevance: calculateRelevance(query, map.name + ' ' + map.description)
    });
  });

  // Search weapons
  const weapons = searchWeapons(query);
  weapons.forEach(weapon => {
    results.push({
      type: 'weapon',
      title: weapon.name,
      slug: weapon.slug,
      description: `${weapon.type} weapon for ${weapon.agent}`,
      url: `/weapons/${weapon.slug}`,
      relevance: calculateRelevance(query, weapon.name + ' ' + weapon.type + ' ' + weapon.agent)
    });
  });

  // Search guides
  const guides = searchGuides(query);
  guides.forEach(guide => {
    results.push({
      type: 'guide',
      title: guide.title,
      slug: guide.slug,
      description: guide.excerpt,
      url: `/guides/${guide.slug}`,
      relevance: calculateRelevance(query, guide.title + ' ' + guide.excerpt)
    });
  });

  // Search master classes
  const masterClasses = searchMasterClasses(query);
  masterClasses.forEach(masterClass => {
    results.push({
      type: 'masterClass',
      title: masterClass.title,
      slug: masterClass.slug,
      description: masterClass.description,
      url: `/master-classes/${masterClass.slug}`,
      relevance: calculateRelevance(query, masterClass.title + ' ' + masterClass.description)
    });
  });

  // Sort by relevance and limit results
  return results
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit);
}

/**
 * Calculate search relevance score
 */
function calculateRelevance(query: string, text: string): number {
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  let score = 0;
  
  // Exact match in title gets highest score
  if (textLower.includes(queryLower)) {
    score += 100;
  }
  
  // Word matches
  const queryWords = queryLower.split(/\s+/);
  const textWords = textLower.split(/\s+/);
  
  queryWords.forEach(queryWord => {
    textWords.forEach(textWord => {
      if (textWord.includes(queryWord)) {
        score += queryWord.length / textWord.length * 10;
      }
    });
  });
  
  return score;
}

/**
 * Get trending/popular content
 */
export function getTrendingContent() {
  // This would typically come from analytics data
  // For now, we'll return featured content
  
  return {
    agents: [
      { name: 'Spider-Man', slug: 'spider-man', trend: '+15%' },
      { name: 'Doctor Strange', slug: 'doctor-strange', trend: '+12%' },
      { name: 'Magneto', slug: 'magneto', trend: '+8%' }
    ],
    guides: [
      { title: 'Spider-Man Complete Guide', slug: 'spider-man-complete-guide', views: 15420 },
      { title: 'Map Control Fundamentals', slug: 'map-control-fundamentals', views: 12350 },
      { title: 'Team Composition Guide', slug: 'team-composition-guide', views: 9870 }
    ],
    maps: [
      { name: 'Sanctum Sanctorum', slug: 'sanctum-sanctorum', popularity: 85 },
      { name: 'Hydra Base', slug: 'hydra-base', popularity: 78 },
      { name: 'Hellfire Gala', slug: 'hellfire-gala', popularity: 72 }
    ]
  };
}

/**
 * Get related content for a specific item
 */
export function getRelatedContent(type: string, slug: string, limit = 5) {
  // This would implement more sophisticated content recommendation
  // For now, return basic related content
  
  const related = [];
  
  switch (type) {
    case 'agent':
      // Get guides and maps related to this agent
      const agentGuides = searchGuides(slug.replace('-', ' '));
      const agentMaps = searchMaps(slug.replace('-', ' '));
      
      related.push(
        ...agentGuides.slice(0, 3).map(guide => ({
          type: 'guide',
          title: guide.title,
          url: `/guides/${guide.slug}`
        })),
        ...agentMaps.slice(0, 2).map(map => ({
          type: 'map',
          title: map.name,
          url: `/maps/${map.slug}`
        }))
      );
      break;
      
    case 'map':
      // Get agents and guides related to this map
      const mapGuides = searchGuides(slug.replace('-', ' '));
      const mapAgents = searchAgents(slug.replace('-', ' '));
      
      related.push(
        ...mapGuides.slice(0, 3).map(guide => ({
          type: 'guide',
          title: guide.title,
          url: `/guides/${guide.slug}`
        })),
        ...mapAgents.slice(0, 2).map(agent => ({
          type: 'agent',
          title: agent.name,
          url: `/agents/${agent.slug}`
        }))
      );
      break;
      
    default:
      break;
  }
  
  return related.slice(0, limit);
}

/**
 * Data validation and health check
 */
export function validateAllData() {
  const results = {
    agents: { valid: 0, invalid: 0, errors: [] as string[] },
    maps: { valid: 0, invalid: 0, errors: [] as string[] },
    weapons: { valid: 0, invalid: 0, errors: [] as string[] },
    guides: { valid: 0, invalid: 0, errors: [] as string[] },
    masterClasses: { valid: 0, invalid: 0, errors: [] as string[] }
  };

  try {
    // Validate agents
    const agents = searchAgents(''); // Gets all agents
    results.agents.valid = agents.length;
  } catch (error) {
    results.agents.errors.push(`Agent loading error: ${error}`);
  }

  try {
    // Validate maps
    const maps = searchMaps(''); // Gets all maps
    results.maps.valid = maps.length;
  } catch (error) {
    results.maps.errors.push(`Map loading error: ${error}`);
  }

  try {
    // Validate weapons
    const weapons = searchWeapons(''); // Gets all weapons
    results.weapons.valid = weapons.length;
  } catch (error) {
    results.weapons.errors.push(`Weapon loading error: ${error}`);
  }

  try {
    // Validate guides
    const guides = searchGuides(''); // Gets all guides
    results.guides.valid = guides.length;
  } catch (error) {
    results.guides.errors.push(`Guide loading error: ${error}`);
  }

  try {
    // Validate master classes
    const masterClasses = searchMasterClasses(''); // Gets all master classes
    results.masterClasses.valid = masterClasses.length;
  } catch (error) {
    results.masterClasses.errors.push(`Master class loading error: ${error}`);
  }

  return results;
}

/**
 * Cache management
 */
export function clearAllCaches() {
  // Import and call individual cache clearing functions
  try {
    const { invalidateAgentsCache } = require('./agents');
    const { invalidateMapsCache } = require('./maps');
    const { invalidateWeaponsCache } = require('./weapons');
    const { invalidateContentCache } = require('./content');
    
    invalidateAgentsCache();
    invalidateMapsCache();
    invalidateWeaponsCache();
    invalidateContentCache();
    
    return { success: true, message: 'All caches cleared successfully' };
  } catch (error) {
    return { success: false, message: `Cache clearing failed: ${error}` };
  }
}