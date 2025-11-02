import { MetadataRoute } from 'next';
import { getAgents } from '@/lib/data/agents';
import { getWeapons } from '@/lib/data/weapons';
import { getMaps } from '@/lib/data/maps';
import { getGuides, getMasterClasses } from '@/lib/data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.marvelrivalz.com';
  const currentDate = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/agents`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/weapons`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/maps`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/master-classes`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/leaderboard`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Agent pages
  const agents = getAgents();
  const agentPages: MetadataRoute.Sitemap = agents.map((agent) => ({
    url: `${baseUrl}/agents/${agent.slug}`,
    lastModified: new Date(agent.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Weapon pages
  const weapons = getWeapons();
  const weaponPages: MetadataRoute.Sitemap = weapons.map((weapon) => ({
    url: `${baseUrl}/weapons/${weapon.slug}`,
    lastModified: new Date(weapon.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Map pages
  const maps = getMaps();
  const mapPages: MetadataRoute.Sitemap = maps.map((map) => ({
    url: `${baseUrl}/maps/${map.slug}`,
    lastModified: new Date(map.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Guide pages
  const guides = getGuides();
  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Master class pages
  const masterClasses = getMasterClasses();
  const masterClassPages: MetadataRoute.Sitemap = masterClasses.map((masterClass) => ({
    url: `${baseUrl}/master-classes/${masterClass.slug}`,
    lastModified: new Date(masterClass.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...agentPages,
    ...weaponPages,
    ...mapPages,
    ...guidePages,
    ...masterClassPages,
  ];
}
