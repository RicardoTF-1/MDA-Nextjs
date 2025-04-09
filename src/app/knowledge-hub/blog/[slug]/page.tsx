// src/app/knowledge-hub/blog/[slug]/page.js
import BlogPostPage from '/components/knowledge-hub/BlogPostPage';

export const metadata = {
  title: 'Blog Article | My Drive Academy',
  description: 'Read our driving education articles and learn more about safe driving practices.',
};

export default function Page() {
  return <BlogPostPage />;
}