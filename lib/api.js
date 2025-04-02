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

export const fetchLocations = async () => {
  try {
    const response = await apiClient.get('/locations/')
    return response.data
  } catch (error) {
    console.error('Error fetching locations:', error)
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

export const fetchBlogPosts = async () => {
  try {
    const response = await apiClient.get('/blog/')
    return response.data
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw error
  }
}

export const fetchBlogPostBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/blog/${slug}/`)
    return response.data
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error)
    throw error
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