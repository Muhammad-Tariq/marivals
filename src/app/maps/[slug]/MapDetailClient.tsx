'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Users, Zap, Shield, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentTransition } from '@/components/animations/RouteTransition';
import { Map, MapCallout } from '@/lib/types';

interface MapDetailClientProps {
  map: Map;
}

export default function MapDetailClient({ map }: MapDetailClientProps) {
  const [selectedCallout, setSelectedCallout] = useState<MapCallout | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/maps" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Maps
        </Link>

        {/* Hero Section */}
        <ContentTransition>
          <div className="mb-12">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Map Image */}
              <div className="lg:col-span-2">
                <div className="aspect-video relative rounded-lg overflow-hidden bg-zinc-800">
                  {map.image ? (
                    <Image
                      src={map.image}
                      alt={map.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <MapPin className="w-16 h-16 text-zinc-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-[#E10600] hover:bg-[#E10600]/90 text-white">
                      {map.biome}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Map Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{map.name}</h1>
                  <p className="text-zinc-400 text-lg">{map.description}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-[#18181B] border-zinc-800">
                    <CardContent className="p-4 text-center">
                      <Users className="w-6 h-6 text-[#E10600] mx-auto mb-2" />
                      <div className="text-2xl font-bold">{map.modes.length}</div>
                      <div className="text-sm text-zinc-400">Game Modes</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#18181B] border-zinc-800">
                    <CardContent className="p-4 text-center">
                      <MapPin className="w-6 h-6 text-[#E10600] mx-auto mb-2" />
                      <div className="text-2xl font-bold">{map.callouts.length}</div>
                      <div className="text-sm text-zinc-400">Callouts</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#18181B] border-zinc-800">
                    <CardContent className="p-4 text-center">
                      <Zap className="w-6 h-6 text-[#E10600] mx-auto mb-2" />
                      <div className="text-2xl font-bold">{map.flanks.length}</div>
                      <div className="text-sm text-zinc-400">Flank Routes</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#18181B] border-zinc-800">
                    <CardContent className="p-4 text-center">
                      <Shield className="w-6 h-6 text-[#E10600] mx-auto mb-2" />
                      <div className="text-2xl font-bold">{map.chokePoints.length}</div>
                      <div className="text-sm text-zinc-400">Choke Points</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Game Modes */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Available Modes</h3>
                  <div className="flex flex-wrap gap-2">
                    {map.modes.map((mode) => (
                      <Badge key={mode} variant="outline" className="border-zinc-700 text-zinc-300">
                        {mode}
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
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-zinc-800">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="callouts">Callouts</TabsTrigger>
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="tips">Tips</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Flank Routes */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-400">
                      <Zap className="w-5 h-5" />
                      Flank Routes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {map.flanks.map((flank, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Target className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-zinc-300">{flank}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Choke Points */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-400">
                      <Shield className="w-5 h-5" />
                      Choke Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {map.chokePoints.map((choke, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-zinc-300">{choke}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Callouts Tab */}
            <TabsContent value="callouts" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {map.callouts.map((callout, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`bg-[#18181B] border-zinc-800 cursor-pointer transition-all duration-200 ${
                        selectedCallout === callout ? 'border-[#E10600] bg-[#E10600]/10' : 'hover:border-zinc-600'
                      }`}
                      onClick={() => setSelectedCallout(selectedCallout === callout ? null : callout)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#E10600]" />
                          <span className="font-medium">{callout.name}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              {selectedCallout && (
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-[#E10600]">{selectedCallout.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-300">
                      {selectedCallout.description}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Strategy Tab */}
            <TabsContent value="strategy" className="space-y-6">
              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle>Map Strategy Guide</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#E10600] mb-2">Positioning</h4>
                    <p className="text-zinc-300">
                      {map.name} offers multiple strategic positions. Control the high ground and use the {map.biome.toLowerCase()} environment to your advantage.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#E10600] mb-2">Team Composition</h4>
                    <p className="text-zinc-300">
                      This map works well with balanced team compositions. Consider bringing area denial heroes for choke point control.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#E10600] mb-2">Common Mistakes</h4>
                    <p className="text-zinc-300">
                      Avoid overextending through flank routes without team support. Always maintain sight lines to key objectives.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tips Tab */}
            <TabsContent value="tips" className="space-y-6">
              <div className="grid gap-4">
                {[
                  "Use the environment to break line of sight when retreating",
                  "Coordinate with your team before pushing through choke points",
                  "Flank routes are powerful but require team coordination",
                  "Control key callout positions to dominate map control",
                  "Adapt your strategy based on the game mode being played"
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
            </TabsContent>
          </Tabs>
        </ContentTransition>

        {/* Image Licensing Information */}
        <ContentTransition>
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <Card className="bg-[#18181B] border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg text-zinc-300 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Image Attribution & Licensing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-400">
                <div>
                  <p>
                    <strong className="text-zinc-300">Educational Fair Use:</strong> The map image displayed above is used under educational fair use provisions 
                    for the purpose of illustrating gameplay strategy and map analysis. This transformative use is covered by U.S. fair use laws.
                  </p>
                </div>
                
                <div>
                  <p>
                    <strong className="text-zinc-300">Copyright Notice:</strong> This image is copyrighted material from Marvel Rivals. 
                    The low-resolution format and educational context support fair use classification under copyright law.
                  </p>
                </div>

                <div>
                  <p>
                    <strong className="text-zinc-300">Trademark Disclaimer:</strong> Marvel Rivals, {map.name}, and all related content 
                    are trademarks of their respective owners. This site is not affiliated with or endorsed by the trademark holders.
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-700 text-xs text-zinc-500">
                  Users are responsible for ensuring compliance with applicable copyright and trademark laws. 
                  These restrictions are independent of copyright status and apply to all jurisdictions.
                </div>
              </CardContent>
            </Card>
          </div>
        </ContentTransition>
      </div>
    </div>
  );
}