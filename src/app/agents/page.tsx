'use client';

import { useState, useEffect, Suspense } from 'react';
import { getAgents } from '@/lib/data/agents';
import { AgentCard } from '@/components/content/GridCard';
import { AgentFilterBar } from '@/components/content/FilterBar';
import { Agent, AgentFilters, AgentSortBy } from '@/lib/types';

// Note: This needs to be moved to a separate metadata file for client components
// export const metadata: Metadata = {
//   title: 'Agents',
//   description: 'Complete guide to all Marvel Rivals agents with abilities, builds, counters, and tier rankings.',
// };

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<AgentFilters>({});
  const [sortBy, setSortBy] = useState<AgentSortBy>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Load agents data
  useEffect(() => {
    const loadAgentsData = async () => {
      setLoading(true);
      try {
        const agentsData = getAgents(filters, sortBy, sortOrder);
        setAgents(agentsData);
      } catch (error) {
        console.error('Error loading agents:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAgentsData();
  }, [filters, sortBy, sortOrder]);

  const handleFilterChange = (newFilters: AgentFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy: string, newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy as AgentSortBy);
    setSortOrder(newSortOrder);
  };
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Marvel Rivals <span className="text-[#E10600]">Agents</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Master every hero with detailed guides, builds, and counter strategies.
            Updated for the current meta.
          </p>
        </div>

        {/* Filter Bar */}
        <Suspense fallback={<div className="mb-8 h-16 bg-zinc-800 rounded-lg animate-pulse" />}>
          <AgentFilterBar
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </Suspense>

        {/* Results count */}
        <div className="mb-6 text-zinc-400">
          {loading ? 'Loading...' : `${agents.length} agents found`}
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-[#18181B] border border-zinc-800 rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-video bg-zinc-800" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-zinc-800 rounded w-3/4" />
                  <div className="h-3 bg-zinc-800 rounded w-full" />
                  <div className="h-3 bg-zinc-800 rounded w-2/3" />
                  <div className="h-8 bg-zinc-800 rounded w-full" />
                </div>
              </div>
            ))
          ) : agents.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-zinc-400 text-lg">No agents found matching your criteria.</p>
              <p className="text-zinc-500 text-sm mt-2">Try adjusting your filters.</p>
            </div>
          ) : (
            agents.map((agent) => (
              <AgentCard key={agent.slug} agent={agent} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}