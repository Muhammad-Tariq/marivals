'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GridCardProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function GridCard({
  title,
  image,
  badge,
  href,
  description,
  stats,
  className
}: GridCardProps) {
  const getBadgeVariant = (variant: string) => {
    switch (variant) {
      case 'role':
        return badge?.text === 'Duelist' ? 'destructive' :
               badge?.text === 'Vanguard' ? 'default' : 'secondary';
      case 'difficulty':
        return badge?.text === 'Easy' ? 'secondary' :
               badge?.text === 'Medium' ? 'default' : 'destructive';
      case 'tier':
        return badge?.text === 'S-Tier' ? 'destructive' :
               badge?.text === 'A-Tier' ? 'default' : 'secondary';
      default:
        return 'default';
    }
  };

  const getBadgeColor = (variant: string) => {
    switch (variant) {
      case 'role':
        return badge?.text === 'Duelist' ? 'bg-red-600 hover:bg-red-700' :
               badge?.text === 'Vanguard' ? 'bg-blue-600 hover:bg-blue-700' : 
               'bg-green-600 hover:bg-green-700';
      case 'tier':
        return badge?.text === 'S-Tier' ? 'bg-yellow-600 hover:bg-yellow-700' :
               badge?.text === 'A-Tier' ? 'bg-blue-600 hover:bg-blue-700' : 
               'bg-gray-600 hover:bg-gray-700';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn("group", className)}
    >
      <Link href={href} className="block h-full">
        <Card className="h-full bg-[#18181B] border-zinc-800 overflow-hidden hover:bg-zinc-800/50 transition-all duration-300 hover:border-[#E10600]/50 focus-visible:ring-2 focus-visible:ring-[#E10600] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]">
          {/* Image Section */}
          {image ? (
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Badge overlay */}
              {badge && (
                <div className="absolute top-3 right-3">
                  <Badge 
                    variant={getBadgeVariant(badge.variant)}
                    className={cn(
                      "text-white font-semibold shadow-lg",
                      getBadgeColor(badge.variant)
                    )}
                  >
                    {badge.text}
                  </Badge>
                </div>
              )}
            </div>
          ) : (
            // Placeholder when no image
            <div className="aspect-video bg-gradient-to-br from-[#E10600]/20 to-transparent relative flex items-center justify-center">
              <div className="text-4xl font-bold opacity-50 group-hover:opacity-70 transition-opacity">
                {title[0]}
              </div>
              
              {badge && (
                <div className="absolute top-3 right-3">
                  <Badge 
                    variant={getBadgeVariant(badge.variant)}
                    className={cn(
                      "text-white font-semibold",
                      getBadgeColor(badge.variant)
                    )}
                  >
                    {badge.text}
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Content Section */}
          <CardHeader className="pb-2">
            <CardTitle className="text-xl group-hover:text-[#E10600] transition-colors duration-200">
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            {/* Description */}
            {description && (
              <p className="text-zinc-400 text-sm mb-4 line-clamp-2 flex-1">
                {description}
              </p>
            )}

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {stats.slice(0, 4).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-lg font-bold text-[#E10600]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Button */}
            <div className="mt-auto">
              <Button 
                size="sm" 
                className="w-full bg-[#E10600] hover:bg-[#E10600]/90 text-white transition-all duration-200 group-hover:shadow-lg group-hover:shadow-[#E10600]/25"
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

// Specialized variants for different content types
export function AgentCard({ agent, className }: { agent: any; className?: string }) {
  const getBadgeVariant = (variant: string) => {
    switch (variant) {
      case 'role':
        return agent.role === 'Duelist' ? 'destructive' :
               agent.role === 'Vanguard' ? 'default' : 'secondary';
      default:
        return 'default';
    }
  };

  const getBadgeColor = (variant: string) => {
    switch (variant) {
      case 'role':
        return agent.role === 'Duelist' ? 'bg-red-600 hover:bg-red-700' :
               agent.role === 'Vanguard' ? 'bg-blue-600 hover:bg-blue-700' : 
               'bg-green-600 hover:bg-green-700';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn("group", className)}
    >
      <Link href={`/agents/${agent.slug}`} className="block h-full">
        <Card className="h-full bg-[#18181B] border-zinc-800 overflow-hidden hover:bg-zinc-800/50 transition-all duration-300 hover:border-[#E10600]/50 focus-visible:ring-2 focus-visible:ring-[#E10600] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]">
          {/* Agent Image Section - Full Portrait Display */}
          {agent.portrait ? (
            <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-[#E10600]/10 to-transparent">
              <Image
                src={agent.portrait}
                alt={agent.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Role Badge */}
              <div className="absolute top-3 right-3">
                <Badge 
                  variant={getBadgeVariant('role')}
                  className={cn(
                    "text-white font-semibold shadow-lg",
                    getBadgeColor('role')
                  )}
                >
                  {agent.role}
                </Badge>
              </div>

              {/* Tier Badge */}
              {agent.tier && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold shadow-lg">
                    {agent.tier}
                  </Badge>
                </div>
              )}
            </div>
          ) : (
            // Placeholder when no image
            <div className="aspect-[3/4] bg-gradient-to-br from-[#E10600]/20 to-transparent relative flex items-center justify-center">
              <div className="text-6xl font-bold opacity-50 group-hover:opacity-70 transition-opacity">
                {agent.name[0]}
              </div>
              
              <div className="absolute top-3 right-3">
                <Badge 
                  variant={getBadgeVariant('role')}
                  className={cn(
                    "text-white font-semibold",
                    getBadgeColor('role')
                  )}
                >
                  {agent.role}
                </Badge>
              </div>
            </div>
          )}

          {/* Content Section */}
          <CardHeader className="pb-2">
            <CardTitle className="text-xl group-hover:text-[#E10600] transition-colors duration-200">
              {agent.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            {/* Description */}
            <p className="text-zinc-400 text-sm mb-4 line-clamp-2 flex-1">
              {agent.summary}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-[#E10600]">
                  {agent.difficulty}
                </div>
                <div className="text-xs text-zinc-500">
                  Difficulty
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#E10600]">
                  {agent.tier || 'N/A'}
                </div>
                <div className="text-xs text-zinc-500">
                  Tier
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#E10600]">
                  {agent.winRate ? `${agent.winRate}%` : 'N/A'}
                </div>
                <div className="text-xs text-zinc-500">
                  Win Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#E10600]">
                  {agent.pickRate ? `${agent.pickRate}%` : 'N/A'}
                </div>
                <div className="text-xs text-zinc-500">
                  Pick Rate
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-auto">
              <Button 
                size="sm" 
                className="w-full bg-[#E10600] hover:bg-[#E10600]/90 text-white transition-all duration-200 group-hover:shadow-lg group-hover:shadow-[#E10600]/25"
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export function MapCard({ map, className }: { map: any; className?: string }) {
  return (
    <GridCard
      title={map.name}
      image={map.image}
      badge={{
        text: map.biome,
        variant: 'default'
      }}
      href={`/maps/${map.slug}`}
      description={map.description}
      stats={[
        { label: 'Modes', value: map.modes.length },
        { label: 'Callouts', value: map.callouts.length },
        { label: 'Flanks', value: map.flanks.length },
        { label: 'Chokes', value: map.chokePoints.length }
      ]}
      className={className}
    />
  );
}

export function WeaponCard({ weapon, className }: { weapon: any; className?: string }) {
  return (
    <GridCard
      title={weapon.name}
      image={weapon.image}
      badge={{
        text: weapon.type,
        variant: 'default'
      }}
      href={`/weapons/${weapon.slug}`}
      description={`${weapon.type} weapon for ${weapon.agent}`}
      stats={[
        { label: 'Damage', value: weapon.damage.base },
        { label: 'Range', value: `${weapon.range}m` },
        { label: 'Fire Rate', value: weapon.fireRate },
        { label: 'Accuracy', value: `${weapon.handling.accuracy}%` }
      ]}
      className={className}
    />
  );
}

export function GuideCard({ guide, className }: { guide: any; className?: string }) {
  const getBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-600 hover:bg-green-700';
      case 'Medium':
        return 'bg-yellow-600 hover:bg-yellow-700';
      case 'Hard':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn("group", className)}
    >
      <Link href={`/guides/${guide.slug}`} className="block h-full">
        <Card className="h-full bg-[#18181B] border-zinc-800 overflow-hidden hover:bg-zinc-800/50 transition-all duration-300 hover:border-[#E10600]/50 focus-visible:ring-2 focus-visible:ring-[#E10600] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]">
          {/* Guide Image Section - Full Picture Display */}
          {guide.image ? (
            <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#E10600]/10 to-transparent">
              <Image
                src={guide.image}
                alt={guide.title}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Difficulty Badge */}
              <div className="absolute top-3 right-3">
                <Badge 
                  className={cn(
                    "text-white font-semibold shadow-lg",
                    getBadgeColor(guide.difficulty)
                  )}
                >
                  {guide.difficulty}
                </Badge>
              </div>

              {/* Featured Badge */}
              {guide.featured && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg">
                    Featured
                  </Badge>
                </div>
              )}
            </div>
          ) : (
            // Placeholder when no image
            <div className="aspect-[4/3] bg-gradient-to-br from-[#E10600]/20 to-transparent relative flex items-center justify-center">
              <div className="text-6xl font-bold opacity-50 group-hover:opacity-70 transition-opacity">
                📚
              </div>
              
              <div className="absolute top-3 right-3">
                <Badge 
                  className={cn(
                    "text-white font-semibold",
                    getBadgeColor(guide.difficulty)
                  )}
                >
                  {guide.difficulty}
                </Badge>
              </div>
            </div>
          )}

          {/* Content Section */}
          <CardHeader className="pb-2">
            <CardTitle className="text-xl group-hover:text-[#E10600] transition-colors duration-200">
              {guide.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            {/* Description */}
            <p className="text-zinc-400 text-sm mb-4 line-clamp-3 flex-1">
              {guide.excerpt}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-[#E10600]">
                  {guide.readTime}m
                </div>
                <div className="text-xs text-zinc-500">
                  Read Time
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#E10600]">
                  {guide.difficulty}
                </div>
                <div className="text-xs text-zinc-500">
                  Difficulty
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#E10600]">
                  {guide.tags.length}
                </div>
                <div className="text-xs text-zinc-500">
                  Tags
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#E10600]">
                  {guide.patch}
                </div>
                <div className="text-xs text-zinc-500">
                  Patch
                </div>
              </div>
            </div>

            {/* Tags */}
            {guide.tags && guide.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {guide.tags.slice(0, 3).map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs border-zinc-600 text-zinc-400">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Action Button */}
            <div className="mt-auto">
              <Button 
                size="sm" 
                className="w-full bg-[#E10600] hover:bg-[#E10600]/90 text-white transition-all duration-200 group-hover:shadow-lg group-hover:shadow-[#E10600]/25"
              >
                Read Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}