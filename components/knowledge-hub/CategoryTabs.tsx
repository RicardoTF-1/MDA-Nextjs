'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Category {
  id: number;
  name: string;
  slug: string;
  post_count?: number;
}

interface CategoryTabsProps {
  categories: Category[];
}

const containerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
};

export default function CategoryTabs({ categories }: CategoryTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams?.get('category') || 'all';

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const handleCategoryChange = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams?.toString());

    if (categorySlug === 'all') {
      params.delete('category');
    } else {
      params.set('category', categorySlug);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  if (!categories || categories.length === 0) return null;

  return (
    <motion.div
      ref={ref}
      className="mb-8 overflow-x-auto"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="flex space-x-2 pb-2">
        <motion.button
          variants={itemVariants}
          onClick={() => handleCategoryChange('all')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${
            currentCategory === 'all'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          All Posts
        </motion.button>

        {categories.map((category) => (
          <motion.button
            key={category.id}
            variants={itemVariants}
            onClick={() => handleCategoryChange(category.slug)}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              currentCategory === category.slug
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            {category.name}
            {category.post_count !== undefined && category.post_count > 0 && (
              <span className="ml-2 text-xs px-2 py-1 rounded-full bg-opacity-80 inline-block">
                {category.post_count}
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

