import { AnimationConfig } from '@/lib/types';

// Animation easing functions
export const easings = {
  easeInOut: [0.25, 0.46, 0.45, 0.94],
  easeOut: [0.25, 0.46, 0.45, 0.94],
  easeIn: [0.55, 0.06, 0.68, 0.19],
  bounceOut: [0.68, -0.55, 0.265, 1.55],
  backOut: [0.175, 0.885, 0.32, 1.275],
  anticipate: [0.68, -0.55, 0.265, 1.55]
} as const;

// Default animation configurations
export const animationConfigs: Record<string, AnimationConfig> = {
  // Page transitions
  pageTransition: {
    duration: 0.3,
    easing: 'easeInOut',
    delay: 0,
    stagger: 0
  },
  
  // Card animations
  cardHover: {
    duration: 0.2,
    easing: 'easeOut',
    delay: 0,
    stagger: 0
  },
  
  cardReveal: {
    duration: 0.4,
    easing: 'easeOut',
    delay: 0,
    stagger: 0.1
  },
  
  // Grid animations
  gridStagger: {
    duration: 0.5,
    easing: 'easeOut',
    delay: 0.1,
    stagger: 0.08
  },
  
  // Stats animations
  countUp: {
    duration: 2,
    easing: 'easeOut',
    delay: 0.2,
    stagger: 0.1
  },
  
  // Micro-interactions
  buttonPress: {
    duration: 0.1,
    easing: 'easeInOut',
    delay: 0,
    stagger: 0
  },
  
  // Loading states
  skeleton: {
    duration: 1.5,
    easing: 'easeInOut',
    delay: 0,
    stagger: 0
  },
  
  // Celebrations
  confetti: {
    duration: 3,
    easing: 'easeOut',
    delay: 0,
    stagger: 0.05
  },
  
  // Hero animations
  heroReveal: {
    duration: 0.8,
    easing: 'easeOut',
    delay: 0.2,
    stagger: 0.15
  }
};

// Animation variants for common patterns
export const variants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  
  scaleInCenter: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 }
  },
  
  // Slide animations
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 }
  },
  
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  },
  
  slideInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  },
  
  slideInDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 }
  },
  
  // Rotation animations
  rotateIn: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 180 }
  },
  
  // Flip animations
  flipInX: {
    initial: { opacity: 0, rotateX: -90 },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: 90 }
  },
  
  flipInY: {
    initial: { opacity: 0, rotateY: -90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 90 }
  },
  
  // Bounce animations
  bounceIn: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', damping: 10, stiffness: 100 }
    },
    exit: { opacity: 0, scale: 0.3 }
  },
  
  // Elastic animations
  elasticIn: {
    initial: { opacity: 0, scale: 0 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', damping: 8, stiffness: 100 }
    },
    exit: { opacity: 0, scale: 0 }
  },
  
  // Hover states
  hoverScale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  },
  
  hoverLift: {
    whileHover: { y: -5, boxShadow: '0 10px 25px rgba(225, 6, 0, 0.15)' },
    whileTap: { y: 0 }
  },
  
  hoverGlow: {
    whileHover: { 
      boxShadow: '0 0 20px rgba(225, 6, 0, 0.3)',
      borderColor: 'rgba(225, 6, 0, 0.5)'
    }
  },
  
  // Loading states
  pulse: {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  
  spin: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  },
  
  // Stagger containers
  staggerContainer: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  }
};

// Utility function to get animation config
export function getAnimationConfig(name: keyof typeof animationConfigs): AnimationConfig {
  return animationConfigs[name] || animationConfigs.pageTransition;
}

// Utility function to create custom transition
export function createTransition(config: Partial<AnimationConfig>) {
  const baseConfig = animationConfigs.pageTransition;
  return {
    duration: config.duration || baseConfig.duration,
    ease: easings[config.easing as keyof typeof easings] || easings.easeInOut,
    delay: config.delay || baseConfig.delay
  };
}

// Reduced motion variants (fallbacks)
export const reducedMotionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  slideIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  scaleIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }
};

// Check for reduced motion preference
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Get appropriate variants based on motion preference
export function getVariants(variantName: keyof typeof variants) {
  if (prefersReducedMotion()) {
    return reducedMotionVariants.fadeIn;
  }
  return variants[variantName] || variants.fadeIn;
}