// lib/api.js
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

console.log(`API URL: ${API_URL}`);
console.log(`Using mock data: ${USE_MOCK_DATA}`);

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout to prevent long waits
  timeout: 3000,
});

// MOCK DATA FOR FALLBACK WHEN BACKEND IS UNAVAILABLE
const MOCK_DATA = {
  categories: [
    {
      id: 1,
      name: "In Car Services",
      slug: "in-car-services",
      description: "Hands-on behind-the-wheel training with certified instructors",
      icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" /><path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" /><path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" /></svg>',
      has_subcategories: true,
    },
    {
      id: 2,
      name: "Teen Programs",
      slug: "teen-programs",
      description: "Comprehensive driver education for teenagers aged 15-17",
      icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" /></svg>',
      has_subcategories: false,
    },
    {
      id: 3,
      name: "Classroom Courses",
      slug: "classroom-courses",
      description: "Structured learning for both theory and practical driving knowledge",
      icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" /><path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" /><path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" /></svg>',
      has_subcategories: false,
    },
  ],
  categoryDetails: {
    "in-car-services": {
      id: 1,
      name: "In Car Services",
      slug: "in-car-services",
      description: "Get behind the wheel with our experienced instructors and learn to drive safely and confidently.",
      has_subcategories: true,
      subcategories: [
        {
          id: 1,
          name: "Road Test Prep and Car Rental",
          slug: "road-test-prep",
          description: "Prepare for your road test with our comprehensive preparation packages",
          courses: [
            {
              id: 1,
              title: "Road Test Prep - 2 Hours",
              slug: "road-test-prep-2-hours",
              subtitle: "Basic preparation for your road test",
              bullet_point_list: [
                "2 hours of practice with a certified instructor",
                "Use our modern, comfortable vehicle for your test",
                "Brief revision of the whole test before you take it"
              ],
              header_color: "dark",
              is_featured: false,
              has_free_pickup: false,
              price: 120
            },
            {
              id: 2,
              title: "Road Test Prep - 4 Hours",
              slug: "road-test-prep-4-hours",
              subtitle: "Comprehensive preparation for your road test",
              bullet_point_list: [
                "4 hours of practice with a certified instructor",
                "Use our modern, comfortable vehicle for your test",
                "Comprehensive revision of the whole test",
                "Free pickup from your location"
              ],
              header_color: "warning",
              is_featured: true,
              has_free_pickup: true,
              price: 220
            }
          ]
        },
        {
          id: 2,
          name: "Behind the Wheel",
          slug: "behind-the-wheel",
          description: "Gain confidence behind the wheel with our personalized behind-the-wheel lessons",
          courses: [
            {
              id: 3,
              title: "2 Hours Behind-the-wheel + Road Test",
              slug: "2-hours-behind-the-wheel",
              subtitle: "Perfect for intermediate drivers",
              bullet_point_list: [
                "2 hours of practice with a certified instructor",
                "Use our modern, comfortable vehicle for your test",
                "Extensive revision of the whole test before you take it"
              ],
              header_color: "primary",
              is_featured: false,
              has_free_pickup: false,
              price: 150
            },
            {
              id: 4,
              title: "4 Hours Behind-the-wheel + Road Test",
              slug: "4-hours-behind-the-wheel",
              subtitle: "For beginner or nervous drivers",
              bullet_point_list: [
                "4 hours of practice with a certified instructor",
                "Use our modern, comfortable vehicle for your test",
                "Comprehensive revision of the whole test before you take it",
                "Free pickup from your location"
              ],
              header_color: "dark",
              is_featured: true,
              has_free_pickup: true,
              price: 280
            }
          ]
        },
        {
          id: 3,
          name: "Stick Shift",
          slug: "stick-shift",
          description: "Learn to drive manual transmission vehicles with confidence",
          courses: [
            {
              id: 5,
              title: "Manual Transmission - 2 Hours",
              slug: "manual-transmission-2-hours",
              subtitle: "Introduction to driving stick shift",
              bullet_point_list: [
                "2 hours of practice with a certified instructor",
                "Learn the basics of clutch control",
                "Practice starting, stopping, and shifting gears",
                "City driving practice"
              ],
              header_color: "success",
              is_featured: false,
              has_free_pickup: false,
              price: 160
            },
            {
              id: 6,
              title: "Manual Transmission - 4 Hours",
              slug: "manual-transmission-4-hours",
              subtitle: "Comprehensive stick shift training",
              bullet_point_list: [
                "4 hours of practice with a certified instructor",
                "Master clutch control and smooth shifting",
                "Hill starts and advanced techniques",
                "City and highway driving practice",
                "Free pickup from your location"
              ],
              header_color: "warning",
              is_featured: true,
              has_free_pickup: true,
              price: 320
            }
          ]
        }
      ],
      direct_courses: []
    },
    "teen-programs": {
      id: 2,
      name: "Teen Programs",
      slug: "teen-programs",
      description: "Specially designed programs for teen drivers to build safe driving habits from the start.",
      has_subcategories: false,
      subcategories: [],
      direct_courses: [
        {
          id: 7,
          title: "Teen Driver's Ed Package",
          slug: "teen-drivers-ed",
          subtitle: "Complete driver's education for teens",
          bullet_point_list: [
            "30 hours of classroom instruction",
            "6 hours of behind-the-wheel training",
            "Online learning materials",
            "Practice permit test preparation"
          ],
          header_color: "primary",
          is_featured: true,
          has_free_pickup: true,
          price: 425
        },
        {
          id: 8,
          title: "Teen Summer Intensive",
          slug: "teen-summer-intensive",
          subtitle: "Complete your driver's ed during summer break",
          bullet_point_list: [
            "Complete driver's education in just 3 weeks",
            "30 hours of classroom instruction",
            "6 hours of behind-the-wheel training",
            "Flexible scheduling"
          ],
          header_color: "warning",
          is_featured: false,
          has_free_pickup: true,
          price: 450
        },
        {
          id: 9,
          title: "Parent-Teen Workshop",
          slug: "parent-teen-workshop",
          subtitle: "Learn together for better results",
          bullet_point_list: [
            "2-hour workshop for parents and teens",
            "Effective teaching and learning techniques",
            "Common mistakes to avoid",
            "Creating a supportive learning environment"
          ],
          header_color: "dark",
          is_featured: false,
          has_free_pickup: false,
          price: 75
        }
      ]
    }
  },
  courseDetails: {
    "2-hours-behind-the-wheel": {
      id: 3,
      title: "2 Hours Behind-the-wheel + Road Test",
      slug: "2-hours-behind-the-wheel",
      subtitle: "Perfect for intermediate drivers",
      description: "Our 2-hour behind-the-wheel training package is perfect for intermediate drivers who need some additional practice before taking their road test. You'll receive personalized instruction from one of our certified driving instructors, focusing on the specific skills you need to improve.",
      bullet_point_list: [
        "2 hours of practice with a certified instructor",
        "Use our modern, comfortable vehicle for your test",
        "Extensive revision of the whole test before you take it",
        "Personalized instruction tailored to your needs",
        "Focus on areas where you need improvement"
      ],
      header_color: "primary",
      is_featured: false,
      has_free_pickup: false,
      price: 150,
      category_name: "In Car Services",
      subcategory_name: "Behind the Wheel",
      locations: [
        {
          location: 1,
          location_details: {
            id: 1,
            name: "MyDrive Academy - Chicago",
            address: "123 Main St",
            city: "Chicago",
            state: "IL",
            zip_code: "60601",
            phone: "(312) 555-1234"
          },
          is_available: true
        },
        {
          location: 2,
          location_details: {
            id: 2,
            name: "MyDrive Academy - Naperville",
            address: "456 Center Ave",
            city: "Naperville",
            state: "IL",
            zip_code: "60540",
            phone: "(630) 555-5678"
          },
          is_available: true
        }
      ]
    },
    "4-hours-behind-the-wheel": {
      id: 4,
      title: "4 Hours Behind-the-wheel + Road Test",
      slug: "4-hours-behind-the-wheel",
      subtitle: "For beginner or nervous drivers",
      description: "Our comprehensive 4-hour behind-the-wheel training package is designed for beginner drivers or those who are nervous behind the wheel. With extended practice time, you'll gain confidence and master essential driving skills with one of our patient, certified instructors. We include free pickup from your location to make the process as convenient as possible.",
      bullet_point_list: [
        "4 hours of in-depth practice with a certified instructor",
        "Use our modern, comfortable vehicle for your test",
        "Comprehensive revision of the whole test before you take it",
        "Free pickup from your location",
        "Extra time to build confidence and develop good habits",
        "Personalized feedback and improvement strategies"
      ],
      header_color: "dark",
      is_featured: true,
      has_free_pickup: true,
      price: 280,
      category_name: "In Car Services",
      subcategory_name: "Behind the Wheel",
      locations: [
        {
          location: 1,
          location_details: {
            id: 1,
            name: "MyDrive Academy - Chicago",
            address: "123 Main St",
            city: "Chicago",
            state: "IL",
            zip_code: "60601",
            phone: "(312) 555-1234"
          },
          is_available: true
        },
        {
          location: 2,
          location_details: {
            id: 2,
            name: "MyDrive Academy - Naperville",
            address: "456 Center Ave",
            city: "Naperville",
            state: "IL",
            zip_code: "60540",
            phone: "(630) 555-5678"
          },
          is_available: true
        },
        {
          location: 3,
          location_details: {
            id: 3,
            name: "MyDrive Academy - Evanston",
            address: "789 Lake St",
            city: "Evanston",
            state: "IL",
            zip_code: "60201",
            phone: "(847) 555-9012"
          },
          is_available: true
        }
      ]
    }
  }
};

