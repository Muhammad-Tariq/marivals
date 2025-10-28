'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { DataTableProps, DataTableColumn } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2 } from 'lucide-react';

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  pagination,
  sorting,
}: DataTableProps<T>) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Sort data if no external sorting is provided
  const sortedData = useMemo(() => {
    if (!sorting || !sorting.sortBy) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sorting.sortBy];
      const bValue = b[sorting.sortBy];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const result = aValue.localeCompare(bValue);
        return sorting.order === 'asc' ? result : -result;
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const result = aValue - bValue;
        return sorting.order === 'asc' ? result : -result;
      }
      
      return 0;
    });
  }, [data, sorting]);

  // Handle sort click
  const handleSort = (columnKey: string) => {
    if (!sorting?.onSortChange) return;
    
    const newOrder = sorting.sortBy === columnKey && sorting.order === 'asc' ? 'desc' : 'asc';
    sorting.onSortChange(columnKey, newOrder);
  };

  // Render cell content
  const renderCell = (column: DataTableColumn<T>, row: T, rowIndex: number) => {
    const value = row[column.key];
    
    if (column.render) {
      return column.render(value, row);
    }
    
    // Default rendering based on value type
    if (typeof value === 'boolean') {
      return (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'Yes' : 'No'}
        </Badge>
      );
    }
    
    if (typeof value === 'number') {
      return <span className="font-mono">{value.toLocaleString()}</span>;
    }
    
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 3).map((item: any, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {item}
            </Badge>
          ))}
          {value.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 3}
            </Badge>
          )}
        </div>
      );
    }
    
    return <span>{value?.toString() || '-'}</span>;
  };

  // Pagination component
  const PaginationControls = () => {
    if (!pagination) return null;
    
    const { page, limit, total, totalPages, onPageChange } = pagination;
    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, total);
    
    return (
      <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800">
        <div className="text-sm text-zinc-400">
          Showing {startItem} to {endItem} of {total} results
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={page === 1}
            className="border-zinc-700"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="border-zinc-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  className={cn(
                    "w-8 h-8 p-0 border-zinc-700",
                    page === pageNum && "bg-[#E10600] hover:bg-[#E10600]/90"
                  )}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="border-zinc-700"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={page === totalPages}
            className="border-zinc-700"
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-[#18181B] border-zinc-800 overflow-hidden">
      <CardContent className="p-0">
        {/* Loading overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center z-10"
            >
              <div className="flex items-center gap-2 text-white">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table container with horizontal scroll */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-zinc-800/30">
                {columns.map((column) => (
                  <TableHead
                    key={column.key as string}
                    className={cn(
                      "text-zinc-300 font-semibold",
                      column.sortable && "cursor-pointer hover:text-white transition-colors",
                      column.className
                    )}
                    onClick={() => column.sortable && handleSort(column.key as string)}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && sorting && (
                        <div className="flex flex-col">
                          <ChevronUp 
                            className={cn(
                              "w-3 h-3 -mb-1",
                              sorting.sortBy === column.key && sorting.order === 'asc'
                                ? "text-[#E10600]" 
                                : "text-zinc-600"
                            )} 
                          />
                          <ChevronDown 
                            className={cn(
                              "w-3 h-3",
                              sorting.sortBy === column.key && sorting.order === 'desc'
                                ? "text-[#E10600]" 
                                : "text-zinc-600"
                            )} 
                          />
                        </div>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            
            <TableBody>
              <AnimatePresence mode="wait">
                {sortedData.length === 0 ? (
                  <TableRow>
                    <TableCell 
                      colSpan={columns.length} 
                      className="text-center py-12 text-zinc-400"
                    >
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedData.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      className={cn(
                        "border-zinc-800 hover:bg-zinc-800/30 transition-colors cursor-pointer",
                        hoveredRow === index && "bg-zinc-800/50"
                      )}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={column.key as string}
                          className={cn("py-4", column.className)}
                        >
                          {renderCell(column, row, index)}
                        </TableCell>
                      ))}
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <PaginationControls />
      </CardContent>
    </Card>
  );
}

// Specialized table for leaderboards
export function LeaderboardTable({ 
  data, 
  loading = false,
  pagination,
  sorting 
}: {
  data: any[];
  loading?: boolean;
  pagination?: DataTableProps<any>['pagination'];
  sorting?: DataTableProps<any>['sorting'];
}) {
  const columns: DataTableColumn<any>[] = [
    {
      key: 'rank',
      label: 'Rank',
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <span className={cn(
            "text-lg font-bold",
            value === 1 ? "text-yellow-400" :
            value === 2 ? "text-gray-400" :
            value === 3 ? "text-amber-600" : "text-white"
          )}>
            #{value}
          </span>
        </div>
      )
    },
    {
      key: 'player',
      label: 'Player',
      sortable: true,
      render: (value) => (
        <div className="font-semibold">{value}</div>
      )
    },
    {
      key: 'tier',
      label: 'Tier',
      sortable: true,
      render: (value) => (
        <Badge 
          variant="secondary"
          className={cn(
            value === 'Grandmaster' ? 'bg-purple-600 hover:bg-purple-700' : 
            'bg-blue-600 hover:bg-blue-700'
          )}
        >
          {value}
        </Badge>
      )
    },
    {
      key: 'score',
      label: 'Score',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-[#E10600] font-semibold">{value}</span>
      )
    },
    {
      key: 'winRate',
      label: 'Win Rate',
      sortable: true,
      render: (value) => (
        <span className="font-semibold">{value}%</span>
      )
    },
    {
      key: 'mains',
      label: 'Mains',
      render: (value) => (
        <div className="flex gap-1">
          {value.map((agent: string) => (
            <Badge key={agent} variant="outline" className="text-xs">
              {agent}
            </Badge>
          ))}
        </div>
      )
    }
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loading}
      pagination={pagination}
      sorting={sorting}
    />
  );
}

// Specialized table for match history
export function MatchHistoryTable({ 
  data, 
  loading = false 
}: {
  data: any[];
  loading?: boolean;
}) {
  const columns: DataTableColumn<any>[] = [
    {
      key: 'map',
      label: 'Map',
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'mode',
      label: 'Mode',
      render: (value) => (
        <Badge variant="outline" className="text-xs">{value}</Badge>
      )
    },
    {
      key: 'agent',
      label: 'Agent',
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'result',
      label: 'Result',
      render: (value) => (
        <Badge 
          variant={value === 'win' ? 'default' : value === 'loss' ? 'destructive' : 'secondary'}
          className={cn(
            value === 'win' && 'bg-green-600 hover:bg-green-700',
            value === 'loss' && 'bg-red-600 hover:bg-red-700'
          )}
        >
          {value.toUpperCase()}
        </Badge>
      )
    },
    {
      key: 'score',
      label: 'K/D/A',
      render: (value) => (
        <span className="font-mono text-sm">
          {value.kills}/{value.deaths}/{value.assists}
        </span>
      )
    },
    {
      key: 'date',
      label: 'Date',
      render: (value) => (
        <span className="text-zinc-400 text-sm">
          {new Date(value).toLocaleDateString()}
        </span>
      )
    }
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loading}
    />
  );
}