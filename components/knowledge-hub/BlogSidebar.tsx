'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function BlogSidebar() {
  const pathname = usePathname();

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.aside
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="w-full md:w-1/3 p-4 bg-gray-50 rounded-lg shadow-md"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-800">Explore More</h3>

      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Discover related articles, categories and resources in our knowledge hub.
        </p>
      </div>

      {/* Example Section: Featured image or callout */}
      <div className="relative h-40 w-full mb-4 rounded overflow-hidden">
        <Image
          src="/images/sidebar-placeholder.jpg"
          alt="Featured"
          fill
          className="object-cover"
        />
      </div>

      <div className="text-sm text-gray-500">
        <p>Current path: <span className="text-gray-800">{pathname}</span></p>
      </div>
    </motion.aside>
  );
}

