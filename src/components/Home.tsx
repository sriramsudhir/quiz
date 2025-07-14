import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Trophy, Clock, Star, Filter, TrendingUp, Award } from 'lucide-react';
import { mockUser, categories, quizzes, mockResults } from '../data/mockData';
import { Quiz } from '../types';

interface HomeProps {
  onQuizStart: (quiz: Quiz) => void;
}

const Home: React.FC<HomeProps> = ({ onQuizStart }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'popular' | 'new'>('all');
  
  const filteredCategories = categories.filter(category => {
    if (selectedFilter === 'popular') return category.isPopular;
    if (selectedFilter === 'new') return category.isNew;
    return true;
  });

  const recentQuiz = quizzes[0];
  const recentResult = mockResults[0];

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 pb-4 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img 
              src={mockUser.avatar} 
              alt={mockUser.name}
              className="w-12 h-12 rounded-full border-2 border-white/30"
            />
            <div>
              <h1 className="text-lg font-bold">Hello {mockUser.name.split(' ')[0]}!</h1>
              <p className="text-white/80 text-sm">Let's learn something new today</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-bold">{mockUser.totalScore}</span>
            </div>
            <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-bold">L{mockUser.level}</span>
            </div>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center justify-center space-x-2 bg-white/20 rounded-2xl p-3">
          <div className="text-2xl">🔥</div>
          <div>
            <p className="text-sm text-white/80">Current Streak</p>
            <p className="text-lg font-bold">{mockUser.streak} days</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Recent Quiz */}
        <motion.div
          className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Continue Learning</h3>
              <p className="text-white/90 text-sm mb-2">{recentQuiz.title}</p>
              <div className="flex items-center space-x-2 text-sm text-white/80">
                <Clock className="w-4 h-4" />
                <span>Last Score: {recentResult.score}/{recentResult.totalQuestions}</span>
              </div>
            </div>
            <motion.button
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onQuizStart(recentQuiz)}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Level Progress */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3">Level Progress</h3>
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <motion.div
                key={level}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  level <= mockUser.level 
                    ? level === 1 ? 'bg-yellow-500 text-white' : 
                      level === 2 ? 'bg-pink-500 text-white' : 
                      level === 3 ? 'bg-purple-500 text-white' :
                      level === 4 ? 'bg-blue-500 text-white' :
                      'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: level * 0.1 }}
              >
                {level}
              </motion.div>
            ))}
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(mockUser.level / 5) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Quiz Categories</h2>
          <div className="flex items-center space-x-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'popular', label: 'Popular' },
              { id: 'new', label: 'New' }
            ].map(({ id, label }) => (
              <motion.button
                key={id}
                onClick={() => setSelectedFilter(id as any)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedFilter === id 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quiz Categories */}
        <div className="grid grid-cols-1 gap-3">
          {filteredCategories.slice(0, 6).map((category, index) => (
            <motion.div
              key={category.id}
              className={`${category.color} rounded-2xl p-4 text-white relative overflow-hidden`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    {category.isNew && (
                      <span className="bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                        NEW
                      </span>
                    )}
                    {category.isPopular && (
                      <TrendingUp className="w-4 h-4 text-yellow-300" />
                    )}
                  </div>
                  <p className="text-white/90 text-sm mb-3 line-clamp-2">{category.description}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <motion.button
                      className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onQuizStart(quizzes.find(q => q.category === category.name) || quizzes[0])}
                    >
                      {category.completedQuizzes}/{category.totalQuizzes} Done
                    </motion.button>
                    <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {category.averageScore}% avg
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-4xl opacity-60">{category.icon}</span>
                  <ChevronRight className="w-5 h-5 text-white/60" />
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
                <motion.div
                  className="h-full bg-white/40 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: `${(category.completedQuizzes / category.totalQuizzes) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <Award className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Achievements</p>
            <p className="text-lg font-bold text-blue-600">{mockUser.achievements.length}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <Trophy className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Avg Score</p>
            <p className="text-lg font-bold text-green-600">
              {Math.round((mockResults.reduce((acc, r) => acc + r.score, 0) / mockResults.reduce((acc, r) => acc + r.totalQuestions, 0)) * 100)}%
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center">
            <Clock className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Quizzes</p>
            <p className="text-lg font-bold text-purple-600">{mockResults.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
