'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Tag, Star, BookOpen, Target, Users, Map, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentTransition } from '@/components/animations/RouteTransition';
import { Guide } from '@/lib/types';

interface GuideDetailClientProps {
  guide: Guide;
}

export default function GuideDetailClient({ guide }: GuideDetailClientProps) {
  const [activeSection, setActiveSection] = useState('overview');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-600 hover:bg-green-700';
      case 'Medium': return 'bg-yellow-600 hover:bg-yellow-700';
      case 'Hard': return 'bg-red-600 hover:bg-red-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const spiderManGuideContent = {
    overview: {
      title: "Spider-Man Complete Guide",
      description: "Master Spider-Man's mobility and positioning with this comprehensive guide covering abilities, combos, and advanced techniques.",
      keyPoints: [
        "High mobility duelist with vertical control",
        "Excellent pick potential and escape options", 
        "Requires good positioning and timing",
        "Strong in 1v1 duels and flanking"
      ]
    },
    abilities: {
      primary: {
        name: "Web Shot",
        damage: "65 per shot",
        fireRate: "450 RPM",
        range: "25m",
        description: "Rapid fire web projectiles with slight spread. Good for mid-range combat.",
        tips: [
          "Lead your shots against moving targets",
          "Use burst firing for better accuracy at range",
          "Reload during web swings to maintain pressure"
        ]
      },
      utility1: {
        name: "Web Swing",
        cooldown: "10 seconds",
        range: "30m",
        description: "Swing to target location, can cancel early for momentum preservation.",
        tips: [
          "Cancel early to maintain momentum",
          "Use walls and ceilings for unexpected angles",
          "Combine with other abilities for escape routes"
        ]
      },
      utility2: {
        name: "Spider Sense",
        cooldown: "18 seconds",
        description: "Brief invulnerability and movement speed boost.",
        tips: [
          "Use proactively before engaging",
          "Great for escaping dangerous situations",
          "Combine with web swing for maximum mobility"
        ]
      },
      ultimate: {
        name: "Maximum Spider",
        cooldown: "120 seconds",
        description: "Enhanced abilities and web dome area control.",
        tips: [
          "Use in team fights for maximum impact",
          "Web dome blocks enemy movement",
          "Enhanced abilities deal more damage"
        ]
      }
    },
    strategy: {
      positioning: [
        "Use vertical space to your advantage",
        "Stay on the flanks and avoid main chokes",
        "Keep escape routes planned at all times",
        "Use high ground for better angles"
      ],
      teamFight: [
        "Focus on picking off isolated enemies",
        "Use mobility to avoid enemy ultimates",
        "Coordinate with team for follow-up damage",
        "Don't overextend without escape options"
      ],
      counters: [
        {
          enemy: "Hawkeye",
          strategy: "Stay mobile and use cover to avoid long-range shots. Close distance quickly."
        },
        {
          enemy: "Hulk", 
          strategy: "Keep your distance and use vertical advantage. Never fight in close quarters."
        },
        {
          enemy: "Magneto",
          strategy: "Bait out his abilities before engaging. Use unpredictable movement patterns."
        }
      ]
    },
    advanced: {
      techniques: [
        {
          name: "Web Swing Canceling",
          description: "Cancel your web swing early to maintain momentum while changing direction",
          execution: "Press the ability key again during the swing to cancel and preserve speed"
        },
        {
          name: "Wall Riding",
          description: "Use walls and ceilings for unexpected positioning and angles",
          execution: "Aim web swing at walls/ceilings to access unique vantage points"
        },
        {
          name: "Ability Chaining",
          description: "Combine Spider Sense with Web Swing for safe escapes or aggressive plays",
          execution: "Activate Spider Sense before web swinging for invulnerable repositioning"
        }
      ],
      combos: [
        {
          name: "Engage Combo",
          sequence: "Web Swing → Spider Sense → Web Shot",
          description: "Safe engagement with escape option"
        },
        {
          name: "Escape Combo", 
          sequence: "Spider Sense → Web Swing → Wall Ride",
          description: "Maximum mobility for disengaging"
        },
        {
          name: "Ultimate Combo",
          sequence: "Maximum Spider → Web Swing → Focus Fire",
          description: "High damage engagement during ultimate"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/guides" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Guides
        </Link>

        {/* Hero Section */}
        <ContentTransition>
          <div className="mb-12">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Hero Image for Spider-Man Guide */}
                {guide.slug === 'spider-man-complete-guide' && (
                  <div className="mb-6">
                    <div className="aspect-video relative rounded-lg overflow-hidden bg-gradient-to-br from-[#E10600]/20 to-transparent">
                      <Image
                        src="/images/agents/Marvel_Rivals_hero_Spider_Man.png"
                        alt="Spider-Man"
                        fill
                        className="object-contain"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-[#E10600] hover:bg-[#E10600]/90 text-white">
                          Duelist
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Badge className={`${getDifficultyColor(guide.difficulty)} text-white font-semibold`}>
                      {guide.difficulty}
                    </Badge>
                    {guide.featured && (
                      <Badge className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {guide.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>
                  <p className="text-xl text-zinc-400 leading-relaxed">{guide.excerpt}</p>
                </div>

                {/* Meta Information */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{guide.readTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{guide.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{new Date(guide.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm">{guide.patch}</span>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Guide Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {spiderManGuideContent.overview.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-[#E10600] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-zinc-300">{point}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Related Content */}
                {(guide.relatedAgents.length > 0 || guide.relatedMaps.length > 0) && (
                  <Card className="bg-[#18181B] border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-lg">Related Content</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {guide.relatedAgents.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-[#E10600] mb-2 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Agents
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {guide.relatedAgents.map((agent) => (
                              <Link key={agent} href={`/agents/${agent.toLowerCase().replace(' ', '-')}`}>
                                <Badge variant="outline" className="border-zinc-700 text-zinc-300 hover:border-[#E10600] hover:text-[#E10600] transition-colors cursor-pointer">
                                  {agent}
                                </Badge>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {guide.relatedMaps.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-[#E10600] mb-2 flex items-center gap-2">
                            <Map className="w-4 h-4" />
                            Maps
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {guide.relatedMaps.map((map) => (
                              <Link key={map} href={`/maps/${map.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                                <Badge variant="outline" className="border-zinc-700 text-zinc-300 hover:border-[#E10600] hover:text-[#E10600] transition-colors cursor-pointer">
                                  {map}
                                </Badge>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </ContentTransition>

        {/* Main Content Tabs */}
        <ContentTransition>
          <Tabs defaultValue="abilities" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-zinc-800">
              <TabsTrigger value="abilities">Abilities</TabsTrigger>
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="tips">Tips & FAQ</TabsTrigger>
            </TabsList>

            {/* Abilities Tab */}
            <TabsContent value="abilities" className="space-y-6">
              <div className="grid gap-6">
                {/* Primary Ability */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-[#E10600] flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      {spiderManGuideContent.abilities.primary.name} (Primary)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-zinc-400">Damage:</span>
                        <div className="font-semibold">{spiderManGuideContent.abilities.primary.damage}</div>
                      </div>
                      <div>
                        <span className="text-zinc-400">Fire Rate:</span>
                        <div className="font-semibold">{spiderManGuideContent.abilities.primary.fireRate}</div>
                      </div>
                      <div>
                        <span className="text-zinc-400">Range:</span>
                        <div className="font-semibold">{spiderManGuideContent.abilities.primary.range}</div>
                      </div>
                    </div>
                    <p className="text-zinc-300">{spiderManGuideContent.abilities.primary.description}</p>
                    <div>
                      <h4 className="font-semibold text-zinc-200 mb-2">Tips:</h4>
                      <ul className="space-y-1">
                        {spiderManGuideContent.abilities.primary.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="text-[#E10600] mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Web Swing Ability */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-blue-400 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      {spiderManGuideContent.abilities.utility1.name} (Utility)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-zinc-400">Cooldown:</span>
                        <div className="font-semibold">{spiderManGuideContent.abilities.utility1.cooldown}</div>
                      </div>
                      <div>
                        <span className="text-zinc-400">Range:</span>
                        <div className="font-semibold">{spiderManGuideContent.abilities.utility1.range}</div>
                      </div>
                    </div>
                    <p className="text-zinc-300">{spiderManGuideContent.abilities.utility1.description}</p>
                    <div>
                      <h4 className="font-semibold text-zinc-200 mb-2">Tips:</h4>
                      <ul className="space-y-1">
                        {spiderManGuideContent.abilities.utility1.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="text-blue-400 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Spider Sense Ability */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-blue-400 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      {spiderManGuideContent.abilities.utility2.name} (Utility)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <span className="text-zinc-400">Cooldown:</span>
                      <div className="font-semibold">{spiderManGuideContent.abilities.utility2.cooldown}</div>
                    </div>
                    <p className="text-zinc-300">{spiderManGuideContent.abilities.utility2.description}</p>
                    <div>
                      <h4 className="font-semibold text-zinc-200 mb-2">Tips:</h4>
                      <ul className="space-y-1">
                        {spiderManGuideContent.abilities.utility2.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="text-blue-400 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Ultimate */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-yellow-400 flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      {spiderManGuideContent.abilities.ultimate.name} (Ultimate)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <span className="text-zinc-400">Cooldown:</span>
                      <div className="font-semibold">{spiderManGuideContent.abilities.ultimate.cooldown}</div>
                    </div>
                    <p className="text-zinc-300">{spiderManGuideContent.abilities.ultimate.description}</p>
                    <div>
                      <h4 className="font-semibold text-zinc-200 mb-2">Tips:</h4>
                      <ul className="space-y-1">
                        {spiderManGuideContent.abilities.ultimate.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="text-yellow-400 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Strategy Tab */}
            <TabsContent value="strategy" className="space-y-6">
              <div className="grid gap-6">
                {/* Positioning */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-[#E10600]">Positioning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {spiderManGuideContent.strategy.positioning.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Target className="w-4 h-4 text-[#E10600] mt-0.5 flex-shrink-0" />
                          <span className="text-zinc-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Team Fighting */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-green-400">Team Fighting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {spiderManGuideContent.strategy.teamFight.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Users className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-zinc-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Counters */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-red-400">Dealing with Counters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {spiderManGuideContent.strategy.counters.map((counter, index) => (
                      <div key={index} className="border-l-2 border-red-400 pl-4">
                        <h4 className="font-semibold text-red-400 mb-1">vs {counter.enemy}</h4>
                        <p className="text-zinc-300 text-sm">{counter.strategy}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Advanced Tab */}
            <TabsContent value="advanced" className="space-y-6">
              <div className="grid gap-6">
                {/* Advanced Techniques */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-purple-400">Advanced Techniques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {spiderManGuideContent.advanced.techniques.map((technique, index) => (
                      <div key={index} className="border border-zinc-700 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-400 mb-2">{technique.name}</h4>
                        <p className="text-zinc-300 text-sm mb-2">{technique.description}</p>
                        <div className="bg-zinc-800 rounded p-2">
                          <span className="text-xs text-zinc-400">Execution:</span>
                          <p className="text-sm text-zinc-200">{technique.execution}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Combos */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-orange-400">Ability Combos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {spiderManGuideContent.advanced.combos.map((combo, index) => (
                      <div key={index} className="border border-zinc-700 rounded-lg p-4">
                        <h4 className="font-semibold text-orange-400 mb-2">{combo.name}</h4>
                        <div className="bg-zinc-800 rounded p-2 mb-2">
                          <span className="text-xs text-zinc-400">Sequence:</span>
                          <p className="text-sm font-mono text-zinc-200">{combo.sequence}</p>
                        </div>
                        <p className="text-zinc-300 text-sm">{combo.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Tips & FAQ Tab */}
            <TabsContent value="tips" className="space-y-6">
              <div className="grid gap-6">
                {/* Quick Tips */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-[#E10600]">Quick Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {[
                        "Always keep an escape route planned before engaging",
                        "Use your mobility to avoid enemy ultimates and area damage",
                        "Focus on isolated targets rather than grouped enemies",
                        "Practice web swing canceling in training mode",
                        "Coordinate with your team for follow-up damage",
                        "Don't be afraid to disengage if the fight turns bad"
                      ].map((tip, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-[#E10600] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-zinc-300">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-blue-400">Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        question: "When should I use Spider-Man's ultimate?",
                        answer: "Use Maximum Spider during team fights when you can affect multiple enemies. The web dome is great for controlling space and the enhanced abilities deal significant damage."
                      },
                      {
                        question: "How do I deal with hitscan heroes like Hawkeye?",
                        answer: "Stay mobile and unpredictable. Use walls and cover to break line of sight. Close the distance quickly using web swing and spider sense for invulnerability frames."
                      },
                      {
                        question: "What's the best way to practice Spider-Man's mobility?",
                        answer: "Spend time in training mode practicing web swing canceling and wall riding. Learn the maps' vertical spaces and practice moving between high ground positions quickly."
                      },
                      {
                        question: "Should I focus on damage or mobility items?",
                        answer: "Balance both, but prioritize mobility early. Spider-Man's strength is positioning, so items that enhance your movement and survivability are often more valuable than pure damage."
                      }
                    ].map((faq, index) => (
                      <div key={index} className="border-l-2 border-blue-400 pl-4">
                        <h4 className="font-semibold text-blue-400 mb-1">{faq.question}</h4>
                        <p className="text-zinc-300 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </ContentTransition>
      </div>
    </div>
  );
}