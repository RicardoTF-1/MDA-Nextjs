"use client"

import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedArticles({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No featured articles available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {articles.map((article) => (
        <div key={article.id} className="flex flex-col h-full">
          <div className="relative h-60 mb-4 rounded-lg overflow-hidden">
            <Image
              src={article.featured_image_url || '/images/placeholder-article.jpg'}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-bold mb-3">
            <Link 
              href={`/knowledge-hub/blog/${article.slug}`}
              className="hover:text-blue-600 transition-colors"
            >
              {article.title}
            </Link>
          </h3>
          <div className="flex-grow">
            <p className="text-gray-600 mb-4 line-clamp-3">
              {article.excerpt || article.content.substring(0, 150) + '...'}
            </p>
          </div>
          <Link 
            href={`/knowledge-hub/blog/${article.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}