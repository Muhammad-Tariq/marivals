'use client';


import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Users, Target, Shield, Zap } from 'lucide-react';
import { getAgentBySlug } from '@/lib/data/agents';
import { ContentTransition } from '@/components/animations/RouteTransition';

import { AnimatedProgressBar, CountUp } from '@/components/animations/InteractiveAnimations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Agent } from '@/lib/types';

interface AgentDetailClientProps {
  params: {
    slug: string;
  };
}

export default function AgentDetailClient({ params }: AgentDetailClientProps) {
  // Directly load the agent data without useState/useEffect complexity
  const agent = getAgentBySlug(params.slug);
  
  // If no agent found, show 404
  if (!agent) {
    notFound();
  }



  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Duelist':
        return 'text-red-400 border-red-400';
      case 'Vanguard':
        return 'text-blue-400 border-blue-400';
      case 'Strategist':
        return 'text-green-400 border-green-400';
      default:
        return 'text-zinc-400 border-zinc-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-600';
      case 'Medium':
        return 'bg-yellow-600';
      case 'Hard':
        return 'bg-red-600';
      default:
        return 'bg-zinc-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/agents">
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Agents
            </Button>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <ContentTransition>
          <div className="mb-12">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Agent Portrait */}
              <motion.div
                className="lg:col-span-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-[#E10600]/20 to-transparent rounded-lg border border-zinc-800 relative overflow-hidden">
                  {agent.portrait ? (
                    <img
                      src={agent.portrait}
                      alt={agent.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-8xl font-bold opacity-30">{agent.name[0]}</div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getRoleColor(agent.role)} bg-black/50 backdrop-blur-sm`}>
                      {agent.role}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className={`${getDifficultyColor(agent.difficulty)} text-white`}>
                      {agent.difficulty}
                    </Badge>
                  </div>
                </div>
              </motion.div>

              {/* Agent Info */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-5xl font-bold mb-2">
                    {agent.name}
                  </h1>
                  <p className="text-xl text-zinc-300 mb-4">
                    {agent.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge variant="outline" className={getRoleColor(agent.role)}>
                      {agent.role}
                    </Badge>
                    <Badge className={getDifficultyColor(agent.difficulty)}>
                      {agent.difficulty}
                    </Badge>
                    {agent.tier && (
                      <Badge className="bg-yellow-600">
                        {agent.tier}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {(agent as any).health && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#E10600]">{(agent as any).health}</div>
                      <div className="text-sm text-zinc-400">Health</div>
                    </div>
                  )}
                  {agent.winRate && (
                    <div className="text-center">
                      <CountUp value={agent.winRate} suffix="%" className="text-2xl font-bold text-[#E10600]" />
                      <div className="text-sm text-zinc-400">Win Rate</div>
                    </div>
                  )}
                  {agent.pickRate && (
                    <div className="text-center">
                      <CountUp value={agent.pickRate} suffix="%" className="text-2xl font-bold text-[#E10600]" />
                      <div className="text-sm text-zinc-400">Pick Rate</div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#E10600]">{agent.abilities.length}</div>
                    <div className="text-sm text-zinc-400">Abilities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#E10600]">{agent.bestMaps.length}</div>
                    <div className="text-sm text-zinc-400">Best Maps</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentTransition>

        {/* Main Content */}
        <ContentTransition>
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 bg-zinc-800">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="abilities">Abilities</TabsTrigger>
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="builds">Builds</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Strengths */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-400">
                      <Zap className="w-5 h-5" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {agent.strengths.map((strength, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-green-600/10 border border-green-600/20 rounded-lg"
                          whileHover={{ backgroundColor: 'rgba(34, 197, 94, 0.15)' }}
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <span className="capitalize">{strength}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Limitations */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-400">
                      <Shield className="w-5 h-5" />
                      Limitations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {agent.limitations.map((limitation, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-red-600/10 border border-red-600/20 rounded-lg"
                          whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.15)' }}
                        >
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="capitalize">{limitation}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Team Synergies */}
              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Team Synergies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">Team-Ups</h4>
                      <div className="space-y-2">
                        {agent.teamUps.map((teamUp, index) => (
                          <div key={index} className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
                            {teamUp}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {agent.antiSynergies && agent.antiSynergies.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-red-400 mb-2">Anti-Synergies</h4>
                        <div className="space-y-2">
                          {agent.antiSynergies.map((antiSynergy, index) => (
                            <div key={index} className="p-3 bg-red-600/10 border border-red-600/20 rounded-lg">
                              {antiSynergy}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-center">Meta Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="space-y-4">
                      <div>
                        <div className="text-3xl font-bold text-[#E10600] mb-1">
                          {agent.tier || 'B-Tier'}
                        </div>
                        <div className="text-sm text-zinc-400">Current Tier</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Win Rate:</span>
                          <span className="font-semibold">{agent.winRate || 50}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Pick Rate:</span>
                          <span className="font-semibold">{agent.pickRate || 15}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-center">Role Effectiveness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-zinc-400">Damage</span>
                          <span className="text-sm">{agent.role === 'Duelist' ? '85%' : agent.role === 'Vanguard' ? '60%' : '40%'}</span>
                        </div>
                        <div className="w-full bg-zinc-700 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: agent.role === 'Duelist' ? '85%' : agent.role === 'Vanguard' ? '60%' : '40%' }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-zinc-400">Survivability</span>
                          <span className="text-sm">{agent.role === 'Vanguard' ? '90%' : agent.role === 'Strategist' ? '65%' : '45%'}</span>
                        </div>
                        <div className="w-full bg-zinc-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: agent.role === 'Vanguard' ? '90%' : agent.role === 'Strategist' ? '65%' : '45%' }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-zinc-400">Utility</span>
                          <span className="text-sm">{agent.role === 'Strategist' ? '95%' : agent.role === 'Vanguard' ? '70%' : '50%'}</span>
                        </div>
                        <div className="w-full bg-zinc-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: agent.role === 'Strategist' ? '95%' : agent.role === 'Vanguard' ? '70%' : '50%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-center">Difficulty Rating</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="space-y-4">
                      <div>
                        <div className="text-3xl font-bold mb-1" style={{
                          color: agent.difficulty === 'Easy' ? '#22c55e' : 
                                 agent.difficulty === 'Medium' ? '#eab308' : '#ef4444'
                        }}>
                          {agent.difficulty}
                        </div>
                        <div className="text-sm text-zinc-400">Skill Level</div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Mechanical:</span>
                          <span>{agent.difficulty === 'Easy' ? 'Low' : agent.difficulty === 'Medium' ? 'Medium' : 'High'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Positioning:</span>
                          <span>{agent.role === 'Duelist' ? 'Critical' : agent.role === 'Vanguard' ? 'Important' : 'Moderate'}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Abilities Tab */}
            <TabsContent value="abilities" className="space-y-6">
              <div className="grid gap-6">
                {agent.abilities.map((ability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-[#18181B] border-zinc-800">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">{ability.name}</CardTitle>
                          <Badge variant="outline" className={
                            ability.type === 'Ultimate' ? 'border-yellow-500 text-yellow-500' :
                            ability.type === 'Primary' ? 'border-red-500 text-red-500' :
                            ability.type === 'Secondary' ? 'border-blue-500 text-blue-500' :
                            'border-green-500 text-green-500'
                          }>
                            {ability.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-zinc-300 mb-4">{ability.notes}</p>
                            
                            <div className="space-y-2">
                              {ability.cooldown > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-zinc-400">Cooldown:</span>
                                  <span className="font-mono">{ability.cooldown}s</span>
                                </div>
                              )}
                              {ability.damage && (
                                <div className="flex justify-between">
                                  <span className="text-zinc-400">Damage:</span>
                                  <span className="font-mono text-[#E10600]">{ability.damage}</span>
                                </div>
                              )}
                              {ability.range && (
                                <div className="flex justify-between">
                                  <span className="text-zinc-400">Range:</span>
                                  <span className="font-mono">{ability.range}m</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {ability.damage && (
                            <div>
                              <h5 className="font-semibold mb-2">Damage Output</h5>
                              <AnimatedProgressBar
                                value={ability.damage}
                                max={150}
                                color="#E10600"
                                showValue={false}
                              />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Strategy Tab */}
            <TabsContent value="strategy" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Counters */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-400">
                      <Target className="w-5 h-5" />
                      Counters & Weaknesses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {agent.counters.map((counter, index) => (
                        <div key={index} className="p-3 bg-red-600/10 border border-red-600/20 rounded-lg">
                          {counter}
                        </div>
                      ))}
                    </div>
                    
                    {agent.counterTips && agent.counterTips.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Counter Tips</h4>
                        <div className="space-y-2">
                          {agent.counterTips.map((tip, index) => (
                            <div key={index} className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg text-sm">
                              💡 {tip}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Best Maps */}
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle>Best Maps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {agent.bestMaps.map((mapName, index) => (
                        <motion.div
                          key={index}
                          className="p-3 bg-[#E10600]/10 border border-[#E10600]/20 rounded-lg hover:bg-[#E10600]/20 transition-colors cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{mapName}</span>
                            <ExternalLink className="w-4 h-4 text-zinc-400" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Section */}
              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is {agent.name} viable in the current meta?</AccordionTrigger>
                      <AccordionContent>
                        {agent.name} is currently considered {agent.tier || 'viable'} in the meta. 
                        With a {agent.winRate || 'competitive'} win rate, they excel in {agent.strengths.join(', ')} 
                        but may struggle with {agent.limitations.join(', ')}.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How do I counter {agent.name}?</AccordionTrigger>
                      <AccordionContent>
                        The best counters to {agent.name} include {agent.counters.slice(0, 2).join(' and ')}. 
                        Focus on exploiting their {agent.limitations[0]} and avoid engaging during their power spikes.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>What team compositions work best with {agent.name}?</AccordionTrigger>
                      <AccordionContent>
                        {agent.name} synergizes well with {agent.teamUps.length > 0 ? agent.teamUps[0] : 'supportive team compositions'}. 
                        Their {agent.strengths[0]} makes them effective in coordinated team fights.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Builds Tab */}
            <TabsContent value="builds" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {(agent as any).builds && (agent as any).builds.length > 0 ? (
                  (agent as any).builds.map((build: any, index: number) => (
                    <Card key={index} className="bg-[#18181B] border-zinc-800">
                      <CardHeader>
                        <CardTitle className="text-[#E10600]">{build.name}</CardTitle>
                        <p className="text-zinc-400">{build.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <h4 className="font-semibold">Recommended Items:</h4>
                          <div className="space-y-2">
                            {build.items.map((item: string, itemIndex: number) => (
                              <div key={itemIndex} className="p-2 bg-[#E10600]/10 border border-[#E10600]/20 rounded">
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="bg-[#18181B] border-zinc-800 md:col-span-2">
                    <CardHeader>
                      <CardTitle>Recommended Builds</CardTitle>
                      <p className="text-zinc-400">Optimized builds for different playstyles and team compositions.</p>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12 text-zinc-400">
                        <div className="text-6xl mb-4">🚧</div>
                        <h3 className="text-xl font-semibold mb-2">Builds Coming Soon</h3>
                        <p>Detailed build guides and loadout recommendations will be available in a future update.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              {/* Patch Notes */}
              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle>Patch Notes Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-600">{agent.patch}</Badge>
                      <span className="text-sm text-zinc-400">Updated: {new Date(agent.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-zinc-300">
                      {(agent as any).patchNotes || `${agent.name} remains balanced in the current meta with no recent changes.`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Guides Tab */}
            <TabsContent value="guides" className="space-y-6">
              {/* Playstyle Tips */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-green-400">Beginner Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(agent as any).playstyleTips?.beginner ? (
                        (agent as any).playstyleTips.beginner.map((tip: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
                            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <span className="text-zinc-300">{tip}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-zinc-400 text-center py-8">
                          <div className="text-4xl mb-2">📚</div>
                          <p>Beginner tips coming soon!</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-yellow-400">Advanced Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(agent as any).playstyleTips?.advanced ? (
                        (agent as any).playstyleTips.advanced.map((tip: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
                            <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <span className="text-zinc-300">{tip}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-zinc-400 text-center py-8">
                          <div className="text-4xl mb-2">🎯</div>
                          <p>Advanced tips coming soon!</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced FAQ */}
              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {(agent as any).faq && (agent as any).faq.length > 0 ? (
                      (agent as any).faq.map((faqItem: any, index: number) => (
                        <AccordionItem key={index} value={`faq-${index}`}>
                          <AccordionTrigger>{faqItem.question}</AccordionTrigger>
                          <AccordionContent>{faqItem.answer}</AccordionContent>
                        </AccordionItem>
                      ))
                    ) : (
                      <>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>Is {agent.name} viable in the current meta?</AccordionTrigger>
                          <AccordionContent>
                            {agent.name} is currently considered {agent.tier || 'viable'} in the meta. 
                            With a {agent.winRate || 'competitive'}% win rate, they excel in {agent.strengths.join(', ')} 
                            but may struggle with {agent.limitations.join(', ')}.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>How do I counter {agent.name}?</AccordionTrigger>
                          <AccordionContent>
                            The best counters to {agent.name} include {agent.counters.slice(0, 2).join(' and ')}. 
                            Focus on exploiting their {agent.limitations[0]} and avoid engaging during their power spikes.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>What team compositions work best with {agent.name}?</AccordionTrigger>
                          <AccordionContent>
                            {agent.name} synergizes well with {agent.teamUps.length > 0 ? agent.teamUps[0] : 'supportive team compositions'}. 
                            Their {agent.strengths[0]} makes them effective in coordinated team fights.
                          </AccordionContent>
                        </AccordionItem>
                      </>
                    )}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Changelog */}
              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle>Changelog</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <div>
                        <div className="font-semibold">{agent.patch} - {new Date(agent.updatedAt).toLocaleDateString()}</div>
                        <div className="text-sm text-zinc-400">
                          {(agent as any).patchNotes || `${agent.name} added to Marvel Rivals HQ database with complete ability breakdown and meta analysis.`}
                        </div>
                      </div>
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