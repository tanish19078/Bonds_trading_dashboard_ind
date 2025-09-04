import React from 'react';
import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { TrendingUp, AlertCircle, Info } from 'lucide-react';

export default function NewsTicker() {
  const newsItems = [
    {
      id: 1,
      text: "RBI keeps repo rate unchanged at 6.5% - Bond markets remain stable",
      type: "neutral" as const,
      icon: Info
    },
    {
      id: 2,
      text: "Corporate bond issuances up 15% in Q4 - Increased liquidity expected",
      type: "positive" as const,
      icon: TrendingUp
    },
    {
      id: 3,
      text: "New SEBI guidelines for retail bond trading effective next month",
      type: "alert" as const,
      icon: AlertCircle
    },
    {
      id: 4,
      text: "Government announces ₹50,000 Cr infrastructure bond program",
      type: "positive" as const,
      icon: TrendingUp
    },
    {
      id: 5,
      text: "Banking sector bond yields show upward trend - Monitor your portfolio",
      type: "neutral" as const,
      icon: Info
    }
  ];

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'alert':
        return 'bg-gradient-to-r from-orange-500 to-red-500 text-white';
      default:
        return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white';
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-2 overflow-hidden relative"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 px-4 py-1">
          <Badge className="bg-red-500 text-white border-0 animate-pulse">
            LIVE
          </Badge>
          <span className="ml-2 text-sm">Market Updates</span>
        </div>
        
        <div className="flex-1 relative overflow-hidden">
          <motion.div
            className="flex space-x-8 whitespace-nowrap"
            animate={{
              x: ['0%', '-100%']
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {[...newsItems, ...newsItems].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center space-x-2 text-sm"
              >
                <div className={`p-1 rounded-full ${getTypeStyles(item.type)}`}>
                  <item.icon className="h-3 w-3" />
                </div>
                <span>{item.text}</span>
                <div className="w-px h-4 bg-gray-600 mx-4"></div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}