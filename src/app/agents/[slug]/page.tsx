import { Metadata } from 'next';
import { getAgentBySlug, getAgents } from '@/lib/data/agents';
import AgentDetailClient from './AgentDetailClient';

interface AgentDetailPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all agents
export async function generateStaticParams() {
  const agents = getAgents();
  return agents.map((agent) => ({
    slug: agent.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: AgentDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  
  if (!agent) {
    return {
      title: 'Agent Not Found',
      description: 'The requested agent could not be found.'
    };
  }

  const title = `${agent.name} - Abilities, Builds, Counters | Marvel Rivals HQ`;
  const description = `Complete ${agent.name} guide for Marvel Rivals. Learn abilities, builds, counters, team synergies, and strategies. ${agent.summary}`;
  
  // Generate FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is ${agent.name} viable in the current meta?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${agent.name} is currently considered ${agent.tier || 'viable'} in the meta with strong ${agent.strengths.join(', ')} capabilities.`
        }
      },
      {
        "@type": "Question", 
        "name": `How do I counter ${agent.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The best counters include ${agent.counters.slice(0, 2).join(' and ')}. Focus on exploiting their ${agent.limitations[0]}.`
        }
      }
    ]
  };

  return {
    title,
    description,
    keywords: [
      `${agent.name} guide`,
      `${agent.name} abilities`,
      `${agent.name} builds`,
      `${agent.name} counters`,
      `Marvel Rivals ${agent.name}`,
      `${agent.role} guide`,
      'Marvel Rivals strategy'
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/agents/${agent.slug}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(agent.name)}&type=agent&role=${agent.role}`,
          width: 1200,
          height: 630,
          alt: `${agent.name} - ${agent.role}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/api/og?title=${encodeURIComponent(agent.name)}&type=agent&role=${agent.role}`]
    },
    other: {
      'structured-data': JSON.stringify(faqStructuredData)
    }
  };
}

export default async function AgentDetailPage({ params }: AgentDetailPageProps) {
  const resolvedParams = await params;
  return <AgentDetailClient params={resolvedParams} />;
}