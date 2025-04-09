"use client"

export default function AuthorCard({ author }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex items-center">
      <div className="mr-4 flex-shrink-0">
        <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-200">
          <img
            src="/images/author-placeholder.jpg"
            alt={author}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-500 mb-1">Written by</div>
        <h3 className="font-bold">{author || 'My Drive Academy'}</h3>
        <p className="text-sm text-gray-600 mt-1">
          My Drive Academy
        </p>
      </div>
    </div>
  );
}