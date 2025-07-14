import { faker } from '@faker-js/faker';
import { User, Quiz, QuizResult, Category, Achievement, LeaderboardEntry } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Anne Williams',
  age: 14,
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces',
  totalScore: 1850,
  level: 4,
  streak: 7,
  achievements: [
    {
      id: '1',
      title: 'First Quiz Master',
      description: 'Complete your first quiz',
      icon: '🎯',
      unlockedAt: '2024-01-15',
      category: 'General'
    },
    {
      id: '2',
      title: 'Science Explorer',
      description: 'Complete 5 science quizzes',
      icon: '🔬',
      unlockedAt: '2024-01-20',
      category: 'Science'
    },
    {
      id: '3',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      unlockedAt: '2024-01-25',
      category: 'Streak'
    }
  ],
  preferences: {
    theme: 'light',
    soundEnabled: true,
    difficulty: 'medium',
    favoriteCategories: ['Science', 'Mathematics', 'Geography']
  }
};

export const categories: Category[] = [
  {
    id: '1',
    name: 'Science',
    icon: '🔬',
    color: 'bg-gradient-to-br from-blue-400 to-blue-600',
    description: 'Includes animals, plants, space, weather, the human body, and scientific concepts',
    totalQuizzes: 25,
    completedQuizzes: 12,
    averageScore: 85,
    isPopular: true,
    isNew: false
  },
  {
    id: '2',
    name: 'History',
    icon: '🏛️',
    color: 'bg-gradient-to-br from-amber-400 to-amber-600',
    description: 'Covers famous people, events, cultures, and ancient civilizations',
    totalQuizzes: 20,
    completedQuizzes: 8,
    averageScore: 78,
    isPopular: true,
    isNew: false
  },
  {
    id: '3',
    name: 'Geography',
    icon: '🌍',
    color: 'bg-gradient-to-br from-green-400 to-green-600',
    description: 'Focuses on countries, capitals, landmarks, and maps',
    totalQuizzes: 18,
    completedQuizzes: 10,
    averageScore: 82,
    isPopular: true,
    isNew: false
  },
  {
    id: '4',
    name: 'Arts and Culture',
    icon: '🎨',
    color: 'bg-gradient-to-br from-pink-400 to-pink-600',
    description: 'Includes music, art, literature, and famous artists',
    totalQuizzes: 15,
    completedQuizzes: 6,
    averageScore: 75,
    isPopular: false,
    isNew: false
  },
  {
    id: '5',
    name: 'Sports',
    icon: '⚽',
    color: 'bg-gradient-to-br from-orange-400 to-orange-600',
    description: 'Features different sports, rules, and famous athletes',
    totalQuizzes: 16,
    completedQuizzes: 5,
    averageScore: 80,
    isPopular: false,
    isNew: false
  },
  {
    id: '6',
    name: 'Mathematics',
    icon: '🔢',
    color: 'bg-gradient-to-br from-purple-400 to-purple-600',
    description: 'Covers basic math, logic puzzles, and patterns',
    totalQuizzes: 22,
    completedQuizzes: 14,
    averageScore: 88,
    isPopular: true,
    isNew: false
  },
  {
    id: '7',
    name: 'Language Arts',
    icon: '📝',
    color: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
    description: 'Includes vocabulary, grammar, and spelling',
    totalQuizzes: 19,
    completedQuizzes: 9,
    averageScore: 83,
    isPopular: false,
    isNew: false
  },
  {
    id: '8',
    name: 'General Knowledge',
    icon: '🧠',
    color: 'bg-gradient-to-br from-teal-400 to-teal-600',
    description: 'Miscellaneous facts for broad learning',
    totalQuizzes: 30,
    completedQuizzes: 15,
    averageScore: 79,
    isPopular: true,
    isNew: false
  },
  {
    id: '9',
    name: 'Pop Culture',
    icon: '🎬',
    color: 'bg-gradient-to-br from-red-400 to-red-600',
    description: 'Covers movies, TV shows, celebrities, and cartoons',
    totalQuizzes: 14,
    completedQuizzes: 7,
    averageScore: 86,
    isPopular: true,
    isNew: true
  },
  {
    id: '10',
    name: 'Nature and Environment',
    icon: '🌱',
    color: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    description: 'Includes ecosystems, conservation, and natural phenomena',
    totalQuizzes: 12,
    completedQuizzes: 4,
    averageScore: 77,
    isPopular: false,
    isNew: false
  },
  {
    id: '11',
    name: 'Technology and Inventions',
    icon: '💻',
    color: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
    description: 'Explains how things work and highlights famous inventions',
    totalQuizzes: 11,
    completedQuizzes: 3,
    averageScore: 81,
    isPopular: false,
    isNew: true
  },
  {
    id: '12',
    name: 'Health and Nutrition',
    icon: '🍎',
    color: 'bg-gradient-to-br from-lime-400 to-lime-600',
    description: 'Teaches about body parts, healthy eating, and exercise',
    totalQuizzes: 13,
    completedQuizzes: 5,
    averageScore: 84,
    isPopular: false,
    isNew: false
  },
  {
    id: '13',
    name: 'Social Studies',
    icon: '🏘️',
    color: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    description: 'Focuses on communities, cultures, and citizenship',
    totalQuizzes: 17,
    completedQuizzes: 6,
    averageScore: 76,
    isPopular: false,
    isNew: false
  },
  {
    id: '14',
    name: 'Fun and Games',
    icon: '🎮',
    color: 'bg-gradient-to-br from-violet-400 to-violet-600',
    description: 'Includes riddles, brain teasers, and logic games',
    totalQuizzes: 21,
    completedQuizzes: 11,
    averageScore: 87,
    isPopular: true,
    isNew: false
  },
  {
    id: '15',
    name: 'Seasons and Holidays',
    icon: '🎄',
    color: 'bg-gradient-to-br from-rose-400 to-rose-600',
    description: 'Features quizzes on Christmas, Halloween, birthdays, etc.',
    totalQuizzes: 10,
    completedQuizzes: 4,
    averageScore: 89,
    isPopular: false,
    isNew: false
  },
  {
    id: '16',
    name: 'Myths and Legends',
    icon: '🐉',
    color: 'bg-gradient-to-br from-slate-400 to-slate-600',
    description: 'Covers folktales, fairy tales, and mythology',
    totalQuizzes: 9,
    completedQuizzes: 2,
    averageScore: 73,
    isPopular: false,
    isNew: false
  },
  {
    id: '17',
    name: 'Transportation',
    icon: '🚗',
    color: 'bg-gradient-to-br from-stone-400 to-stone-600',
    description: 'Explores vehicles, how they work, and the history of transport',
    totalQuizzes: 8,
    completedQuizzes: 3,
    averageScore: 80,
    isPopular: false,
    isNew: false
  },
  {
    id: '18',
    name: 'Food and Cooking',
    icon: '🍕',
    color: 'bg-gradient-to-br from-amber-400 to-orange-500',
    description: 'Includes different cuisines and cooking terms',
    totalQuizzes: 12,
    completedQuizzes: 5,
    averageScore: 85,
    isPopular: false,
    isNew: true
  },
  {
    id: '19',
    name: 'Safety and First Aid',
    icon: '⚕️',
    color: 'bg-gradient-to-br from-red-400 to-pink-500',
    description: 'Teaches basic safety rules and emergency procedures',
    totalQuizzes: 7,
    completedQuizzes: 2,
    averageScore: 91,
    isPopular: false,
    isNew: false
  },
  {
    id: '20',
    name: 'Careers and Professions',
    icon: '👨‍⚕️',
    color: 'bg-gradient-to-br from-blue-400 to-purple-500',
    description: 'Introduces different jobs and their roles',
    totalQuizzes: 11,
    completedQuizzes: 4,
    averageScore: 82,
    isPopular: false,
    isNew: false
  }
];

