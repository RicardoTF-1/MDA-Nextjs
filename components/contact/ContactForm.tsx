'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContactForm } from '/lib/api';

// Animation variants
const formControlVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const buttonVariants = {
  hover: { scale: 1.03, backgroundColor: '#3b82f6' },
  tap: { scale: 0.98 }
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      setIsSubmitting(true);
      await submitContactForm(formData);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitStatus === 'success' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg"
        >
          Thank you for your message! We'll get back to you soon.
        </motion.div>
      )}
      
      {submitStatus === 'error' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
        >
          There was an error sending your message. Please try again.
        </motion.div>
      )}
      
      <motion.div variants={formControlVariants} initial="hidden" animate="visible">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full text-gray-700 px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${errors.name ? 'border-red-300' : 'border-gray-200'}`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </motion.div>
      
      <motion.div variants={formControlVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full text-gray-700 px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${errors.email ? 'border-red-300' : 'border-gray-200'}`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </motion.div>
      
      <motion.div variants={formControlVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full text-gray-700 px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${errors.phone ? 'border-red-300' : 'border-gray-200'}`}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </motion.div>
      
      <motion.div variants={formControlVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Subject (optional)"
          value={formData.subject}
          onChange={handleChange}
          className="w-full text-gray-700 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
        />
      </motion.div>
      
      <motion.div variants={formControlVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
        <textarea
          id="message"
          name="message"
          rows="4"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          className={`w-full text-gray-700 px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${errors.message ? 'border-red-300' : 'border-gray-200'}`}
        ></textarea>
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </motion.div>
      
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-emerald-500 text-white py-3 px-4 rounded-lg font-medium mt-3"
        whileHover={buttonVariants.hover}
        whileTap={buttonVariants.tap}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </motion.button>
    </form>
  );
}