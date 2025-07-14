import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
import Search from './components/Search';
import Leaderboard from './components/Leaderboard';
import { Quiz as QuizType, QuizResult } from './types';

type AppState = 'home' | 'quiz' | 'profile' | 'notifications' | 'search' | 'leaderboard';

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [activeQuiz, setActiveQuiz] = useState<QuizType | null>(null);

  const handleQuizStart = (quiz: QuizType) => {
    setActiveQuiz(quiz);
    setCurrentState('quiz');
  };

  const handleQuizComplete = (result: QuizResult) => {
    console.log('Quiz completed:', result);
    setActiveQuiz(null);
    setCurrentState('home');
  };

  const handleTabChange = (tab: 'home' | 'profile' | 'notifications' | 'leaderboard' | 'search') => {
    setCurrentState(tab);
    if (tab !== 'quiz') {
      setActiveQuiz(null);
    }
  };

  const renderContent = () => {
    switch (currentState) {
      case 'home':
        return <Home onQuizStart={handleQuizStart} />;
      case 'quiz':
        return activeQuiz ? (
          <Quiz
            quiz={activeQuiz}
            onBack={() => setCurrentState('home')}
            onComplete={handleQuizComplete}
          />
        ) : (
          <Home onQuizStart={handleQuizStart} />
        );
      case 'search':
        return <Search onQuizStart={handleQuizStart} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Home onQuizStart={handleQuizStart} />;
    }
  };

  return (
    <Layout 
      activeTab={currentState === 'quiz' ? 'home' : currentState}
      onTabChange={handleTabChange}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentState}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