export const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'Solar System Explorer',
    category: 'Science',
    difficulty: 'medium',
    timeLimit: 600,
    icon: '🌌',
    color: 'bg-gradient-to-br from-blue-400 to-blue-600',
    description: 'Discover the wonders of our solar system',
    totalTaken: 1250,
    averageScore: 7.2,
    questions: [
      {
        id: '1',
        question: 'Which planet is closest to the Sun?',
        options: ['Venus', 'Earth', 'Mercury', 'Mars'],
        correctAnswer: 2,
        explanation: 'Mercury is the closest planet to the Sun in our solar system',
        difficulty: 'easy',
        category: 'Science'
      },
      {
        id: '2',
        question: 'How many moons does Earth have?',
        options: ['0', '1', '2', '3'],
        correctAnswer: 1,
        explanation: 'Earth has one natural satellite - the Moon',
        difficulty: 'easy',
        category: 'Science'
      },
      {
        id: '3',
        question: 'What is the largest planet in our solar system?',
        options: ['Saturn', 'Jupiter', 'Neptune', 'Uranus'],
        correctAnswer: 1,
        explanation: 'Jupiter is the largest planet in our solar system',
        difficulty: 'medium',
        category: 'Science'
      },
      {
        id: '4',
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
        correctAnswer: 0,
        explanation: 'Mars is called the Red Planet due to its reddish appearance',
        difficulty: 'easy',
        category: 'Science'
      },
      {
        id: '5',
        question: 'What is the hottest planet in our solar system?',
        options: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
        correctAnswer: 1,
        explanation: 'Venus is the hottest planet due to its thick atmosphere',
        difficulty: 'medium',
        category: 'Science'
      }
    ]
  },
  {
    id: '2',
    title: 'Ancient Civilizations',
    category: 'History',
    difficulty: 'hard',
    timeLimit: 720,
    icon: '🏛️',
    color: 'bg-gradient-to-br from-amber-400 to-amber-600',
    description: 'Journey through ancient times and civilizations',
    totalTaken: 980,
    averageScore: 6.8,
    questions: [
      {
        id: '1',
        question: 'Which ancient wonder of the world was located in Alexandria?',
        options: ['Hanging Gardens', 'Lighthouse', 'Colossus', 'Mausoleum'],
        correctAnswer: 1,
        explanation: 'The Lighthouse of Alexandria was one of the Seven Wonders',
        difficulty: 'hard',
        category: 'History'
      },
      {
        id: '2',
        question: 'What was the capital of the Roman Empire?',
        options: ['Athens', 'Rome', 'Alexandria', 'Constantinople'],
        correctAnswer: 1,
        explanation: 'Rome was the capital of the Roman Empire',
        difficulty: 'medium',
        category: 'History'
      },
      {
        id: '3',
        question: 'Which Egyptian queen was known for her beauty?',
        options: ['Nefertiti', 'Cleopatra', 'Hatshepsut', 'Ankhesenamun'],
        correctAnswer: 1,
        explanation: 'Cleopatra VII was famous for her beauty and intelligence',
        difficulty: 'medium',
        category: 'History'
      }
    ]
  },
  {
    id: '3',
    title: 'World Geography Challenge',
    category: 'Geography',
    difficulty: 'medium',
    timeLimit: 540,
    icon: '🌍',
    color: 'bg-gradient-to-br from-green-400 to-green-600',
    description: 'Test your knowledge of countries and capitals',
    totalTaken: 1420,
    averageScore: 7.8,
    questions: [
      {
        id: '1',
        question: 'What is the capital of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctAnswer: 2,
        explanation: 'Canberra is the capital city of Australia',
        difficulty: 'medium',
        category: 'Geography'
      },
      {
        id: '2',
        question: 'Which is the longest river in the world?',
        options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
        correctAnswer: 1,
        explanation: 'The Nile River is the longest river in the world',
        difficulty: 'medium',
        category: 'Geography'
      },
      {
        id: '3',
        question: 'What is the smallest country in the world?',
        options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
        correctAnswer: 1,
        explanation: 'Vatican City is the smallest country in the world',
        difficulty: 'hard',
        category: 'Geography'
      }
    ]
  },
  {
    id: '4',
    title: 'Math Wizards',
    category: 'Mathematics',
    difficulty: 'medium',
    timeLimit: 480,
    icon: '🔢',
    color: 'bg-gradient-to-br from-purple-400 to-purple-600',
    description: 'Challenge yourself with fun math problems',
    totalTaken: 1680,
    averageScore: 8.1,
    questions: [
      {
        id: '1',
        question: 'What is 15 × 12?',
        options: ['180', '170', '190', '160'],
        correctAnswer: 0,
        explanation: '15 × 12 = 180',
        difficulty: 'medium',
        category: 'Mathematics'
      },
      {
        id: '2',
        question: 'What is the square root of 144?',
        options: ['11', '12', '13', '14'],
        correctAnswer: 1,
        explanation: '√144 = 12 because 12 × 12 = 144',
        difficulty: 'medium',
        category: 'Mathematics'
      },
      {
        id: '3',
        question: 'If a triangle has angles of 60°, 60°, and 60°, what type of triangle is it?',
        options: ['Right', 'Isosceles', 'Equilateral', 'Scalene'],
        correctAnswer: 2,
        explanation: 'An equilateral triangle has all angles equal to 60°',
        difficulty: 'hard',
        category: 'Mathematics'
      }
    ]
  },
  {
    id: '5',
    title: 'Animal Kingdom',
    category: 'Science',
    difficulty: 'easy',
    timeLimit: 420,
    icon: '🦁',
    color: 'bg-gradient-to-br from-green-400 to-green-600',
    description: 'Learn about amazing animals from around the world',
    totalTaken: 2100,
    averageScore: 8.5,
    questions: [
      {
        id: '1',
        question: 'Which is the largest mammal in the world?',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correctAnswer: 1,
        explanation: 'Blue whales are the largest mammals on Earth',
        difficulty: 'easy',
        category: 'Science'
      },
      {
        id: '2',
        question: 'How many hearts does an octopus have?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 2,
        explanation: 'Octopuses have three hearts',
        difficulty: 'hard',
        category: 'Science'
      },
      {
        id: '3',
        question: 'What do pandas mainly eat?',
        options: ['Fish', 'Bamboo', 'Meat', 'Fruits'],
        correctAnswer: 1,
        explanation: 'Pandas primarily eat bamboo',
        difficulty: 'easy',
        category: 'Science'
      }
    ]
  }
];

