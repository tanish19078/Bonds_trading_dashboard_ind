import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Search, User, TrendingUp, DollarSign, Activity, Crown, Medal, Award, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import BondMarketplace from './BondMarketplace';
import LiquidityHeatmap from './LiquidityHeatmap';
import AutoPayCard from './AutoPayCard';

interface DashboardProps {
  onNavigate: (page: 'landing' | 'dashboard' | 'portfolio' | 'learning') => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Indian Market Indices
  const marketIndices = [
    {
      name: 'Nifty 50',
      value: '22,145.60',
      change: '+267.85',
      changePercent: '+1.22%',
      isPositive: true
    },
    {
      name: 'Sensex',
      value: '73,088.33',
      change: '+759.05',
      changePercent: '+1.05%',
      isPositive: true
    },
    {
      name: 'Nifty Bank',
      value: '48,756.20',
      change: '-125.40',
      changePercent: '-0.26%',
      isPositive: false
    },
    {
      name: 'Bond Index',
      value: '287.45',
      change: '+2.15',
      changePercent: '+0.75%',
      isPositive: true
    }
  ];

  const kpiData = [
    {
      title: 'Total Volume',
      value: '₹2.4Cr',
      change: '+12.5%',
      icon: DollarSign,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-slate-800/50'
    },
    {
      title: 'Avg Yield',
      value: '7.8%',
      change: '+0.3%',
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-slate-800/50'
    },
    {
      title: 'Avg Liquidity',
      value: '85%',
      change: '+2.1%',
      icon: Activity,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-slate-800/50'
    }
  ];

  const leaderboardData = [
    { rank: 1, name: 'HDFC Bank Bond 2027', volume: '₹45L', yield: '8.2%', icon: Crown, color: 'text-yellow-500' },
    { rank: 2, name: 'Reliance Industries 2026', volume: '₹38L', yield: '7.9%', icon: Medal, color: 'text-gray-400' },
    { rank: 3, name: 'TCS Corporate Bond', volume: '₹32L', yield: '7.5%', icon: Award, color: 'text-orange-500' },
    { rank: 4, name: 'SBI Infrastructure Bond', volume: '₹28L', yield: '8.1%', icon: null, color: 'text-blue-500' },
    { rank: 5, name: 'ICICI Bank Bond 2028', volume: '₹25L', yield: '7.7%', icon: null, color: 'text-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Modern glassmorphism overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
      
      {/* Top Navigation */}
      <motion.header 
        className="relative z-10 bg-slate-800/50 backdrop-blur-sm border-b border-purple-500/20"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                BLTP
              </h1>
              
              <nav className="hidden md:flex space-x-6">
                <Button 
                  variant="ghost" 
                  className="text-blue-400 hover:text-blue-300 hover:bg-slate-700/50"
                  onClick={() => onNavigate('dashboard')}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-slate-300 hover:text-white hover:bg-slate-700/50"
                  onClick={() => onNavigate('portfolio')}
                >
                  Portfolio
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-slate-300 hover:text-white hover:bg-slate-700/50"
                  onClick={() => onNavigate('learning')}
                >
                  Learn
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-slate-300 hover:text-white hover:bg-slate-700/50"
                  onClick={() => onNavigate('landing')}
                >
                  Home
                </Button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input 
                  placeholder="Search bonds..."
                  className="pl-10 w-64 bg-slate-700/50 border-purple-500/20 text-white placeholder:text-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-3 bg-slate-700/50 backdrop-blur-sm border border-green-500/20 px-4 py-2 rounded-lg">
                <div className="text-right">
                  <p className="text-sm text-slate-300">Wallet Balance</p>
                  <p className="text-lg text-green-400">₹4,25,000</p>
                </div>
                <Avatar>
                  <AvatarImage src="/api/placeholder/40/40" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Indian Market Indices */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {marketIndices.map((index, i) => (
            <Card key={index.name} className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm text-slate-300">{index.name}</h4>
                <BarChart3 className="h-4 w-4 text-purple-400" />
              </div>
              <div className="space-y-1">
                <p className="text-lg text-white">{index.value}</p>
                <div className={`flex items-center text-sm ${index.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {index.isPositive ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  <span>{index.change}</span>
                  <span className="ml-1">({index.changePercent})</span>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
        {/* KPI Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className={`p-6 bg-gradient-to-r ${kpi.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{kpi.title}</p>
                    <p className="text-3xl mb-2">{kpi.value}</p>
                    <Badge className={`bg-gradient-to-r ${kpi.gradient} text-white border-0`}>
                      {kpi.change}
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-r ${kpi.gradient}`}>
                    <kpi.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Liquidity Score Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm opacity-90">Live Market Liquidity</span>
                </div>
                <div className="text-3xl">92.5</div>
                <div className="text-sm opacity-75">
                  <div>Market Score</div>
                  <div className="text-green-300">+2.1% from yesterday</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-75 mb-1">Active Bonds</div>
                <div className="text-2xl">1,247</div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-75 mb-1">Avg Response Time</div>
                <div className="text-2xl">0.3s</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Marketplace & Heatmap */}
          <div className="xl:col-span-2 space-y-8">
            <BondMarketplace searchQuery={searchQuery} />
            <LiquidityHeatmap />
          </div>

          {/* Right Column - Leaderboard & AutoPay */}
          <div className="space-y-8">
            {/* Trading Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                <h3 className="text-xl mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  🏆 Most Traded Bonds Today
                </h3>
                <div className="space-y-4">
                  {leaderboardData.map((item, index) => (
                    <motion.div
                      key={item.rank}
                      className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${item.rank <= 3 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-100'}`}>
                          {item.icon ? (
                            <item.icon className={`h-4 w-4 ${item.color}`} />
                          ) : (
                            <span className={`text-sm ${item.color}`}>{item.rank}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm truncate max-w-32">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.volume}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0">
                          {item.yield}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <AutoPayCard />
          </div>
        </div>
      </div>
    </div>
  );
}