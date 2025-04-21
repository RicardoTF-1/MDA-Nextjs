// app/contact/page.js
import { Suspense } from 'react';
import Image from 'next/image';
import ContactForm from '@/components/contact/ContactForm';
import VerticalContactInfoBar from '@/components/contact/ContactInfoBar';

export const metadata = {
  title: 'Contact Us | My Drive Academy',
  description: 'Contact us for more information about our driving courses or to enroll in classes.',
};

// This is a client component wrapper for the banner
const ContactBanner = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-xl mb-1">
      <div className="relative w-full h-48 md:h-64">
        <Image
          src="/images/banners/contact-banner.png"
          alt="My Drive Academy building"
          className="object-cover"
          fill
          sizes="100vw"
          priority
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Contact Us</h1>
      </div>
    </div>
  );
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Banner with centered title */}
        <Suspense fallback={<div className="h-48 bg-gray-200 animate-pulse rounded-xl mb-10"></div>}>
          <ContactBanner />
        </Suspense>
                
        <div className="max-w-6xl mx-auto mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in touch</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Fill the form with your query, and our team will get back to you asap.
          </p>
                    
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column: Contact form */}
            <div className="lg:w-2/3 bg-blue-50 rounded-xl p-8">
              <Suspense fallback={<div className="h-96 bg-gray-200 animate-pulse rounded-md"></div>}>
                <ContactForm />
              </Suspense>
            </div>
                        
            {/* Right column: Vertical contact information */}
            <div className="lg:w-1/3">
              <Suspense fallback={<div className="h-80 bg-gray-200 animate-pulse rounded-md"></div>}>
                <VerticalContactInfoBar />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}