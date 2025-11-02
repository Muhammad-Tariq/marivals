'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ContentTransition } from '@/components/animations/RouteTransition';
import { StaggeredStats, AgentGrid } from '@/components/animations/StaggeredGrid';
import { AnimatedStatCard, FloatingAnimation, CountUp } from '@/components/animations/InteractiveAnimations';
import { AgentCard, GuideCard } from '@/components/content/GridCard';
import { DataSummary } from '@/components/DataSummary';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAgents, getFeaturedAgents } from '@/lib/data/agents';
import { getGuides, getFeaturedGuides } from '@/lib/data/content';
import { getMaps } from '@/lib/data/maps';
import { getWeapons } from '@/lib/data/weapons';
import { getTrendingContent } from '@/lib/data/index';
import { Agent, Guide } from '@/lib/types';
import LeaderboardPreview from '@/components/LeaderboardPreview';
import leaderboardData from '../../data/leaderboard.json';

export default function Home() {
  const [featuredAgents, setFeaturedAgents] = useState<Agent[]>([]);
  const [featuredGuides, setFeaturedGuides] = useState<Guide[]>([]);
  const [trendingData, setTrendingData] = useState<any>(null);
  const [dataStats, setDataStats] = useState({
    agentsCount: 0,
    mapsCount: 0,
    weaponsCount: 0,
    guidesCount: 0,
    agentsByRole: {} as Record<string, number>,
    mapsByMode: {} as Record<string, number>
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        // Load featured content
        const agents = getFeaturedAgents(8);
        const guides = getFeaturedGuides(4);
        const trending = getTrendingContent();

        // Load all data for stats
        const allAgents = getAgents();
        const allMaps = getMaps();
        const allWeapons = getWeapons();
        const allGuides = getGuides();

        // Calculate agent role distribution
        const agentsByRole = allAgents.reduce((acc, agent) => {
          acc[agent.role] = (acc[agent.role] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Calculate map mode distribution
        const mapsByMode = allMaps.reduce((acc, map) => {
          if (map.modes && map.modes.length > 0) {
            map.modes.forEach(mode => {
              acc[mode] = (acc[mode] || 0) + 1;
            });
          } else {
            acc['Unknown'] = (acc['Unknown'] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>);

        setFeaturedAgents(agents);
        setFeaturedGuides(guides);
        setTrendingData(trending);
        const stats = {
          agentsCount: allAgents.length,
          mapsCount: allMaps.length,
          weaponsCount: allWeapons.length,
          guidesCount: allGuides.length,
          agentsByRole,
          mapsByMode
        };

        console.log('Home page data loaded:', stats);
        setDataStats(stats);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E10600]/20 via-transparent to-transparent"></div>

        {/* Floating particles */}
        <FloatingAnimation direction="circular" className="absolute top-20 left-10 w-2 h-2 bg-[#E10600]/30 rounded-full">
          <div />
        </FloatingAnimation>
        <FloatingAnimation direction="vertical" className="absolute top-40 right-20 w-1 h-1 bg-white/20 rounded-full">
          <div />
        </FloatingAnimation>
        <FloatingAnimation direction="horizontal" className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-[#E10600]/40 rounded-full">
          <div />
        </FloatingAnimation>

        <div className="container mx-auto px-4 py-24 relative">
          <ContentTransition className="text-center space-y-8 max-w-4xl mx-auto">
            <motion.h1
              className="text-6xl md:text-7xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Marvel Rivals: <span className="text-[#E10600]">Learn Faster. Rank Higher.</span>
            </motion.h1>

            {/* Intro paragraph from blueprint */}
            <motion.div
              className="text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            >
              <p>
                Marvel Rivals is a fast, team-based 6v6 shooter set across ever-changing Marvel battlegrounds.
                Choose from <strong>Duelists</strong>, <strong>Vanguards</strong>, and <strong>Strategists</strong>,
                then fuse powers to unleash spectacular Team-Ups. Our hub breaks the game down into practical steps—learn
                counters, map routes, and patch-driven builds so you can climb ranks with confidence.
              </p>
              <p className="mt-4">
                Whether you&apos;re brand-new or grinding competitive, you&apos;ll find clear guides, data-backed tiers,
                and weekly meta updates.
              </p>
            </motion.div>

            {/* CTAs from blueprint */}
            <motion.div
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
            >
              <Link href="/agents">
                <motion.div
                  className="bg-[#E10600] hover:bg-[#E10600]/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg cursor-pointer"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(225, 6, 0, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start with Agents
                </motion.div>
              </Link>
              <Link href="/maps">
                <motion.div
                  className="border border-zinc-700 hover:bg-zinc-800/50 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg cursor-pointer"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(225, 6, 0, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Maps
                </motion.div>
              </Link>
              <Link href="/leaderboard">
                <motion.div
                  className="border border-zinc-700 hover:bg-zinc-800/50 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg cursor-pointer"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(225, 6, 0, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  See Leaderboards
                </motion.div>
              </Link>
            </motion.div>
          </ContentTransition>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="container mx-auto px-4 py-16">

        {/* Patch Highlights Section */}
        <ContentTransition delay={0}>
          <section className="mb-16">
            <motion.div
              className="bg-gradient-to-r from-[#E10600]/10 to-transparent border border-[#E10600]/20 rounded-lg p-8"
              whileHover={{ borderColor: 'rgba(225, 6, 0, 0.4)' }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-[#E10600]">Season 1 Patch Highlights</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Meta Shifts</h3>
                  <ul className="text-zinc-300 space-y-1">
                    <li>• Spider-Man mobility buffs increase pick rate</li>
                    <li>• Hulk damage reduction nerfs</li>
                    <li>• New team-up synergies discovered</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Map Updates</h3>
                  <ul className="text-zinc-300 space-y-1">
                    <li>• Sanctum Sanctorum portal adjustments</li>
                    <li>• Hydra Base lighting improvements</li>
                    <li>• Hellfire Gala destructible changes</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </section>
        </ContentTransition>

        {/* Site Statistics */}
        <ContentTransition delay={0.2}>
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Marvel Rivals Hub Stats</h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 animate-pulse">
                    <div className="h-4 bg-zinc-800 rounded w-3/4 mb-3" />
                    <div className="h-8 bg-zinc-800 rounded w-1/2 mb-2" />
                    <div className="h-3 bg-zinc-800 rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Agents */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors hover:border-[#E10600]/50"
                >
                  <div className="text-center">
                    <h3 className="text-zinc-400 text-sm font-medium mb-2">Total Agents</h3>
                    <div className="text-4xl font-bold text-[#E10600] mb-1">
                      {dataStats.agentsCount}
                    </div>
                    <p className="text-zinc-500 text-xs">Across all roles</p>
                  </div>
                </motion.div>

                {/* Maps Available */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors hover:border-[#E10600]/50"
                >
                  <div className="text-center">
                    <h3 className="text-zinc-400 text-sm font-medium mb-2">Maps Available</h3>
                    <div className="text-4xl font-bold text-blue-400 mb-1">
                      {dataStats.mapsCount}
                    </div>
                    <p className="text-zinc-500 text-xs">Battle arenas</p>
                  </div>
                </motion.div>

                {/* Weapons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors hover:border-[#E10600]/50"
                >
                  <div className="text-center">
                    <h3 className="text-zinc-400 text-sm font-medium mb-2">Weapons</h3>
                    <div className="text-4xl font-bold text-green-400 mb-1">
                      {dataStats.weaponsCount}
                    </div>
                    <p className="text-zinc-500 text-xs">Analyzed weapons</p>
                  </div>
                </motion.div>

                {/* Guides */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors hover:border-[#E10600]/50"
                >
                  <div className="text-center">
                    <h3 className="text-zinc-400 text-sm font-medium mb-2">Guides</h3>
                    <div className="text-4xl font-bold text-purple-400 mb-1">
                      {dataStats.guidesCount}
                    </div>
                    <p className="text-zinc-500 text-xs">Strategy guides</p>
                  </div>
                </motion.div>
              </div>
            )}
          </section>
        </ContentTransition>

        {/* Detailed Breakdowns */}
        <ContentTransition delay={0.4}>
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agents by Role */}
              {!loading && Object.keys(dataStats.agentsByRole).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#18181B] border border-zinc-800 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold mb-4 text-[#E10600]">Agents by Role</h3>
                  <div className="space-y-3">
                    {Object.entries(dataStats.agentsByRole).map(([role, count]) => (
                      <div key={role} className="flex justify-between items-center">
                        <span className="text-zinc-300 capitalize">{role}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-20 bg-zinc-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${role === 'Duelist' ? 'bg-red-500' :
                                role === 'Vanguard' ? 'bg-blue-500' :
                                  'bg-green-500'
                                }`}
                              style={{ width: `${(count / dataStats.agentsCount) * 100}%` }}
                            />
                          </div>
                          <span className="text-lg font-bold text-[#E10600] min-w-[2rem]">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Maps by Mode */}
              {!loading && Object.keys(dataStats.mapsByMode).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-[#18181B] border border-zinc-800 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold mb-4 text-blue-400">Maps by Mode</h3>
                  <div className="space-y-3">
                    {Object.entries(dataStats.mapsByMode).map(([mode, count]) => (
                      <div key={mode} className="flex justify-between items-center">
                        <span className="text-zinc-300 capitalize">{mode || 'Unknown'}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-20 bg-zinc-700 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(count / dataStats.mapsCount) * 100}%` }}
                            />
                          </div>
                          <span className="text-lg font-bold text-blue-400 min-w-[2rem]">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        </ContentTransition>

        {/* Global Leaderboard */}
        <ContentTransition delay={0.3}>
          <section className="mb-16">
            <LeaderboardPreview data={leaderboardData} />
          </section>
        </ContentTransition>

        {/* Featured Agents */}
        <ContentTransition delay={0.4}>
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Agents</h2>
              <Link href="/agents">
                <Button variant="outline" className="border-zinc-700 hover:border-[#E10600]">
                  View All Agents
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-[#18181B] border border-zinc-800 rounded-lg overflow-hidden animate-pulse">
                    <div className="aspect-video bg-zinc-800" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-zinc-800 rounded w-3/4" />
                      <div className="h-3 bg-zinc-800 rounded w-full" />
                      <div className="h-8 bg-zinc-800 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <AgentGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredAgents.map((agent) => (
                  <AgentCard key={agent.slug} agent={agent} />
                ))}
              </AgentGrid>
            )}
          </section>
        </ContentTransition>

        {/* Tier Snapshot by Role */}
        <ContentTransition delay={0.6}>
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Current Meta Snapshot</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors"
                whileHover={{ borderColor: 'rgba(225, 6, 0, 0.3)' }}
              >
                <h3 className="text-xl font-semibold mb-4 text-[#E10600]">Duelist</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Spider-Man</span>
                    <Badge className="bg-yellow-600 hover:bg-yellow-700">S-Tier</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Iron Man</span>
                    <Badge className="bg-blue-600 hover:bg-blue-700">A-Tier</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Storm</span>
                    <Badge className="bg-blue-600 hover:bg-blue-700">A-Tier</Badge>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-700">
                  <div className="flex justify-between text-sm text-zinc-400">
                    <span>Pick Rate</span>
                    <span>68%</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors"
                whileHover={{ borderColor: 'rgba(225, 6, 0, 0.3)' }}
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Vanguard</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Magneto</span>
                    <Badge className="bg-yellow-600 hover:bg-yellow-700">S-Tier</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Hulk</span>
                    <Badge className="bg-blue-600 hover:bg-blue-700">A-Tier</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Groot</span>
                    <Badge className="bg-gray-600 hover:bg-gray-700">B-Tier</Badge>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-700">
                  <div className="flex justify-between text-sm text-zinc-400">
                    <span>Pick Rate</span>
                    <span>72%</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors"
                whileHover={{ borderColor: 'rgba(225, 6, 0, 0.3)' }}
              >
                <h3 className="text-xl font-semibold mb-4 text-green-400">Strategist</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Doctor Strange</span>
                    <Badge className="bg-yellow-600 hover:bg-yellow-700">S-Tier</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mantis</span>
                    <Badge className="bg-blue-600 hover:bg-blue-700">A-Tier</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rocket Raccoon</span>
                    <Badge className="bg-blue-600 hover:bg-blue-700">A-Tier</Badge>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-700">
                  <div className="flex justify-between text-sm text-zinc-400">
                    <span>Pick Rate</span>
                    <span>65%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </ContentTransition>

        {/* Meta Team-Ups */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Team-Up Combos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors">
              <h3 className="text-lg font-semibold mb-2">Spider-Man + Iron Man</h3>
              <p className="text-zinc-400 text-sm mb-3">Aerial burst coordination</p>
              <span className="text-xs bg-[#E10600] px-2 py-1 rounded">High Synergy</span>
            </div>
            <div className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors">
              <h3 className="text-lg font-semibold mb-2">Doctor Strange + Spider-Man</h3>
              <p className="text-zinc-400 text-sm mb-3">Portal web swing combos</p>
              <span className="text-xs bg-[#E10600] px-2 py-1 rounded">High Synergy</span>
            </div>
            <div className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors">
              <h3 className="text-lg font-semibold mb-2">Hulk + Magneto</h3>
              <p className="text-zinc-400 text-sm mb-3">Magnetic leap assistance</p>
              <span className="text-xs bg-blue-600 px-2 py-1 rounded">Good Synergy</span>
            </div>
          </div>
        </section>

        {/* Latest Guides */}
        <ContentTransition delay={0.8}>
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Latest Guides & Master Classes</h2>
              <Link href="/guides">
                <Button variant="outline" className="border-zinc-700 hover:border-[#E10600]">
                  View All Guides
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 animate-pulse">
                    <div className="h-4 bg-zinc-800 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-zinc-800 rounded w-full mb-2" />
                    <div className="h-3 bg-zinc-800 rounded w-2/3 mb-4" />
                    <div className="h-3 bg-zinc-800 rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : featuredGuides.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredGuides.map((guide) => (
                  <GuideCard key={guide.slug} guide={guide} />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors"
                  whileHover={{ borderColor: 'rgba(225, 6, 0, 0.3)' }}
                >
                  <h3 className="text-lg font-semibold mb-2">Spider-Man Complete Guide</h3>
                  <p className="text-zinc-400 text-sm mb-3">Master mobility and positioning with advanced techniques</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">Medium</Badge>
                    <span className="text-xs text-zinc-500">8 min read</span>
                  </div>
                </motion.div>
                <motion.div
                  className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors"
                  whileHover={{ borderColor: 'rgba(225, 6, 0, 0.3)' }}
                >
                  <h3 className="text-lg font-semibold mb-2">Map Control Fundamentals</h3>
                  <p className="text-zinc-400 text-sm mb-3">Essential positioning and map awareness tactics</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">Easy</Badge>
                    <span className="text-xs text-zinc-500">6 min read</span>
                  </div>
                </motion.div>
                <motion.div
                  className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors"
                  whileHover={{ borderColor: 'rgba(225, 6, 0, 0.3)' }}
                >
                  <h3 className="text-lg font-semibold mb-2">Team Composition Guide</h3>
                  <p className="text-zinc-400 text-sm mb-3">Building synergistic team compositions</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">Hard</Badge>
                    <span className="text-xs text-zinc-500">12 min read</span>
                  </div>
                </motion.div>
                <motion.div
                  className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors"
                  whileHover={{ borderColor: 'rgba(225, 6, 0, 0.3)' }}
                >
                  <h3 className="text-lg font-semibold mb-2">Ranked Climbing Mindset</h3>
                  <p className="text-zinc-400 text-sm mb-3">Mental strategies for competitive play</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">Medium</Badge>
                    <span className="text-xs text-zinc-500">10 min read</span>
                  </div>
                </motion.div>
              </div>
            )}
          </section>
        </ContentTransition>

        {/* Trending Content */}
        <ContentTransition delay={1.0}>
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Trending This Week</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">🔥 Hot Agents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trendingData?.agents.map((agent: any, index: number) => (
                      <div key={agent.slug} className="flex justify-between items-center">
                        <span className="font-medium">{agent.name}</span>
                        <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                          {agent.trend}
                        </Badge>
                      </div>
                    )) || (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Spider-Man</span>
                            <Badge variant="secondary" className="bg-green-600/20 text-green-400">+15%</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Doctor Strange</span>
                            <Badge variant="secondary" className="bg-green-600/20 text-green-400">+12%</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Magneto</span>
                            <Badge variant="secondary" className="bg-green-600/20 text-green-400">+8%</Badge>
                          </div>
                        </>
                      )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-blue-400">📈 Popular Maps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trendingData?.maps.map((map: any) => (
                      <div key={map.slug} className="flex justify-between items-center">
                        <span className="font-medium">{map.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-zinc-700 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${map.popularity}%` }}
                            />
                          </div>
                          <span className="text-xs text-zinc-400">{map.popularity}%</span>
                        </div>
                      </div>
                    )) || (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Sanctum Sanctorum</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-zinc-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full w-[85%]" />
                              </div>
                              <span className="text-xs text-zinc-400">85%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Hydra Base</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-zinc-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full w-[78%]" />
                              </div>
                              <span className="text-xs text-zinc-400">78%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Hellfire Gala</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-zinc-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full w-[72%]" />
                              </div>
                              <span className="text-xs text-zinc-400">72%</span>
                            </div>
                          </div>
                        </>
                      )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-green-400">📚 Top Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trendingData?.guides.map((guide: any) => (
                      <div key={guide.slug} className="space-y-1">
                        <div className="font-medium text-sm">{guide.title}</div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-400">Views</span>
                          <CountUp value={guide.views} size="sm" className="text-xs" />
                        </div>
                      </div>
                    )) || (
                        <>
                          <div className="space-y-1">
                            <div className="font-medium text-sm">Spider-Man Complete Guide</div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-zinc-400">Views</span>
                              <CountUp value={15420} size="sm" className="text-xs" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="font-medium text-sm">Map Control Fundamentals</div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-zinc-400">Views</span>
                              <CountUp value={12350} size="sm" className="text-xs" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="font-medium text-sm">Team Composition Guide</div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-zinc-400">Views</span>
                              <CountUp value={9870} size="sm" className="text-xs" />
                            </div>
                          </div>
                        </>
                      )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </ContentTransition>

        {/* Esports & Events Ticker */}
        <ContentTransition delay={1.2}>
          <section>
            <motion.div
              className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-lg p-6"
              whileHover={{ borderColor: 'rgba(225, 6, 0, 0.3)' }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                Esports & Events
              </h2>
              <div className="space-y-3">
                <motion.div
                  className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg"
                  whileHover={{ backgroundColor: 'rgba(225, 6, 0, 0.1)' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🏆</span>
                    <div>
                      <div className="font-semibold">Marvel Rivals Championship</div>
                      <div className="text-sm text-zinc-400">Qualifiers Phase</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-[#E10600] text-[#E10600]">
                    Jan 15-20
                  </Badge>
                </motion.div>

                <motion.div
                  className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg"
                  whileHover={{ backgroundColor: 'rgba(225, 6, 0, 0.1)' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📊</span>
                    <div>
                      <div className="font-semibold">Weekly Leaderboard Reset</div>
                      <div className="text-sm text-zinc-400">Rankings update</div>
                    </div>
                  </div>
                  <Badge variant="outline">Every Monday</Badge>
                </motion.div>

                <motion.div
                  className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg"
                  whileHover={{ backgroundColor: 'rgba(225, 6, 0, 0.1)' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🎮</span>
                    <div>
                      <div className="font-semibold">Community Tournament</div>
                      <div className="text-sm text-zinc-400">Open registration</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    Jan 25
                  </Badge>
                </motion.div>
              </div>
            </motion.div>
          </section>
        </ContentTransition>
      </main>
    </div>
  );
}
