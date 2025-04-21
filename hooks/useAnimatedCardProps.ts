// hooks/useAnimatedCardProps.ts
import { useEffect } from 'react';
import { useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Define animation variants
export const cardVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 50,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3
    }
  }
};

export const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: number) => ({
    opacity: 1,
    transition: {
      delay: custom * 0.1,
      duration: 0.4
    }
  })
};

export const headerVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const pointsVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const pointVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4
    }
  }
};

export const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.4
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.98
  }
};

export const dropdownVariants: Variants = {
  hidden: { 
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2
    }
  },
  visible: { 
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3
    }
  }
};

export const bestSellerVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      delay: 0.3,
      duration: 0.5
    }
  }
};

interface UseAnimatedCardOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useAnimatedCard(options: UseAnimatedCardOptions = {}): {
  ref: (node: Element | null) => void;
  controls: ReturnType<typeof useAnimation>;
  inView: boolean;
} {
  const { threshold = 0.1, triggerOnce = false } = options;
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return { ref, controls, inView };
}