import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Clock, CheckCircle, Trophy, Target, Star } from 'lucide-react';
import { Quiz as QuizType, Question, QuizResult } from '../types';
import { mockUser } from '../data/mockData';

interface QuizProps {
  quiz: QuizType;
  onBack: () => void;
  onComplete: (result: QuizResult) => void;
}

const Quiz: React.FC<QuizProps> = ({ quiz, onBack, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [timeLeft, showResult]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      handleQuizComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const handleQuizComplete = () => {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return answer === quiz.questions[index]?.correctAnswer ? acc + 1 : acc;
    }, 0);

    const result: QuizResult = {
      id: Date.now().toString(),
      quizId: quiz.id,
      userId: mockUser.id,
      score,
      totalQuestions: quiz.questions.length,
      timeSpent: quiz.timeLimit - timeLeft,
      date: new Date().toISOString().split('T')[0],
      answers: selectedAnswers,
      difficulty: quiz.difficulty,
      category: quiz.category
    };

    setShowResult(true);
    setTimeout(() => onComplete(result), 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return { message: 'Outstanding! 🎉', color: 'text-green-600' };
    if (percentage >= 80) return { message: 'Excellent work! 👏', color: 'text-blue-600' };
    if (percentage >= 70) return { message: 'Great job! 👍', color: 'text-yellow-600' };
    if (percentage >= 60) return { message: 'Good effort! 💪', color: 'text-orange-600' };
    return { message: 'Keep practicing! 📚', color: 'text-red-600' };
  };

  if (showResult) {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return answer === quiz.questions[index]?.correctAnswer ? acc + 1 : acc;
    }, 0);

    const { message, color } = getScoreMessage(score, quiz.questions.length);
    const percentage = Math.round((score / quiz.questions.length) * 100);

    return (
      <motion.div
        className="flex items-center justify-center h-full bg-gradient-to-br from-green-400 to-green-600 text-white p-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CheckCircle className="w-20 h-20 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
          <div className="bg-white/20 rounded-2xl p-6 mb-4">
            <div className="text-4xl font-bold mb-2">{score}/{quiz.questions.length}</div>
            <div className="text-xl mb-2">{percentage}%</div>
            <div className="text-sm text-white/80">
              Time: {formatTime(quiz.timeLimit - timeLeft)}
            </div>
          </div>
          <div className="space-y-2">
            <p className={`text-lg font-semibold ${color}`}>{message}</p>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${i < Math.floor(percentage / 20) ? 'text-yellow-400 fill-current' : 'text-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <motion.button
            onClick={onBack}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <div className="text-center">
            <h1 className="text-lg font-bold">{quiz.title}</h1>
            <p className="text-white/80 text-sm">{quiz.category}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="w-5 h-5" />
            <span className="font-semibold">{currentQuestion + 1}/{quiz.questions.length}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-white/20 rounded-full h-2 mb-4">
          <motion.div
            className="bg-white h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Timer and Difficulty */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white/90">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{formatTime(timeLeft)}</span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            quiz.difficulty === 'easy' ? 'bg-green-500/20' :
            quiz.difficulty === 'medium' ? 'bg-yellow-500/20' :
            'bg-red-500/20'
          }`}>
            {quiz.difficulty.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 p-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{question.question}</h2>
              {question.image && (
                <img 
                  src={question.image} 
                  alt="Question illustration" 
                  className="w-full max-w-xs mx-auto rounded-lg shadow-lg mb-4"
                />
              )}
            </div>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion] === index;
                const isCorrect = index === question.correctAnswer;
                const colors = [
                  'bg-blue-100 border-blue-300 text-blue-800',
                  'bg-red-100 border-red-300 text-red-800',
                  'bg-green-100 border-green-300 text-green-800',
                  'bg-yellow-100 border-yellow-300 text-yellow-800'
                ];
                
                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      showExplanation 
                        ? isCorrect 
                          ? 'bg-green-100 border-green-300 text-green-800' 
                          : isSelected 
                            ? 'bg-red-100 border-red-300 text-red-800' 
                            : 'bg-gray-50 border-gray-200 text-gray-600'
                        : isSelected 
                          ? `${colors[index]} border-opacity-100 shadow-lg` 
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-800'
                    }`}
                    whileHover={{ scale: showExplanation ? 1 : 1.02 }}
                    whileTap={{ scale: showExplanation ? 1 : 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        showExplanation 
                          ? isCorrect 
                            ? 'bg-green-500' 
                            : isSelected 
                              ? 'bg-red-500' 
                              : 'bg-gray-400'
                          : ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500'][index]
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="font-medium">{option}</span>
                      {showExplanation && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && question.explanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 border border-blue-200 rounded-xl p-4"
              >
                <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
                <p className="text-blue-700">{question.explanation}</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6 bg-white border-t border-gray-100">
        <div className="flex justify-between">
          <motion.button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 rounded-xl bg-gray-100 text-gray-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: currentQuestion === 0 ? 1 : 1.05 }}
            whileTap={{ scale: currentQuestion === 0 ? 1 : 0.95 }}
          >
            Previous
          </motion.button>
          
          {isAnswered && !showExplanation && question.explanation && (
            <motion.button
              onClick={() => setShowExplanation(true)}
              className="px-6 py-3 rounded-xl bg-blue-100 text-blue-600 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show Answer
            </motion.button>
          )}
          
          <motion.button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-6 py-3 rounded-xl bg-purple-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: !isAnswered ? 1 : 1.05 }}
            whileTap={{ scale: !isAnswered ? 1 : 0.95 }}
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
