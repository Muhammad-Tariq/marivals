'use client';

import { useState, useEffect } from 'react';
import { GuideCard } from '@/components/content/GridCard';
import { getGuides } from '@/lib/data/content';
import { Guide } from '@/lib/types';

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGuidesData = async () => {
      setLoading(true);
      try {
        const guidesData = getGuides();
        setGuides(guidesData);
      } catch (error) {
        console.error('Error loading guides:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGuidesData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Marvel Rivals <span className="text-[#E10600]">Guides</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Master Marvel Rivals with our comprehensive guides and tutorials. 
            From beginner tips to advanced strategies.
          </p>
        </div>

        {/* Results count */}
        <div className="mb-6 text-zinc-400">
          {loading ? 'Loading...' : `${guides.length} guides available`}
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-zinc-800 rounded w-3/4 mb-3" />
                <div className="h-3 bg-zinc-800 rounded w-full mb-2" />
                <div className="h-3 bg-zinc-800 rounded w-2/3 mb-4" />
                <div className="h-3 bg-zinc-800 rounded w-1/3" />
              </div>
            ))
          ) : guides.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-zinc-400 text-lg">No guides available yet.</p>
              <p className="text-zinc-500 text-sm mt-2">Check back soon for new guides and tutorials.</p>
            </div>
          ) : (
            guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}