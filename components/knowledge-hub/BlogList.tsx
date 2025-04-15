'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Define TypeScript interfaces
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  featured_image_url?: string;
  category_name?: string;
  category_slug?: string;
  author_name?: string;
  published_date?: string;
  excerpt?: string;
  reading_time?: number;
}

interface BlogListProps {
  posts: BlogPost[];
  currentPage: number;
  categorySlug?: string;
  searchQuery?: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
};

export default function BlogList({ posts, currentPage = 1, categorySlug, searchQuery }: BlogListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const itemsPerPage = 10;
  
  // Setup intersection observer for animation
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  if (!posts || posts.length === 0) {
    return (
      <motion.div 
        className="bg-white rounded-lg shadow-md p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold mb-4">No Articles Found</h3>
        <p className="text-gray-600 mb-6">
          {searchQuery 
            ? `No articles matching "${searchQuery}"`
            : categorySlug
              ? `No articles in this category`
              : `No articles available`
          }
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/knowledge-hub/blog"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View All Articles
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  // Calculate pagination
  const totalItems = posts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = posts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams();
    
    if (categorySlug) {
      params.set('category', categorySlug);
    }
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    params.set('page', pageNumber.toString());
    
    router.push(`${pathname}?${params.toString()}`);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <motion.div 
        ref={ref}
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {currentItems.map((post, index) => (
          <motion.div 
            key={post.id} 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
          >
            {/* Featured Image */}
            <div className="md:w-1/3">
              <div className="relative h-48 md:h-full">
                <Image
                  src={post.featured_image_url || '/images/placeholder-article.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="md:w-2/3 p-6">
              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-2">
                <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 mr-2">
                  {post.category_name}
                </span>
                <span>
                  {post.published_date && new Date(post.published_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                
                {post.reading_time && (
                  <span className="ml-4">
                    {post.reading_time} min read
                  </span>
                )}
              </div>
              
              <h2 className="text-xl font-bold mb-3">
                <Link
                  href={`/knowledge-hub/blog/${post.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt || ''}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  By {post.author_name}
                </div>
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={`/knowledge-hub/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read more
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex">
            <motion.button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-l-md ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
              whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
            >
              Previous
            </motion.button>
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 ${
                  currentPage === index + 1
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {index + 1}
              </motion.button>
            ))}
            
            <motion.button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-r-md ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
              whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
            >
              Next
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}