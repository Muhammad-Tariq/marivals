import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getGuideBySlug, getGuides } from '@/lib/data/content';
import GuideDetailClient from './GuideDetailClient';

interface GuidePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const guides = getGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  
  if (!guide) {
    return {
      title: 'Guide Not Found',
    };
  }

  return {
    title: `${guide.title} - Marvel Rivals Guides`,
    description: guide.excerpt,
    keywords: `Marvel Rivals, ${guide.title}, guide, tutorial, ${guide.tags.join(', ')}`,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: 'article',
      publishedTime: guide.updatedAt,
      authors: [guide.author],
      tags: guide.tags,
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return <GuideDetailClient guide={guide} />;
}