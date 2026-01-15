import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getMasterClassBySlug, getAllMasterClasses } from '@/lib/data/content';
import MasterClassDetailClient from './MasterClassDetailClient';

// Load MDX content for a master class
async function getMasterClassContent(slug: string): Promise<string | null> {
  const filePath = path.join(process.cwd(), 'content', 'master-classes', `${slug}.mdx`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { content } = matter(fileContent);
    return content;
  } catch {
    return null;
  }
}

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

  // Load the MDX content
  const content = await getMasterClassContent(slug);
  
  // Add content to the master class object
  const masterClassWithContent = {
    ...masterClass,
    content: content || undefined
  };

  return <MasterClassDetailClient masterClass={masterClassWithContent} />;
}
