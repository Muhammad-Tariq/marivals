'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getMaps } from '@/lib/data/maps';
import { MapCard } from '@/components/content/GridCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Map as MapIcon, Users, Target, Zap } from 'lucide-react';

export default function MapsPage() {
  const [maps, setMaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMaps = async () => {
      try {
        const mapsData = getMaps();
        setMaps(mapsData);
      } catch (error) {
        console.error('Error loading maps:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMaps();
  }, []);

  const getMapsByMode = (mode: string) => {
    return maps.filter(map => map.modes.includes(mode));
  };

  const getModeStats = () => {
    const convergenceMaps = getMapsByMode('Convergence');
    const dominationMaps = getMapsByMode('Domination');
    const convoyMaps = getMapsByMode('Convoy');
    
    return {
      convergence: convergenceMaps.length,
      domination: dominationMaps.length,
      convoy: convoyMaps.length,
      total: maps.length
    };
  };

  const stats = getModeStats();
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-zinc-800 rounded w-1/2 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-zinc-800 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Marvel Rivals <span className="text-[#E10600]">Maps</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Master every battlefield with detailed callouts, strategies, and team compositions. 
            Complete competitive map rotation with {stats.total} maps across 3 game modes.
          </p>
        </div>

        {/* Map Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#18181B] border-zinc-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#E10600] mb-1">{stats.total}</div>
              <div className="text-sm text-zinc-400">Total Maps</div>
            </CardContent>
          </Card>
          <Card className="bg-[#18181B] border-zinc-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">{stats.convergence}</div>
              <div className="text-sm text-zinc-400">Convergence</div>
            </CardContent>
          </Card>
          <Card className="bg-[#18181B] border-zinc-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">{stats.domination}</div>
              <div className="text-sm text-zinc-400">Domination</div>
            </CardContent>
          </Card>
          <Card className="bg-[#18181B] border-zinc-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.convoy}</div>
              <div className="text-sm text-zinc-400">Convoy</div>
            </CardContent>
          </Card>
        </div>

        {/* Maps by Game Mode */}
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-[#18181B] border border-zinc-800">
            <TabsTrigger value="all">All Maps ({stats.total})</TabsTrigger>
            <TabsTrigger value="convergence">Convergence ({stats.convergence})</TabsTrigger>
            <TabsTrigger value="domination">Domination ({stats.domination})</TabsTrigger>
            <TabsTrigger value="convoy">Convoy ({stats.convoy})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {maps.map((map, index) => (
                <motion.div
                  key={map.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MapCard map={map} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="convergence" className="space-y-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Convergence Maps</h2>
              <p className="text-zinc-400">Control point-based objective mode focusing on area control and team coordination.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getMapsByMode('Convergence').map((map, index) => (
                <motion.div
                  key={map.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MapCard map={map} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="domination" className="space-y-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Domination Maps</h2>
              <p className="text-zinc-400">Multi-point control mode requiring strategic positioning and map control.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getMapsByMode('Domination').map((map, index) => (
                <motion.div
                  key={map.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MapCard map={map} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="convoy" className="space-y-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Convoy Maps</h2>
              <p className="text-zinc-400">Escort-based objective mode focusing on payload movement and route control.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getMapsByMode('Convoy').map((map, index) => (
                <motion.div
                  key={map.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MapCard map={map} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Image Licensing Information */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <Card className="bg-[#18181B] border-zinc-800">
            <CardHeader>
              <CardTitle className="text-lg text-zinc-300 flex items-center gap-2">
                <MapIcon className="w-5 h-5" />
                Image Licensing & Attribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-zinc-400">
              <div>
                <h4 className="font-semibold text-zinc-300 mb-2">Educational Use Notice</h4>
                <p>
                  Map images displayed on this site are from shared repositories and may be used by other projects. 
                  These files are copyrighted materials used under educational fair use provisions.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-zinc-300 mb-2">Fair Use Assertion</h4>
                <p>
                  The transformative educational use of these images is covered by U.S. fair use laws because:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>They illustrate educational articles regarding Marvel Rivals gameplay and strategy</li>
                  <li>Images serve as primary means of visual identification for map content</li>
                  <li>Low-resolution format prevents commercial reproduction</li>
                  <li>No freely available alternatives exist with comparable educational value</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-zinc-300 mb-2">Trademark Notice</h4>
                <p>
                  This content contains material subject to trademark laws. Marvel Rivals and all related 
                  characters, names, marks, and logos are trademarks of their respective owners. 
                  This site is not affiliated with or endorsed by the trademark holders.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-700">
                <p className="text-xs text-zinc-500">
                  <strong>Disclaimer:</strong> Users are solely responsible for ensuring compliance with applicable 
                  copyright and trademark laws in their jurisdiction. These restrictions are independent of 
                  any copyright status and apply to all use of the materials displayed.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}