import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getMapBySlug, getMaps } from '@/lib/data/maps';
import MapDetailClient from './MapDetailClient';

interface MapPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const maps = getMaps();
  return maps.map((map) => ({
    slug: map.slug,
  }));
}

export async function generateMetadata({ params }: MapPageProps): Promise<Metadata> {
  const { slug } = await params;
  const map = getMapBySlug(slug);

  if (!map) {
    return {
      title: 'Map Not Found',
    };
  }

  return {
    title: `${map.name} - Marvel Rivals Maps`,
    description: `Complete guide to ${map.name} in Marvel Rivals. Learn callouts, strategies, flanking routes, and positioning tips for this ${map.biome} map.`,
    keywords: `Marvel Rivals, ${map.name}, map guide, callouts, strategies, ${map.biome}, ${map.modes.join(', ')}`,
  };
}

export default async function MapPage({ params }: MapPageProps) {
  const { slug } = await params;
  const map = getMapBySlug(slug);

  if (!map) {
    notFound();
  }

  return <MapDetailClient map={map} />;
}