'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ContentTransition } from '@/components/animations/RouteTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageSquare, Bug, Lightbulb, Users, Clock } from 'lucide-react';

export default function ContactClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactCategories = [
    {
      id: 'general',
      label: 'General Inquiry',
      icon: MessageSquare,
      description: 'Questions about the site or Marvel Rivals content',
      responseTime: '24-48 hours'
    },
    {
      id: 'bug',
      label: 'Bug Report',
      icon: Bug,
      description: 'Report technical issues or site problems',
      responseTime: '12-24 hours'
    },
    {
      id: 'content',
      label: 'Content Suggestion',
      icon: Lightbulb,
      description: 'Suggest new guides, agents, or features',
      responseTime: '48-72 hours'
    },
    {
      id: 'partnership',
      label: 'Partnership',
      icon: Users,
      description: 'Business inquiries and collaboration opportunities',
      responseTime: '3-5 business days'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <ContentTransition>
          <div className="text-center max-w-md mx-auto px-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-16 h-16 bg-[#E10600] rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Mail className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-4">Message Sent!</h1>
            <p className="text-zinc-400 mb-6">
              Thank you for contacting us. We&apos;ll get back to you within the expected timeframe based on your inquiry type.
            </p>
            <Button 
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', category: '', subject: '', message: '' });
                setSelectedCategory('');
              }}
              className="bg-[#E10600] hover:bg-[#E10600]/90"
            >
              Send Another Message
            </Button>
          </div>
        </ContentTransition>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-16">
        <ContentTransition>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">
                <span className="text-[#E10600]">Contact</span> Us
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Have questions, suggestions, or need help? We&apos;re here to assist you with anything related to Marvel Rivals HQ.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Categories */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold mb-6">How can we help?</h2>
                <div className="space-y-4">
                  {contactCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card 
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedCategory === category.id 
                              ? 'bg-[#E10600]/10 border-[#E10600]' 
                              : 'bg-[#18181B] border-zinc-800 hover:bg-zinc-800/50'
                          }`}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setFormData({ ...formData, category: category.id });
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${
                                selectedCategory === category.id ? 'bg-[#E10600]' : 'bg-zinc-700'
                              }`}>
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1">{category.label}</h3>
                                <p className="text-sm text-zinc-400 mb-2">{category.description}</p>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-zinc-500" />
                                  <span className="text-xs text-zinc-500">{category.responseTime}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Quick Contact Info */}
                <Card className="mt-8 bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#E10600]" />
                      <span className="text-sm">privacy@marvelrivalz.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#E10600]" />
                      <span className="text-sm">legal@marvelrivalz.com</span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-2">
                      <p>Apt 504, 5th Floor</p>
                      <p>Gulberg Heights, Gulberg Greens</p>
                      <p>Islamabad, Pakistan, 44000</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="bg-[#18181B] border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send us a message</CardTitle>
                    {selectedCategory && (
                      <Badge className="w-fit bg-[#E10600] hover:bg-[#E10600]/90">
                        {contactCategories.find(c => c.id === selectedCategory)?.label}
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#E10600] focus:border-transparent transition-colors"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#E10600] focus:border-transparent transition-colors"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      {!selectedCategory && (
                        <div>
                          <label htmlFor="category" className="block text-sm font-medium mb-2">
                            Category *
                          </label>
                          <select
                            id="category"
                            name="category"
                            required
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#E10600] focus:border-transparent transition-colors"
                          >
                            <option value="">Select a category</option>
                            {contactCategories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#E10600] focus:border-transparent transition-colors"
                          placeholder="Brief description of your inquiry"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#E10600] focus:border-transparent transition-colors resize-none"
                          placeholder="Please provide as much detail as possible..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#E10600] hover:bg-[#E10600]/90 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </div>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </ContentTransition>
      </div>
    </div>
  );
}