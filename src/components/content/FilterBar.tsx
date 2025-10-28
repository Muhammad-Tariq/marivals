'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterBarProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterOption {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'range' | 'toggle';
  options: Array<{ value: string; label: string; count?: number }>;
  placeholder?: string;
}

interface FilterBarComponentProps {
  filters: FilterOption[];
  onFilterChange: (filters: Record<string, any>) => void;
  onSortChange?: (sortBy: string, order: 'asc' | 'desc') => void;
  sortOptions?: Array<{ value: string; label: string }>;
  sticky?: boolean;
  showCount?: boolean;
  className?: string;
}

export default function FilterBar({
  filters,
  onFilterChange,
  onSortChange,
  sortOptions,
  sticky = false,
  showCount = true,
  className
}: FilterBarComponentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const initialFilters: Record<string, any> = {};
    
    filters.forEach(filter => {
      const value = params.get(filter.key);
      if (value) {
        if (filter.type === 'multiselect') {
          initialFilters[filter.key] = value.split(',');
        } else {
          initialFilters[filter.key] = value;
        }
      }
    });
    
    const sort = params.get('sort');
    const order = params.get('order') as 'asc' | 'desc';
    
    if (sort) setSortBy(sort);
    if (order) setSortOrder(order);
    
    setActiveFilters(initialFilters);
  }, [searchParams, filters]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update URL when filters change
  const updateURL = useCallback((newFilters: Record<string, any>, newSortBy?: string, newSortOrder?: 'asc' | 'desc') => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== '' && (Array.isArray(value) ? value.length > 0 : true)) {
        if (Array.isArray(value)) {
          params.set(key, value.join(','));
        } else {
          params.set(key, value.toString());
        }
      }
    });
    
    if (newSortBy) params.set('sort', newSortBy);
    if (newSortOrder) params.set('order', newSortOrder);
    
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    router.push(newUrl, { scroll: false });
  }, [router, pathname]);

  // Handle filter changes
  const handleFilterChange = useCallback((key: string, value: any) => {
    const newFilters = { ...activeFilters };
    
    if (value === '' || value === null || value === 'all' || (Array.isArray(value) && value.length === 0)) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
    updateURL(newFilters, sortBy, sortOrder);
  }, [activeFilters, onFilterChange, updateURL, sortBy, sortOrder]);

  // Handle sort changes
  const handleSortChange = useCallback((newSortBy: string) => {
    const newOrder = newSortBy === sortBy && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(newSortBy);
    setSortOrder(newOrder);
    onSortChange?.(newSortBy, newOrder);
    updateURL(activeFilters, newSortBy, newOrder);
  }, [sortBy, sortOrder, onSortChange, updateURL, activeFilters]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setActiveFilters({});
    setSortBy('');
    setSortOrder('asc');
    onFilterChange({});
    router.push(pathname);
  }, [onFilterChange, router, pathname]);

  // Count active filters
  const activeFilterCount = Object.keys(activeFilters).length;

  // Render filter input based on type
  const renderFilterInput = (filter: FilterOption) => {
    const value = activeFilters[filter.key];
    
    switch (filter.type) {
      case 'select':
        return (
          <Select
            value={value || 'all'}
            onValueChange={(newValue) => handleFilterChange(filter.key, newValue)}
          >
            <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder={filter.placeholder || `All ${filter.label}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {filter.label}</SelectItem>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{option.label}</span>
                    {showCount && option.count !== undefined && (
                      <span className="text-zinc-400 text-xs ml-2">({option.count})</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case 'multiselect':
        return (
          <div className="space-y-2">
            <Select
              onValueChange={(newValue) => {
                const currentValues = value || [];
                const updatedValues = currentValues.includes(newValue)
                  ? currentValues.filter((v: string) => v !== newValue)
                  : [...currentValues, newValue];
                handleFilterChange(filter.key, updatedValues);
              }}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder={filter.placeholder || `Select ${filter.label}`} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{option.label}</span>
                      {showCount && option.count !== undefined && (
                        <span className="text-zinc-400 text-xs ml-2">({option.count})</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Selected values */}
            {value && value.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {value.map((selectedValue: string) => {
                  const option = filter.options.find(opt => opt.value === selectedValue);
                  return (
                    <Badge
                      key={selectedValue}
                      variant="secondary"
                      className="bg-[#E10600] text-white hover:bg-[#E10600]/90"
                    >
                      {option?.label || selectedValue}
                      <button
                        onClick={() => {
                          const updatedValues = value.filter((v: string) => v !== selectedValue);
                          handleFilterChange(filter.key, updatedValues);
                        }}
                        className="ml-1 hover:text-zinc-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "w-full z-10",
        sticky && "sticky top-0 backdrop-blur-sm",
        className
      )}
    >
      <Card className="bg-[#18181B] border-zinc-800">
        <CardContent className="p-4">
          {/* Mobile toggle button */}
          {isMobile && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filters</span>
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="bg-[#E10600] text-white">
                    {activeFilterCount}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-zinc-400 hover:text-white"
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          )}

          <AnimatePresence>
            {(!isMobile || isExpanded) && (
              <motion.div
                initial={isMobile ? { height: 0, opacity: 0 } : undefined}
                animate={isMobile ? { height: 'auto', opacity: 1 } : undefined}
                exit={isMobile ? { height: 0, opacity: 0 } : undefined}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Filter inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filters.map((filter) => (
                    <div key={filter.key} className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">
                        {filter.label}
                      </label>
                      {renderFilterInput(filter)}
                    </div>
                  ))}
                </div>

                {/* Sort and actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-zinc-800">
                  {/* Sort options */}
                  {sortOptions && sortOptions.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-400">Sort by:</span>
                      <div className="flex gap-1">
                        {sortOptions.map((option) => (
                          <Button
                            key={option.value}
                            variant={sortBy === option.value ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handleSortChange(option.value)}
                            className={cn(
                              "text-xs",
                              sortBy === option.value && "bg-[#E10600] hover:bg-[#E10600]/90"
                            )}
                          >
                            {option.label}
                            {sortBy === option.value && (
                              <span className="ml-1">
                                {sortOrder === 'asc' ? '↑' : '↓'}
                              </span>
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Clear filters */}
                  {activeFilterCount > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllFilters}
                      className="border-zinc-700 text-zinc-300 hover:text-white hover:border-[#E10600]"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear All ({activeFilterCount})
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Specialized filter bars for different content types
export function AgentFilterBar({ onFilterChange, onSortChange }: {
  onFilterChange: (filters: any) => void;
  onSortChange?: (sortBy: string, order: 'asc' | 'desc') => void;
}) {
  const filters: FilterOption[] = [
    {
      key: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'Duelist', label: 'Duelist', count: 12 },
        { value: 'Vanguard', label: 'Vanguard', count: 8 },
        { value: 'Strategist', label: 'Strategist', count: 10 }
      ]
    },
    {
      key: 'difficulty',
      label: 'Difficulty',
      type: 'select',
      options: [
        { value: 'Easy', label: 'Easy', count: 8 },
        { value: 'Medium', label: 'Medium', count: 15 },
        { value: 'Hard', label: 'Hard', count: 7 }
      ]
    },
    {
      key: 'tier',
      label: 'Tier',
      type: 'select',
      options: [
        { value: 'S-Tier', label: 'S-Tier', count: 5 },
        { value: 'A-Tier', label: 'A-Tier', count: 12 },
        { value: 'B-Tier', label: 'B-Tier', count: 10 },
        { value: 'C-Tier', label: 'C-Tier', count: 3 }
      ]
    },
    {
      key: 'mobility',
      label: 'Mobility',
      type: 'select',
      options: [
        { value: 'high', label: 'High', count: 8 },
        { value: 'medium', label: 'Medium', count: 15 },
        { value: 'low', label: 'Low', count: 7 }
      ]
    }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'role', label: 'Role' },
    { value: 'difficulty', label: 'Difficulty' },
    { value: 'tier', label: 'Tier' },
    { value: 'winRate', label: 'Win Rate' }
  ];

  return (
    <FilterBar
      filters={filters}
      onFilterChange={onFilterChange}
      onSortChange={onSortChange}
      sortOptions={sortOptions}
      sticky
    />
  );
}

export function MapFilterBar({ onFilterChange, onSortChange }: {
  onFilterChange: (filters: any) => void;
  onSortChange?: (sortBy: string, order: 'asc' | 'desc') => void;
}) {
  const filters: FilterOption[] = [
    {
      key: 'mode',
      label: 'Game Mode',
      type: 'multiselect',
      options: [
        { value: 'Convoy', label: 'Convoy', count: 4 },
        { value: 'Convergence', label: 'Convergence', count: 3 },
        { value: 'Domination', label: 'Domination', count: 5 }
      ]
    },
    {
      key: 'biome',
      label: 'Biome',
      type: 'select',
      options: [
        { value: 'Industrial', label: 'Industrial', count: 3 },
        { value: 'Mystical', label: 'Mystical', count: 2 },
        { value: 'Urban', label: 'Urban', count: 4 }
      ]
    }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'biome', label: 'Biome' },
    { value: 'mode', label: 'Modes' }
  ];

  return (
    <FilterBar
      filters={filters}
      onFilterChange={onFilterChange}
      onSortChange={onSortChange}
      sortOptions={sortOptions}
      sticky
    />
  );
}