// Helper function to safely make API calls with fallback to mock data
const safeApiCall = async (apiFunction, fallbackData = null) => {
  // Check if we're running in a browser environment
  if (typeof window === 'undefined') {
    // We're on the server, return empty data to prevent fetch errors
    return fallbackData || [];
  }
  
  try {
    const result = await apiFunction();
    return result;
  } catch (error) {
    console.error('API call failed:', error);
    return fallbackData || [];
  }
};

// export const fetchCourseBySlug = async (slug) => {
//   try {
//     const response = await apiClient.get(`/courses/${slug}/`)
//     return response.data
//   } catch (error) {
//     console.error(`Error fetching course ${slug}:`, error)
//     throw error
//   }
// }

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

// Knowledge Hub / Blog functions
export const fetchBlogCategories = async () => {
  return safeApiCall(async () => {
    const response = await apiClient.get('/blog-categories/');
    return response.data;
  });
};

export const fetchBlogPosts = async (params = {}) => {
  return safeApiCall(async () => {
    const queryParams = new URLSearchParams();
    
    // Add query parameters if provided
    if (params.category) queryParams.append('category', params.category);
    if (params.search) queryParams.append('search', params.search);
    if (params.page) queryParams.append('page', params.page);
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    const response = await apiClient.get(`/blog-posts/${queryString}`);
    return response.data;
  });
};