export const mockResults: QuizResult[] = [
  {
    id: '1',
    quizId: '1',
    userId: '1',
    score: 4,
    totalQuestions: 5,
    timeSpent: 480,
    date: '2024-01-25',
    answers: [2, 1, 1, 0, 1],
    difficulty: 'medium',
    category: 'Science'
  },
  {
    id: '2',
    quizId: '3',
    userId: '1',
    score: 3,
    totalQuestions: 3,
    timeSpent: 360,
    date: '2024-01-24',
    answers: [2, 1, 0],
    difficulty: 'medium',
    category: 'Geography'
  },
  {
    id: '3',
    quizId: '4',
    userId: '1',
    score: 3,
    totalQuestions: 3,
    timeSpent: 420,
    date: '2024-01-23',
    answers: [0, 1, 2],
    difficulty: 'medium',
    category: 'Mathematics'
  },
  {
    id: '4',
    quizId: '5',
    userId: '1',
    score: 3,
    totalQuestions: 3,
    timeSpent: 320,
    date: '2024-01-22',
    answers: [1, 2, 1],
    difficulty: 'easy',
    category: 'Science'
  },
  {
    id: '5',
    quizId: '2',
    userId: '1',
    score: 2,
    totalQuestions: 3,
    timeSpent: 520,
    date: '2024-01-21',
    answers: [1, 1, 0],
    difficulty: 'hard',
    category: 'History'
  }
];

export const leaderboard: LeaderboardEntry[] = [
  {
    userId: '1',
    userName: 'Anne Williams',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces',
    totalScore: 1850,
    level: 4,
    rank: 1
  },
  {
    userId: '2',
    userName: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    totalScore: 1720,
    level: 4,
    rank: 2
  },
  {
    userId: '3',
    userName: 'Emma Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9e4ef6b?w=100&h=100&fit=crop&crop=faces',
    totalScore: 1650,
    level: 3,
    rank: 3
  },
  {
    userId: '4',
    userName: 'Michael Brown',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    totalScore: 1580,
    level: 3,
    rank: 4
  },
  {
    userId: '5',
    userName: 'Sophia Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
    totalScore: 1520,
    level: 3,
    rank: 5
  }
];
