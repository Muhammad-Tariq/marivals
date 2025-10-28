'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface RouteTransitionProps {
  children: ReactNode;
  className?: string;
}

const slideVariants = {
  initial: { 
    opacity: 0, 
    x: 20,
    filter: 'blur(4px)'
  },
  animate: { 
    opacity: 1, 
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    filter: 'blur(4px)',
    transition: {
      duration: 0.2
    }
  }
};

const fadeVariants = {
  initial: { 
    opacity: 0,
    scale: 0.98
  },
  animate: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25
    }
  },
  exit: { 
    opacity: 0,
    scale: 1.02,
    transition: {
      duration: 0.15
    }
  }
};

const scaleVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.9,
    y: 10
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    y: -5,
    transition: {
      duration: 0.2
    }
  }
};

export function RouteTransition({ 
  children, 
  className = '',
  type = 'slide' 
}: RouteTransitionProps & { type?: 'slide' | 'fade' | 'scale' }) {
  const pathname = usePathname();

  const getVariants = () => {
    switch (type) {
      case 'fade':
        return fadeVariants;
      case 'scale':
        return scaleVariants;
      default:
        return slideVariants;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={getVariants()}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function ContentTransition({ 
  children, 
  delay = 0,
  className = '' 
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        delay: 0.1
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideInFromLeft({ 
  children, 
  delay = 0,
  className = '' 
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.5,
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideInFromRight({ 
  children, 
  delay = 0,
  className = '' 
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.5,
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInUp({ 
  children, 
  delay = 0,
  className = '' 
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}