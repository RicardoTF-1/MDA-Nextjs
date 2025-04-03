"use client"

import Image from 'next/image';

export default function AuthorCard({ author }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex items-center">
      <div className="mr-4 flex-shrink-0">
        <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-200">
          <Image
            src="/images/author-placeholder.jpg"
            alt={author}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-500 mb-1">Written by</div>
        <h3 className="font-bold">{author}</h3>
        <p className="text-sm text-gray-600 mt-1">
          My Drive Academy
        </p>
      </div>
    </div>
  );
}