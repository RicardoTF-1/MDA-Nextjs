"use client";

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ArrowDown,
  Car,
  Shield,
  UserPlus,
  GraduationCap, 
  Award,
  BookOpen,
  Users,
  Truck,
  Clock
} from 'lucide-react';

const DrivingAcademy = () => {
  const [activeTab, setActiveTab] = useState('adult-programs');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTeenSlide, setCurrentTeenSlide] = useState(0);
  const [currentDefensiveSlide, setCurrentDefensiveSlide] = useState(0);
  const [currentAdvancedSlide, setCurrentAdvancedSlide] = useState(0);
  const [currentClassCSlide, setCurrentClassCSlide] = useState(0);
  const [currentChauffeurSlide, setCurrentChauffeurSlide] = useState(0);

  // Program card component for Best Sellers and More Programs slides
  const ProgramCard = ({ title, subtitle, description, extraInfo, cta = "Select your Location", icon }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="p-6 bg-gray-900 text-white text-center relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          {icon && (
            <div className="flex justify-center mb-3">
              {React.cloneElement(icon, { size: 36, className: "text-emerald-400" })}
            </div>
          )}
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-emerald-400 font-semibold">{subtitle}</p>
          {extraInfo && <p className="text-sm text-gray-300 mt-1">{extraInfo}</p>}
        </div>
        <div className="p-6 flex-grow">
          <div className="mb-6">
            {Array.isArray(description) ? (
              description.map((item, index) => (
                <p key={index} className={`flex items-start ${index > 0 ? 'mt-4' : ''} mb-3`}>
                  <span className="text-emerald-500 mr-2">✓</span>
                  <span className="text-gray-800">{item}</span>
                </p>
              ))
            ) : (
              <p className="text-gray-800 mt-2">{description}</p>
            )}
          </div>
          <div className="mt-auto relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center"
            >
              {cta}
              <ChevronDown className="ml-2" size={18} />
            </button>
            
            {showDropdown && (
              <div className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <a 
                  href="/chicago" 
                  className="block w-full px-4 py-3 text-center text-gray-800 hover:bg-emerald-500 hover:text-white transition-colors"
                >
                  CHICAGO
                </a>
                <a 
                  href="/suburb" 
                  className="block w-full px-4 py-3 text-center text-gray-800 hover:bg-emerald-500 hover:text-white transition-colors"
                >
                  SUBURB
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Bottom link component shared between Best Sellers and More Programs slides
  const BottomLink = ({ viewAllLink, linkText }) => (
    <div className="text-center mb-8 bg-gray-50 rounded-xl p-6 shadow-sm">
      <div className="text-lg font-bold text-gray-700 mb-4">DSS Page with Price</div>
      <a href={viewAllLink} className="text-emerald-600 hover:text-emerald-700 font-medium underline">{linkText}</a>
    </div>
  );

  // Footer notes component shared between Best Sellers and More Programs slides
  const FooterNotes = () => (
    <div className="text-sm text-gray-600 max-w-4xl mx-auto bg-gray-50 p-4 rounded-lg">
      <p className="mb-2">✓ All packages include the use of our modern, comfortable vehicle for your road test.</p>
      <p className="mb-2">✓ For Road Test, students must meet the instructor at the designated DMV location.</p>
      <p>✓ A valid Learner's Permit is required to enroll in any of these packages. <a href="/permit-prep" className="text-emerald-600 hover:underline font-medium">Get permit help here!</a></p>
    </div>
  );

  // Permit Prep Card component with white background styling to match Adult Programs
  const PermitPrepCard = ({ title, subtitle, quote, points, buttonText = "Register Now", icon }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const hasLocationDropdown = buttonText.toLowerCase().includes("location");
    
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="p-6 bg-gray-900 text-white text-center relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          {icon && (
            <div className="flex justify-center mb-3">
              {React.cloneElement(icon, { size: 36, className: "text-emerald-400" })}
            </div>
          )}
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          {subtitle && (
            <p className="text-emerald-400 font-semibold mb-3">{subtitle}</p>
          )}
          {quote && (
            <p className="text-emerald-400 italic text-sm mb-3">{quote}</p>
          )}
        </div>
        <div className="p-6 flex-grow">
          <div className="mb-6">
            {points.map((point, index) => (
              <p key={index} className={`flex items-start ${index > 0 ? 'mt-4' : ''} mb-3`}>
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-800">{point}</span>
              </p>
            ))}
          </div>
          <div className="mt-auto relative">
            <button 
              onClick={() => hasLocationDropdown && setShowDropdown(!showDropdown)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center"
            >
              {buttonText}
              {hasLocationDropdown && <ChevronDown className="ml-2" size={18} />}
            </button>
            
            {hasLocationDropdown && showDropdown && (
              <div className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <a 
                  href="/chicago" 
                  className="block w-full px-4 py-3 text-center text-gray-800 hover:bg-emerald-500 hover:text-white transition-colors"
                >
                  CHICAGO
                </a>
                <a 
                  href="/suburb" 
                  className="block w-full px-4 py-3 text-center text-gray-800 hover:bg-emerald-500 hover:text-white transition-colors"
                >
                  SUBURB
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Teen Program Card component with white background styling to match Adult Programs
  const TeenProgramCard = ({ title, subtitle, subtitleColor = "emerald-400", bestSeller = false, points, buttonText = "Select your Location", icon }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {bestSeller && (
          <div className="absolute top-0 right-0 bg-yellow-500 text-gray-900 font-bold py-1 px-3 transform rotate-45 translate-x-6 -translate-y-1 text-xs">
            BEST SELLER
          </div>
        )}
        <div className="p-6 bg-gray-900 text-white text-center relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          {icon && (
            <div className="flex justify-center mb-3">
              {React.cloneElement(icon, { size: 36, className: "text-emerald-400" })}
            </div>
          )}
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className={`text-${subtitleColor} font-semibold mb-3`}>{subtitle}</p>
        </div>
        <div className="p-6 flex-grow">
          <div className="mb-6">
            {points.map((point, index) => (
              <p key={index} className={`flex items-start ${index > 0 ? 'mt-4' : ''} mb-3`}>
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-800" dangerouslySetInnerHTML={{ __html: point }}></span>
              </p>
            ))}
          </div>
          <div className="mt-auto relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center"
            >
              {buttonText}
              <ChevronDown className="ml-2" size={18} />
            </button>
            
            {showDropdown && (
              <div className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <a 
                  href="/chicago" 
                  className="block w-full px-4 py-3 text-center text-gray-800 hover:bg-emerald-500 hover:text-white transition-colors"
                >
                  CHICAGO
                </a>
                <a 
                  href="/suburb" 
                  className="block w-full px-4 py-3 text-center text-gray-800 hover:bg-emerald-500 hover:text-white transition-colors"
                >
                  SUBURB
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Bottom link component for Teen Programs slides
  const TeenBottomSection = ({ redirectText, redirectLink, mainLinkText = "DSS Page For Teen Programs", mainLink = "/teen-programs" }) => (
    <div className="text-center mt-8">
      <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-700">
        <p className="mb-2">***All packages include the use our modern, comfortable vehicle for your test.</p>
        <p className="mb-2">***A valid Learner's Permit is required to enroll in any of these packages. Need help obtaining yours? <a href="/permit-prep" className="text-emerald-600 hover:underline">Click here!</a></p>
        {redirectText && (
          <p className="text-red-500 flex items-center justify-end">
            <span>Redirected to {redirectText}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </p>
        )}
      </div>
      
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold mb-2">
          {mainLinkText === "Click Here for more Options!" ? (
            <span>{mainLinkText}</span>
          ) : (
            <span>See all Programs</span>
          )}
        </div>
        <ArrowDown size={32} className="mb-2" />
        <a href={mainLink} className="text-red-500 text-lg font-medium hover:underline">{mainLinkText}</a>
      </div>
    </div>
  );
  
  // Defensive Driving Card component
  const DefensiveProgramCard = ({ title, subtitle, price, points, icon }) => {
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="p-6 bg-gray-900 text-white text-center relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          {icon && (
            <div className="flex justify-center mb-3">
              {React.cloneElement(icon, { size: 36, className: "text-emerald-400" })}
            </div>
          )}
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-emerald-400 font-semibold">{subtitle}</p>
        </div>
        <div className="p-6 flex-grow">
          <div className="mb-6">
            {points.map((point, index) => (
              <p key={index} className={`flex items-start ${index > 0 ? 'mt-4' : ''} mb-3`}>
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-800">{point}</span>
              </p>
            ))}
          </div>
          {price && (
            <div className="text-center my-4">
              <span className="text-3xl font-bold text-gray-900">${price}</span>
            </div>
          )}
          <div className="mt-auto">
            <a 
              href="#select-location" 
              className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all"
            >
              Select Your Location
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  // Advanced Skills Card component
  const AdvancedSkillsCard = ({ title, subtitle, description, buttonText = "Register Now", icon }) => {
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="p-6 bg-gray-900 text-white text-center relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          {icon && (
            <div className="flex justify-center mb-3">
              {React.cloneElement(icon, { size: 36, className: "text-emerald-400" })}
            </div>
          )}
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-emerald-400 font-semibold">{subtitle}</p>
        </div>
        <div className="p-6 flex-grow">
          <div className="mb-6">
            {Array.isArray(description) ? (
              description.map((item, index) => (
                <p key={index} className={`flex items-start ${index > 0 ? 'mt-4' : ''} mb-3`}>
                  <span className="text-emerald-500 mr-2">✓</span>
                  <span className="text-gray-800">{item}</span>
                </p>
              ))
            ) : (
              <p className="text-gray-800 mt-2">{description}</p>
            )}
          </div>
          <div className="mt-auto">
            <a 
              href="#register" 
              className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  // Class C Program Card component
  const ClassCProgramCard = ({ title, subtitle, price, points, bestSeller = false, icon }) => {
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col relative">
        {bestSeller && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 font-bold py-1 px-3 rounded-full text-xs z-10">
            BEST SELLER
          </div>
        )}
        <div className="p-6 bg-gray-900 text-white text-center relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          {icon && (
            <div className="flex justify-center mb-3">
              {React.cloneElement(icon, { size: 36, className: "text-emerald-400" })}
            </div>
          )}
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-emerald-400 font-semibold">{subtitle}</p>
        </div>
        <div className="p-6 flex-grow">
          <div className="mb-6">
            {points.map((point, index) => (
              <p key={index} className={`flex items-start ${index > 0 ? 'mt-4' : ''} mb-3`}>
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-800">{point}</span>
              </p>
            ))}
          </div>
          {price && (
            <div className="text-center my-4">
              <span className="text-3xl font-bold text-gray-900">${price}</span>
            </div>
          )}
          <div className="mt-auto">
            <a 
              href="#select-location" 
              className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all"
            >
              Select Your Location
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  // Chauffeur Training Card component
  const ChauffeurProgramCard = ({ title, subtitle, price, points, icon }) => {
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="p-6 bg-gray-900 text-white text-center relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          {icon && (
            <div className="flex justify-center mb-3">
              {React.cloneElement(icon, { size: 36, className: "text-emerald-400" })}
            </div>
          )}
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-emerald-400 font-semibold">{subtitle}</p>
        </div>
        <div className="p-6 flex-grow">
          <div className="mb-6">
            {points.map((point, index) => (
              <p key={index} className={`flex items-start ${index > 0 ? 'mt-4' : ''} mb-3`}>
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-800">{point}</span>
              </p>
            ))}
          </div>
          {price && (
            <div className="text-center my-4">
              <span className="text-3xl font-bold text-gray-900">${price}</span>
            </div>
          )}
          <div className="mt-auto">
            <a 
              href="#register-now" 
              className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    );
  };

  // Adult Programs Slides
  const slides = [
    // Slide 0 - Original Adult Programs
    {
      title: "Adult Programs",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Adult Programs</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Whether you're a first-time driver or looking for a refresher, MyDrive Academy offers personalized adult driving programs tailored
              to your needs. Our expert instructors provide comprehensive training, including permit test preparation, defensive driving
              techniques, and road test readiness. We are committed to building safe, skilled, and confident drivers ready to navigate Illinois
              roads with ease!
            </p>
          </div>
          <div className="mt-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Here's how to get your driver's license:</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500 transition-transform duration-300 hover:transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <BookOpen size={48} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">1. Secure Your Learner's Permit.</h3>
                <p className="text-gray-700 mb-4">
                  Start your driving journey by obtaining your learner's permit.
                </p>
                <a href="/permit-prep" className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-2 px-4 rounded-md transition-colors">
                  Get Permit Help
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500 transition-transform duration-300 hover:transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <Car size={48} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">2. Learn How to Drive.</h3>
                <p className="text-gray-700 mb-4">
                  Professional driving lessons tailored to your skill level.
                </p>
                <a href="/adult-programs-best-sellers" className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-2 px-4 rounded-md transition-colors">
                  View Lessons
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500 transition-transform duration-300 hover:transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <Award size={48} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">3. Pass your Road Test.</h3>
                <p className="text-gray-700 mb-4">
                  Comprehensive preparation to ensure you pass your driving test.
                </p>
                <a href="/adult-programs-slide-3" className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-2 px-4 rounded-md transition-colors">
                  Road Test Prep
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center space-x-6">
            <a
              href="/contact"
              className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Contact Us
            </a>
            
            <a
              href="/courses"
              className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              View All Programs
            </a>
          </div>
        </div>
      )
    },
    // Slide 1 - Best Sellers Programs
    {
      title: "Adult Programs: Best Sellers",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">Adult Programs: Best Sellers</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <ProgramCard 
              title="Core Package" 
              subtitle="6 Hours Behind-the-Wheel + Road Test"
              description={[
                "Perfect for beginners looking for structured practice and essential skills to drive safely.",
                "This package covers fundamental driving techniques, basic maneuvers, and road test preparation to ensure you're fully ready for your test."
              ]}
              icon={<Car />}
            />
            
            <ProgramCard 
              title="Essential Package" 
              subtitle="8 Hours Behind-the-Wheel + Road Test"
              description={[
                "Ideal for new drivers who want extra practice beyond the basics to build confidence.",
                "Provides more hands-on experience, improves driving skills, test readiness, and defensive abilities."
              ]}
              icon={<Car />}
            />
            
            <ProgramCard 
              title="Essential Pro" 
              subtitle="12 Hours Behind-the-Wheel + Road Test"
              extraInfo="Parallel Parking & Highway Driving"
              description={[
                "Drivers seeking comprehensive training, including challenging maneuvers.",
                "Includes Parallel Parking and Highway Driving, building strong driving fundamentals."
              ]}
              icon={<Car />}
            />
          </div>

          <BottomLink 
            viewAllLink="/adult-programs" 
            linkText="View All Adult Programs" 
          />

          <FooterNotes />
        </div>
      )
    },
    // Slide 2 - More Adult Programs
    {
      title: "More Adult Programs",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">More Adult Programs</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <ProgramCard 
              title="Express Drive Package" 
              subtitle="2 Hours Behind-the-Wheel + Road Test"
              description={[
                "Perfect for those needing a quick refresher before taking the road test.",
                "Covers fundamental driving techniques and road test preparation."
              ]}
              icon={<Car />}
            />
            
            <ProgramCard 
              title="Quick Start Package" 
              subtitle="4 Hours Behind-the-Wheel + Road Test"
              description={[
                "Ideal for those needing a quick refresher before their road test.",
                "This package covers essential skills, corrects common mistakes, and builds confidence for the test."
              ]}
              icon={<Car />}
            />
            
            <ProgramCard 
              title="Expert Driver Package" 
              subtitle="Permit Prep + 2 Hours Behind-the-Wheel + Road Test"
              description={[
                "Designed for non-U.S. citizens without a Social Security Number.",
                "Includes permit exam preparation, state-mandated instruction, and a streamlined path to an Illinois driver's license.",
                "Available in English or Spanish"
              ]}
              cta="Register Now"
              icon={<Car />}
            />
          </div>

          <BottomLink 
            viewAllLink="/adult-programs" 
            linkText="Explore All Program Options" 
          />

          <FooterNotes />
        </div>
      )
    }
  ];

  // Teen Programs Slides
  const teenSlides = [
    {
      title: "Teen Driver's Education Programs",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Teen Driver's Education</h1>
          
          {/* Full Width Layout */}
          <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">License Process</h2>
            
            {/* Steps Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {/* Step 1 - Classroom */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mb-2">1</div>
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <BookOpen size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">30 Hours Classroom</h3>
                <p className="text-gray-600 text-sm">Complete driver's ed course</p>
              </div>
              
              {/* Step 2 - Permit Test */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mb-2">2</div>
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">Pass Permit Test</h3>
                <p className="text-gray-600 text-sm">At local DMV office</p>
              </div>
              
              {/* Step 3 - BTW Training */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mb-2">3</div>
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <Car size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">6 Hours BTW Training</h3>
                <p className="text-gray-600 text-sm">With certified instructor</p>
              </div>
              
              {/* Step 4 - Practice */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mb-2">4</div>
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">50 Hours Practice</h3>
                <p className="text-gray-600 text-sm">With licensed adult</p>
              </div>
              
              {/* Step 5 - Road Test */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mb-2">5</div>
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <Award size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">Road Test</h3>
                <p className="text-gray-600 text-sm">At age 16+ with 9mo permit</p>
              </div>
            </div>
          </div>
          
          {/* Requirements Footer */}
          <div className="mt-6 bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
            <p className="font-medium mb-2 text-center">Requirements:</p>
            <ul className="list-disc pl-5 space-y-1 max-w-lg mx-auto">
              <li>Must be 15-17 years old</li>
              <li>Parent/guardian consent required</li>
              <li>Valid learner's permit for behind-the-wheel training</li>
            </ul>
          </div>
        </div>
      )
    },
    // Slide 1 - Complete Program
    {
      title: "Teen Driving Programs: Complete Program",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">Teen Driving Programs: Complete Program</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <TeenProgramCard 
              title="Partner Program"
              subtitle="30 Hours Driver's Education Classroom + 6 hrs Behind-the-Wheel"
              subtitleColor="emerald-400"
              points={[
                "Partner required to register.",
                "Teens with or without prior driving experience who need basic training",
                "Includes 6 hours of behind-the-wheel training and 6 hours of partner observation."
              ]}
              icon={<Users />}
            />
            
            <TeenProgramCard 
              title="Solo Program"
              subtitle="30 Hours Driver's Education Classroom + 8 hrs Behind-the-Wheel"
              subtitleColor="emerald-400"
              bestSeller={true}
              points={[
                "(For teens with or without prior driving experience)",
                "Covers core driving techniques, parking skills, and defensive driving strategies",
                "Includes 8 hours of one-on-one behind-the-wheel training."
              ]}
              icon={<Car />}
            />
            
            <TeenProgramCard 
              title="Teens Driver's Education"
              subtitle="30 Hours Classroom ONLY"
              subtitleColor="emerald-400"
              points={[
                "State-mandatory classroom portion for all new teen drivers.",
                "Learn all road rules and road signs.",
                "Obtain your driver's permit during the second week of the course."
              ]}
              buttonText="Register Now"
              icon={<BookOpen />}
            />
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center bg-gray-50 rounded-xl p-6 mb-8">
            <div className="mb-4 md:mb-0 md:mr-8">
              <div className="font-bold text-lg mb-2">Select your Location</div>
              <ArrowDown size={24} className="mx-auto" />
              <div className="flex justify-center gap-4 mt-2">
                <a href="/chicago" className="bg-emerald-500 text-white rounded-lg px-6 py-2 font-medium shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all">
                  CHICAGO
                </a>
                <a href="/suburb" className="bg-emerald-500 text-white rounded-lg px-6 py-2 font-medium shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all">
                  SUBURB
                </a>
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-700 mb-2">DSS Page with Price</div>
              <ArrowDown size={24} className="mx-auto mb-2" />
              <div className="text-lg font-bold mb-2">Click Here for more Options!</div>
              <ArrowDown size={24} className="mx-auto mb-2" />
              <a href="/teen-programs" className="text-red-500 font-medium hover:underline">DSS Page For Teen Programs</a>
            </div>
          </div>
          
          <div className="text-sm text-gray-700 max-w-4xl mx-auto">
            <p className="mb-2">***All packages include the use our modern, comfortable vehicle for your test.</p>
            <p>***A valid Learner's Permit is required to enroll in any of these packages. Need help obtaining yours? <a href="/permit-prep" className="text-emerald-600 hover:underline">Click here!</a></p>
            <p className="text-red-500 text-right mt-4">Redirected to the Permit Prep Page</p>
          </div>
        </div>
      )
    },
    // Slide 2 - Behind-the-Wheel Training Options 1
    {
      title: "Teen Driving Programs: Behind-the-Wheel Training Options",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">Teen Driving Programs: Behind-the-Wheel Training Options</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <TeenProgramCard 
              title="Partner Program"
              subtitle="6 Hours Behind-the-Wheel"
              subtitleColor="emerald-400"
              points={[
                "Partner required to register.",
                "Teens with or without prior driving experience who need basic training",
                "Includes 6 hours of behind-the-wheel training and 6 hours of partner observation."
              ]}
              icon={<Users />}
            />
            
            <TeenProgramCard 
              title="Solo Program"
              subtitle="8 Hours Behind-the-Wheel"
              subtitleColor="emerald-400"
              bestSeller={true}
              points={[
                "Fully meets the state's driving practice requirement for teens.",
                "Covers Core driving techniques, parking skills, and defensive driving strategies.",
                "Includes 8 hours of one-on-one behind-the-wheel training."
              ]}
              icon={<Car />}
            />
            
            <TeenProgramCard 
              title="12-Hr Teen Package"
              subtitle="12 Hours Behind-the-Wheel"
              subtitleColor="emerald-400"
              bestSeller={true}
              points={[
                "Designed for teens <strong>with or without prior driving experience</strong> who need <strong>**basic training</strong>",
                "Covers <strong>core driving techniques, parking skills, and defensive driving strategies</strong>",
                "Includes <strong>**12 hours of behind-the-wheel training**</strong>",
                "Increased hands-on practice, night driving basics and confidence-building"
              ]}
              icon={<Car />}
            />
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center bg-gray-50 rounded-xl p-6 mb-8">
            <div className="mb-4 md:mb-0 md:mr-8">
              <div className="font-bold text-lg mb-2">Select your Location</div>
              <ArrowDown size={24} className="mx-auto" />
              <div className="flex justify-center gap-4 mt-2">
                <a href="/chicago" className="bg-emerald-500 text-white rounded-lg px-6 py-2 font-medium shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all">
                  CHICAGO
                </a>
                <a href="/suburb" className="bg-emerald-500 text-white rounded-lg px-6 py-2 font-medium shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all">
                  SUBURB
                </a>
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-700 mb-2">DSS Page with Price</div>
            </div>
          </div>
          
          <div className="text-center bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Haven't completed yet the Driver's Education? Click Here!</h3>
            <p className="text-red-500 mb-4">Redirected to Teen Programs with DE</p>
            
            <div className="text-lg font-bold mb-2">Click Here for more Options!</div>
            <ArrowDown size={24} className="mx-auto mb-2" />
            <a href="/teen-programs" className="text-red-500 font-medium hover:underline">DSS Page For Teen Programs</a>
          </div>
          
          <div className="text-sm text-gray-700 max-w-4xl mx-auto">
            <p className="mb-2">***All packages include the use our modern, comfortable vehicle for your test.</p>
            <p className="mb-2">***A valid Learner's Permit is required to enroll in any of these packages. Need help obtaining yours? <a href="/permit-prep" className="text-emerald-600 hover:underline">Click here!</a></p>
            <p>***Student must submit a proof that they have successfully completed a Driver's Education class</p>
            <p className="text-red-500 text-right mt-2">Redirected to the Permit Prep Page</p>
          </div>
        </div>
      )
    },
    // Slide 3 - Behind-the-Wheel Training Options 2
    {
      title: "Teen Driving Programs: Behind-the-Wheel Training Options",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">Teen Driving Programs: Behind-the-Wheel Training Options</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <TeenProgramCard 
              title="12-Hr Teen Package"
              subtitle="12 Hours Behind-the-Wheel"
              subtitleColor="emerald-400"
              bestSeller={true}
              points={[
                "Teens looking for more in-depth training before taking their road test.",
                "Increased hands-on practice, night driving basics, and enhanced confidence-building.",
                "Covers parallel parking and highway driving <span class='italic'>(subject to instructor evaluation for safety)</span>"
              ]}
              icon={<Car />}
            />
            
            <TeenProgramCard 
              title="Extra Practice 1"
              subtitle="25 Hours Behind-the-Wheel"
              subtitleColor="emerald-400"
              points={[
                "Teens seeking extensive training to master safe driving habits.",
                "Advanced maneuvering, highway driving, and real-world traffic experience.",
                "Covers parallel parking and highway driving <span class='italic'>(subject to instructor evaluation for safety)</span>"
              ]}
              icon={<Car />}
            />
            
            <TeenProgramCard 
              title="Extra Practice 2"
              subtitle="50 Hours Behind-the-Wheel"
              subtitleColor="emerald-400"
              points={[
                "New drivers aiming for full proficiency and meeting state-supervised driving requirements.",
                "Comprehensive behind-the-wheel training, varied road conditions, and mastery of defensive driving techniques.",
                "Covers parallel parking and highway driving <span class='italic'>(subject to instructor evaluation for safety)</span>"
              ]}
              icon={<Car />}
            />
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center bg-gray-50 rounded-xl p-6 mb-8">
            <div className="mb-4 md:mb-0 md:mr-8">
              <div className="font-bold text-lg mb-2">Select your Location</div>
              <ArrowDown size={24} className="mx-auto" />
              <div className="flex justify-center gap-4 mt-2">
                <a href="/chicago" className="bg-emerald-500 text-white rounded-lg px-6 py-2 font-medium shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all">
                  CHICAGO
                </a>
                <a href="/suburb" className="bg-emerald-500 text-white rounded-lg px-6 py-2 font-medium shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all">
                  SUBURB
                </a>
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-700 mb-2">DSS Page with Price</div>
            </div>
          </div>
          
          <div className="text-center bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Haven't completed yet the Driver's Education? Click Here!</h3>
            <p className="text-red-500 mb-4">Redirected to Teen Programs with DE</p>
            
            <div className="text-lg font-bold mb-2">See all Programs</div>
            <ArrowDown size={24} className="mx-auto mb-2" />
            <a href="/teen-programs" className="text-red-500 font-medium hover:underline">DSS Page For Teen Programs</a>
          </div>
          
          <div className="text-sm text-gray-700 max-w-4xl mx-auto">
            <p className="mb-2">***All packages include the use our modern, comfortable vehicle for your test.</p>
            <p className="mb-2">***A valid Learner's Permit is required to enroll in any of these packages. Need help obtaining yours? <a href="/permit-prep" className="text-emerald-600 hover:underline">Click here!</a></p>
            <p>***Student must submit a proof that they have successfully completed a Driver's Education class</p>
            <p className="text-red-500 text-right mt-2">Redirected to the Permit Prep Page</p>
          </div>
        </div>
      )
    }
  ];
  
  // Defensive Driving Slides
  const defensiveSlides = [
    {
      title: "Defensive Driving Courses",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Defensive Driving Courses</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              NSC-Approved Remedial & Defensive Driving Courses
            </p>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
              At MyDrive Academy, our National Safety Council (NSC)-approved programs—Remedial Driving Course, 
              Defensive Driving Course (DDC), and Alive at 25—are designed to help drivers meet legal requirements, 
              reduce violations, and develop better road awareness. Whether you need to reinstate your license, 
              dismiss a ticket, lower insurance rates, or enhance safe driving skills, we offer the education and 
              training necessary to become a more responsible driver.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <DefensiveProgramCard 
              title="Remedial Course"
              subtitle="License Reinstatement"
              price="100"
              points={[
                "In this 4-hour class, drivers with a suspended license due to traffic violations or court orders.",
                "Improve Your Driving, Reduce Risks, and Meet Legal Requirements."
              ]}
              icon={<Shield />}
            />
            
            <DefensiveProgramCard 
              title="Defensive Driving Course"
              subtitle="Dismiss Tickets, Lower Insurance, Drive Safe"
              price="95"
              points={[
                "In this 4-hour class, the Defensive Driving Course may qualify you for up to 10% discounts on car insurance, as well as workers' compensation discounts for companies with fleet vehicles.",
                "Prevent fines or points, improve driving skills, and qualify for insurance discounts."
              ]}
              icon={<Shield />}
            />
            
            <DefensiveProgramCard 
              title="Alive at 25"
              subtitle="Smart Choices for Young Drivers"
              price="45"
              points={[
                "For drivers aged 15-24 cited for traffic violations or required by courts, schools, or employers.",
                "The Alive at 25 may qualify you for up to 10% discounts on car insurance, as well as workers' compensation discounts for companies with fleet vehicles."
              ]}
              icon={<Shield />}
            />
          </div>
          
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex justify-center space-x-4 mb-4">
              <a 
                href="#select-location" 
                className="bg-emerald-500 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:bg-emerald-600 transition-colors"
              >
                Select Location
              </a>
              <div className="flex items-center text-gray-700">
                <span className="mr-2">→</span>
                <span>Schedule</span>
                <span className="mx-2">→</span>
                <span>Registration</span>
              </div>
            </div>
            
            <div className="text-center mt-8 text-gray-600">
              <p className="mb-2">***Looking for driving with professional instructors? <a href="/adult-programs-best-sellers" className="text-emerald-600 hover:underline">Click here!</a></p>
              <p className="text-red-500">Redirected to Adult Programs Best Sellers</p>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  // Advanced Driving Skills Slides
  const advancedSlides = [
    {
      title: "Advanced Driving Skills",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Advanced Driving Skills</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Advanced Driving Skills at MyDrive Academy! At MyDrive Academy, we go beyond the basics to help you master 
              advanced driving techniques that are essential for safe, confident driving in Illinois. Our expert 
              instructors provide hands-on training in:
            </p>
            <ul className="text-left max-w-md mx-auto mt-4 space-y-2">
              <li className="flex items-center">
                <span className="text-emerald-500 mr-2">•</span>
                <span>Stick Shift Driving</span>
              </li>
              <li className="flex items-center">
                <span className="text-emerald-500 mr-2">•</span>
                <span>Parallel Parking & Highway Driving</span>
              </li>
              <li className="flex items-center">
                <span className="text-emerald-500 mr-2">•</span>
                <span>Winter Driving</span>
              </li>
            </ul>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
              Whether you're looking to refine your skills or prepare for real-world driving challenges, our 
              advanced courses ensure you're equipped for the road ahead.
            </p>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
              Take your driving to the next level—learn to drive smarter, safer, and with total confidence. 
              Sign up today!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <AdvancedSkillsCard 
              title="Stick Shift Lessons"
              subtitle="One-Day Program"
              description={[
                "Drivers who want to learn manual transmission for personal or professional reasons.",
                "Improves vehicle control, saves on maintenance costs, and opens up opportunities to drive a wider range of vehicles.",
                "Available in 2 hours or 4 hours lesson"
              ]}
              icon={<Car />}
            />
            
            <AdvancedSkillsCard 
              title="Parallel Parking & Highway Driving"
              subtitle="2 hours Behind-the-Wheel"
              description={[
                "City drivers, new or nervous drivers, and those needing help with parking or highway travel.",
                "Boosts confidence, reduces stress, and ensures legal parking.",
                "Covers merging, lane discipline, defensive driving, and speed control."
              ]}
              icon={<Car />}
            />
            
            <AdvancedSkillsCard 
              title="Winter Driving"
              subtitle="2 hours Behind-the-Wheel"
              description={[
                "Illinois drivers navigating snow, ice, slippery roads, and freezing conditions.",
                "Improves control on icy surfaces, teaches safe braking and skid recovery, and enhances confidence in harsh weather."
              ]}
              icon={<Car />}
            />
          </div>
          
          <div className="text-center">
            <p className="text-xl mb-2">DSS Page Price for 2hrs and 4 hrs</p>
            <p className="text-gray-700 mb-4">***Enrolling to these programs must already have a Driver's License. <a href="/adult-programs-best-sellers" className="text-emerald-600 hover:underline">Click here if you need one!</a></p>
            <p className="text-red-500">Redirected to Adult Programs Best Sellers</p>
          </div>
        </div>
      )
    }
  ];
  
  // Class C Programs Slides
  const classCSlides = [
    {
      title: "Class C Programs",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Class C Programs</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Kickstart your career with MyDrive Academy's specialized Class C programs! In Illinois, a Class C license 
              is required for drivers who operate vehicles that transport 15 passengers (including the driver) with a gross 
              vehicle weight rating (GVWR) of less than 26,001 pounds. This license is essential for a wide range of passenger 
              or transport roles, including taxicabs, shuttle buses, and noncommercial vehicles. This expands your opportunities 
              to drive commercial vehicles for large enterprises like:
            </p>
            
            <div className="flex justify-center items-center space-x-8 mt-8">
              <img src="/api/placeholder/120/60" alt="Amazon Logistics" />
              <img src="/api/placeholder/80/60" alt="UPS" />
              <img src="/api/placeholder/80/60" alt="Postmates" />
              <img src="/api/placeholder/120/60" alt="DoorDash" />
              <img src="/api/placeholder/80/60" alt="Uber" />
              <img src="/api/placeholder/120/60" alt="FedEx" />
            </div>
            
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-8">
              Additionally, If you plan to transport passengers for hire, you will need to obtain a Passenger Endorsement. 
              This endorsement requires an additional exam and ensures that you meet all necessary safety and regulatory 
              standards for passenger transport.
            </p>
            
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
              Our expert instructors are dedicated to providing the training and support you need to pass your exams and 
              hit the road as a confident, professional driver. With hands-on training and comprehensive instruction, we 
              ensure you're fully prepared to meet Illinois state requirements and succeed in your new career.
            </p>
            
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
              Discover the Gateway to Exciting Careers! License C type training can open the door to great employment 
              opportunities! Start your journey to obtaining a Class C License today at MyDrive Academy!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <ClassCProgramCard 
              title="Written Exam Prep for License C"
              subtitle=""
              price="130"
              points={[
                "A comprehensive preparation for the Illinois Class C CDL written exams",
                "Provides thorough understanding of CDL regulations, and a solid foundation for safe commercial driving."
              ]}
              icon={<BookOpen />}
            />
            
            <ClassCProgramCard 
              title="2 Hr Behind the Wheel + Road Test"
              subtitle=""
              price="410"
              bestSeller={true}
              points={[
                "Ideal for drivers with some experience who need a quick refresher before the test.",
                "2 hours of behind-the-wheel training with an instructor.",
                "Hands-on practice, expert guidance on road test maneuvers, and increased confidence in passing the skills assessment."
              ]}
              icon={<Car />}
            />
            
            <ClassCProgramCard 
              title="1 Hr Behind the Wheel + Written Exam Prep + Road Test"
              subtitle=""
              price="460"
              bestSeller={true}
              points={[
                "Ideal for those seeking a fast, comprehensive Class C CDL prep",
                "1-hour personalized driving session with an instructor.",
                "Efficiently covers both written and practical aspects of the CDL and provides a well-rounded learning experience."
              ]}
              icon={<Car />}
            />
          </div>
          
          <div className="text-center mb-8">
            <div className="max-w-md mx-auto mb-4">
              <p className="font-bold mb-2">Select your Location</p>
              <div className="flex justify-center space-x-4">
                <a href="/chicago" className="bg-emerald-500 text-white py-2 px-6 rounded-lg hover:bg-emerald-600 transition-colors">CHICAGO</a>
                <a href="/suburb" className="bg-emerald-500 text-white py-2 px-6 rounded-lg hover:bg-emerald-600 transition-colors">SUBURB</a>
              </div>
            </div>
            <p className="text-xl font-semibold mb-4">DSS Page with Price</p>
            <p className="text-sm text-gray-700 max-w-4xl mx-auto mt-6">
              ***Use our vehicles for your road test at the Secretary of State facility
            </p>
            <p className="text-sm text-gray-700 max-w-4xl mx-auto mt-2">
              ***Student enrolling in any of these packages MUST possess a valid, non-CDL Illinois driver's license. Need one?
              <span className="text-red-500 ml-2">Redirected to Adult Programs Best Sellers</span>
            </p>
          </div>
        </div>
      )
    }
  ];
  
  // Chauffeur Training Programs Slides
  const chauffeurSlides = [
    {
      title: "Chauffeur Training Programs",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Chauffeur Training Programs</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Chauffeur Training at MyDrive Academy! At MyDrive Academy, we equip you with the knowledge and skills to 
              take charge of your career in the chauffeur industry. Whether you're pursuing a career as a limousine 
              chauffeur or taxicab driver, our programs cover everything you need—from rules and regulations to customer 
              service and city navigation.
            </p>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
              Our courses are approved by the BACP (Business Affairs and Consumer Protection) of the City of Chicago, 
              ensuring you receive the most up-to-date and relevant training.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <ChauffeurProgramCard 
              title="Become a Licensed Livery (Restricted) Chauffeur"
              subtitle="One-Day Program"
              price="120"
              points={[
                "For professional drivers in luxury transport services",
                "This license allows the licensee to drive limousines and Uber Black",
                "Covers customer service, safe driving techniques, navigation skills, and professional etiquette, providing you with the expertise to excel in private car, limo, and executive transportation services."
              ]}
              icon={<Car />}
            />
            
            <ChauffeurProgramCard 
              title="Become a Licensed Taxi Chauffeur"
              subtitle="Four-Day Program"
              price="250"
              points={[
                "This license allows the licensee to drive taxicabs, limousines, and Uber Black",
                "For Professional Taxi and Rideshare Drivers Our Licensed Taxi Chauffeur Training focuses on city navigation, passenger safety, traffic laws, and efficient route planning to ensure you deliver reliable, professional service.",
                "This course prepares you for a successful career in taxi or rideshare driving, meeting all regulatory requirements while equipping you with the skills to navigate busy city streets with confidence."
              ]}
              icon={<Car />}
            />
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-700 mb-4">***Looking for driving with professional instructors? <a href="/adult-programs-best-sellers" className="text-emerald-600 hover:underline">Click here!</a></p>
            <p className="text-red-500">Redirected to Adult Programs Best Sellers</p>
          </div>
        </div>
      )
    }
  ];
  
  // Instructor Training Program Slide
  const instructorProgramContent = (
    <div className="max-w-6xl mx-auto px-4 animate-fadeIn py-12">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Instructor Training Program</h1>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
          Become a certified driving instructor in Illinois and share your passion for safe driving!
        </p>
        <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
          At My Drive Academy, our comprehensive Instructor Program equips you with the knowledge and skills 
          to educate and empower new drivers.
        </p>
        <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
          Join us in shaping the next generation of responsible motorists and build a rewarding career.
        </p>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg max-w-lg w-full">
          <div className="p-6 bg-gray-900 text-white text-center relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
            <div className="flex justify-center mb-3">
              <GraduationCap size={48} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Instructor Certification Program</h2>
            <p className="text-emerald-400 font-semibold">Comprehensive Training & Certification</p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <p className="flex items-start mb-3">
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-800">Learn effective teaching methodologies for new drivers</span>
              </p>
              <p className="flex items-start mb-3">
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-800">Master advanced driving techniques to demonstrate to students</span>
              </p>
              <p className="flex items-start mb-3">
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-800">Understand Illinois traffic laws and regulations in depth</span>
              </p>
              <p className="flex items-start mb-3">
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-800">Gain practical experience with supervised teaching sessions</span>
              </p>
            </div>
            <a 
              href="#register-now" 
              className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextTeenSlide = () => {
    setCurrentTeenSlide((prev) => (prev === teenSlides.length - 1 ? 0 : prev + 1));
  };

  const prevTeenSlide = () => {
    setCurrentTeenSlide((prev) => (prev === 0 ? teenSlides.length - 1 : prev - 1));
  };
  
  const nextDefensiveSlide = () => {
    setCurrentDefensiveSlide((prev) => (prev === defensiveSlides.length - 1 ? 0 : prev + 1));
  };

  const prevDefensiveSlide = () => {
    setCurrentDefensiveSlide((prev) => (prev === 0 ? defensiveSlides.length - 1 : prev - 1));
  };
  
  const nextAdvancedSlide = () => {
    setCurrentAdvancedSlide((prev) => (prev === advancedSlides.length - 1 ? 0 : prev + 1));
  };

  const prevAdvancedSlide = () => {
    setCurrentAdvancedSlide((prev) => (prev === 0 ? advancedSlides.length - 1 : prev - 1));
  };
  
  const nextClassCSlide = () => {
    setCurrentClassCSlide((prev) => (prev === classCSlides.length - 1 ? 0 : prev + 1));
  };

  const prevClassCSlide = () => {
    setCurrentClassCSlide((prev) => (prev === 0 ? classCSlides.length - 1 : prev - 1));
  };
  
  const nextChauffeurSlide = () => {
    setCurrentChauffeurSlide((prev) => (prev === chauffeurSlides.length - 1 ? 0 : prev + 1));
  };

  const prevChauffeurSlide = () => {
    setCurrentChauffeurSlide((prev) => (prev === 0 ? chauffeurSlides.length - 1 : prev - 1));
  };

  const AdultProgramsContent = () => (
    <div className="py-12 px-4 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-50 rounded-full opacity-30"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-50 rounded-full opacity-30"></div>
      
      {/* Navigation buttons */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={prevSlide}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
      </div>
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {slides[currentSlide].content}
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={nextSlide}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
      </div>
      
      {/* Slide indicators */}
      <div className="flex justify-center mt-8 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 focus:outline-none ${
              index === currentSlide ? 'bg-emerald-500 w-8' : 'bg-gray-300 w-3 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );

  const PermitPrepContent = () => (
    <div className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-black mb-10">Permit Prep</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Expert Driver Package */}
          <PermitPrepCard 
            title="Expert Driver Package"
            subtitle="Permit Prep + 2 Hours Behind-the-Wheel + Road Test"
            points={[
              "Designed for individuals who are non-U.S. citizens, non-permanent residents, and do not have a Social Security Number.",
              "This package includes permit exam preparation, state-mandated behind-the-wheel instruction, and a streamlined path to obtaining a valid Illinois driver's license.",
              "Available in English or Spanish"
            ]}
            buttonText="Select your Location"
            icon={<BookOpen />}
          />

          {/* Permit Preparation */}
          <PermitPrepCard 
            title="Permit Preparation"
            quote="Pass your written test with ease—prepare, practice, succeed."
            points={[
              "Designed to help you master the rules of the road and pass your permit exam with confidence.",
              "Expert guidance on Illinois traffic laws and road signs",
              "Flexible Learning Options: In-person, or Online",
              "Available in English or Spanish"
            ]}
            buttonText="Select your Location"
            icon={<BookOpen />}
          />

          {/* Adult Driver's Education */}
          <PermitPrepCard 
            title="Adult Driver's Education"
            quote="Your road to a license starts here—learn the rules, drive with confidence."
            points={[
              "For adults (18-20) required to complete Driver's Education before getting a license.",
              "This course covers Illinois traffic laws, safe driving techniques, and road sign recognition to prepare you for responsible driving.",
              "Flexible learning: In-person or Online",
              "Available in English or Spanish"
            ]}
            buttonText="Select your Location"
            icon={<BookOpen />}
          />
        </div>

        <div className="flex justify-between items-start mt-14">
          <div className="text-sm text-gray-700 max-w-3xl">
            <p className="mb-2">***All packages include the use our modern, comfortable vehicle for your test.</p>
            <p>***For Road Test, students must meet the instructor at the designated DMV location.</p>
          </div>
          
          <div className="text-right">
            <p className="text-xl font-bold mb-2">See All Programs</p>
            <div className="flex justify-end">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="mb-2">
                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="black"/>
              </svg>
            </div>
            <a href="/adult-programs" className="text-gray-800 text-lg font-medium hover:underline">Adult Programs</a>
          </div>
        </div>
      </div>
    </div>
  );

  const TeenProgramsContent = () => (
    <div className="py-12 px-4 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-50 rounded-full opacity-30"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-50 rounded-full opacity-30"></div>
      
      {/* Navigation buttons */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={prevTeenSlide}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
      </div>
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {teenSlides[currentTeenSlide].content}
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={nextTeenSlide}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
      </div>
      
      {/* Slide indicators */}
      <div className="flex justify-center mt-8 space-x-3">
        {teenSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTeenSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 focus:outline-none ${
              index === currentTeenSlide ? 'bg-emerald-500 w-8' : 'bg-gray-300 w-3 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
  
  const DefensiveDrivingContent = () => (
    <div className="py-12 px-4 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-50 rounded-full opacity-30"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-50 rounded-full opacity-30"></div>
      
      {/* Navigation buttons */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={prevDefensiveSlide}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
      </div>
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {defensiveSlides[currentDefensiveSlide].content}
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={nextDefensiveSlide}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
      </div>
      
      {/* Slide indicators */}
      <div className="flex justify-center mt-8 space-x-3">
        {defensiveSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentDefensiveSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 focus:outline-none ${
              index === currentDefensiveSlide ? 'bg-emerald-500 w-8' : 'bg-gray-300 w-3 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
  
  const AdvancedDrivingContent = () => (
    <div className="py-12 px-4 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-50 rounded-full opacity-30"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-50 rounded-full opacity-30"></div>
      
      {/* Navigation buttons */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={prevAdvancedSlide}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
      </div>
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {advancedSlides[currentAdvancedSlide].content}
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={nextAdvancedSlide}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
      </div>
      
      {/* Slide indicators */}
      <div className="flex justify-center mt-8 space-x-3">
        {advancedSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentAdvancedSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 focus:outline-none ${
              index === currentAdvancedSlide ? 'bg-emerald-500 w-8' : 'bg-gray-300 w-3 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
  
  const ClassCProgramsContent = () => (
    <div className="py-12 px-4 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-50 rounded-full opacity-30"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-50 rounded-full opacity-30"></div>
      
      {/* Navigation buttons */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={prevClassCSlide}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
      </div>
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {classCSlides[currentClassCSlide].content}
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={nextClassCSlide}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
      </div>
      
      {/* Slide indicators */}
      <div className="flex justify-center mt-8 space-x-3">
        {classCSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentClassCSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 focus:outline-none ${
              index === currentClassCSlide ? 'bg-emerald-500 w-8' : 'bg-gray-300 w-3 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
  
  const ChauffeurProgramsContent = () => (
    <div className="py-12 px-4 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-50 rounded-full opacity-30"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-50 rounded-full opacity-30"></div>
      
      {/* Navigation buttons */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={prevChauffeurSlide}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
      </div>
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {chauffeurSlides[currentChauffeurSlide].content}
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={nextChauffeurSlide}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
      </div>
      
      {/* Slide indicators */}
      <div className="flex justify-center mt-8 space-x-3">
        {chauffeurSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentChauffeurSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 focus:outline-none ${
              index === currentChauffeurSlide ? 'bg-emerald-500 w-8' : 'bg-gray-300 w-3 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-start">
            <button
              onClick={() => setActiveTab('adult-programs')}
              className={`py-4 px-3 md:px-4 font-medium text-sm md:text-lg border-b-2 transition-colors flex items-center ${
                activeTab === 'adult-programs' 
                  ? 'border-emerald-500 text-emerald-400' 
                  : 'border-transparent hover:text-emerald-400'
              }`}
            >
              <Car size={18} className="mr-1 hidden md:inline" />
              Adult Programs
            </button>
            <button
              onClick={() => setActiveTab('permit-prep')}
              className={`py-4 px-3 md:px-4 font-medium text-sm md:text-lg border-b-2 transition-colors flex items-center ${
                activeTab === 'permit-prep' 
                  ? 'border-emerald-500 text-emerald-400' 
                  : 'border-transparent hover:text-emerald-400'
              }`}
            >
              <BookOpen size={18} className="mr-1 hidden md:inline" />
              Permit Prep
            </button>
            <button
              onClick={() => setActiveTab('teen-programs')}
              className={`py-4 px-3 md:px-4 font-medium text-sm md:text-lg border-b-2 transition-colors flex items-center ${
                activeTab === 'teen-programs' 
                  ? 'border-emerald-500 text-emerald-400' 
                  : 'border-transparent hover:text-emerald-400'
              }`}
            >
              <UserPlus size={18} className="mr-1 hidden md:inline" />
              Teen Programs
            </button>
            <button
              onClick={() => setActiveTab('defensive-courses')}
              className={`py-4 px-3 md:px-4 font-medium text-sm md:text-lg border-b-2 transition-colors flex items-center ${
                activeTab === 'defensive-courses' 
                  ? 'border-emerald-500 text-emerald-400' 
                  : 'border-transparent hover:text-emerald-400'
              }`}
            >
              <Shield size={18} className="mr-1 hidden md:inline" />
              Defensive Courses
            </button>
            <button
              onClick={() => setActiveTab('chauffeur-programs')}
              className={`py-4 px-3 md:px-4 font-medium text-sm md:text-lg border-b-2 transition-colors flex items-center ${
                activeTab === 'chauffeur-programs' 
                  ? 'border-emerald-500 text-emerald-400' 
                  : 'border-transparent hover:text-emerald-400'
              }`}
            >
              <Users size={18} className="mr-1 hidden md:inline" />
              Chauffeur Programs
            </button>
            <button
              onClick={() => setActiveTab('class-c-programs')}
              className={`py-4 px-3 md:px-4 font-medium text-sm md:text-lg border-b-2 transition-colors flex items-center ${
                activeTab === 'class-c-programs' 
                  ? 'border-emerald-500 text-emerald-400' 
                  : 'border-transparent hover:text-emerald-400'
              }`}
            >
              <Truck size={18} className="mr-1 hidden md:inline" />
              Class C Programs
            </button>
            <button
              onClick={() => setActiveTab('advanced-programs')}
              className={`py-4 px-3 md:px-4 font-medium text-sm md:text-lg border-b-2 transition-colors flex items-center ${
                activeTab === 'advanced-programs' 
                  ? 'border-emerald-500 text-emerald-400' 
                  : 'border-transparent hover:text-emerald-400'
              }`}
            >
              <Award size={18} className="mr-1 hidden md:inline" />
              Advanced Programs
            </button>
            <button
              onClick={() => setActiveTab('instructor-program')}
              className={`py-4 px-3 md:px-4 font-medium text-sm md:text-lg border-b-2 transition-colors flex items-center ${
                activeTab === 'instructor-program' 
                  ? 'border-emerald-500 text-emerald-400' 
                  : 'border-transparent hover:text-emerald-400'
              }`}
            >
              <GraduationCap size={18} className="mr-1 hidden md:inline" />
              Instructor Program
            </button>
          </div>
        </div>
      </nav>

      {/* Content based on active tab */}
      {activeTab === 'adult-programs' 
        ? <AdultProgramsContent /> 
        : activeTab === 'permit-prep'
        ? <PermitPrepContent />
        : activeTab === 'teen-programs'
        ? <TeenProgramsContent />
        : activeTab === 'defensive-courses'
        ? <DefensiveDrivingContent />
        : activeTab === 'chauffeur-programs'
        ? <ChauffeurProgramsContent />
        : activeTab === 'class-c-programs'
        ? <ClassCProgramsContent />
        : activeTab === 'advanced-programs'
        ? <AdvancedDrivingContent />
        : <div>{instructorProgramContent}</div>
      }
    </div>
  );
};

export default DrivingAcademy;
