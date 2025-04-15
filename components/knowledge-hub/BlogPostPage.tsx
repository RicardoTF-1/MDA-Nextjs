'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const fadeInDownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
};

// TypeScript interfaces
interface BlogPost {
  title: string;
  slug: string;
  category_name?: string;
  author_name?: string;
  published_date?: string;
  featured_image_url?: string;
  content?: string;
  reading_time?: number;
}

interface RelatedPostProps {
  post: BlogPost;
}

interface AuthorBioProps {
  author: string;
}

interface TableOfContentsProps {
  content: string;
}

// Related post card component
const RelatedPostCard: React.FC<RelatedPostProps> = ({ post }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      variants={itemVariants}
      whileHover={{ y: -5 }}
    >
      <div className="p-4">
        <span className="text-xs font-medium text-green-600 mb-1 block">{post.category_name}</span>
        <h3 className="text-md font-bold text-gray-800 mb-1 line-clamp-2">{post.title}</h3>
        <span className="text-xs text-gray-500">
          {post.published_date ? new Date(post.published_date).toLocaleDateString() : ''}
        </span>
      </div>
    </motion.div>
  );
};

// Table of contents component
const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  // Extract headings from content
  const extractHeadings = (htmlContent: string) => {
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
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  if (sections.length === 0) return null;

  return (
    <motion.div 
      ref={ref}
      className="bg-gray-50 rounded-lg p-5 sticky top-6"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUpVariants}
    >
      <h4 className="text-lg font-bold text-gray-800 mb-4">Table of Contents</h4>
      <motion.ul 
        className="space-y-2"
        variants={staggerContainerVariants}
      >
        {sections.map((section, index) => (
          <motion.li 
            key={index}
            variants={itemVariants}
          >
            <motion.a 
              href={`#${section.id}`} 
              className="text-gray-700 hover:text-green-500 transition-colors duration-200 flex items-center"
              whileHover={{ x: 3 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 mr-2"></span>
              {section.text}
            </motion.a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

// Newsletter subscription component
const NewsletterSubscribe: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  return (
    <motion.div 
      ref={ref}
      className="p-5 bg-gray-800 rounded-lg mt-8 w-full"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUpVariants}
    >
      <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
      <p className="text-white/90 mb-4">Get the latest driving tips and resources delivered to your inbox.</p>
      
      <form className="flex flex-col sm:flex-row gap-3">
        <input 
          type="email" 
          placeholder="Your email address" 
          className="flex-grow px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
        <motion.button 
          type="submit" 
          className="bg-emerald-600 hover:bg-emerald-800 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Subscribe
        </motion.button>
      </form>
    </motion.div>
  );
};

export default function BlogPostPage() {
  const params = useParams();
  const { slug } = params;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Various InView references for different sections
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [contentRef, contentInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [relatedRef, relatedInView] = useInView({ threshold: 0.1, triggerOnce: false });
  
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
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Function to create markup from HTML content
  const createMarkup = (htmlContent?: string) => {
    return { __html: htmlContent || '' };
  };
  
  if (loading) {
    return (
      <motion.div 
        className="min-h-screen pt-8 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-4">Error Loading Article</h1>
              <p>{error}</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 inline-block"
              >
                <Link href="/knowledge-hub" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Return to Knowledge Hub
                </Link>
              </motion.div>
            </motion.div>
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
            <motion.div 
              className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-8 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
              <p>The article you're looking for doesn't exist or has been removed.</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 inline-block"
              >
                <Link href="/knowledge-hub" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Return to Knowledge Hub
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white min-h-screen">
      {/* Hero section with post image */}
      <motion.div 
        ref={heroRef}
        className="h-[40vh] md:h-[60vh] relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={post.featured_image_url || '/images/placeholder-article.jpg'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </motion.div>
      
      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <motion.div 
          ref={headerRef}
          className="bg-white rounded-t-3xl p-6 md:p-10 shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Category and date */}
          <motion.div 
            className="flex flex-wrap justify-between items-center mb-6"
            variants={staggerContainerVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeInUpVariants}>
              <span className="inline-block bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {post.category_name || 'Uncategorized'}
              </span>
              <span className="ml-4 text-gray-500 text-sm">{formatDate(post.published_date)}</span>
            </motion.div>
            {/* <SocialShareButtons /> */}
          </motion.div>
          
          {/* Post title */}
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {post.title}
          </motion.h1>
          
          {/* Author info */}
          <motion.div 
            className="flex items-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div>
              <div className="text-gray-500 text-sm">{post.reading_time || '10'} min read</div>
            </div>
          </motion.div>
          
          {/* Content layout - two columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main content */}
            <motion.div 
              ref={contentRef}
              className="lg:col-span-8 order-1"
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              variants={fadeInUpVariants}
            >
              <motion.div 
                className="text-gray-800 prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-800 prose-a:text-blue-600 hover:prose-a:text-blue-500"
                dangerouslySetInnerHTML={createMarkup(post.content)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              
              <div className="w-full mt-8">
                <NewsletterSubscribe />
              </div>
              
              {relatedPosts.length > 0 && (
                <motion.div 
                  ref={relatedRef}
                  className="border-t border-b border-gray-200 py-8 my-8"
                  initial="hidden"
                  animate={relatedInView ? "visible" : "hidden"}
                  variants={fadeInUpVariants}
                >
                  <motion.h3 
                    className="text-2xl font-bold text-gray-800 mb-6"
                    variants={fadeInUpVariants}
                  >
                    Related Articles
                  </motion.h3>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    variants={staggerContainerVariants}
                  >
                    {relatedPosts.map(relatedPost => (
                      <Link href={`/knowledge-hub/blog/${relatedPost.slug}`} key={relatedPost.slug}>
                        <RelatedPostCard post={relatedPost} />
                      </Link>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
            
            {/* Sidebar with table of contents */}
            <div className="lg:col-span-4 order-2">
              <div className="lg:sticky lg:top-20 space-y-8">
                {/* Table of Contents */}
                {post.content && (
                  <TableOfContents content={post.content} />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}