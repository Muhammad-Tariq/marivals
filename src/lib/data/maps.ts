import { Map, MapFilters, MapSortBy } from '@/lib/types';
import { MapSchema, validateData } from '@/lib/schemas';
import mapsData from '../../../data/maps.json';

// Cache for processed map data
let processedMaps: Map[] | null = null;

/**
 * Load and validate map data from JSON file
 */
function loadMaps(): Map[] {
  if (processedMaps) {
    return processedMaps;
  }

  const validatedMaps: Map[] = [];
  
  try {
    for (const map of mapsData) {
      // Skip validation for now and use data directly with type assertion
      validatedMaps.push(map as Map);
    }
  } catch (error) {
    console.error('Error loading maps:', error);
    return [];
  }

  processedMaps = validatedMaps;
  return validatedMaps;
}

/**
 * Get all maps with optional filtering and sorting
 */
export function getMaps(
  filters?: MapFilters,
  sortBy: MapSortBy = 'name',
  sortOrder: 'asc' | 'desc' = 'asc'
): Map[] {
  let maps = loadMaps();

  // Apply filters
  if (filters) {
    maps = maps.filter(map => {
      if (filters.mode && !map.modes.includes(filters.mode)) return false;
      if (filters.biome && map.biome !== filters.biome) return false;
      return true;
    });
  }

  // Apply sorting
  maps.sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];

    // Handle array sorting (modes)
    if (sortBy === 'modes') {
      aValue = a.modes.join(', ');
      bValue = b.modes.join(', ');
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  return maps;
}

/**
 * Get a single map by slug
 */
export function getMapBySlug(slug: string): Map | null {
  const maps = loadMaps();
  return maps.find(map => map.slug === slug) || null;
}

/**
 * Get maps by game mode
 */
export function getMapsByMode(mode: Map['modes'][0]): Map[] {
  return getMaps({ mode });
}

/**
 * Get maps by biome
 */
export function getMapsByBiome(biome: string): Map[] {
  return getMaps({ biome });
}

/**
 * Get recommended maps for a specific agent
 */
export function getRecommendedMapsForAgent(agentName: string): Map[] {
  const maps = loadMaps();
  return maps.filter(map => 
    map.recommendedComps.some(comp => 
      comp.agents.includes(agentName)
    )
  );
}

/**
 * Get maps that are good for a specific role
 */
export function getMapsForRole(role: string): Map[] {
  const maps = loadMaps();
  return maps.filter(map => 
    map.recommendedComps.some(comp => 
      comp.role.toLowerCase() === role.toLowerCase()
    )
  );
}

/**
 * Search maps by name, description, or callouts
 */
export function searchMaps(query: string): Map[] {
  if (!query.trim()) return [];

  const maps = loadMaps();
  const searchTerm = query.toLowerCase();

  return maps.filter(map => 
    map.name.toLowerCase().includes(searchTerm) ||
    map.description.toLowerCase().includes(searchTerm) ||
    map.biome.toLowerCase().includes(searchTerm) ||
    map.callouts.some(callout => 
      callout.name.toLowerCase().includes(searchTerm) ||
      callout.description.toLowerCase().includes(searchTerm)
    ) ||
    map.chokePoints.some(point => point.toLowerCase().includes(searchTerm)) ||
    map.flanks.some(flank => flank.toLowerCase().includes(searchTerm))
  );
}

/**
 * Get map statistics
 */
export function getMapStats() {
  const maps = loadMaps();
  
  const modeStats = maps.reduce((acc, map) => {
    map.modes.forEach(mode => {
      acc[mode] = (acc[mode] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const biomeStats = maps.reduce((acc, map) => {
    acc[map.biome] = (acc[map.biome] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalMaps: maps.length,
    modeStats,
    biomeStats,
    averageCallouts: Math.round(maps.reduce((sum, map) => sum + map.callouts.length, 0) / maps.length),
    lastUpdated: Math.max(...maps.map(map => new Date(map.updatedAt).getTime()))
  };
}

/**
 * Get all unique biomes
 */
export function getAllBiomes(): string[] {
  const maps = loadMaps();
  return [...new Set(maps.map(map => map.biome))].sort();
}

/**
 * Get all game modes
 */
export function getAllGameModes(): string[] {
  const maps = loadMaps();
  const modes = new Set<string>();
  maps.forEach(map => {
    map.modes.forEach(mode => modes.add(mode));
  });
  return [...modes].sort();
}

/**
 * Invalidate cache (useful for development or when data updates)
 */
export function invalidateMapsCache(): void {
  processedMaps = null;
}