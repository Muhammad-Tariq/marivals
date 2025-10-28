'use client';

import { useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { AnimationConfig } from '@/lib/types';
import { prefersReducedMotion } from './config';

// Hook for scroll-triggered animations
export function useScrollAnimation(config?: Partial<AnimationConfig>) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px 0px -100px 0px" 
  });

  useEffect(() => {
    if (isInView && !prefersReducedMotion()) {
      controls.start('animate');
    } else if (isInView) {
      // Reduced motion fallback
      controls.start({ opacity: 1 });
    }
  }, [isInView, controls]);

  return { controls, ref };
}

// Hook for hover animations
export function useHoverAnimation() {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!prefersReducedMotion()) {
      controls.start({
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2, ease: 'easeOut' }
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!prefersReducedMotion()) {
      controls.start({
        scale: 1,
        y: 0,
        transition: { duration: 0.2, ease: 'easeOut' }
      });
    }
  };

  return {
    controls,
    isHovered,
    hoverProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    }
  };
}

// Hook for focus animations
export function useFocusAnimation() {
  const [isFocused, setIsFocused] = useState(false);
  const controls = useAnimation();

  const handleFocus = () => {
    setIsFocused(true);
    if (!prefersReducedMotion()) {
      controls.start({
        scale: 1.02,
        boxShadow: '0 0 0 2px rgba(225, 6, 0, 0.5)',
        transition: { duration: 0.15, ease: 'easeOut' }
      });
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!prefersReducedMotion()) {
      controls.start({
        scale: 1,
        boxShadow: '0 0 0 0px rgba(225, 6, 0, 0)',
        transition: { duration: 0.15, ease: 'easeOut' }
      });
    }
  };

  return {
    controls,
    isFocused,
    focusProps: {
      onFocus: handleFocus,
      onBlur: handleBlur
    }
  };
}

// Hook for loading animations
export function useLoadingAnimation(isLoading: boolean) {
  const controls = useAnimation();

  useEffect(() => {
    if (isLoading && !prefersReducedMotion()) {
      controls.start({
        opacity: [0.5, 1, 0.5],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      });
    } else {
      controls.start({
        opacity: 1,
        transition: { duration: 0.3 }
      });
    }
  }, [isLoading, controls]);

  return controls;
}

// Hook for staggered animations
export function useStaggerAnimation(itemCount: number, delay: number = 0.1) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !prefersReducedMotion()) {
      controls.start(i => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * delay,
          duration: 0.4,
          ease: 'easeOut'
        }
      }));
    } else if (isInView) {
      controls.start({ opacity: 1 });
    }
  }, [isInView, controls, delay]);

  return { controls, ref };
}

// Hook for count-up animations
export function useCountUpAnimation(
  targetValue: number,
  duration: number = 2,
  startValue: number = 0
) {
  const [currentValue, setCurrentValue] = useState(startValue);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !isAnimating && !prefersReducedMotion()) {
      setIsAnimating(true);
      const increment = (targetValue - startValue) / (duration * 60);
      let current = startValue;

      const animate = () => {
        current += increment;
        if (current >= targetValue) {
          setCurrentValue(targetValue);
          setIsAnimating(false);
        } else {
          setCurrentValue(Math.floor(current));
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else if (isInView && prefersReducedMotion()) {
      setCurrentValue(targetValue);
    }
  }, [isInView, targetValue, startValue, duration, isAnimating]);

  return { currentValue, ref, isAnimating };
}

// Hook for parallax effects
export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { offset, ref };
}

// Hook for intersection observer animations
export function useIntersectionAnimation(
  threshold: number = 0.1,
  rootMargin: string = '0px'
) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  return { isVisible, ref };
}

// Hook for gesture animations
export function useGestureAnimation() {
  const controls = useAnimation();

  const handleTapStart = () => {
    if (!prefersReducedMotion()) {
      controls.start({
        scale: 0.95,
        transition: { duration: 0.1, ease: 'easeOut' }
      });
    }
  };

  const handleTapEnd = () => {
    if (!prefersReducedMotion()) {
      controls.start({
        scale: 1,
        transition: { duration: 0.1, ease: 'easeOut' }
      });
    }
  };

  return {
    controls,
    gestureProps: {
      onTapStart: handleTapStart,
      onTap: handleTapEnd,
      onTapCancel: handleTapEnd
    }
  };
}

// Hook for route transition animations
export function useRouteAnimation() {
  const controls = useAnimation();
  const [isExiting, setIsExiting] = useState(false);

  const startExit = async () => {
    setIsExiting(true);
    if (!prefersReducedMotion()) {
      await controls.start({
        opacity: 0,
        x: -20,
        transition: { duration: 0.2, ease: 'easeIn' }
      });
    }
  };

  const startEnter = () => {
    setIsExiting(false);
    if (!prefersReducedMotion()) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: 'easeOut' }
      });
    } else {
      controls.start({ opacity: 1 });
    }
  };

  return { controls, isExiting, startExit, startEnter };
}

// Hook for performance monitoring
export function useAnimationPerformance() {
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animationId: number;

    const measureFps = () => {
      frameCount.current++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFps);
    };

    animationId = requestAnimationFrame(measureFps);
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  return { fps, isLowPerformance: fps < 30 };
}