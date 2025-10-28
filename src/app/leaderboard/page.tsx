'use client';

import { useState, useEffect, Suspense } from 'react';
import { Metadata } from 'next';
import { LeaderboardTable } from '@/components/content/DataTable';
import FilterBar from '@/components/content/FilterBar';
import { LeaderboardEntry, LeaderboardFilters } from '@/lib/types';

// Sample leaderboard data - in a real app, this would come from an API
const sampleLeaderboardData: LeaderboardEntry[] = [
  { rank: 1, player: "WebSlinger", tier: "Grandmaster", score: 4850, winRate: 78, mains: ["Spider-Man", "Iron Man"], platform: "PC", region: "North America" },
  { rank: 2, player: "StormBreaker", tier: "Grandmaster", score: 4820, winRate: 76, mains: ["Storm", "Thor"], platform: "PC", region: "Europe" },
  { rank: 3, player: "MagnetoMaster", tier: "Grandmaster", score: 4795, winRate: 74, mains: ["Magneto", "Doctor Strange"], platform: "PlayStation", region: "North America" },
  { rank: 4, player: "HulkSmash", tier: "Master", score: 4650, winRate: 72, mains: ["Hulk", "Groot"], platform: "Xbox", region: "North America" },
  { rank: 5, player: "IronLegend", tier: "Master", score: 4580, winRate: 71, mains: ["Iron Man", "War Machine"], platform: "PC", region: "Asia" },
  { rank: 6, player: "SpiderSense", tier: "Master", score: 4520, winRate: 69, mains: ["Spider-Man", "Venom"], platform: "PC", region: "Europe" },
  { rank: 7, player: "StrangeMagic", tier: "Master", score: 4480, winRate: 68, mains: ["Doctor Strange", "Scarlet Witch"], platform: "PlayStation", region: "Asia" },
  { rank: 8, player: "ThunderGod", tier: "Master", score: 4450, winRate: 67, mains: ["Thor", "Storm"], platform: "Xbox", region: "Europe" },
];

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [filteredData, setFilteredData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<LeaderboardFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const itemsPerPage = 10;

  // Load leaderboard data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLeaderboardData(sampleLeaderboardData);
      setLoading(false);
    };

    loadData();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...leaderboardData];

    if (filters.platform) {
      filtered = filtered.filter(entry => entry.platform === filters.platform);
    }
    if (filters.region) {
      filtered = filtered.filter(entry => entry.region === filters.region);
    }
    if (filters.season) {
      // In a real app, this would filter by season
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [leaderboardData, filters]);

  const handleFilterChange = (newFilters: LeaderboardFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy: string, newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Pagination calculations
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const leaderboardFilters = [
    {
      key: 'platform',
      label: 'Platform',
      type: 'select' as const,
      options: [
        { value: 'PC', label: 'PC' },
        { value: 'PlayStation', label: 'PlayStation' },
        { value: 'Xbox', label: 'Xbox' }
      ]
    },
    {
      key: 'region',
      label: 'Region',
      type: 'select' as const,
      options: [
        { value: 'North America', label: 'North America' },
        { value: 'Europe', label: 'Europe' },
        { value: 'Asia', label: 'Asia' }
      ]
    },
    {
      key: 'season',
      label: 'Season',
      type: 'select' as const,
      options: [
        { value: 'current', label: 'Current Season' },
        { value: 'season1', label: 'Season 1' },
        { value: 'alltime', label: 'All Time' }
      ]
    }
  ];
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Marvel Rivals <span className="text-[#E10600]">Leaderboard</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Live rankings of the top Marvel Rivals players across all platforms and regions.
            Updated in real-time.
          </p>
        </div>

        {/* Filter Bar */}
        <Suspense fallback={<div className="mb-8 h-16 bg-zinc-800 rounded-lg animate-pulse" />}>
          <FilterBar
            filters={leaderboardFilters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            sortOptions={[
              { value: 'rank', label: 'Rank' },
              { value: 'score', label: 'Score' },
              { value: 'winRate', label: 'Win Rate' },
              { value: 'player', label: 'Player Name' }
            ]}
            sticky
            className="mb-8"
          />
        </Suspense>

        {/* Results info */}
        <div className="mb-6 text-zinc-400">
          {loading ? 'Loading leaderboard...' : `Showing ${totalItems} players`}
        </div>

        {/* Leaderboard Table */}
        <LeaderboardTable
          data={currentData}
          loading={loading}
          pagination={{
            page: currentPage,
            limit: itemsPerPage,
            total: totalItems,
            totalPages,
            onPageChange: handlePageChange
          }}
          sorting={{
            sortBy,
            order: sortOrder,
            onSortChange: handleSortChange
          }}
        />
      </div>
    </div>
  );
}