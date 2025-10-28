import { z } from 'zod';

// Base schemas
export const RoleSchema = z.enum(['Duelist', 'Vanguard', 'Strategist']);
export const DifficultySchema = z.enum(['Easy', 'Medium', 'Hard']);
export const TierSchema = z.enum(['S-Tier', 'A-Tier', 'B-Tier', 'C-Tier']);
export const PlatformSchema = z.enum(['PC', 'PlayStation', 'Xbox']);
export const RegionSchema = z.enum(['North America', 'Europe', 'Asia', 'Global']);
export const GameModeSchema = z.enum(['Convoy', 'Convergence', 'Domination']);
export const AbilityTypeSchema = z.enum(['Primary', 'Secondary', 'Utility', 'Ultimate']);

// Agent schemas
export const AbilitySchema = z.object({
  name: z.string().min(1, 'Ability name is required'),
  type: AbilityTypeSchema,
  cooldown: z.number().min(0, 'Cooldown must be non-negative'),
  range: z.number().min(0).optional(),
  damage: z.number().min(0).optional(),
  notes: z.string().min(1, 'Ability notes are required'),
});

export const AgentSchema = z.object({
  name: z.string().min(1, 'Agent name is required'),
  slug: z.string().min(1, 'Agent slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  role: RoleSchema,
  difficulty: DifficultySchema,
  portrait: z.string().url('Portrait must be a valid URL'),
  summary: z.string().min(50, 'Summary must be at least 50 characters').max(200, 'Summary must be less than 200 characters'),
  strengths: z.array(z.string().min(1)).min(1, 'At least one strength is required'),
  limitations: z.array(z.string().min(1)).min(1, 'At least one limitation is required'),
  abilities: z.array(AbilitySchema).min(3, 'At least 3 abilities are required'),
  teamUps: z.array(z.string().min(1)),
  antiSynergies: z.array(z.string().min(1)).optional(),
  counters: z.array(z.string().min(1)),
  counterTips: z.array(z.string().min(1)).optional(),
  bestMaps: z.array(z.string().min(1)),
  patch: z.string().min(1, 'Patch information is required'),
  updatedAt: z.string().datetime('Invalid date format'),
  tier: TierSchema.optional(),
  winRate: z.number().min(0).max(100).optional(),
  pickRate: z.number().min(0).max(100).optional(),
});

// Weapon schemas
export const WeaponDamageSchema = z.object({
  base: z.number().min(0, 'Base damage must be non-negative'),
  headshot: z.number().min(0, 'Headshot damage must be non-negative'),
  falloff: z.object({
    start: z.number().min(0),
    end: z.number().min(0),
  }),
});

export const WeaponHandlingSchema = z.object({
  recoil: z.number().min(0).max(10, 'Recoil must be between 0-10'),
  accuracy: z.number().min(0).max(100, 'Accuracy must be between 0-100'),
  mobility: z.number().min(0).max(100, 'Mobility must be between 0-100'),
});

export const WeaponSchema = z.object({
  name: z.string().min(1, 'Weapon name is required'),
  slug: z.string().min(1, 'Weapon slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  type: z.string().min(1, 'Weapon type is required'),
  agent: z.string().min(1, 'Associated agent is required'),
  image: z.string().url('Image must be a valid URL'),
  damage: WeaponDamageSchema,
  fireRate: z.number().min(0, 'Fire rate must be non-negative'),
  range: z.number().min(0, 'Range must be non-negative'),
  handling: WeaponHandlingSchema,
  perks: z.array(z.string().min(1)),
  bestUsers: z.array(z.string().min(1)),
  mapFit: z.record(z.string(), z.enum(['excellent', 'good', 'poor'])),
  pros: z.array(z.string().min(1)),
  cons: z.array(z.string().min(1)),
  patch: z.string().min(1, 'Patch information is required'),
  updatedAt: z.string().datetime('Invalid date format'),
});

// Map schemas
export const MapCalloutSchema = z.object({
  name: z.string().min(1, 'Callout name is required'),
  description: z.string().min(1, 'Callout description is required'),
  coordinates: z.object({
    x: z.number().min(0).max(100, 'X coordinate must be between 0-100'),
    y: z.number().min(0).max(100, 'Y coordinate must be between 0-100'),
  }),
});

export const TeamCompositionSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  agents: z.array(z.string().min(1)).min(1, 'At least one agent is required'),
  strategy: z.string().min(1, 'Strategy description is required'),
});