export const fetchBlogPost = async (slug) => {
  return safeApiCall(async () => {
    const response = await apiClient.get(`/blog-posts/${slug}/`);
    return response.data;
  });
};

export const fetchFeaturedBlogPosts = async () => {
  return safeApiCall(async () => {
    const response = await apiClient.get('/blog-posts/featured/');
    return response.data;
  });
};

export const fetchRecentBlogPosts = async () => {
  return safeApiCall(async () => {
    const response = await apiClient.get('/blog-posts/recent/');
    return response.data;
  });
};

export const fetchPopularBlogPosts = async () => {
  return safeApiCall(async () => {
    const response = await apiClient.get('/blog-posts/popular/');
    return response.data;
  });
};

export const fetchPostsByCategory = async (categorySlug) => {
  return safeApiCall(async () => {
    const response = await apiClient.get(`/blog-posts/?category=${categorySlug}`);
    return response.data;
  });
};

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


// Fetch course categories (lists all categories)
export const fetchCourseCategories = async () => {
  try {
    const response = await apiClient.get('/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching course categories:', error);
    // Return mock categories if API fails
    return MOCK_DATA.categories;
  }
};

// Fetch a single course category with full details
export const fetchCourseCategory = async (slug) => {
  try {
    const response = await apiClient.get(`/categories/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course category ${slug}:`, error);
    // Return mock category details if API fails
    return MOCK_DATA.categoryDetails[slug] || {
      name: "Category not found",
      slug: slug,
      description: "This category could not be loaded.",
      has_subcategories: false,
      subcategories: [],
      direct_courses: []
    };
  }
};

