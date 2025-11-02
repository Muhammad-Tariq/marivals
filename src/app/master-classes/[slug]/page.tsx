import { notFound } from 'next/navigation';
import { getMasterClassBySlug, getAllMasterClasses } from '@/lib/data/content';
import MasterClassDetailClient from './MasterClassDetailClient';

export async function generateStaticParams() {
  const masterClasses = getAllMasterClasses();
  return masterClasses.map((masterClass) => ({
    slug: masterClass.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const masterClass = getMasterClassBySlug(slug);

  if (!masterClass) {
    return {
      title: 'Master Class Not Found',
    };
  }

  return {
    title: `${masterClass.title} | Marvel Rivals HQ`,
    description: masterClass.description,
  };
}

export default async function MasterClassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const masterClass = getMasterClassBySlug(slug);

  if (!masterClass) {
    notFound();
  }

  return <MasterClassDetailClient masterClass={masterClass} />;
}
