import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, TrendingUp, Star } from 'lucide-react';
import { leaderboard, mockUser } from '../data/mockData';

const Leaderboard: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'all'>('all');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold text-sm">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-500';
      default:
        return 'bg-white';
    }
  };

  const userRank = leaderboard.find(entry => entry.userId === mockUser.id)?.rank || 1;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6" />
            <h1 className="text-xl font-bold">Leaderboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">Your rank: #{userRank}</span>
          </div>
        </div>

        {/* Time Frame Selector */}
        <div className="flex items-center space-x-2">
          {[
            { id: 'week', label: 'This Week' },
            { id: 'month', label: 'This Month' },
            { id: 'all', label: 'All Time' }
          ].map(({ id, label }) => (
            <motion.button
              key={id}
              onClick={() => setTimeFrame(id as any)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                timeFrame === id 
                  ? 'bg-white text-purple-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-gradient-to-b from-purple-50 to-white p-6">
        <div className="flex items-end justify-center space-x-4">
          {/* Second Place */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src={leaderboard[1].avatar}
              alt={leaderboard[1].userName}
              className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-gray-300"
            />
            <h3 className="font-semibold text-sm">{leaderboard[1].userName}</h3>
            <p className="text-xs text-gray-600">{leaderboard[1].totalScore} pts</p>
            <div className="bg-gray-300 h-16 w-20 rounded-t-lg mt-2 flex items-center justify-center">
              <span className="text-white font-bold text-lg">2</span>
            </div>
          </motion.div>

          {/* First Place */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <img
              src={leaderboard[0].avatar}
              alt={leaderboard[0].userName}
              className="w-20 h-20 rounded-full mx-auto mb-2 border-4 border-yellow-400"
            />
            <h3 className="font-bold text-base">{leaderboard[0].userName}</h3>
            <p className="text-sm text-gray-600">{leaderboard[0].totalScore} pts</p>
            <div className="bg-yellow-400 h-20 w-24 rounded-t-lg mt-2 flex items-center justify-center">
              <span className="text-white font-bold text-xl">1</span>
            </div>
          </motion.div>

          {/* Third Place */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img
              src={leaderboard[2].avatar}
              alt={leaderboard[2].userName}
              className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-amber-500"
            />
            <h3 className="font-semibold text-sm">{leaderboard[2].userName}</h3>
            <p className="text-xs text-gray-600">{leaderboard[2].totalScore} pts</p>
            <div className="bg-amber-500 h-12 w-20 rounded-t-lg mt-2 flex items-center justify-center">
              <span className="text-white font-bold text-lg">3</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Full Rankings</h2>
        <div className="space-y-3">
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.userId}
              className={`${getRankColor(entry.rank)} rounded-xl p-4 ${
                entry.userId === mockUser.id ? 'ring-2 ring-purple-500' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {getRankIcon(entry.rank)}
                </div>
                <img
                  src={entry.avatar}
                  alt={entry.userName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`font-semibold ${entry.rank <= 3 ? 'text-white' : 'text-gray-800'}`}>
                      {entry.userName}
                    </h3>
                    {entry.userId === mockUser.id && (
                      <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        YOU
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${entry.rank <= 3 ? 'text-white/80' : 'text-gray-600'}`}>
                    Level {entry.level}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className={`w-4 h-4 ${entry.rank <= 3 ? 'text-yellow-300' : 'text-yellow-500'}`} />
                    <span className={`font-bold ${entry.rank <= 3 ? 'text-white' : 'text-gray-800'}`}>
                      {entry.totalScore}
                    </span>
                  </div>
                  <p className={`text-xs ${entry.rank <= 3 ? 'text-white/80' : 'text-gray-600'}`}>
                    points
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
