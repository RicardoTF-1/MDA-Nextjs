"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export default function BlogList({ posts, currentPage = 1, categorySlug, searchQuery }) {
  const router = useRouter();
  const pathname = usePathname();
  const itemsPerPage = 10;
  
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h3 className="text-xl font-bold mb-4">No Articles Found</h3>
        <p className="text-gray-600 mb-6">
          {searchQuery 
            ? `No articles matching "${searchQuery}"`
            : categorySlug
              ? `No articles in this category`
              : `No articles available`
          }
        </p>
        <Link
          href="/knowledge-hub/blog"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          View All Articles
        </Link>
      </div>
    );
  }

  // Calculate pagination
  const totalItems = posts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = posts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
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
      <div className="space-y-6">
        {currentItems.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
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
                  {new Date(post.published_date).toLocaleDateString('en-US', {
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
                {post.excerpt || post.content.substring(0, 200) + '...'}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  By {post.author_name}
                </div>
                <Link
                  href={`/knowledge-hub/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="inline-flex">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-l-md ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 ${
                  currentPage === index + 1
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-r-md ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}