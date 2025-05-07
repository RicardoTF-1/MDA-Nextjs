"use client";

import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Car } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';
import ClassCProgramCard from '../cards/ClassCProgramCard';
import SlideNavigation from '../common/SlideNavigation';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.1 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, when: "afterChildren" }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
};

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.15 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.3 }
  }
};

const ClassCProgramSlides: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [observerInitialized, setObserverInitialized] = useState(false);

  const nextSlide = () => setCurrentSlide(prev => (prev === classCSlides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? classCSlides.length - 1 : prev - 1));
  const goToSlide = (index: number) => setCurrentSlide(index);

  useEffect(() => {
    controls.set("hidden");
    setObserverInitialized(true);
  }, [controls]);

  useEffect(() => {
    if (!observerInitialized) return;

    const refCopy = containerRef.current;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        requestAnimationFrame(() => controls.start("visible"));
      } else {
        setIsVisible(false);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

    if (refCopy) observer.observe(refCopy);

    return () => {
      if (refCopy) observer.unobserve(refCopy);
    };
  }, [controls, observerInitialized]);

  useEffect(() => {
    if (isVisible && observerInitialized) {
      requestAnimationFrame(() => controls.start("visible"));
    }
  }, [currentSlide, controls, isVisible, observerInitialized]);

  const classCSlides = [
    {
      title: "Class C Programs",
      content: (
        <motion.div 
          className="max-w-6xl mx-auto px-4 py-12 h-[600px]"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.h1 className="text-4xl font-bold text-gray-900 mb-6" variants={itemVariants}>
              Class C Programs
            </motion.h1>
            <motion.p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed" variants={itemVariants}>
              Kickstart your career with MyDrive Academy&#39;s specialized Class C programs! In Illinois, a Class C license 
              is required for drivers who operate vehicles that transport 15 passengers (including the driver) with a gross 
              vehicle weight rating (GVWR) of less than 26,001 pounds. This license is essential for a wide range of passenger 
              or transport roles, including taxicabs, shuttle buses, and noncommercial vehicles.
            </motion.p>

            <motion.p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-6" variants={itemVariants}>
              This expands your opportunities to drive commercial vehicles for large enterprises like:
            </motion.p>

            <motion.div className="flex justify-center items-center space-x-8 mt-8 mb-8" variants={containerVariants}>
              {["Amazon", "UPS", "Postmates", "DoorDash", "Uber", "FedEx"].map((alt, i) => (
                <motion.img key={i} src={`/api/placeholder/${i % 2 === 0 ? 120 : 80}/60`} alt={alt} variants={logoVariants} />
              ))}
            </motion.div>

            <motion.p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-8" variants={itemVariants}>
              Additionally, If you plan to transport passengers for hire, you will need to obtain a Passenger Endorsement. 
              This endorsement requires an additional exam and ensures that you meet all necessary safety and regulatory 
              standards for passenger transport.
            </motion.p>

            <motion.p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-6" variants={itemVariants}>
              Our expert instructors are dedicated to providing the training and support you need to pass your exams and 
              hit the road as a confident, professional driver. With hands-on training and comprehensive instruction, we 
              ensure you&#39;re fully prepared to meet Illinois state requirements and succeed in your new career.
            </motion.p>

            <motion.p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-6" variants={itemVariants}>
              Discover the Gateway to Exciting Careers! License C type training can open the door to great employment 
              opportunities! Start your journey to obtaining a Class C License today at MyDrive Academy!
            </motion.p>
          </motion.div>
        </motion.div>
      )
    },
    {
      title: "Class C Program Packages",
      content: (
        <motion.div 
          className="max-w-6xl mx-auto px-4 py-12 h-[600px]"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-8 text-center"
            variants={itemVariants}
          >
            Class C Program Packages
          </motion.h1>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" variants={cardsContainerVariants}>
            <motion.div variants={cardVariants}>
              <ClassCProgramCard 
                title="Written Exam Prep for License C"
                subtitle=""
                price={130}
                points={[
                  "A comprehensive preparation for the Illinois Class C CDL written exams",
                  "Provides thorough understanding of CDL regulations, and a solid foundation for safe commercial driving."
                ]}
                icon={<BookOpen />}
              />
            </motion.div>

            <motion.div variants={cardVariants}>
              <ClassCProgramCard 
                title="2 Hr Behind the Wheel + Road Test"
                subtitle=""
                price={410}
                bestSeller={true}
                points={[
                  "Ideal for drivers with some experience who need a quick refresher before the test.",
                  "2 hours of behind-the-wheel training with an instructor.",
                  "Hands-on practice, expert guidance on road test maneuvers, and increased confidence in passing the skills assessment."
                ]}
                icon={<Car />}
              />
            </motion.div>

            <motion.div variants={cardVariants}>
              <ClassCProgramCard 
                title="1 Hr Behind the Wheel + Written Exam Prep + Road Test"
                subtitle=""
                price={460}
                bestSeller={true}
                points={[
                  "Ideal for those seeking a fast, comprehensive Class C CDL prep",
                  "1-hour personalized driving session with an instructor.",
                  "Efficiently covers both written and practical aspects of the CDL and provides a well-rounded learning experience."
                ]}
                icon={<Car />}
              />
            </motion.div>
          </motion.div>

          <motion.div className="text-center" variants={itemVariants}>
            <motion.p className="text-sm text-gray-700 max-w-4xl mx-auto" variants={itemVariants}>
              ***Use our vehicles for your road test at the Secretary of State facility
            </motion.p>
            <motion.p className="text-sm text-gray-700 max-w-4xl mx-auto mt-2" variants={itemVariants}>
              ***Student enrolling in any of these packages MUST possess a valid, non-CDL Illinois driver&#39;s license.
            </motion.p>
          </motion.div>
        </motion.div>
      )
    }
  ];

  return (
    <div 
      className="py-12 px-4 bg-white relative overflow-hidden h-[680px]"
      ref={containerRef}
    >
      <motion.div 
        className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-50 rounded-full opacity-30"
        animate={isVisible ? { scale: [0.8, 1], opacity: [0, 0.3] } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div 
        className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-50 rounded-full opacity-30"
        animate={isVisible ? { scale: [0.8, 1], opacity: [0, 0.3] } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={classCSlides.length}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />

      <div className="transition-all duration-500 ease-in-out">
        {classCSlides[currentSlide].content}
      </div>
    </div>
  );
};

export default ClassCProgramSlides;

