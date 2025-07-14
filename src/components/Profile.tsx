import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Target, TrendingUp, Award, Settings, Star, Clock, BookOpen } from 'lucide-react';
import { mockUser, mockResults, categories } from '../data/mockData';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'results' | 'achievements' | 'settings'>('overview');

  const getGradeColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 70) return 'bg-yellow-500';
    if (percentage >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const totalQuizzes = mockResults.length;
  const totalCorrect = mockResults.reduce((acc, r) => acc + r.score, 0);
  const totalQuestions = mockResults.reduce((acc, r) => acc + r.totalQuestions, 0);
  const averageScore = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

  const categoryStats = categories.map(category => {
    const categoryResults = mockResults.filter(r => r.category === category.name);
    const categoryScore = categoryResults.reduce((acc, r) => acc + r.score, 0);
    const categoryTotal = categoryResults.reduce((acc, r) => acc + r.totalQuestions, 0);
    const categoryAverage = categoryTotal > 0 ? (categoryScore / categoryTotal) * 100 : 0;
    
    return {
      ...category,
      quizzesTaken: categoryResults.length,
      averageScore: categoryAverage
    };
  }).filter(cat => cat.quizzesTaken > 0);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 pb-4">
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src={mockUser.avatar} 
            alt={mockUser.name}
            className="w-16 h-16 rounded-full border-3 border-white/30"
          />
          <div>
            <h1 className="text-xl font-bold">{mockUser.name}</h1>
            <p className="text-white/80">{mockUser.age} years old</p>
            <div className="flex items-center space-x-2 mt-1">
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold">Level {mockUser.level}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <div className="text-xl font-bold">{mockUser.totalScore}</div>
            <div className="text-xs text-white/80">Total Score</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <div className="text-xl font-bold">{mockUser.streak}</div>
            <div className="text-xs text-white/80">Day Streak</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <div className="text-xl font-bold">{totalQuizzes}</div>
            <div className="text-xs text-white/80">Quizzes</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'results', label: 'Results', icon: BookOpen },
            { id: 'achievements', label: 'Awards', icon: Award },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex-1 py-3 px-4 text-center font-medium text-sm ${
                activeTab === id 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-4 h-4 mx-auto mb-1" />
              {label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{averageScore.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{totalCorrect}</div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Category Performance</h3>
              <div className="space-y-3">
                {categoryStats.slice(0, 5).map((category, index) => (
                  <motion.div
                    key={category.id}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="text-2xl">{category.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800">{category.name}</span>
                        <span className="text-sm text-gray-600">{category.averageScore.toFixed(1)}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${category.averageScore}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {mockResults.slice(0, 3).map((result, index) => (
                  <div key={result.id} className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      getGradeColor(result.score, result.totalQuestions)
                    }`}>
                      {Math.round((result.score / result.totalQuestions) * 100)}%
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{result.category} Quiz</p>
                      <p className="text-sm text-gray-600">{result.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Quiz Results</h3>
            {mockResults.map((result, index) => (
              <motion.div
                key={result.id}
                className="bg-white border border-gray-200 rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{result.category}</h4>
                    <p className="text-sm text-gray-500 mb-2">{result.difficulty} difficulty</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{result.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{Math.floor(result.timeSpent / 60)}:{(result.timeSpent % 60).toString().padStart(2, '0')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                      getGradeColor(result.score, result.totalQuestions)
                    }`}>
                      {Math.round((result.score / result.totalQuestions) * 100)}%
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {result.score}/{result.totalQuestions}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Achievements</h3>
            <div className="grid grid-cols-1 gap-4">
              {mockUser.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 text-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{achievement.title}</h4>
                      <p className="text-white/90 text-sm">{achievement.description}</p>
                      <p className="text-white/80 text-xs mt-1">Unlocked: {achievement.unlockedAt}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Difficulty</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Sound Effects</span>
                  <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">
                    {mockUser.preferences.soundEnabled ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
