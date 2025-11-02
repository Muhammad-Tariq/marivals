'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContentTransition } from '@/components/animations/RouteTransition';
import { Clock, BookOpen, Award, CheckCircle2, Circle } from 'lucide-react';
import { MasterClass } from '@/lib/types';

interface MasterClassDetailClientProps {
  masterClass: MasterClass;
}

export default function MasterClassDetailClient({ masterClass }: MasterClassDetailClientProps) {
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set());

  const toggleChapter = (chapterId: string) => {
    setCompletedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  const progress = (completedChapters.size / masterClass.chapters.length) * 100;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <ContentTransition>
          <div className="mb-8">
            <Link href="/master-classes" className="text-zinc-400 hover:text-[#E10600] transition-colors">
              ← Back to Master Classes
            </Link>
          </div>
        </ContentTransition>

        {/* Header */}
        <ContentTransition delay={0.1}>
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge 
                className={
                  masterClass.difficulty === 'Easy' ? 'bg-green-600 hover:bg-green-700' :
                  masterClass.difficulty === 'Medium' ? 'bg-yellow-600 hover:bg-yellow-700' :
                  'bg-red-600 hover:bg-red-700'
                }
              >
                {masterClass.difficulty}
              </Badge>
              {masterClass.featured && (
                <Badge className="bg-purple-600 hover:bg-purple-700">
                  Featured
                </Badge>
              )}
              {masterClass.role && (
                <Badge className="bg-blue-600 hover:bg-blue-700">
                  {masterClass.role}
                </Badge>
              )}
            </div>

            <h1 className="text-5xl font-bold mb-4 text-white">
              {masterClass.title}
            </h1>

            <p className="text-xl text-zinc-400 max-w-3xl">
              {masterClass.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#E10600]" />
                <span className="text-zinc-300">{masterClass.estimatedTime} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#E10600]" />
                <span className="text-zinc-300">{masterClass.chapters.length} chapters</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#E10600]" />
                <span className="text-zinc-300">By {masterClass.author}</span>
              </div>
            </div>
          </div>
        </ContentTransition>

        {/* Progress Bar */}
        <ContentTransition delay={0.2}>
          <Card className="bg-[#18181B] border-zinc-800 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-zinc-300">Your Progress</span>
                <span className="text-sm font-medium text-[#E10600]">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-3">
                <motion.div
                  className="bg-[#E10600] h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                {completedChapters.size} of {masterClass.chapters.length} chapters completed
              </p>
            </CardContent>
          </Card>
        </ContentTransition>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Content */}
            <ContentTransition delay={0.3}>
              <Card className="bg-[#18181B] border-zinc-800 mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#E10600]">Course Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    {masterClass.content}
                  </div>
                </CardContent>
              </Card>
            </ContentTransition>

            {/* Tags */}
            {masterClass.tags && masterClass.tags.length > 0 && (
              <ContentTransition delay={0.4}>
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-xl">Topics Covered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {masterClass.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-zinc-600 text-zinc-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ContentTransition>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Chapters List */}
            <ContentTransition delay={0.3}>
              <Card className="bg-[#18181B] border-zinc-800 sticky top-20">
                <CardHeader>
                  <CardTitle className="text-xl">Chapters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {masterClass.chapters.map((chapter, index) => (
                      <motion.div
                        key={chapter.id}
                        className={`
                          p-4 rounded-lg border transition-all cursor-pointer
                          ${completedChapters.has(chapter.id)
                            ? 'bg-[#E10600]/10 border-[#E10600]/50'
                            : 'bg-zinc-800/30 border-zinc-700 hover:border-zinc-600'
                          }
                        `}
                        onClick={() => toggleChapter(chapter.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {completedChapters.has(chapter.id) ? (
                              <CheckCircle2 className="w-5 h-5 text-[#E10600]" />
                            ) : (
                              <Circle className="w-5 h-5 text-zinc-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-xs font-semibold text-[#E10600]">
                                Chapter {index + 1}
                              </span>
                              <span className="text-xs text-zinc-500 flex-shrink-0">
                                {chapter.duration}min
                              </span>
                            </div>
                            <h4 className="text-sm font-medium text-white leading-tight">
                              {chapter.title}
                            </h4>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-3">
                    <Button 
                      className="w-full bg-[#E10600] hover:bg-[#E10600]/90"
                      size="lg"
                    >
                      Start Learning
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-zinc-700 hover:bg-zinc-800"
                    >
                      Download Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ContentTransition>
          </div>
        </div>

        {/* Related Courses */}
        <ContentTransition delay={0.5}>
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Continue Learning</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/master-classes">
                <Card className="bg-[#18181B] border-zinc-800 hover:bg-zinc-800/50 hover:border-[#E10600]/50 transition-all h-full">
                  <CardContent className="p-6">
                    <BookOpen className="w-8 h-8 text-[#E10600] mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Browse All Courses</h3>
                    <p className="text-sm text-zinc-400">
                      Explore our complete library of master classes
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/guides">
                <Card className="bg-[#18181B] border-zinc-800 hover:bg-zinc-800/50 hover:border-[#E10600]/50 transition-all h-full">
                  <CardContent className="p-6">
                    <BookOpen className="w-8 h-8 text-[#E10600] mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Quick Guides</h3>
                    <p className="text-sm text-zinc-400">
                      Short, focused guides for specific topics
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/agents">
                <Card className="bg-[#18181B] border-zinc-800 hover:bg-zinc-800/50 hover:border-[#E10600]/50 transition-all h-full">
                  <CardContent className="p-6">
                    <Award className="w-8 h-8 text-[#E10600] mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Agent Database</h3>
                    <p className="text-sm text-zinc-400">
                      Detailed information on all Marvel Rivals agents
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </ContentTransition>
      </div>
    </div>
  );
}
