"use client"

import Link from 'next/link';
import Image from 'next/image';

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
          <div className="relative h-48">
            <Image
              src={post.featured_image_url || '/images/placeholder-article.jpg'}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="font-bold text-lg mb-2">
              <Link 
                href={`/knowledge-hub/blog/${post.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {post.title}
              </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-3 flex-grow">
              {post.excerpt ? (
                <span className="line-clamp-3">{post.excerpt}</span>
              ) : null}
            </p>
            <Link
              href={`/knowledge-hub/blog/${post.slug}`}
              className="text-blue-600 hover:text-blue-800 text-sm mt-auto"
            >
              Read more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}