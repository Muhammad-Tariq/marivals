'use client';

import { useState, useEffect } from 'react';
import { WeaponCard } from '@/components/content/GridCard';
import { getWeapons } from '@/lib/data/weapons';
import { Weapon } from '@/lib/types';

export default function WeaponsPage() {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeaponsData = async () => {
      setLoading(true);
      try {
        const weaponsData = getWeapons();
        setWeapons(weaponsData);
      } catch (error) {
        console.error('Error loading weapons:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWeaponsData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Marvel Rivals <span className="text-[#E10600]">Weapons</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Complete weapon database with stats, handling, and performance analysis. 
            Find the perfect weapon for your playstyle.
          </p>
        </div>

        {/* Results count */}
        <div className="mb-6 text-zinc-400">
          {loading ? 'Loading...' : `${weapons.length} weapons found`}
        </div>

        {/* Weapons Grid */}
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
          ) : weapons.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-zinc-400 text-lg">No weapons found.</p>
              <p className="text-zinc-500 text-sm mt-2">Check back later for weapon data.</p>
            </div>
          ) : (
            weapons.map((weapon) => (
              <WeaponCard key={weapon.slug} weapon={weapon} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}