// Fetch all subcategories for a category
export const fetchSubcategories = async (categorySlug) => {
  try {
    const response = await apiClient.get(`/categories/${categorySlug}/subcategories/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching subcategories for ${categorySlug}:`, error);
    // Return mock subcategories if API fails
    const categoryData = MOCK_DATA.categoryDetails[categorySlug];
    return categoryData ? categoryData.subcategories : [];
  }
};

// Fetch courses for a specific category, optionally filtered by subcategory
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
    // Return mock courses if API fails
    const categoryData = MOCK_DATA.categoryDetails[categorySlug];
    if (!categoryData) return [];
    
    if (subcategorySlug && categoryData.subcategories) {
      const subcategory = categoryData.subcategories.find(s => s.slug === subcategorySlug);
      return subcategory ? subcategory.courses : [];
    }
    
    return categoryData.direct_courses || [];
  }
};

// Fetch a specific course with full details
export const fetchCourse = async (slug) => {
  console.log(`Fetching course details for: ${slug}`);
  
  if (USE_MOCK_DATA) {
    console.log(`Returning mock data for course: ${slug}`);
    return MOCK_DATA.courseDetails[slug] || {
      id: 999,
      title: "Sample Course",
      slug: slug,
      description: "This is a sample course as the requested course couldn't be loaded.",
      bullet_point_list: ["Sample course content", "Please try again later"],
      header_color: "dark",
      price: 199
    };
  }
  
  try {
    const response = await apiClient.get(`/courses/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course ${slug}:`, error);
    // Return mock course details if API fails
    console.log(`Falling back to mock data for course: ${slug}`);
    return MOCK_DATA.courseDetails[slug] || {
      id: 999,
      title: "Sample Course",
      slug: slug,
      description: "This is a sample course as the requested course couldn't be loaded.",
      bullet_point_list: ["Sample course content", "Please try again later"],
      header_color: "dark",
      price: 199
    };
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

// Fetch locations with their schedules
export const fetchLocationsWithSchedules = async () => {
  try {
    const response = await apiClient.get('/locations/');
    return response.data;
  } catch (error) {
    console.error('Error fetching locations with schedules:', error);
    return [];
  }
};

// Fetch schedules for a specific location
export const fetchLocationSchedules = async (locationId) => {
  try {
    const response = await apiClient.get(`/locations/${locationId}/with_schedules/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching schedules for location ${locationId}:`, error);
    return [];
  }
};

// Fetch course locations with schedules
export const fetchCourseLocationsWithSchedules = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.locationId) {
      queryParams.append('location_id', params.locationId);
    }
    
    if (params.courseId) {
      queryParams.append('course_id', params.courseId);
    }
    
    if (params.withSchedule) {
      queryParams.append('with_schedule', 'true');
    }
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const response = await apiClient.get(`/course-locations/${queryString}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course locations:', error);
    return [];
  }
};
// Export a function to check if the backend is available
// This can be used to show a message to the user
// export const checkBackendConnection = async () => {
//   try {
//     await apiClient.get('/site-settings/');
//     return true;
//   } catch (error) {
//     console.error('Backend connection check failed:', error);
//     return false;
//   }
// };