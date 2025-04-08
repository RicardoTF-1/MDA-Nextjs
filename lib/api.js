// lib/api.js
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchCourses = async (params = {}) => {
  try {
    const response = await apiClient.get('/courses/', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching courses:', error)
    throw error
  }
}

export const fetchCourseBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/courses/${slug}/`)
    return response.data
  } catch (error) {
    console.error(`Error fetching course ${slug}:`, error)
    throw error
  }
}



export const fetchTestimonials = async (featured = false) => {
  try {
    const endpoint = featured ? '/testimonials/featured/' : '/testimonials/'
    const response = await apiClient.get(endpoint)
    return response.data
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    throw error
  }
}

export const fetchFAQs = async (params = {}) => {
  try {
    const response = await apiClient.get('/faqs/', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    throw error
  }
}

export async function fetchBlogCategories() {
  try {
    const response = await fetch(`${API_URL}/blog-categories/`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
}

export async function fetchBlogPosts(params = {}) {
  const queryParams = new URLSearchParams();
  
  // Add query parameters if provided
  if (params.category) queryParams.append('category', params.category);
  if (params.search) queryParams.append('search', params.search);
  if (params.page) queryParams.append('page', params.page);
  
  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
  
  try {
    const response = await fetch(`${API_URL}/blog-posts/${queryString}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function fetchBlogPost(slug) {
  try {
    const response = await fetch(`${API_URL}/blog-posts/${slug}/`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching blog post (${slug}):`, error);
    return null;
  }
}

export async function fetchFeaturedBlogPosts() {
  try {
    const response = await fetch(`${API_URL}/blog-posts/featured/`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    return [];
  }
}

export async function fetchRecentBlogPosts() {
  try {
    const response = await fetch(`${API_URL}/blog-posts/recent/`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recent blog posts:', error);
    return [];
  }
}

export async function fetchPopularBlogPosts() {
  try {
    const response = await fetch(`${API_URL}/blog-posts/popular/`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching popular blog posts:', error);
    return [];
  }
}

export async function fetchPostsByCategory(categorySlug) {
  try {
    const response = await fetch(`${API_URL}/blog-posts/?category=${categorySlug}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching posts for category (${categorySlug}):`, error);
    return [];
  }
}

export const submitContactForm = async (formData) => {
  try {
    const response = await apiClient.post('/contact/', formData)
    return response.data
  } catch (error) {
    console.error('Error submitting contact form:', error)
    throw error
  }
}



// lib/api.js (add this to your existing api.js)

export const fetchSliderImages = async () => {
  try {
    const response = await apiClient.get('/slider-images/')
    return response.data
  } catch (error) {
    console.error('Error fetching slider images:', error)
    throw error
  }
}

// Componente horario y locations home

// lib/api.js (update your fetchLocations function)

// lib/api.js - Check if this matches your actual API endpoint
// export const fetchLocations = async (endpoint = '') => {
//   try {
//     let url = '/locations/';
    
//     if (endpoint) {
//       url = `/locations/${endpoint}/`;
//     }
    
//     const response = await apiClient.get(url);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching locations:', error);
//     throw error;
//   }
// }

// export const fetchServiceCategories = async () => {
//   try {
//     const response = await apiClient.get('/service-categories/')
//     return response.data
//   } catch (error) {
//     console.error('Error fetching service categories:', error)
//     return []
//   }
// }

// // Fetch a single service category with its subcategories
// export const fetchServiceCategoryDetail = async (categoryId) => {
//   try {
//     const response = await apiClient.get(`/service-categories/${categoryId}/`)
//     return response.data
//   } catch (error) {
//     console.error(`Error fetching service category ${categoryId}:`, error)
//     return null
//   }
// }

// Fetch subcategories for a service category
// export const fetchSubcategories = async (categoryId) => {
//   try {
//     const response = await apiClient.get(`/service-categories/${categoryId}/subcategories/`)
//     return response.data
//   } catch (error) {
//     console.error(`Error fetching subcategories for category ${categoryId}:`, error)
//     return []
//   }
// }

// // Fetch in-car lessons specific data
// export const fetchCarLessons = async () => {
//   try {
//     const response = await apiClient.get('/car-lessons/')
//     return response.data
//   } catch (error) {
//     console.error('Error fetching car lessons:', error)
//     return {
//       category: null,
//       subcategories: []
//     }
//   }
// }

// Fetch all course categories
export const fetchCourseCategories = async () => {
  try {
    const response = await apiClient.get('/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching course categories:', error);
    throw error;
  }
};

// Fetch a single course category with subcategories and direct courses
export const fetchCourseCategory = async (slug) => {
  try {
    const response = await apiClient.get(`/categories/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course category ${slug}:`, error);
    throw error;
  }
};

// Fetch subcategories for a category
export const fetchSubcategories = async (categorySlug) => {
  try {
    const response = await apiClient.get(`/categories/${categorySlug}/subcategories/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching subcategories for ${categorySlug}:`, error);
    throw error;
  }
};

// Fetch courses for a category, optionally filtered by subcategory
export const fetchCoursesByCategorySlug = async (categorySlug, subcategorySlug = null) => {
  try {
    let url = `/categories/${categorySlug}/courses/`;
    if (subcategorySlug) {
      url += `?subcategory=${subcategorySlug}`;
    }
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching courses for category ${categorySlug}:`, error);
    throw error;
  }
};

// Fetch a specific course with full details
export const fetchCourse = async (slug) => {
  try {
    const response = await apiClient.get(`/courses/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course ${slug}:`, error);
    throw error;
  }
};

// Fetch all locations
export const fetchLocations = async () => {
  try {
    const response = await apiClient.get('/locations/');
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};

// Fetch a specific location
export const fetchLocation = async (id) => {
  try {
    const response = await apiClient.get(`/locations/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching location ${id}:`, error);
    throw error;
  }
};

// Fetch courses available at a location
export const fetchCoursesByLocation = async (locationId) => {
  try {
    const response = await apiClient.get(`/locations/${locationId}/courses/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching courses for location ${locationId}:`, error);
    throw error;
  }
};

// Fetch featured courses
export const fetchFeaturedCourses = async () => {
  try {
    const response = await apiClient.get('/courses/featured/');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured courses:', error);
    throw error;
  }
};

export const fetchBanners = async () => {
  try {
    const response = await apiClient.get('/banners/')
    return response.data
  } catch (error) {
    console.error('Error fetching banners:', error)
    // Return empty array instead of throwing to maintain component rendering
    return []
  }
}

export const fetchSiteSettings = async () => {
  try {
    const response = await apiClient.get('/site-settings/')
    return response.data
  } catch (error) {
    console.error('Error fetching site settings:', error)
    // Return default settings in case of error
    return {
      site_name: 'My Drive Academy',
      logo_url: null,
      logo_dark_url: null,
      favicon_url: null,
      primary_color: '#4ade80',
      secondary_color: '#60a5fa',
      footer_text: '',
      copyright_text: `© ${new Date().getFullYear()} My Drive Academy. All rights reserved.`
    }
  }
}

// Course Finder API functions
export const fetchCourseFinderQuestions = async () => {
  try {
    const response = await apiClient.get('/course-finder/')
    return response.data
  } catch (error) {
    console.error('Error fetching course finder questions:', error)
    throw error
  }
}

export const getRecommendedCourse = async (answers) => {
  try {
    // Using fetch instead of axios for better compatibility
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/course-finder/recommend/`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers)
      }
    )
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error getting course recommendation:', error)
    // Return fallback data rather than throwing
    return {
      name: 'Adult Beginner Course',
      description: 'Perfect for adults who are learning to drive for the first time.',
      course_details: {
        title: 'Adult Beginner Course',
        slug: 'adult-beginner',
        description: 'Comprehensive driver training for adults',
        bullet_point_list: [
          '20 hours of classroom instruction',
          '8 hours of behind-the-wheel training',
          'Flexible scheduling',
          'License test preparation'
        ],
        price: 349,
        duration: '4 weeks'
      }
    }
  }
}
