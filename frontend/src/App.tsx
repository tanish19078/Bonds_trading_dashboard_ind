import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio';
import LearningDashboard from './components/LearningDashboard';
import AIChat from './components/AIChat';
import NewsTicker from './components/NewsTicker';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'portfolio' | 'learning'>('landing');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Modern glassmorphism overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
      
      <NewsTicker />
      
      <AnimatePresence mode="wait">
        {currentPage === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <LandingPage onNavigate={setCurrentPage} />
          </motion.div>
        )}
        
        {currentPage === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard onNavigate={setCurrentPage} />
          </motion.div>
        )}
        
        {currentPage === 'portfolio' && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Portfolio onNavigate={setCurrentPage} />
          </motion.div>
        )}

        {currentPage === 'learning' && (
          <motion.div
            key="learning"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <LearningDashboard onNavigate={setCurrentPage} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* AI Chat with manual control only */}
      <AIChat />
    </div>
  );
}