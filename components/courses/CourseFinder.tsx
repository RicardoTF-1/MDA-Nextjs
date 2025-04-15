'use client'

import { useState, useEffect, useRef } from 'react'
import { fetchCourseFinderQuestions, getRecommendedCourse } from '../../lib/api'
import Link from 'next/link'
import { motion } from 'framer-motion'

const CourseFinderStep = ({ 
  question, 
  selectedOption, 
  onSelectOption, 
  onNext, 
  onBack, 
  isLastStep,
  currentStep,
  totalSteps
}) => {
  const [localSelection, setLocalSelection] = useState(selectedOption)
  const [locationValue, setLocationValue] = useState('')
  
  useEffect(() => {
    // Reset local selection when question changes
    setLocalSelection(selectedOption)
  }, [question, selectedOption])
  
  const handleOptionSelect = (optionId) => {
    setLocalSelection(optionId)
    onSelectOption(question.id, optionId)
  }
  
  const handleLocationSelect = (e) => {
    setLocationValue(e.target.value)
    // For location dropdown, we pass the selected option value directly
    const selectedOption = question.options.find(opt => opt.option_text === e.target.value)
    if (selectedOption) {
      handleOptionSelect(selectedOption.id)
    }
  }
  
  const renderQuestionContent = () => {
    if (question.question_type === 'location') {
      // For location question, show a dropdown
      return (
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <select 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300 text-emerald-600"
            value={locationValue}
            onChange={handleLocationSelect}
          >
            <option value="" disabled>Select a location</option>
            {question.options.map(option => (
              <option key={option.id} value={option.option_text}>
                {option.option_text}
              </option>
            ))}
          </select>
        </motion.div>
      )
    } else {
      // For other questions, show radio buttons
      return (
        <motion.div 
          className="mt-6 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {question.options.map((option, index) => (
            <motion.div 
              key={option.id} 
              className="flex items-center"
              onClick={() => handleOptionSelect(option.id)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
            >
              <div 
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  localSelection === option.id 
                    ? 'border-emerald-500 bg-emerald-500' 
                    : 'border-gray-300'
                }`}
              >
                {localSelection === option.id && (
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                )}
              </div>
              <label 
                className="ml-3 text-gray-800 cursor-pointer"
              >
                {option.option_text}
              </label>
            </motion.div>
          ))}
        </motion.div>
      )
    }
  }
  
  return (
    <div className="p-8">
      {/* Progress indicator - enhanced to match design */}
      <motion.div 
        className="mb-8 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Progress bar background */}
        <div className="h-2 bg-gray-200 rounded-full">
          {/* Active progress */}
          <motion.div 
            className="h-2 bg-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          ></motion.div>
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-between absolute top-0 w-full transform -translate-y-1/2">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber <= currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <motion.div 
                key={index} 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}
                  ${isCurrent ? 'ring-4 ring-green-100' : ''}
                `}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              >
                {stepNumber}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      
      <motion.h3 
        className="text-xl font-semibold mb-4 text-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {question.question_text}
      </motion.h3>
      
      {renderQuestionContent()}
      
      <motion.div 
        className="mt-10 flex justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {currentStep > 1 ? (
          <motion.button
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back
          </motion.button>
        ) : (
          <div></div> // Empty div to maintain layout with flex justify-between
        )}
        
        <motion.button
          onClick={onNext}
          disabled={!localSelection}
          className={`
            px-8 py-2 rounded-md text-white font-medium flex items-center
            ${localSelection 
              ? 'bg-emerald-500 hover:bg-emerald-600' 
              : 'bg-gray-300 cursor-not-allowed'}
          `}
          whileHover={localSelection ? { scale: 1.05 } : {}}
          whileTap={localSelection ? { scale: 0.95 } : {}}
        >
          {isLastStep ? 'Find My Course' : 'Next'}
          {!isLastStep && (
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </motion.button>
      </motion.div>
    </div>
  )
}

const CourseResult = ({ recommendation, onStartOver }) => {
  const course = recommendation.course_details
  
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-2 text-gray-900">Your Recommended Course</h3>
        <p className="text-gray-600 mb-8">Based on your selections</p>
      </motion.div>
      
      <motion.div 
        className="bg-green-50 p-6 rounded-lg mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h4 className="text-2xl font-bold text-green-600 mb-2">{course.title}</h4>
        <p className="text-gray-800 text-lg mb-4">{recommendation.description || course.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h5 className="text-gray-600 font-medium">Price</h5>
            <p className="text-2xl font-bold text-gray-900">${course.price}</p>
          </div>
          <div>
            <h5 className="text-gray-600 font-medium">Duration</h5>
            <p className="text-2xl font-bold text-gray-900">{course.duration}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <h5 className="text-gray-700 font-medium mb-2">Includes:</h5>
          <ul className="space-y-2">
            {course.bullet_point_list && course.bullet_point_list.map((item, index) => (
              <motion.li 
                key={index} 
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
              >
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-800">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
      
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link 
            href={`/courses/${course.slug}/register`}
            className="block w-full py-3 bg-emerald-500 text-white text-center font-semibold rounded-md hover:bg-emerald-600 transition"
          >
            Register for This Course
          </Link>
        </motion.div>
        
        <motion.button
          onClick={onStartOver}
          className="block w-full py-3 border border-gray-300 text-center rounded-md hover:bg-gray-50 transition"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Start Over
        </motion.button>
      </motion.div>
    </div>
  )
}

export default function CourseFinder() {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [recommendation, setRecommendation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  
  // Intersection Observer for scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Activate animation when section is at least 10% visible
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          // Reset state when out of view to repeat animation on next scroll
          setIsVisible(false)
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% visibility
      }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true)
        const data = await fetchCourseFinderQuestions()
        setQuestions(data)
      } catch (err) {
        console.error('Error loading course finder questions:', err)
        setError('Could not load course finder questions')
        
        // Set fallback questions for development
        // setQuestions([
        //   {
        //     id: 1,
        //     question_type: 'age_group',
        //     question_text: 'What is your age group?',
        //     options: [
        //       { id: 1, option_text: 'Teen (15-18)' },
        //       { id: 2, option_text: 'Adult (19+)' },
        //       { id: 3, option_text: 'International Driver' }
        //     ]
        //   },
        //   {
        //     id: 2,
        //     question_type: 'location',
        //     question_text: 'Which location is most convenient for you?',
        //     options: [
        //       { id: 4, option_text: 'Naperville' },
        //       { id: 5, option_text: 'Chicago' },
        //       { id: 6, option_text: 'Oak Park' }
        //     ]
        //   },
        //   {
        //     id: 3,
        //     question_type: 'experience',
        //     question_text: 'What is your driving experience level?',
        //     options: [
        //       { id: 7, option_text: 'No experience (never driven)' },
        //       { id: 8, option_text: 'Some experience (driven occasionally)' },
        //       { id: 9, option_text: 'Experienced (need specific training)' }
        //     ]
        //   }
        // ])
      } finally {
        setLoading(false)
      }
    }
    
    loadQuestions()
  }, [])
  
  const handleSelectOption = (questionId, optionId) => {
    const questionData = questions[currentQuestionIndex]
    
    // Map the question type to the answer key
    const answerKey = questionData.question_type
    
    setAnswers(prev => ({
      ...prev,
      [answerKey]: optionId
    }))
  }
  
  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // Final step - get recommendation
      try {
        setLoading(true)
        const result = await getRecommendedCourse(answers)
        setRecommendation(result)
        setShowResults(true)
      } catch (err) {
        console.error('Error getting course recommendation:', err)
        setError('Could not get course recommendation')
        
        // Fallback recommendation for development
         setRecommendation({
           name: 'Adult Beginner Course',
           description: 'Perfect for adults who are learning to drive for the first time.',
           course_details: {
             title: 'Adult Beginner Course',
             slug: 'adult-beginner',
             description: '20 hours of classroom instruction\n8 hours of behind-the-wheel training\nFlexible scheduling\nLicense test preparation',
             bullet_point_list: [
               '20 hours of classroom instruction',
               '8 hours of behind-the-wheel training',
               'Flexible scheduling',
               'License test preparation'
             ],
             price: 349,
             duration: '4 weeks'
           }
        })
        setShowResults(true)
      } finally {
        setLoading(false)
      }
    }
  }
  
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }
  
  const handleStartOver = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setRecommendation(null)
    setShowResults(false)
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }
  
  if (loading && questions.length === 0) {
    return (
      <div className="bg-gray-50 py-16" ref={sectionRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
            <div className="p-8 flex justify-center items-center">
              <motion.div 
                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (error && questions.length === 0) {
    return (
      <div className="bg-gray-50 py-16" ref={sectionRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <motion.div 
              className="text-center text-red-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.div>
          </div>
        </div>
      </div>
    )
  }
  
  if (questions.length === 0) {
    return (
      <div className="bg-gray-50 py-16" ref={sectionRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <motion.div 
              className="text-center text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              No course finder questions available.
            </motion.div>
          </div>
        </div>
      </div>
    )
  }
  
  const currentQuestion = questions[currentQuestionIndex]
  const currentQuestionType = currentQuestion?.question_type
  const selectedOption = answers[currentQuestionType]
  
  return (
    <div className="bg-gray-50 py-16" ref={sectionRef}>
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.div 
          className="text-center mb-8"
          variants={containerVariants}
        >
          <motion.span 
            className="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 text-sm font-medium rounded-full mb-4"
            variants={itemVariants}
          >
            Find Your Path
          </motion.span>
          <motion.h2 
            className="text-3xl text-gray-700 md:text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            Find the Perfect Course for You
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Answer a few quick questions and we'll recommend the best driving program for your needs.
          </motion.p>
        </motion.div>
        
        {/* Modified layout for the final screen with the recommendation on the right */}
        {showResults ? (
          <motion.div 
            className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
          >
            {/* The questionnaire history on the left */}
            <motion.div 
              className="lg:w-1/2 bg-white rounded-lg shadow-lg overflow-hidden"
              variants={itemVariants}
            >
              <div className="p-8">
                <h3 className="text-xl text-gray-700 font-semibold mb-6">Your Selections</h3>
                
                <div className="space-y-6">
                  {questions.map((question, index) => {
                    const answerKey = question.question_type;
                    const selectedOptionId = answers[answerKey];
                    const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
                    
                    return (
                      <motion.div 
                        key={question.id} 
                        className="border-b border-gray-200 pb-4 last:border-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <p className="text-gray-500 text-sm mb-1">Question {index + 1}</p>
                        <h4 className="font-medium mb-2 text-gray-900">{question.question_text}</h4>
                        {selectedOption ? (
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-emerald-500 mr-2"></div>
                            <p className='text-gray-700'>{selectedOption.option_text}</p>
                          </div>
                        ) : (
                          <p className="text-gray-400 italic">No selection</p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                
                <motion.button
                  onClick={handleStartOver}
                  className="mt-6 w-full py-3 border border-gray-300 text-center text-gray-700 rounded-md hover:bg-gray-50 transition"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Start Over
                </motion.button>
              </div>
            </motion.div>
            
            {/* The recommendation on the right */}
            <motion.div 
              className="lg:w-1/2 bg-white rounded-lg shadow-lg overflow-hidden text-gray-700"
              variants={itemVariants}
            >
              <CourseResult 
                recommendation={recommendation} 
                onStartOver={handleStartOver}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
            variants={itemVariants}
          >
            <CourseFinderStep
              question={currentQuestion}
              selectedOption={selectedOption}
              onSelectOption={handleSelectOption}
              onNext={handleNext}
              onBack={handleBack}
              isLastStep={currentQuestionIndex === questions.length - 1}
              currentStep={currentQuestionIndex + 1}
              totalSteps={questions.length}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}