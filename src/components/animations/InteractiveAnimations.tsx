'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Count-up animation hook
export function useCountUp(
  end: number, 
  duration: number = 2, 
  start: number = 0,
  decimals: number = 0
) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !isAnimating) {
      setIsAnimating(true);
      const increment = (end - start) / (duration * 60); // 60fps
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
          setIsAnimating(false);
        } else {
          setCount(Number(current.toFixed(decimals)));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, end, start, duration, decimals, isAnimating]);

  return { count, ref };
}

// Animated counter component
interface CountUpProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function CountUp({
  value,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  size = 'md'
}: CountUpProps) {
  const { count, ref } = useCountUp(value, duration, 0, decimals);
  
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'font-bold text-[#E10600] tabular-nums',
        sizeClasses[size],
        className
      )}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.div>
  );
}

// Animated progress bar
interface ProgressBarProps {
  value: number;
  max?: number;
  duration?: number;
  className?: string;
  showValue?: boolean;
  color?: string;
}

export function AnimatedProgressBar({
  value,
  max = 100,
  duration = 1.5,
  className,
  showValue = true,
  color = '#E10600'
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={cn('w-full', className)}>
      <div className="flex justify-between items-center mb-2">
        {showValue && (
          <span className="text-sm font-medium text-zinc-300">
            {value}/{max}
          </span>
        )}
        {showValue && (
          <span className="text-sm font-medium text-zinc-300">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// Confetti animation component
export function Confetti({ 
  trigger, 
  className 
}: { 
  trigger: boolean; 
  className?: string; 
}) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['#E10600', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1'][Math.floor(Math.random() * 5)]
      }));
      
      setParticles(newParticles);
      
      // Clear particles after animation
      setTimeout(() => setParticles([]), 3000);
    }
  }, [trigger]);

  return (
    <div className={cn('fixed inset-0 pointer-events-none z-50', className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{ 
            backgroundColor: particle.color,
            left: `${particle.x}%`,
            top: `${particle.y}%`
          }}
          initial={{ 
            scale: 0, 
            y: 0, 
            rotate: 0,
            opacity: 1
          }}
          animate={{ 
            scale: [0, 1, 0.5, 0], 
            y: [0, -100, -200, -300],
            rotate: [0, 180, 360, 540],
            opacity: [1, 1, 0.5, 0]
          }}
          transition={{ 
            duration: 3, 
            ease: 'easeOut',
            times: [0, 0.2, 0.8, 1]
          }}
        />
      ))}
    </div>
  );
}

// Micro-burst celebration animation
export function MicroBurst({ 
  trigger, 
  children,
  className 
}: { 
  trigger: boolean; 
  children: React.ReactNode;
  className?: string;
}) {
  const controls = useAnimation();

  useEffect(() => {
    if (trigger) {
      controls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 5, -5, 0],
        transition: { 
          duration: 0.6, 
          ease: 'easeInOut',
          times: [0, 0.3, 0.7, 1]
        }
      });
    }
  }, [trigger, controls]);

  return (
    <motion.div
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Pulse animation for notifications
export function PulseAnimation({ 
  children, 
  className,
  intensity = 'medium'
}: { 
  children: React.ReactNode; 
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}) {
  const scales = {
    low: [1, 1.02, 1],
    medium: [1, 1.05, 1],
    high: [1, 1.1, 1]
  };

  return (
    <motion.div
      animate={{
        scale: scales[intensity]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Floating animation for decorative elements
export function FloatingAnimation({ 
  children, 
  className,
  direction = 'vertical'
}: { 
  children: React.ReactNode; 
  className?: string;
  direction?: 'vertical' | 'horizontal' | 'circular';
}) {
  const getAnimation = () => {
    switch (direction) {
      case 'horizontal':
        return {
          x: [-5, 5, -5],
          transition: { duration: 4, repeat: Infinity }
        };
      case 'circular':
        return {
          x: [-3, 3, -3],
          y: [-3, 3, -3],
          transition: { duration: 6, repeat: Infinity }
        };
      default:
        return {
          y: [-5, 5, -5],
          transition: { duration: 3, repeat: Infinity }
        };
    }
  };

  return (
    <motion.div
      animate={getAnimation()}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Shake animation for errors or attention
export function ShakeAnimation({ 
  trigger, 
  children,
  className 
}: { 
  trigger: boolean; 
  children: React.ReactNode;
  className?: string;
}) {
  const controls = useAnimation();

  useEffect(() => {
    if (trigger) {
      controls.start({
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.5, ease: 'easeInOut' }
      });
    }
  }, [trigger, controls]);

  return (
    <motion.div
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Typewriter effect for text
export function TypewriterText({ 
  text, 
  speed = 50,
  className 
}: { 
  text: string; 
  speed?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

// Stat card with animations
export function AnimatedStatCard({
  label,
  value,
  change,
  icon,
  className
}: {
  label: string;
  value: number;
  change?: number;
  icon?: React.ReactNode;
  className?: string;
}) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'bg-[#18181B] border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors',
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-zinc-400 text-sm font-medium">{label}</span>
        {icon && <div className="text-zinc-400">{icon}</div>}
      </div>
      
      <div className="flex items-end justify-between">
        <CountUp value={value} size="lg" />
        
        {change !== undefined && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className={cn(
              'text-sm font-medium flex items-center',
              isPositive && 'text-green-400',
              isNegative && 'text-red-400',
              !isPositive && !isNegative && 'text-zinc-400'
            )}
          >
            {isPositive && '↗'}
            {isNegative && '↘'}
            {change > 0 ? '+' : ''}{change}%
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}