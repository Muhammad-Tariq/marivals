'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, Children, cloneElement, isValidElement, useRef } from 'react';

interface StaggeredGridProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  animateOnScroll?: boolean;
  variant?: 'slideUp' | 'slideIn' | 'scaleIn' | 'fadeIn';
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const slideInVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  }
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4 }
  }
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export default function StaggeredGrid({
  children,
  staggerDelay = 0.1,
  className,
  animateOnScroll = true,
  variant = 'slideUp'
}: StaggeredGridProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const getItemVariants = () => {
    switch (variant) {
      case 'slideIn':
        return slideInVariants;
      case 'scaleIn':
        return scaleInVariants;
      case 'fadeIn':
        return fadeInVariants;
      default:
        return slideUpVariants;
    }
  };

  const containerVariantsWithDelay = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariantsWithDelay}
      initial="hidden"
      animate={animateOnScroll ? (inView ? "visible" : "hidden") : "visible"}
    >
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return (
            <motion.div
              key={index}
              variants={getItemVariants()}
            >
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
}

// Specialized components for different use cases
export function StaggeredList({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  variant = 'slideUp' as const
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  variant?: 'slideUp' | 'slideIn' | 'scaleIn' | 'fadeIn';
}) {
  return (
    <StaggeredGrid 
      className={className}
      staggerDelay={staggerDelay}
      variant={variant}
    >
      {children}
    </StaggeredGrid>
  );
}

export function StaggeredStats({ 
  children, 
  className = '' 
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <StaggeredGrid 
      className={className}
      staggerDelay={0.15}
      variant="scaleIn"
    >
      {children}
    </StaggeredGrid>
  );
}

export function AgentGrid({ 
  children, 
  className = '' 
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <StaggeredGrid 
      className={className}
      staggerDelay={0.1}
      variant="slideUp"
    >
      {children}
    </StaggeredGrid>
  );
}