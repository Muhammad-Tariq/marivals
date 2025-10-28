'use client';

import { motion } from 'framer-motion';
import { CountUp } from '@/components/animations/InteractiveAnimations';

interface DataSummaryProps {
  agentsCount: number;
  mapsCount: number;
  weaponsCount: number;
  guidesCount: number;
  agentsByRole?: Record<string, number>;
  mapsByMode?: Record<string, number>;
}

export function DataSummary({
  agentsCount,
  mapsCount,
  weaponsCount,
  guidesCount,
  agentsByRole = {},
  mapsByMode = {}
}: DataSummaryProps) {
  return (
    <div className="space-y-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#18181B] border border-zinc-800 rounded-lg p-6"
        >
          <h3 className="text-zinc-400 text-sm font-medium mb-2">Total Agents</h3>
          <CountUp value={agentsCount} size="xl" className="text-[#E10600]" />
          <p className="text-zinc-500 text-xs mt-2">Across all roles</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#18181B] border border-zinc-800 rounded-lg p-6"
        >
          <h3 className="text-zinc-400 text-sm font-medium mb-2">Maps Available</h3>
          <CountUp value={mapsCount} size="xl" className="text-blue-400" />
          <p className="text-zinc-500 text-xs mt-2">Battle arenas</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#18181B] border border-zinc-800 rounded-lg p-6"
        >
          <h3 className="text-zinc-400 text-sm font-medium mb-2">Weapons</h3>
          <CountUp value={weaponsCount} size="xl" className="text-green-400" />
          <p className="text-zinc-500 text-xs mt-2">Analyzed weapons</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#18181B] border border-zinc-800 rounded-lg p-6"
        >
          <h3 className="text-zinc-400 text-sm font-medium mb-2">Guides</h3>
          <CountUp value={guidesCount} size="xl" className="text-purple-400" />
          <p className="text-zinc-500 text-xs mt-2">Strategy guides</p>
        </motion.div>
      </div>

      {/* Detailed Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agents by Role */}
        {Object.keys(agentsByRole).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#18181B] border border-zinc-800 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-[#E10600]">Agents by Role</h3>
            <div className="space-y-3">
              {Object.entries(agentsByRole).map(([role, count]) => (
                <div key={role} className="flex justify-between items-center">
                  <span className="text-zinc-300 capitalize">{role}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-20 bg-zinc-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          role === 'Duelist' ? 'bg-red-500' :
                          role === 'Vanguard' ? 'bg-blue-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${(count / agentsCount) * 100}%` }}
                      />
                    </div>
                    <CountUp value={count} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Maps by Mode */}
        {Object.keys(mapsByMode).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#18181B] border border-zinc-800 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Maps by Mode</h3>
            <div className="space-y-3">
              {Object.entries(mapsByMode).map(([mode, count]) => (
                <div key={mode} className="flex justify-between items-center">
                  <span className="text-zinc-300 capitalize">{mode || 'Unknown'}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-20 bg-zinc-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(count / mapsCount) * 100}%` }}
                      />
                    </div>
                    <CountUp value={count} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}