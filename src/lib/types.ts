// Core game types
export type Role = 'Duelist' | 'Vanguard' | 'Strategist';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Tier = 'S-Tier' | 'A-Tier' | 'B-Tier' | 'C-Tier';
export type Platform = 'PC' | 'PlayStation' | 'Xbox';
export type Region = 'North America' | 'Europe' | 'Asia' | 'Global';
export type GameMode = 'Convoy' | 'Convergence' | 'Domination';
export type AbilityType = 'Primary' | 'Secondary' | 'Utility' | 'Ultimate';

// Agent data model
export interface Ability {
  name: string;
  type: AbilityType;
  cooldown: number;
  range?: number;
  damage?: number;
  notes: string;
}

export interface Agent {
  name: string;
  slug: string;
  role: Role;
  difficulty: Difficulty;
  portrait: string;
  summary: string;
  strengths: string[];
  limitations: string[];
  abilities: Ability[];
  teamUps: string[];
  antiSynergies?: string[];
  counters: string[];
  counterTips?: string[];
  bestMaps: string[];
  patch: string;
  updatedAt: string;
  tier?: Tier;
  winRate?: number;
  pickRate?: number;
}

// Weapon data model
export interface WeaponDamage {
  base: number;
  headshot: number;
  falloff: {
    start: number;
    end: number;
  };
}

export interface WeaponHandling {
  recoil: number;
  accuracy: number;
  mobility: number;
}

export interface Weapon {
  name: string;
  slug: string;
  type: string;
  agent: string;
  image: string;
  damage: WeaponDamage;
  fireRate: number;
  range: number;
  handling: WeaponHandling;
  perks: string[];
  bestUsers: string[];
  mapFit: Record<string, 'excellent' | 'good' | 'poor'>;
  pros: string[];
  cons: string[];
  patch: string;
  updatedAt: string;
}

// Map data model
export interface MapCallout {
  name: string;
  description: string;
  coordinates: {
    x: number;
    y: number;
  };
}

export interface TeamComposition {
  role: string;
  agents: string[];
  strategy: string;
}

export interface Map {
  name: string;
  slug: string;
  biome: string;
  modes: GameMode[];
  image: string;
  description: string;
  callouts: MapCallout[];
  chokePoints: string[];
  flanks: string[];
  destructibles: string[];
  recommendedComps: TeamComposition[];
  patch: string;
  updatedAt: string;
}

// User and leaderboard data models
export interface RankInfo {
  tier: string;
  division: number;
  score: number;
}

export interface PlayerStats {
  kda: {
    kills: number;
    deaths: number;
    assists: number;
  };
  winRate: number;
  hoursPlayed: number;
  roleStats: Record<Role, {
    winRate: number;
    hoursPlayed: number;
    favoriteAgents: string[];
  }>;
}

export interface Match {
  id: string;
  map: string;
  mode: GameMode;
  agent: string;
  result: 'win' | 'loss' | 'draw';
  score: {
    kills: number;
    deaths: number;
    assists: number;
  };
  duration: number;
  date: string;
}

export interface UserProfile {
  username: string;
  platform: Platform;
  region: Region;
  rank: RankInfo;
  stats: PlayerStats;
  recentMatches: Match[];
  favoriteAgents: string[];
  avatar?: string;
  isPublic: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  player: string;
  tier: string;
  score: number;
  winRate: number;
  mains: string[];
  platform: Platform;
  region: Region;
}

// Content data models
export interface Guide {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  image?: string;
  tags: string[];
  relatedAgents: string[];
  relatedMaps: string[];
  difficulty: Difficulty;
  readTime: number;
  patch: string;
  updatedAt: string;
  author: string;
  featured?: boolean;
}

export interface MasterClassChapter {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  quiz?: {
    questions: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
  };
  downloadables?: Array<{
    title: string;
    url: string;
    type: 'pdf' | 'image' | 'checklist';
  }>;
}

export interface MasterClass {
  title: string;
  slug: string;
  description: string;
  chapters: MasterClassChapter[];
  difficulty: Difficulty;
  estimatedTime: number;
  tags: string[];
  patch: string;
  updatedAt: string;
  author: string;
  featured?: boolean;
}

// Filter and search types
export interface AgentFilters {
  role?: Role;
  difficulty?: Difficulty;
  tier?: Tier;
  mobility?: 'high' | 'medium' | 'low';
  sustain?: 'high' | 'medium' | 'low';
  seasonViability?: 'meta' | 'viable' | 'niche';
}

export interface MapFilters {
  mode?: GameMode;
  biome?: string;
}

export interface WeaponFilters {
  type?: string;
  agent?: string;
}

export interface GuideFilters {
  role?: Role;
  map?: string;
  difficulty?: Difficulty;
  patch?: string;
  readTime?: 'short' | 'medium' | 'long'; // <5min, 5-15min, >15min
}

export interface LeaderboardFilters {
  platform?: Platform;
  region?: Region;
  season?: string;
  role?: Role;
}

// Sorting options
export type AgentSortBy = 'name' | 'role' | 'difficulty' | 'tier' | 'winRate' | 'pickRate';
export type MapSortBy = 'name' | 'modes' | 'biome';
export type GuideSortBy = 'title' | 'readTime' | 'updatedAt' | 'difficulty';
export type LeaderboardSortBy = 'rank' | 'score' | 'winRate';

// API response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// SEO and metadata types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
  structuredData?: Record<string, any>;
}

// Component prop types
export interface FilterBarProps<T> {
  filters: T;
  onFilterChange: (filters: T) => void;
  onSortChange?: (sortBy: string, order: 'asc' | 'desc') => void;
  sticky?: boolean;
}

export interface GridCardProps {
  title: string;
  image?: string;
  badge?: {
    text: string;
    variant: 'role' | 'difficulty' | 'tier' | 'default';
  };
  href: string;
  description?: string;
  stats?: Array<{
    label: string;
    value: string | number;
  }>;
  className?: string;
}

export interface DataTableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  sorting?: {
    sortBy: string;
    order: 'asc' | 'desc';
    onSortChange: (sortBy: string, order: 'asc' | 'desc') => void;
  };
}

// Animation and UI types
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  stagger?: number;
}

export interface RouteTransitionProps {
  children: React.ReactNode;
  className?: string;
  config?: AnimationConfig;
}

export interface StaggeredGridProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
  animateOnScroll?: boolean;
}