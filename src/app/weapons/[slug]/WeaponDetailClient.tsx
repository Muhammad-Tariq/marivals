'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Crosshair, Zap, Target, TrendingUp, TrendingDown, Map } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentTransition } from '@/components/animations/RouteTransition';
import { Weapon } from '@/lib/types';

// Simple progress bar component
function ProgressBar({
    value,
    max,
    className = '',
    barClassName = 'bg-[#E10600]'
}: {
    value: number;
    max: number;
    className?: string;
    barClassName?: string;
}) {
    const percentage = Math.min((value / max) * 100, 100);
    return (
        <div className={`w-full bg-zinc-800 rounded-full overflow-hidden ${className}`}>
            <div
                className={`h-full rounded-full transition-all duration-500 ${barClassName}`}
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
}

interface WeaponDetailClientProps {
    weapon: Weapon;
}

export default function WeaponDetailClient({ weapon }: WeaponDetailClientProps) {
    const [selectedMap, setSelectedMap] = useState<string | null>(null);

    // Calculate overall rating
    const overallRating = Math.round(
        (weapon.handling.accuracy + weapon.handling.mobility + (100 - weapon.handling.recoil * 10)) / 3
    );

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Link href="/weapons" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Weapons
                </Link>

                {/* Hero Section */}
                <ContentTransition>
                    <div className="mb-12">
                        <div className="grid lg:grid-cols-3 gap-8 items-start">
                            {/* Weapon Image */}
                            <div className="lg:col-span-2">
                                <div className="aspect-video relative rounded-lg overflow-hidden bg-zinc-800">
                                    {weapon.image ? (
                                        <Image
                                            src={weapon.image}
                                            alt={weapon.name}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <Crosshair className="w-16 h-16 text-zinc-600" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-4 left-4 flex gap-2">
                                        <Badge className="bg-[#E10600] hover:bg-[#E10600]/90 text-white">
                                            {weapon.type}
                                        </Badge>
                                        <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                                            {weapon.agent}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Weapon Info */}
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-4xl font-bold mb-2">{weapon.name}</h1>
                                    <p className="text-zinc-400 text-lg">
                                        {weapon.type} weapon used by {weapon.agent}
                                    </p>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Card className="bg-[#18181B] border-zinc-800">
                                        <CardContent className="p-4 text-center">
                                            <Target className="w-6 h-6 text-[#E10600] mx-auto mb-2" />
                                            <div className="text-2xl font-bold">{weapon.damage.base}</div>
                                            <div className="text-sm text-zinc-400">Base Damage</div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-[#18181B] border-zinc-800">
                                        <CardContent className="p-4 text-center">
                                            <Zap className="w-6 h-6 text-[#E10600] mx-auto mb-2" />
                                            <div className="text-2xl font-bold">{weapon.fireRate}</div>
                                            <div className="text-sm text-zinc-400">Fire Rate (RPM)</div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-[#18181B] border-zinc-800">
                                        <CardContent className="p-4 text-center">
                                            <Crosshair className="w-6 h-6 text-[#E10600] mx-auto mb-2" />
                                            <div className="text-2xl font-bold">{weapon.handling.accuracy}%</div>
                                            <div className="text-sm text-zinc-400">Accuracy</div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-[#18181B] border-zinc-800">
                                        <CardContent className="p-4 text-center">
                                            <TrendingUp className="w-6 h-6 text-[#E10600] mx-auto mb-2" />
                                            <div className="text-2xl font-bold">{overallRating}%</div>
                                            <div className="text-sm text-zinc-400">Overall Rating</div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Perks */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Weapon Perks</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {weapon.perks.map((perk) => (
                                            <Badge key={perk} variant="outline" className="border-zinc-700 text-zinc-300">
                                                {perk}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ContentTransition>

                {/* Main Content */}
                <ContentTransition>
                    <Tabs defaultValue="stats" className="space-y-8">
                        <TabsList className="grid w-full grid-cols-4 bg-zinc-800">
                            <TabsTrigger value="stats">Stats</TabsTrigger>
                            <TabsTrigger value="handling">Handling</TabsTrigger>
                            <TabsTrigger value="maps">Map Fit</TabsTrigger>
                            <TabsTrigger value="tips">Tips</TabsTrigger>
                        </TabsList>

                        {/* Stats Tab */}
                        <TabsContent value="stats" className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Damage Stats */}
                                <Card className="bg-[#18181B] border-zinc-800">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-[#E10600]">
                                            <Target className="w-5 h-5" />
                                            Damage Profile
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-zinc-400">Base Damage</span>
                                                <span className="font-bold">{weapon.damage.base}</span>
                                            </div>
                                            <ProgressBar
                                                value={weapon.damage.base}
                                                max={100}
                                                className="h-2"
                                                barClassName="bg-[#E10600]"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-zinc-400">Headshot Damage</span>
                                                <span className="font-bold">{weapon.damage.headshot}</span>
                                            </div>
                                            <ProgressBar
                                                value={weapon.damage.headshot}
                                                max={200}
                                                className="h-2"
                                                barClassName="bg-yellow-500"
                                            />
                                        </div>
                                        <div className="pt-4 border-t border-zinc-700">
                                            <h4 className="text-sm font-semibold mb-2">Damage Falloff</h4>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-zinc-400">Start: {weapon.damage.falloff.start}m</span>
                                                <span className="text-zinc-400">End: {weapon.damage.falloff.end}m</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Performance Stats */}
                                <Card className="bg-[#18181B] border-zinc-800">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-[#E10600]">
                                            <Zap className="w-5 h-5" />
                                            Performance
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-zinc-400">Fire Rate</span>
                                                <span className="font-bold">{weapon.fireRate} RPM</span>
                                            </div>
                                            <ProgressBar
                                                value={weapon.fireRate}
                                                max={600}
                                                className="h-2"
                                                barClassName="bg-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-zinc-400">Effective Range</span>
                                                <span className="font-bold">{weapon.range}m</span>
                                            </div>
                                            <ProgressBar
                                                value={weapon.range}
                                                max={50}
                                                className="h-2"
                                                barClassName="bg-green-500"
                                            />
                                        </div>
                                        <div className="pt-4 border-t border-zinc-700">
                                            <h4 className="text-sm font-semibold mb-2">Best Users</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {weapon.bestUsers.map((user) => (
                                                    <Badge key={user} className="bg-[#E10600] hover:bg-[#E10600]/90">
                                                        {user}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Pros & Cons */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <Card className="bg-[#18181B] border-zinc-800">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-green-400">
                                            <TrendingUp className="w-5 h-5" />
                                            Strengths
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {weapon.pros.map((pro, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                                                    <span className="text-zinc-300">{pro}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="bg-[#18181B] border-zinc-800">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-red-400">
                                            <TrendingDown className="w-5 h-5" />
                                            Weaknesses
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {weapon.cons.map((con, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                                                    <span className="text-zinc-300">{con}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Handling Tab */}
                        <TabsContent value="handling" className="space-y-6">
                            <Card className="bg-[#18181B] border-zinc-800">
                                <CardHeader>
                                    <CardTitle>Weapon Handling Characteristics</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-zinc-400">Recoil Control</span>
                                            <span className="font-bold">{10 - weapon.handling.recoil}/10</span>
                                        </div>
                                        <ProgressBar
                                            value={10 - weapon.handling.recoil}
                                            max={10}
                                            className="h-3"
                                            barClassName="bg-purple-500"
                                        />
                                        <p className="text-sm text-zinc-500 mt-2">
                                            {weapon.handling.recoil <= 2 ? 'Very easy to control' :
                                                weapon.handling.recoil <= 4 ? 'Moderate recoil pattern' :
                                                    'Requires practice to master'}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-zinc-400">Accuracy</span>
                                            <span className="font-bold">{weapon.handling.accuracy}%</span>
                                        </div>
                                        <ProgressBar
                                            value={weapon.handling.accuracy}
                                            max={100}
                                            className="h-3"
                                            barClassName="bg-blue-500"
                                        />
                                        <p className="text-sm text-zinc-500 mt-2">
                                            {weapon.handling.accuracy >= 90 ? 'Pinpoint precision' :
                                                weapon.handling.accuracy >= 75 ? 'Reliable accuracy' :
                                                    'Requires close range'}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-zinc-400">Mobility</span>
                                            <span className="font-bold">{weapon.handling.mobility}%</span>
                                        </div>
                                        <ProgressBar
                                            value={weapon.handling.mobility}
                                            max={100}
                                            className="h-3"
                                            barClassName="bg-green-500"
                                        />
                                        <p className="text-sm text-zinc-500 mt-2">
                                            {weapon.handling.mobility >= 85 ? 'Excellent movement speed' :
                                                weapon.handling.mobility >= 65 ? 'Good mobility' :
                                                    'Reduced movement speed'}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Map Fit Tab */}
                        <TabsContent value="maps" className="space-y-6">
                            <div className="grid gap-4">
                                {Object.entries(weapon.mapFit).map(([mapName, rating]) => (
                                    <motion.div
                                        key={mapName}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <Card
                                            className={`bg-[#18181B] border-zinc-800 cursor-pointer transition-all duration-200 ${selectedMap === mapName ? 'border-[#E10600] bg-[#E10600]/10' : 'hover:border-zinc-600'
                                                }`}
                                            onClick={() => setSelectedMap(selectedMap === mapName ? null : mapName)}
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Map className="w-5 h-5 text-[#E10600]" />
                                                        <span className="font-medium">{mapName}</span>
                                                    </div>
                                                    <Badge
                                                        className={
                                                            rating === 'excellent' ? 'bg-green-600 hover:bg-green-700' :
                                                                rating === 'good' ? 'bg-blue-600 hover:bg-blue-700' :
                                                                    'bg-yellow-600 hover:bg-yellow-700'
                                                        }
                                                    >
                                                        {rating.charAt(0).toUpperCase() + rating.slice(1)}
                                                    </Badge>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                            {selectedMap && (
                                <Card className="bg-[#18181B] border-zinc-800">
                                    <CardHeader>
                                        <CardTitle className="text-[#E10600]">{selectedMap}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-zinc-300">
                                            {weapon.mapFit[selectedMap] === 'excellent'
                                                ? `${weapon.name} excels on ${selectedMap}. The map layout perfectly suits this weapon's range and handling characteristics.`
                                                : weapon.mapFit[selectedMap] === 'good'
                                                    ? `${weapon.name} performs well on ${selectedMap}. You can be effective with proper positioning and awareness.`
                                                    : `${weapon.name} faces challenges on ${selectedMap}. Consider alternative weapons or adjust your playstyle accordingly.`
                                            }
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        {/* Tips Tab */}
                        <TabsContent value="tips" className="space-y-6">
                            <div className="grid gap-4">
                                {[
                                    `Master the ${weapon.name}'s recoil pattern through practice in training mode`,
                                    `Optimal engagement range is ${weapon.damage.falloff.start}-${weapon.range}m for maximum effectiveness`,
                                    `Aim for headshots to maximize damage output (${weapon.damage.headshot} damage)`,
                                    `Use ${weapon.perks[0]} to enhance your combat effectiveness`,
                                    `Pair with ${weapon.bestUsers[0]}'s abilities for devastating combinations`,
                                    `Be aware of damage falloff beyond ${weapon.damage.falloff.end}m`
                                ].map((tip, index) => (
                                    <Card key={index} className="bg-[#18181B] border-zinc-800">
                                        <CardContent className="p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-6 h-6 bg-[#E10600] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                                    {index + 1}
                                                </div>
                                                <p className="text-zinc-300">{tip}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Meta Info */}
                            <Card className="bg-[#18181B] border-zinc-800">
                                <CardHeader>
                                    <CardTitle>Meta Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-zinc-400">Last Updated:</span>
                                            <span className="ml-2 text-white">{weapon.updatedAt}</span>
                                        </div>
                                        <div>
                                            <span className="text-zinc-400">Current Patch:</span>
                                            <span className="ml-2 text-white">{weapon.patch}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </ContentTransition>
            </div>
        </div>
    );
}