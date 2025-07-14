import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Trophy, Target, BookOpen, Star, Calendar, Clock, Award } from 'lucide-react';

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'achievements' | 'reminders' | 'updates'>('all');

  const notifications = [
    {
      id: 1,
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'You\'ve earned the "Science Explorer" badge for completing 5 science quizzes',
      time: '2 hours ago',
      icon: Trophy,
      color: 'bg-yellow-500',
      isRead: false
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Daily Challenge Available',
      message: 'Complete today\'s math challenge to maintain your streak',
      time: '4 hours ago',
      icon: Target,
      color: 'bg-blue-500',
      isRead: false
    },
    {
      id: 3,
      type: 'update',
      title: 'New Quiz Category Added',
      message: 'Food and Cooking quizzes are now available to explore',
      time: '1 day ago',
      icon: BookOpen,
      color: 'bg-green-500',
      isRead: true
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Perfect Score!',
      message: 'You got 100% on the Solar System quiz. Excellent work!',
      time: '1 day ago',
      icon: Star,
      color: 'bg-purple-500',
      isRead: true
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Weekly Goal Progress',
      message: 'You\'re 3 quizzes away from completing your weekly goal',
      time: '2 days ago',
      icon: Calendar,
      color: 'bg-orange-500',
      isRead: true
    },
    {
      id: 6,
      type: 'achievement',
      title: 'Level Up!',
      message: 'Congratulations! You\'ve reached Level 4',
      time: '3 days ago',
      icon: Award,
      color: 'bg-pink-500',
      isRead: true
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'achievements') return notification.type === 'achievement';
    if (filter === 'reminders') return notification.type === 'reminder';
    if (filter === 'updates') return notification.type === 'update';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6" />
            <h1 className="text-xl font-bold">Notifications</h1>
          </div>
          {unreadCount > 0 && (
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              {unreadCount} new
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { id: 'all', label: 'All' },
            { id: 'achievements', label: 'Achievements' },
            { id: 'reminders', label: 'Reminders' },
            { id: 'updates', label: 'Updates' }
          ].map(({ id, label }) => (
            <motion.button
              key={id}
              onClick={() => setFilter(id as any)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                filter === id 
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

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                className={`bg-white border rounded-xl p-4 shadow-sm ${
                  !notification.isRead ? 'border-purple-200 bg-purple-50' : 'border-gray-200'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.color}`}>
                    <notification.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{notification.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No notifications</h3>
            <p className="text-gray-400">
              {filter === 'all' ? "You're all caught up!" : `No ${filter} notifications found`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
