'use client';

import { useState } from 'react';
import leaderboardData from '../../../data/leaderboard.json';

interface LeaderboardEntry {
  rank: number;
  player: string;
  rating: number;
  previousRank: number;
  change: string;
  mainAgent: string;
  winRate: number;
  gamesPlayed: number;
  region: string;
  platform: string;
  lastActive: string;
  peakRating: number;
  seasonHigh: number;
}

export default function LeaderboardPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');

  // Filter data based on selected region and platform
  const filteredData = leaderboardData.filter((entry: LeaderboardEntry) => {
    const regionMatch = selectedRegion === 'All' || entry.region === selectedRegion;
    const platformMatch = selectedPlatform === 'All' || entry.platform === selectedPlatform;
    return regionMatch && platformMatch;
  });

  const getRankChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-400';
    if (change.startsWith('-')) return 'text-red-400';
    return 'text-gray-400';
  };

  const getRankChangeIcon = (change: string) => {
    if (change.startsWith('+')) return '↗';
    if (change.startsWith('-')) return '↘';
    return '→';
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Marvel Rivals <span className="text-[#E10600]">Leaderboard</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Live rankings of the top Marvel Rivals players across all platforms and regions.
            Updated weekly for Season 1.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8 justify-center">
          <select 
            value={selectedRegion} 
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
          >
            <option value="All">All Regions</option>
            <option value="NA">North America</option>
            <option value="EU">Europe</option>
            <option value="APAC">Asia Pacific</option>
          </select>
          
          <select 
            value={selectedPlatform} 
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
          >
            <option value="All">All Platforms</option>
            <option value="PC">PC</option>
            <option value="Console">Console</option>
          </select>
        </div>

        {/* Results info */}
        <div className="mb-6 text-zinc-400 text-center">
          Showing {filteredData.length} players
        </div>

        {/* Full Leaderboard Table */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-3 text-gray-400 font-medium">Rank</th>
                  <th className="text-left py-4 px-3 text-gray-400 font-medium">Player</th>
                  <th className="text-left py-4 px-3 text-gray-400 font-medium">Rating</th>
                  <th className="text-left py-4 px-3 text-gray-400 font-medium">Main Agent</th>
                  <th className="text-left py-4 px-3 text-gray-400 font-medium">Win Rate</th>
                  <th className="text-left py-4 px-3 text-gray-400 font-medium">Games</th>
                  <th className="text-left py-4 px-3 text-gray-400 font-medium">Region</th>
                  <th className="text-left py-4 px-3 text-gray-400 font-medium">Platform</th>
                  <th className="text-left py-4 px-3 text-gray-400 font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((entry: LeaderboardEntry) => (
                  <tr key={entry.rank} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${
                          entry.rank === 1 ? 'text-yellow-400' :
                          entry.rank === 2 ? 'text-gray-300' :
                          entry.rank === 3 ? 'text-amber-600' :
                          'text-white'
                        }`}>
                          #{entry.rank}
                        </span>
                        {entry.rank <= 3 && (
                          <span className="text-lg">
                            {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-white font-medium">{entry.player}</span>
                    </td>
                    <td className="py-4 px-3">
                      <div>
                        <span className="text-white font-bold text-lg">{entry.rating.toLocaleString()}</span>
                        <div className="text-xs text-gray-400">Peak: {entry.peakRating.toLocaleString()}</div>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-blue-400 font-medium">{entry.mainAgent}</span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-green-400 font-medium">{entry.winRate}%</span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-white">{entry.gamesPlayed}</span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-xs px-2 py-1 bg-blue-900/50 text-blue-300 rounded">
                        {entry.region}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300">
                        {entry.platform}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <div className={`flex items-center gap-1 ${getRankChangeColor(entry.change)}`}>
                        <span>{getRankChangeIcon(entry.change)}</span>
                        <span className="font-medium">{entry.change}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Season Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <div className="text-3xl mb-2">⚔️</div>
            <h3 className="text-lg font-bold text-white mb-2">Season 1 Active</h3>
            <p className="text-gray-400 text-sm">
              Current competitive season with weekly rank updates and exclusive rewards.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-lg font-bold text-white mb-2">Rating System</h3>
            <p className="text-gray-400 text-sm">
              Skill-based rating system that tracks your performance across all game modes.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <div className="text-3xl mb-2">🏅</div>
            <h3 className="text-lg font-bold text-white mb-2">Weekly Updates</h3>
            <p className="text-gray-400 text-sm">
              Rankings update every week based on recent performance and match results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}