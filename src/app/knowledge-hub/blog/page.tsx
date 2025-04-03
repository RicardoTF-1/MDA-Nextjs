// src/app/knowledge-hub/blog/page.js
import { Suspense } from 'react';
import { fetchBlogPosts, fetchBlogCategories } from '@/lib/api';
import BlogList from '@/components/knowledge-hub/BlogList';
import CategoryTabs from '@/components/knowledge-hub/CategoryTabs';
import BlogSidebar from '@/components/knowledge-hub/BlogSidebar';
import LoadingArticles from '@/components/knowledge-hub/LoadingArticles';

export const metadata = {
  title: 'Blog | My Drive Academy',
  description: 'Read our latest articles about driving education, safety tips, and more.',
};

export default async function BlogPage({ searchParams }) {
  const categorySlug = searchParams.category;
  const searchQuery = searchParams.search;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  
  // Fetch data
  const [posts, categories] = await Promise.all([
    fetchBlogPosts({ 
      category: categorySlug,
      search: searchQuery,
      page
    }),
    fetchBlogCategories()
  ]);

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Articles</h1>
        
        {/* Category Tabs */}
        <Suspense fallback={<div className="h-12 bg-gray-200 animate-pulse rounded-md mb-8"></div>}>
          <CategoryTabs categories={categories} />
        </Suspense>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Suspense fallback={<LoadingArticles count={6} columns={2} />}>
              <BlogList 
                posts={posts} 
                currentPage={page} 
                categorySlug={categorySlug}
                searchQuery={searchQuery}
              />
            </Suspense>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div className="h-96 bg-gray-200 animate-pulse rounded-md"></div>}>
              <BlogSidebar categories={categories} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}