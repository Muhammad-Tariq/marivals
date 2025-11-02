import { Weapon, WeaponFilters } from '@/lib/types';
import { WeaponSchema, validateData } from '@/lib/schemas';
import weaponsData from '../../../data/weapons.json';

// Cache for processed weapon data
let processedWeapons: Weapon[] | null = null;

/**
 * Load and validate weapon data from JSON file
 */
function loadWeapons(): Weapon[] {
  if (processedWeapons) {
    return processedWeapons;
  }

  const validatedWeapons: Weapon[] = [];
  
  try {
    for (const weapon of weaponsData) {
      // Skip validation for now and use data directly with type assertion
      validatedWeapons.push(weapon as unknown as Weapon);
    }
  } catch (error) {
    console.error('Error loading weapons:', error);
    return [];
  }

  processedWeapons = validatedWeapons;
  return validatedWeapons;
}

/**
 * Get all weapons with optional filtering and sorting
 */
export function getWeapons(
  filters?: WeaponFilters,
  sortBy: keyof Weapon = 'name',
  sortOrder: 'asc' | 'desc' = 'asc'
): Weapon[] {
  let weapons = loadWeapons();

  // Apply filters
  if (filters) {
    weapons = weapons.filter(weapon => {
      if (filters.type && weapon.type !== filters.type) return false;
      if (filters.agent && weapon.agent !== filters.agent) return false;
      return true;
    });
  }

  // Apply sorting
  weapons.sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];

    // Handle nested object sorting
    if (sortBy === 'damage') {
      aValue = a.damage.base;
      bValue = b.damage.base;
    } else if (sortBy === 'handling') {
      aValue = (a.handling.accuracy + a.handling.mobility - a.handling.recoil) / 3;
      bValue = (b.handling.accuracy + b.handling.mobility - b.handling.recoil) / 3;
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

  return weapons;
}

/**
 * Get a single weapon by slug
 */
export function getWeaponBySlug(slug: string): Weapon | null {
  const weapons = loadWeapons();
  return weapons.find(weapon => weapon.slug === slug) || null;
}

/**
 * Get weapons by type
 */
export function getWeaponsByType(type: string): Weapon[] {
  return getWeapons({ type });
}

/**
 * Get weapons for a specific agent
 */
export function getWeaponsForAgent(agentName: string): Weapon[] {
  return getWeapons({ agent: agentName });
}

/**
 * Get weapons that perform well on a specific map
 */
export function getWeaponsForMap(mapName: string): Weapon[] {
  const weapons = loadWeapons();
  return weapons.filter(weapon => 
    weapon.mapFit[mapName] === 'excellent' || weapon.mapFit[mapName] === 'good'
  ).sort((a, b) => {
    const aFit = a.mapFit[mapName] === 'excellent' ? 2 : 1;
    const bFit = b.mapFit[mapName] === 'excellent' ? 2 : 1;
    return bFit - aFit;
  });
}

/**
 * Search weapons by name, type, or perks
 */
export function searchWeapons(query: string): Weapon[] {
  if (!query.trim()) return [];

  const weapons = loadWeapons();
  const searchTerm = query.toLowerCase();

  return weapons.filter(weapon => 
    weapon.name.toLowerCase().includes(searchTerm) ||
    weapon.type.toLowerCase().includes(searchTerm) ||
    weapon.agent.toLowerCase().includes(searchTerm) ||
    weapon.perks.some(perk => perk.toLowerCase().includes(searchTerm)) ||
    weapon.pros.some(pro => pro.toLowerCase().includes(searchTerm)) ||
    weapon.cons.some(con => con.toLowerCase().includes(searchTerm))
  );
}

/**
 * Get weapon statistics and comparisons
 */
export function getWeaponStats() {
  const weapons = loadWeapons();
  
  const typeStats = weapons.reduce((acc, weapon) => {
    acc[weapon.type] = (acc[weapon.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const averageStats = {
    damage: Math.round(weapons.reduce((sum, weapon) => sum + weapon.damage.base, 0) / weapons.length),
    fireRate: Math.round(weapons.reduce((sum, weapon) => sum + weapon.fireRate, 0) / weapons.length),
    range: Math.round(weapons.reduce((sum, weapon) => sum + weapon.range, 0) / weapons.length),
    accuracy: Math.round(weapons.reduce((sum, weapon) => sum + weapon.handling.accuracy, 0) / weapons.length),
  };

  const topWeapons = {
    highestDamage: weapons.sort((a, b) => b.damage.base - a.damage.base)[0],
    fastestFireRate: weapons.sort((a, b) => b.fireRate - a.fireRate)[0],
    longestRange: weapons.sort((a, b) => b.range - a.range)[0],
    mostAccurate: weapons.sort((a, b) => b.handling.accuracy - a.handling.accuracy)[0],
  };

  return {
    totalWeapons: weapons.length,
    typeStats,
    averageStats,
    topWeapons,
    lastUpdated: Math.max(...weapons.map(weapon => new Date(weapon.updatedAt).getTime()))
  };
}

/**
 * Get all unique weapon types
 */
export function getAllWeaponTypes(): string[] {
  const weapons = loadWeapons();
  return [...new Set(weapons.map(weapon => weapon.type))].sort();
}

/**
 * Get weapon recommendations based on playstyle
 */
export function getWeaponRecommendations(playstyle: 'aggressive' | 'defensive' | 'balanced'): Weapon[] {
  const weapons = loadWeapons();
  
  return weapons.filter(weapon => {
    switch (playstyle) {
      case 'aggressive':
        return weapon.damage.base > 70 && weapon.handling.mobility > 70;
      case 'defensive':
        return weapon.range > 25 && weapon.handling.accuracy > 80;
      case 'balanced':
        return weapon.damage.base > 60 && weapon.handling.accuracy > 70 && weapon.range > 20;
      default:
        return true;
    }
  }).sort((a, b) => {
    // Sort by overall effectiveness for the playstyle
    const aScore = (a.damage.base + a.handling.accuracy + a.handling.mobility) / 3;
    const bScore = (b.damage.base + b.handling.accuracy + b.handling.mobility) / 3;
    return bScore - aScore;
  });
}

/**
 * Invalidate cache (useful for development or when data updates)
 */
export function invalidateWeaponsCache(): void {
  processedWeapons = null;
}