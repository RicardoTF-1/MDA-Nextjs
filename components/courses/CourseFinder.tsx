'use client'

import { useState, useEffect, useRef } from 'react'
import { fetchCourseFinderQuestions, getRecommendedCourse } from '../../lib/api'
import { motion } from 'framer-motion'

// Define interfaces for the component's state
interface Question {
  id: number;
  question_text: string;
  question_type: string;
  options: Option[];
}

interface Option {
  id: number;
  option_text: string;
}

interface Recommendation {
  course_details?: {
    title: string;
  };
  description: string;
}

export default function CourseFinder() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const currentRef = sectionRef.current
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, { threshold: 0.1 })

    if (currentRef) observer.observe(currentRef)
    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true)
        const data = await fetchCourseFinderQuestions()
        setQuestions(data)
      } catch (err) {
        console.error(err)
        setError('Could not load course finder questions')
      } finally {
        setLoading(false)
      }
    }
    loadQuestions()
  }, [])

  const handleSelect = (optionId: number) => {
    const questionType = questions[currentQuestionIndex].question_type
    setAnswers(prev => ({ ...prev, [questionType]: optionId }))
  }

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1)
    } else {
      try {
        const data = await getRecommendedCourse(answers)
        setRecommendation(data)
      } catch (err) {
        console.error(err)
        setError('Could not fetch recommendation.')
      }
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  const selectedOption = currentQuestion ? answers[currentQuestion.question_type] : null

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-600">Loading...</div>
    )
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">{error}</div>
    )
  }

  if (recommendation) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Recommended Course</h2>
        <p className="text-gray-700">{recommendation.course_details?.title}</p>
        <p className="text-gray-500 mt-2">{recommendation.description}</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-16" ref={sectionRef}>
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <motion.div className="text-center mb-8" variants={containerVariants}>
          <motion.span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 text-sm font-medium rounded-full mb-4" variants={itemVariants}>
            Find Your Path
          </motion.span>
          <motion.h2 className="text-3xl text-gray-700 md:text-4xl font-bold mb-4" variants={itemVariants}>
            Find the Perfect Course for You
          </motion.h2>
          <motion.p className="text-gray-600 max-w-2xl mx-auto" variants={itemVariants}>
            Answer a few quick questions and we&apos;ll recommend the best driving program for your needs.
          </motion.p>
        </motion.div>

        {currentQuestion && (
          <motion.div className="max-w-xl mx-auto bg-white shadow p-6 rounded-md space-y-6" variants={itemVariants}>
            <h3 className="text-lg font-semibold">{currentQuestion.question_text}</h3>
            <div className="space-y-3">
              {currentQuestion.options.map(opt => (
                <label key={opt.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`question_${currentQuestion.id}`}
                    value={opt.id}
                    checked={selectedOption === opt.id}
                    onChange={() => handleSelect(opt.id)}
                  />
                  <span>{opt.option_text}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
              disabled={!selectedOption}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
