import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TrendingUp, TrendingDown, Activity, Zap, DollarSign, Search, Filter, BarChart3 } from 'lucide-react';
import { useWebSocket } from '../hooks/useWebSocket';
import BondAnalysisModal from './BondAnalysisModal';

export default function LiquidityHeatmap() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedBond, setSelectedBond] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('liquidity');
  const [filterBy, setFilterBy] = useState('all');
  const { isConnected, liveData, getLatestDataForBond } = useWebSocket();

  const [heatmapData, setHeatmapData] = useState([
    {
      id: 1,
      issuer: 'HDFC Bank',
      liquidity: 92,
      yield: 8.2,
      volume: '₹45L',
      trend: 'up' as const,
      trendValue: '+2.3%',
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50',
      score: 'A+',
      responseTime: '0.2s'
    },
    {
      id: 2,
      issuer: 'Reliance',
      liquidity: 88,
      yield: 7.9,
      volume: '₹38L',
      trend: 'up' as const,
      trendValue: '+1.8%',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      score: 'A+',
      responseTime: '0.3s'
    },
    {
      id: 3,
      issuer: 'TCS',
      liquidity: 75,
      yield: 7.5,
      volume: '₹32L',
      trend: 'down' as const,
      trendValue: '-0.5%',
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50',
      score: 'A',
      responseTime: '0.5s'
    },
    {
      id: 4,
      issuer: 'SBI',
      liquidity: 85,
      yield: 8.1,
      volume: '₹28L',
      trend: 'up' as const,
      trendValue: '+3.1%',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      score: 'A+',
      responseTime: '0.4s'
    },
    {
      id: 5,
      issuer: 'ICICI Bank',
      liquidity: 78,
      yield: 7.7,
      volume: '₹25L',
      trend: 'up' as const,
      trendValue: '+1.2%',
      gradient: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50',
      score: 'A',
      responseTime: '0.6s'
    },
    {
      id: 6,
      issuer: 'Infosys',
      liquidity: 65,
      yield: 7.3,
      volume: '₹20L',
      trend: 'down' as const,
      trendValue: '-1.1%',
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50',
      score: 'B+',
      responseTime: '0.8s'
    },
    {
      id: 7,
      issuer: 'Wipro',
      liquidity: 60,
      yield: 7.1,
      volume: '₹18L',
      trend: 'down' as const,
      trendValue: '-0.8%',
      gradient: 'from-pink-500 to-purple-500',
      bgGradient: 'from-pink-50 to-purple-50',
      score: 'B+',
      responseTime: '1.0s'
    },
    {
      id: 8,
      issuer: 'Axis Bank',
      liquidity: 82,
      yield: 8.0,
      volume: '₹24L',
      trend: 'up' as const,
      trendValue: '+2.7%',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      score: 'A',
      responseTime: '0.4s'
    }
  ]);

  // Update data with WebSocket live updates
  useEffect(() => {
    setHeatmapData(prevData => 
      prevData.map(item => {
        const liveUpdate = getLatestDataForBond(item.issuer.split(' ')[0]);
        if (liveUpdate) {
          return {
            ...item,
            liquidity: liveUpdate.liquidity,
            yield: liveUpdate.yield,
            volume: liveUpdate.volume,
            trend: liveUpdate.trend,
            trendValue: liveUpdate.trendValue
          };
        }
        return item;
      })
    );
  }, [liveData, getLatestDataForBond]);

  // Filter and sort data
  const filteredData = heatmapData.filter(item => {
    const matchesSearch = item.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'high' && item.liquidity >= 80) ||
                         (filterBy === 'medium' && item.liquidity >= 60 && item.liquidity < 80) ||
                         (filterBy === 'low' && item.liquidity < 60) ||
                         (filterBy === 'trending-up' && item.trend === 'up') ||
                         (filterBy === 'trending-down' && item.trend === 'down');
    return matchesSearch && matchesFilter;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'liquidity': return b.liquidity - a.liquidity;
      case 'yield': return b.yield - a.yield;
      case 'volume': return parseInt(b.volume.replace(/[₹L]/g, '')) - parseInt(a.volume.replace(/[₹L]/g, ''));
      case 'issuer': return a.issuer.localeCompare(b.issuer);
      default: return 0;
    }
  });

  const handleCardClick = (bond: any) => {
    setSelectedBond(bond);
    setIsModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="p-6 bg-gradient-to-br from-slate-50 to-indigo-50 border-indigo-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h3 className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Liquidity Analytics
            </h3>
            <div className={`flex items-center space-x-2 ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-xs">{isConnected ? 'Live' : 'Offline'}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0">
              🔥 Real-time
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white border-0">
              ⚡ Live Data
            </Badge>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search bonds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="liquidity">Liquidity</SelectItem>
              <SelectItem value="yield">Yield</SelectItem>
              <SelectItem value="volume">Volume</SelectItem>
              <SelectItem value="issuer">Issuer</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bonds</SelectItem>
              <SelectItem value="high">High Liquidity</SelectItem>
              <SelectItem value="medium">Medium Liquidity</SelectItem>
              <SelectItem value="low">Low Liquidity</SelectItem>
              <SelectItem value="trending-up">Trending Up</SelectItem>
              <SelectItem value="trending-down">Trending Down</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              onHoverStart={() => setHoveredCard(item.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative"
            >
              <Card className={`p-4 bg-gradient-to-br ${item.bgGradient} border-0 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                {/* Glowing effect on hover */}
                {hoveredCard === item.id && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1.5 rounded-lg bg-gradient-to-r ${item.gradient}`}>
                        <Activity className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm truncate">{item.issuer}</h4>
                        <Badge className={`text-xs px-2 py-0.5 ${item.score === 'A+' ? 'bg-green-100 text-green-800' : item.score === 'A' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                          {item.score}
                        </Badge>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 text-xs ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      <span>{item.trendValue}</span>
                    </div>
                  </div>

                  {/* Liquidity Score */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Liquidity Score</span>
                      <span className="text-lg">{item.liquidity}%</span>
                    </div>
                    <Progress 
                      value={item.liquidity} 
                      className="h-2 bg-gray-200"
                      style={{ 
                        background: `linear-gradient(to right, ${item.liquidity > 80 ? '#10B981' : item.liquidity > 60 ? '#F59E0B' : '#EF4444'} 0%, ${item.liquidity > 80 ? '#10B981' : item.liquidity > 60 ? '#F59E0B' : '#EF4444'} ${item.liquidity}%, #E5E7EB ${item.liquidity}%)`
                      }}
                    />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <span className="text-gray-600">Yield</span>
                      <p className="text-green-700">{item.yield}%</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Volume</span>
                      <p>{item.volume}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Response</span>
                      <p className="text-blue-700">{item.responseTime}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Status</span>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${item.liquidity > 80 ? 'bg-green-500 animate-pulse' : item.liquidity > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                        <span className="text-xs">{item.liquidity > 80 ? 'Live' : item.liquidity > 60 ? 'Active' : 'Slow'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-1">
                    <motion.button
                      className={`flex-1 py-1.5 px-2 rounded text-xs bg-gradient-to-r ${item.gradient} text-white hover:shadow-md transition-all duration-200`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Zap className="h-3 w-3 inline mr-1" />
                      Trade
                    </motion.button>
                    <motion.button
                      className="flex-1 py-1.5 px-2 rounded text-xs border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCardClick(item)}
                    >
                      <BarChart3 className="h-3 w-3 inline mr-1" />
                      Analyze
                    </motion.button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Real-time liquidity analytics with instant market data. 
            <span className="text-indigo-600 ml-1">Showing {sortedData.length} of {heatmapData.length} bonds.</span>
          </p>
        </div>
      </Card>

      <BondAnalysisModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bondData={selectedBond}
      />
    </motion.div>
  );
}