export const MapSchema = z.object({
  name: z.string().min(1, 'Map name is required'),
  slug: z.string().min(1, 'Map slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  biome: z.string().min(1, 'Biome is required'),
  modes: z.array(GameModeSchema).min(1, 'At least one game mode is required'),
  image: z.string().url('Image must be a valid URL'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  callouts: z.array(MapCalloutSchema),
  chokePoints: z.array(z.string().min(1)),
  flanks: z.array(z.string().min(1)),
  destructibles: z.array(z.string().min(1)),
  recommendedComps: z.array(TeamCompositionSchema),
  patch: z.string().min(1, 'Patch information is required'),
  updatedAt: z.string().datetime('Invalid date format'),
});

// User and leaderboard schemas
export const RankInfoSchema = z.object({
  tier: z.string().min(1, 'Tier is required'),
  division: z.number().min(1).max(5, 'Division must be between 1-5'),
  score: z.number().min(0, 'Score must be non-negative'),
});

export const PlayerStatsSchema = z.object({
  kda: z.object({
    kills: z.number().min(0),
    deaths: z.number().min(0),
    assists: z.number().min(0),
  }),
  winRate: z.number().min(0).max(100, 'Win rate must be between 0-100'),
  hoursPlayed: z.number().min(0, 'Hours played must be non-negative'),
  roleStats: z.record(RoleSchema, z.object({
    winRate: z.number().min(0).max(100),
    hoursPlayed: z.number().min(0),
    favoriteAgents: z.array(z.string().min(1)),
  })),
});

export const MatchSchema = z.object({
  id: z.string().min(1, 'Match ID is required'),
  map: z.string().min(1, 'Map is required'),
  mode: GameModeSchema,
  agent: z.string().min(1, 'Agent is required'),
  result: z.enum(['win', 'loss', 'draw']),
  score: z.object({
    kills: z.number().min(0),
    deaths: z.number().min(0),
    assists: z.number().min(0),
  }),
  duration: z.number().min(0, 'Duration must be non-negative'),
  date: z.string().datetime('Invalid date format'),
});

export const UserProfileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be less than 20 characters'),
  platform: PlatformSchema,
  region: RegionSchema,
  rank: RankInfoSchema,
  stats: PlayerStatsSchema,
  recentMatches: z.array(MatchSchema),
  favoriteAgents: z.array(z.string().min(1)),
  avatar: z.string().url().optional(),
  isPublic: z.boolean().default(true),
});

export const LeaderboardEntrySchema = z.object({
  rank: z.number().min(1, 'Rank must be positive'),
  player: z.string().min(1, 'Player name is required'),
  tier: z.string().min(1, 'Tier is required'),
  score: z.number().min(0, 'Score must be non-negative'),
  winRate: z.number().min(0).max(100, 'Win rate must be between 0-100'),
  mains: z.array(z.string().min(1)),
  platform: PlatformSchema,
  region: RegionSchema,
});

// Content schemas
export const GuideSchema = z.object({
  title: z.string().min(1, 'Guide title is required').max(100, 'Title must be less than 100 characters'),
  slug: z.string().min(1, 'Guide slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  excerpt: z.string().min(50, 'Excerpt must be at least 50 characters').max(300, 'Excerpt must be less than 300 characters'),
  body: z.string().min(100, 'Guide body must be at least 100 characters'),
  tags: z.array(z.string().min(1)),
  relatedAgents: z.array(z.string().min(1)),
  relatedMaps: z.array(z.string().min(1)),
  difficulty: DifficultySchema,
  readTime: z.number().min(1, 'Read time must be at least 1 minute'),
  patch: z.string().min(1, 'Patch information is required'),
  updatedAt: z.string().datetime('Invalid date format'),
  author: z.string().min(1, 'Author is required'),
  featured: z.boolean().optional(),
});

export const MasterClassChapterSchema = z.object({
  id: z.string().min(1, 'Chapter ID is required'),
  title: z.string().min(1, 'Chapter title is required'),
  content: z.string().min(100, 'Chapter content must be at least 100 characters'),
  videoUrl: z.string().url().optional(),
  quiz: z.object({
    questions: z.array(z.object({
      question: z.string().min(1, 'Question is required'),
      options: z.array(z.string().min(1)).min(2, 'At least 2 options required'),
      correctAnswer: z.number().min(0, 'Correct answer index must be non-negative'),
    })),
  }).optional(),
  downloadables: z.array(z.object({
    title: z.string().min(1, 'Downloadable title is required'),
    url: z.string().url('URL must be valid'),
    type: z.enum(['pdf', 'image', 'checklist']),
  })).optional(),
});

export const MasterClassSchema = z.object({
  title: z.string().min(1, 'Master class title is required').max(100, 'Title must be less than 100 characters'),
  slug: z.string().min(1, 'Master class slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  description: z.string().min(100, 'Description must be at least 100 characters'),
  chapters: z.array(MasterClassChapterSchema).min(1, 'At least one chapter is required'),
  difficulty: DifficultySchema,
  estimatedTime: z.number().min(10, 'Estimated time must be at least 10 minutes'),
  tags: z.array(z.string().min(1)),
  patch: z.string().min(1, 'Patch information is required'),
  updatedAt: z.string().datetime('Invalid date format'),
  author: z.string().min(1, 'Author is required'),
  featured: z.boolean().optional(),
});

// Filter schemas
export const AgentFiltersSchema = z.object({
  role: RoleSchema.optional(),
  difficulty: DifficultySchema.optional(),
  tier: TierSchema.optional(),
  mobility: z.enum(['high', 'medium', 'low']).optional(),
  sustain: z.enum(['high', 'medium', 'low']).optional(),
  seasonViability: z.enum(['meta', 'viable', 'niche']).optional(),
});

export const MapFiltersSchema = z.object({
  mode: GameModeSchema.optional(),
  biome: z.string().optional(),
});

export const WeaponFiltersSchema = z.object({
  type: z.string().optional(),
  agent: z.string().optional(),
});

export const GuideFiltersSchema = z.object({
  role: RoleSchema.optional(),
  map: z.string().optional(),
  difficulty: DifficultySchema.optional(),
  patch: z.string().optional(),
  readTime: z.enum(['short', 'medium', 'long']).optional(),
});

export const LeaderboardFiltersSchema = z.object({
  platform: PlatformSchema.optional(),
  region: RegionSchema.optional(),
  season: z.string().optional(),
  role: RoleSchema.optional(),
});

// Utility function to validate data
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues?.map(err => `${err.path?.join('.') || 'unknown'}: ${err.message}`) || ['Validation failed'];
      return { success: false, errors };
    }
    return { success: false, errors: ['Unknown validation error'] };
  }
}