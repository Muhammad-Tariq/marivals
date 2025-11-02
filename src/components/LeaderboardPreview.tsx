'use client';

import { useState } from 'react';
import Link from 'next/link';

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

interface LeaderboardPreviewProps {
  data: LeaderboardEntry[];
}

export default function LeaderboardPreview({ data }: LeaderboardPreviewProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');

  // Filter data based on selected region and platform
  const filteredData = data.filter(entry => {
    const regionMatch = selectedRegion === 'All' || entry.region === selectedRegion;
    const platformMatch = selectedPlatform === 'All' || entry.platform === selectedPlatform;
    return regionMatch && platformMatch;
  }).slice(0, 10); // Show top 10 in preview

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
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Global Leaderboard</h2>
          <p className="text-gray-400">Top players competing for glory</p>
        </div>
        <Link 
          href="/leaderboard" 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          View Full Rankings
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select 
          value={selectedRegion} 
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
        >
          <option value="All">All Regions</option>
          <option value="NA">North America</option>
          <option value="EU">Europe</option>
          <option value="APAC">Asia Pacific</option>
        </select>
        
        <select 
          value={selectedPlatform} 
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
        >
          <option value="All">All Platforms</option>
          <option value="PC">PC</option>
          <option value="Console">Console</option>
        </select>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-2 text-gray-400 font-medium">Rank</th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">Player</th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">Rating</th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">Main Agent</th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">Win Rate</th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">Region</th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">Change</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry) => (
              <tr 
                key={entry.rank} 
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-4 px-2">
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
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{entry.player}</span>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300">
                      {entry.platform}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div>
                    <span className="text-white font-bold text-lg">{entry.rating.toLocaleString()}</span>
                    <div className="text-xs text-gray-400">Peak: {entry.peakRating.toLocaleString()}</div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-blue-400 font-medium">
                    {entry.mainAgent}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div>
                    <span className="text-white font-medium">{entry.winRate}%</span>
                    <div className="text-xs text-gray-400">{entry.gamesPlayed} games</div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-xs px-2 py-1 bg-blue-900/50 text-blue-300 rounded">
                    {entry.region}
                  </span>
                </td>
                <td className="py-4 px-2">
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

      {/* Stats Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{data.length}</div>
          <div className="text-gray-400 text-sm">Ranked Players</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">{data[0]?.rating.toLocaleString()}</div>
          <div className="text-gray-400 text-sm">Highest Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {Math.round(data.reduce((sum, p) => sum + p.winRate, 0) / data.length)}%
          </div>
          <div className="text-gray-400 text-sm">Avg Win Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {Math.round(data.reduce((sum, p) => sum + p.gamesPlayed, 0) / data.length)}
          </div>
          <div className="text-gray-400 text-sm">Avg Games</div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">
          Last updated: January 8, 2025 • Season 1 Rankings
        </p>
      </div>
    </div>
  );
}
