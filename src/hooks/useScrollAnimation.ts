import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

// Hook pour animations avec délai
export const useStaggeredAnimation = (delay: number = 0) => {
  const { ref, isVisible } = useScrollAnimation();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return { ref, isVisible: shouldAnimate };
};

// Classes CSS pour les animations
export const fadeInUpClasses = (isVisible: boolean) => `
  transform transition-all duration-700 ease-out
  ${isVisible 
    ? 'translate-y-0 opacity-100' 
    : 'translate-y-8 opacity-0'
  }
`;

export const fadeInLeftClasses = (isVisible: boolean) => `
  transform transition-all duration-700 ease-out
  ${isVisible 
    ? 'translate-x-0 opacity-100' 
    : '-translate-x-8 opacity-0'
  }
`;

export const fadeInRightClasses = (isVisible: boolean) => `
  transform transition-all duration-700 ease-out
  ${isVisible 
    ? 'translate-x-0 opacity-100' 
    : 'translate-x-8 opacity-0'
  }
`;

export const scaleInClasses = (isVisible: boolean) => `
  transform transition-all duration-700 ease-out
  ${isVisible 
    ? 'scale-100 opacity-100' 
    : 'scale-95 opacity-0'
  }
`;
