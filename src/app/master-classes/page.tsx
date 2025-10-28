'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContentTransition } from '@/components/animations/RouteTransition';
import { StaggeredList } from '@/components/animations/StaggeredGrid';
import { getMasterClasses } from '@/lib/data/content';
import { MasterClass } from '@/lib/types';
import { Clock, BookOpen, Users, Award } from 'lucide-react';

export default function MasterClassesPage() {
  const [masterClasses, setMasterClasses] = useState<MasterClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMasterClassesData = async () => {
      setLoading(true);
      try {
        const masterClassesData = getMasterClasses();
        setMasterClasses(masterClassesData);
      } catch (error) {
        console.error('Error loading master classes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMasterClassesData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <ContentTransition>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">
              Marvel Rivals <span className="text-[#E10600]">Master Classes</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Comprehensive courses designed to transform you from casual player to competitive expert. 
              Learn from the best with structured lessons, quizzes, and downloadable resources.
            </p>
          </div>
        </ContentTransition>

        {/* Course Benefits */}
        <ContentTransition delay={0.2}>
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <motion.div 
              className="text-center p-6 bg-[#18181B] border border-zinc-800 rounded-lg"
              whileHover={{ borderColor: 'rgba(225, 6, 0, 0.3)' }}
            >
              <BookOpen className="w-8 h-8 text-[#E10600] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Structured Learning</h3>
              <p className="text-sm text-zinc-400">Step-by-step progression from fundamentals to mastery</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 bg-[#18181B] border border-zinc-800 rounded-lg"
              whileHover={{ borderColor: 'rgba(225, 6, 0, 0.3)' }}
            >
              <Users className="w-8 h-8 text-[#E10600] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Expert Instructors</h3>
              <p className="text-sm text-zinc-400">Learn from top-tier players and coaches</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 bg-[#18181B] border border-zinc-800 rounded-lg"
              whileHover={{ borderColor: 'rgba(225, 6, 0, 0.3)' }}
            >
              <Clock className="w-8 h-8 text-[#E10600] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Self-Paced</h3>
              <p className="text-sm text-zinc-400">Learn at your own speed with lifetime access</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 bg-[#18181B] border border-zinc-800 rounded-lg"
              whileHover={{ borderColor: 'rgba(225, 6, 0, 0.3)' }}
            >
              <Award className="w-8 h-8 text-[#E10600] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Certificates</h3>
              <p className="text-sm text-zinc-400">Earn completion certificates and achievements</p>
            </motion.div>
          </div>
        </ContentTransition>

        {/* Master Classes Grid */}
        <ContentTransition delay={0.4}>
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Available Courses</h2>
              <div className="text-zinc-400">
                {loading ? 'Loading...' : `${masterClasses.length} courses available`}
              </div>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 animate-pulse">
                    <div className="h-6 bg-zinc-800 rounded w-3/4 mb-4" />
                    <div className="h-4 bg-zinc-800 rounded w-full mb-2" />
                    <div className="h-4 bg-zinc-800 rounded w-2/3 mb-6" />
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 bg-zinc-800 rounded w-16" />
                      <div className="h-6 bg-zinc-800 rounded w-20" />
                    </div>
                    <div className="h-10 bg-zinc-800 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : masterClasses.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Master Classes Available Yet</h3>
                <p className="text-zinc-400 mb-6">We&apos;re working on creating comprehensive courses for you.</p>
                <Link href="/guides">
                  <Button className="bg-[#E10600] hover:bg-[#E10600]/90">
                    Browse Guides Instead
                  </Button>
                </Link>
              </div>
            ) : (
              <StaggeredList className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {masterClasses.map((masterClass) => (
                  <motion.div
                    key={masterClass.slug}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Card className="h-full bg-[#18181B] border-zinc-800 hover:bg-zinc-800/50 transition-all duration-300 hover:border-[#E10600]/50">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-xl group-hover:text-[#E10600] transition-colors">
                            {masterClass.title}
                          </CardTitle>
                          {masterClass.featured && (
                            <Badge className="bg-[#E10600] hover:bg-[#E10600]/90">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          {masterClass.description}
                        </p>
                      </CardHeader>

                      <CardContent className="flex-1 flex flex-col">
                        {/* Course Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                            <Clock className="w-5 h-5 text-[#E10600] mx-auto mb-1" />
                            <div className="text-sm font-semibold">{masterClass.estimatedTime}min</div>
                            <div className="text-xs text-zinc-400">Duration</div>
                          </div>
                          <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                            <BookOpen className="w-5 h-5 text-[#E10600] mx-auto mb-1" />
                            <div className="text-sm font-semibold">{masterClass.chapters.length}</div>
                            <div className="text-xs text-zinc-400">Chapters</div>
                          </div>
                        </div>

                        {/* Difficulty & Tags */}
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge 
                              variant="outline"
                              className={
                                masterClass.difficulty === 'Easy' ? 'border-green-500 text-green-400' :
                                masterClass.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-400' :
                                'border-red-500 text-red-400'
                              }
                            >
                              {masterClass.difficulty}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {masterClass.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {masterClass.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{masterClass.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Chapters Preview */}
                        <div className="mb-6 flex-1">
                          <h4 className="font-semibold mb-3 text-sm">Course Outline:</h4>
                          <div className="space-y-2">
                            {masterClass.chapters.slice(0, 3).map((chapter, index) => (
                              <div key={chapter.id} className="flex items-center gap-2 text-sm">
                                <span className="w-5 h-5 bg-[#E10600]/20 text-[#E10600] rounded-full flex items-center justify-center text-xs font-bold">
                                  {index + 1}
                                </span>
                                <span className="text-zinc-300">{chapter.title}</span>
                              </div>
                            ))}
                            {masterClass.chapters.length > 3 && (
                              <div className="text-xs text-zinc-500 ml-7">
                                +{masterClass.chapters.length - 3} more chapters
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Button */}
                        <Link href={`/master-classes/${masterClass.slug}`}>
                          <Button className="w-full bg-[#E10600] hover:bg-[#E10600]/90 group-hover:shadow-lg group-hover:shadow-[#E10600]/25 transition-all">
                            Start Course
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </StaggeredList>
            )}
          </section>
        </ContentTransition>

        {/* Learning Path Suggestion */}
        <ContentTransition delay={0.6}>
          <section className="mt-16">
            <Card className="bg-gradient-to-r from-[#E10600]/10 to-transparent border border-[#E10600]/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-[#E10600]">Recommended Learning Path</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#E10600] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Fundamentals</h3>
                    <p className="text-sm text-zinc-400">Start with basic game mechanics and role understanding</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#E10600] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Role Mastery</h3>
                    <p className="text-sm text-zinc-400">Deep dive into your preferred role and playstyle</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#E10600] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Competitive Play</h3>
                    <p className="text-sm text-zinc-400">Advanced strategies for ranked climbing and team play</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </ContentTransition>
      </div>
    </div>
  );
}