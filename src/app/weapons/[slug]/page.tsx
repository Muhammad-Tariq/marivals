import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getWeaponBySlug, getWeapons } from '@/lib/data/weapons';
import WeaponDetailClient from './WeaponDetailClient';

interface WeaponPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const weapons = getWeapons();
  return weapons.map((weapon) => ({
    slug: weapon.slug,
  }));
}

export async function generateMetadata({ params }: WeaponPageProps): Promise<Metadata> {
  const { slug } = await params;
  const weapon = getWeaponBySlug(slug);
  
  if (!weapon) {
    return {
      title: 'Weapon Not Found',
    };
  }

  return {
    title: `${weapon.name} - Marvel Rivals Weapons`,
    description: `Complete guide to ${weapon.name} in Marvel Rivals. Learn damage stats, handling, best users, and optimal strategies for this ${weapon.type} weapon.`,
    keywords: `Marvel Rivals, ${weapon.name}, weapon guide, ${weapon.type}, ${weapon.agent}, damage, stats`,
  };
}

export default async function WeaponPage({ params }: WeaponPageProps) {
  const { slug } = await params;
  const weapon = getWeaponBySlug(slug);

  if (!weapon) {
    notFound();
  }

  return <WeaponDetailClient weapon={weapon} />;
}