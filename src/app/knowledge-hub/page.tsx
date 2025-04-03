// src/app/knowledge-hub/page.js
import { Suspense } from 'react';
import { fetchFeaturedBlogPosts, fetchRecentBlogPosts, fetchBlogCategories } from '/lib/api';
import KnowledgeHubHero from '/components/knowledge-hub/KnowledgeHubHero';
import FeaturedArticles from '/components/knowledge-hub/FeaturedArticles';
import RecentArticles from '/components/knowledge-hub/RecentArticles';
import CategoryTabs from '/components/knowledge-hub/CategoryTabs';
import LoadingArticles from '/components/knowledge-hub/LoadingArticles';

export const metadata = {
  title: 'Knowledge Hub | My Drive Academy',
  description: 'Resources, guides, and tips for new and experienced drivers. Learn about road safety, traffic rules, and more.',
};

export default async function KnowledgeHubPage() {
  // Fetch data in parallel
  const [featuredPosts, recentPosts, categories] = await Promise.all([
    fetchFeaturedBlogPosts(),
    fetchRecentBlogPosts(),
    fetchBlogCategories(),
  ]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <KnowledgeHubHero />
      
      {/* Featured Articles */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Driver's Education Articles</h2>
        <Suspense fallback={<LoadingArticles count={3} />}>
          <FeaturedArticles articles={featuredPosts.slice(0, 3)} />
        </Suspense>
      </section>
      
      {/* Recent Articles with Category Tabs */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Recent Articles</h2>
        <Suspense fallback={<LoadingArticles count={6} />}>
          <CategoryTabs categories={categories} />
          <RecentArticles articles={recentPosts} />
        </Suspense>
      </section>
    </div>
  );
}