import { notFound } from 'next/navigation';
import { fetchBlogPost } from '@/lib/api';
import BlogPostContent from '@/components/knowledge-hub/BlogPostContent';
import RelatedPosts from '@/components/knowledge-hub/RelatedPosts';
import AuthorCard from '@/components/knowledge-hub/AuthorCard';

export async function generateMetadata({ params }) {
  const post = await fetchBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Article Not Found | My Drive Academy',
      description: 'The requested article could not be found.',
    };
  }
  
  return {
    title: `${post.title} | My Drive Academy`,
    description: post.meta_description || post.excerpt || `Read ${post.title} and learn more about driving education.`,
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt,
      images: post.featured_image_url ? [{ url: post.featured_image_url }] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await fetchBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="text-sm text-gray-500 mb-6">
            <a href="/knowledge-hub" className="hover:text-blue-600">
              Knowledge Hub
            </a>{' '}
            /{' '}
            <a href={`/knowledge-hub?category=${post.category_slug}`} className="hover:text-blue-600">
              {post.category_name}
            </a>{' '}
            / {post.title}
          </div>
          
          {/* Main Blog Post Content */}
          <BlogPostContent post={post} />
          
          {/* Author Information */}
          <AuthorCard author={post.author_name} />
          
          {/* Related Posts */}
          {post.related_posts && post.related_posts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <RelatedPosts posts={post.related_posts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}