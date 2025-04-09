"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RecentArticles({ articles }) {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No articles available.
      </div>
    );
  }

  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: document.getElementById('recent-articles').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  return (
    <div id="recent-articles" className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={article.featured_image_url || '/images/placeholder-article.jpg'}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-700 text-lg mb-2">
                <Link 
                  href={`/knowledge-hub/blog/${article.slug}`}
                  className="hover:text-green-600 transition-colors"
                >
                  {article.title}
                </Link>
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {article.excerpt || article.content.substring(0, 150) + '...'}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">
                  {new Date(article.published_date).toLocaleDateString()}
                </span>
                <Link
                  href={`/knowledge-hub/blog/${article.slug}`}
                  className="text-green-600 hover:text-blue-800"
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
      
      {/* Load More Button */}
      {currentPage === totalPages && (
        <div className="text-center mt-8">
          <Link
            href="/knowledge-hub/blog"
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-white hover:text-green-600 transition inline-block"
          >
            Load More
          </Link>
        </div>
      )}
    </div>
  );
}