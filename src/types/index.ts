export interface User {
  id: string;
  name: string;
  age: number;
  avatar: string;
  totalScore: number;
  level: number;
  streak: number;
  achievements: Achievement[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  favoriteCategories: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  image?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  timeLimit: number;
  icon: string;
  color: string;
  description: string;
  totalTaken: number;
  averageScore: number;
}

export interface QuizResult {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  date: string;
  answers: number[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  totalQuizzes: number;
  completedQuizzes: number;
  averageScore: number;
  isPopular: boolean;
  isNew: boolean;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  avatar: string;
  totalScore: number;
  level: number;
  rank: number;
}
