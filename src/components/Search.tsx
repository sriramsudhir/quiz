import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, Clock, Star, TrendingUp } from 'lucide-react';
import { categories, quizzes } from '../data/mockData';
import { Quiz } from '../types';

interface SearchProps {
  onQuizStart: (quiz: Quiz) => void;
}

const Search: React.FC<SearchProps> = ({ onQuizStart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || quiz.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const popularQuizzes = quizzes.filter(quiz => quiz.totalTaken > 1000);
  const recentQuizzes = quizzes.slice(0, 3);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 pb-4">
        <h1 className="text-xl font-bold mb-4">Discover Quizzes</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search quizzes, categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          <div className="flex items-center space-x-2 min-w-max">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
          
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {searchTerm ? (
          /* Search Results */
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Search Results ({filteredQuizzes.length})
            </h2>
            {filteredQuizzes.length > 0 ? (
              <div className="space-y-3">
                {filteredQuizzes.map((quiz, index) => (
                  <motion.div
                    key={quiz.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onQuizStart(quiz)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-12 h-12 rounded-xl ${quiz.color} flex items-center justify-center text-white text-xl`}>
                        {quiz.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{quiz.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{quiz.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{Math.floor(quiz.timeLimit / 60)}min</span>
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            quiz.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            quiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {quiz.difficulty}
                          </span>
                          <span className="flex items-center space-x-1">
                            <Star className="w-3 h-3" />
                            <span>{quiz.averageScore.toFixed(1)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No quizzes found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        ) : (
          /* Browse Content */
          <div className="space-y-6">
            {/* Popular Quizzes */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-bold text-gray-800">Popular Quizzes</h2>
              </div>
              <div className="space-y-3">
                {popularQuizzes.map((quiz, index) => (
                  <motion.div
                    key={quiz.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onQuizStart(quiz)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-12 h-12 rounded-xl ${quiz.color} flex items-center justify-center text-white text-xl`}>
                        {quiz.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{quiz.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{quiz.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{quiz.totalTaken.toLocaleString()} taken</span>
                          <span className="flex items-center space-x-1">
                            <Star className="w-3 h-3" />
                            <span>{quiz.averageScore.toFixed(1)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Browse by Category</h2>
              <div className="grid grid-cols-2 gap-3">
                {categories.slice(0, 8).map((category, index) => (
                  <motion.div
                    key={category.id}
                    className={`${category.color} rounded-xl p-3 text-white text-center relative overflow-hidden`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                    <p className="text-xs text-white/80">{category.totalQuizzes} quizzes</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
