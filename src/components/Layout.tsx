import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Bell, Trophy, Search } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'home' | 'profile' | 'notifications' | 'leaderboard' | 'search';
  onTabChange: (tab: 'home' | 'profile' | 'notifications' | 'leaderboard' | 'search') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-[800px] flex flex-col">
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
          
          {/* Bottom Navigation */}
          <div className="bg-white border-t border-gray-100 px-4 py-3">
            <div className="flex justify-around">
              {tabs.map(({ id, icon: Icon, label }) => (
                <motion.button
                  key={id}
                  onClick={() => onTabChange(id as any)}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                    activeTab === id ? 'text-purple-600' : 'text-gray-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{label}</span>
                  {activeTab === id && (
                    <motion.div
                      className="w-1 h-1 bg-purple-600 rounded-full"
                      layoutId="activeTab"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
