'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Social share buttons component
const SocialShareButtons = () => {
  return (
    <div className="flex space-x-4 items-center">
      <span className="text-sm text-gray-600 font-medium">Share:</span>
      <button className="text-blue-600 hover:text-blue-800" aria-label="Share on Twitter">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      </button>
      <button className="text-blue-800 hover:text-blue-900" aria-label="Share on Facebook">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      </button>
      <button className="text-blue-500 hover:text-blue-700" aria-label="Share on LinkedIn">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      </button>
      <button className="text-gray-700 hover:text-gray-900" aria-label="Copy link">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
};

// Related post card component
const RelatedPostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-4">
        <span className="text-xs font-medium text-green-600 mb-1 block">{post.category_name}</span>
        <h3 className="text-md font-bold text-gray-800 mb-1 line-clamp-2">{post.title}</h3>
        <span className="text-xs text-gray-500">
          {post.published_date ? new Date(post.published_date).toLocaleDateString() : ''}
        </span>
      </div>
    </div>
  );
};

// Author bio component
const AuthorBio = ({ author }) => {
  return (
    <div className="flex items-center space-x-4 p-6 bg-gray-100 rounded-lg my-8">
      <div>
        <h4 className="text-lg font-bold text-gray-800">{author}</h4>
        <p className="text-gray-600 text-sm">Driving instructor with over 10 years of experience teaching safe driving practices and helping students obtain their licenses.</p>
      </div>
    </div>
  );
};

// Table of contents component
const TableOfContents = ({ content }) => {
  // Extract headings from content
  const extractHeadings = (htmlContent) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const headings = tempDiv.querySelectorAll('h2, h3');
    return Array.from(headings).map((heading, index) => {
      return {
        id: `section-${index}`,
        text: heading.textContent
      };
    });
  };

  const sections = content ? extractHeadings(content) : [];

  if (sections.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-5 sticky top-6">
      <h4 className="text-lg font-bold text-gray-800 mb-4">Table of Contents</h4>
      <ul className="space-y-2">
        {sections.map((section, index) => (
          <li key={index}>
            <a 
              href={`#${section.id}`} 
              className="text-gray-700 hover:text-green-500 transition-colors duration-200 flex items-center"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 mr-2"></span>
              {section.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Newsletter subscription component
const NewsletterSubscribe = () => {
  return (
    <div className="p-5 bg-gray-800 rounded-lg mt-8 w-full">
      <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
      <p className="text-white/90 mb-4">Get the latest driving tips and resources delivered to your inbox.</p>
      
      <form className="flex flex-col sm:flex-row gap-3">
        <input 
          type="email" 
          placeholder="Your email address" 
          className="flex-grow px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
        <button 
          type="submit" 
          className="bg-emerald-600 hover:bg-emerald-800 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default function BlogPostPage() {
  const params = useParams();
  const { slug } = params;
  
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function loadBlogPost() {
      if (!slug) return;
      
      try {
        setLoading(true);
        console.log("Fetching post with slug:", slug);
        const response = await axios.get(`${API_URL}/blog-posts/${slug}/`);
        console.log("API response:", response.data);
        setPost(response.data);
        
        // Set related posts if available
        if (response.data.related_posts && response.data.related_posts.length > 0) {
          setRelatedPosts(response.data.related_posts);
        }
      } catch (err) {
        console.error(`Error loading blog post (${slug}):`, err);
        setError('Failed to load the article. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    loadBlogPost();
  }, [slug]);
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Function to create markup from HTML content
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-8 pb-16">
        <div className="h-[40vh] bg-gray-200 animate-pulse"></div>
        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="bg-white rounded-t-3xl p-6 md:p-10 shadow-lg animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded-lg text-center">
              <h1 className="text-2xl font-bold mb-4">Error Loading Article</h1>
              <p>{error}</p>
              <Link href="/knowledge-hub" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Return to Knowledge Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-8 rounded-lg text-center">
              <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
              <p>The article you're looking for doesn't exist or has been removed.</p>
              <Link href="/knowledge-hub" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Return to Knowledge Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white min-h-screen">
      {/* Hero section with post image */}
      <div className="h-[40vh] md:h-[60vh] relative">
        <img
          src={post.featured_image_url || '/images/placeholder-article.jpg'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-t-3xl p-6 md:p-10 shadow-lg">
          {/* Category and date */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div>
              <span className="inline-block bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {post.category_name || 'Uncategorized'}
              </span>
              <span className="ml-4 text-gray-500 text-sm">{formatDate(post.published_date)}</span>
            </div>
            <SocialShareButtons />
          </div>
          
          {/* Post title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-8">
            {post.title}
          </h1>
          
          {/* Author info */}
          <div className="flex items-center mb-10">
            <div>
              <div className="text-gray-800 font-medium">{post.author_name || 'My Drive Academy'}</div>
              <div className="text-gray-500 text-sm">{post.reading_time || '10'} min read</div>
            </div>
          </div>
          
          {/* Content layout - two columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main content */}
            <div className="lg:col-span-8 order-1">
              <div 
                className="text-gray-800 prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-800 prose-a:text-blue-600 hover:prose-a:text-blue-500"
                dangerouslySetInnerHTML={createMarkup(post.content || '<p>No content available.</p>')}
              />
              
              <AuthorBio author={post.author_name} />
              <div className="w-full mt-8">
                  <NewsletterSubscribe />
              </div>
              
              {relatedPosts.length > 0 && (
                <div className="border-t border-b border-gray-200 py-8 my-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map(relatedPost => (
                      <Link href={`/knowledge-hub/blog/${relatedPost.slug}`} key={relatedPost.slug}>
                        <RelatedPostCard post={relatedPost} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar with table of contents and newsletter */}
            <div className="lg:col-span-4 order-2">
              <div className="lg:sticky lg:top-20 space-y-8">
                {/* Table of Contents */}
                {post.content && (
                  <TableOfContents content={post.content} />
                )}
                
                {/* Newsletter - No longer inside the sticky container */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}