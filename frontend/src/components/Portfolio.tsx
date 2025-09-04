import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, ArrowLeft, DollarSign, Percent, Calendar, Edit, Settings } from 'lucide-react';
import PortfolioEditor from './PortfolioEditor';

interface PortfolioProps {
  onNavigate: (page: 'landing' | 'dashboard' | 'portfolio') => void;
}

export default function Portfolio({ onNavigate }: PortfolioProps) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [portfolioHoldings, setPortfolioHoldings] = useState([
    {
      id: '1',
      issuer: 'HDFC Bank',
      type: 'Corporate Bond',
      maturity: '2027-12-15',
      yield: 8.2,
      investment: 50000,
      currentValue: 52100,
      quantity: 50,
      purchaseDate: '2023-01-15',
      notes: 'High-grade corporate bond with strong credit rating'
    },
    {
      id: '2',
      issuer: 'Reliance Industries',
      type: 'Corporate Bond',
      maturity: '2026-08-20',
      yield: 7.9,
      investment: 75000,
      currentValue: 76850,
      quantity: 75,
      purchaseDate: '2023-02-10',
      notes: 'Energy sector exposure'
    },
    {
      id: '3',
      issuer: 'Government of India',
      type: 'Government Bond',
      maturity: '2028-05-01',
      yield: 6.2,
      investment: 100000,
      currentValue: 98750,
      quantity: 100,
      purchaseDate: '2023-03-05',
      notes: 'Safe government security'
    }
  ]);

  const portfolioData = [
    { name: 'Government Bonds', value: 35, amount: '₹1,47,000', color: '#3B82F6' },
    { name: 'Corporate Bonds', value: 45, amount: '₹1,89,000', color: '#10B981' },
    { name: 'Municipal Bonds', value: 20, amount: '₹84,000', color: '#8B5CF6' }
  ];

  const growthData = [
    { month: 'Jan', value: 350000, growth: 2.5 },
    { month: 'Feb', value: 365000, growth: 4.3 },
    { month: 'Mar', value: 380000, growth: 4.1 },
    { month: 'Apr', value: 375000, growth: -1.3 },
    { month: 'May', value: 395000, growth: 5.3 },
    { month: 'Jun', value: 420000, growth: 6.3 }
  ];

  const holdings = [
    {
      id: 1,
      name: 'HDFC Bank Bond 2027',
      quantity: '₹50,000',
      currentValue: '₹52,100',
      change: '+4.2%',
      changeAmount: '+₹2,100',
      isPositive: true,
      yield: '8.2%'
    },
    {
      id: 2,
      name: 'Reliance Industries 2026',
      quantity: '₹75,000',
      currentValue: '₹76,850',
      change: '+2.5%',
      changeAmount: '+₹1,850',
      isPositive: true,
      yield: '7.9%'
    },
    {
      id: 3,
      name: 'Government Bond 2028',
      quantity: '₹100,000',
      currentValue: '₹98,750',
      change: '-1.3%',
      changeAmount: '-₹1,250',
      isPositive: false,
      yield: '6.2%'
    },
    {
      id: 4,
      name: 'TCS Corporate Bond',
      quantity: '₹40,000',
      currentValue: '₹41,200',
      change: '+3.0%',
      changeAmount: '+₹1,200',
      isPositive: true,
      yield: '7.5%'
    },
    {
      id: 5,
      name: 'SBI Infrastructure Bond',
      quantity: '₹60,000',
      currentValue: '₹61,800',
      change: '+3.0%',
      changeAmount: '+₹1,800',
      isPositive: true,
      yield: '8.1%'
    }
  ];

  const totalValue = portfolioData.reduce((sum, item) => sum + parseInt(item.amount.replace('₹', '').replace(',', '')), 0);
  const totalGain = holdings.reduce((sum, holding) => {
    const change = parseInt(holding.changeAmount.replace(/[₹+,-]/g, ''));
    return sum + change;
  }, 0);
  const totalGainPercent = ((totalGain / (totalValue - totalGain)) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('dashboard')}
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Portfolio
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsEditorOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Portfolio
              </Button>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Portfolio Value</p>
                <p className="text-2xl">₹{totalValue.toLocaleString()}</p>
              </div>
              <Badge className={`${totalGain >= 0 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-red-500'} text-white border-0 text-lg px-4 py-2`}>
                {totalGain >= 0 ? '+' : ''}₹{totalGain.toLocaleString()} ({totalGain >= 0 ? '+' : ''}{totalGainPercent}%)
              </Badge>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="xl:col-span-2 space-y-8">
            {/* Portfolio Composition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6 bg-white shadow-lg border-0">
                <h3 className="text-xl mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Portfolio Composition
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="relative">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={portfolioData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {portfolioData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload[0]) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                                  <p className="text-black">{data.name}</p>
                                  <p className="text-blue-600">{data.value}% • {data.amount}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                        <p className="text-2xl">₹{(totalValue/100000).toFixed(1)}L</p>
                        <p className="text-sm text-gray-600">Total</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {portfolioData.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <div>
                            <p className="text-sm">{item.name}</p>
                            <p className="text-xs text-gray-600">{item.value}% allocation</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{item.amount}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Growth Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 bg-white shadow-lg border-0">
                <h3 className="text-xl mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Portfolio Growth Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload[0]) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                              <p className="text-black">{label} 2024</p>
                              <p className="text-blue-600">Value: ₹{data.value.toLocaleString()}</p>
                              <p className={data.growth >= 0 ? 'text-green-600' : 'text-red-600'}>
                                Growth: {data.growth >= 0 ? '+' : ''}{data.growth}%
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="url(#gradient)" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: '#10B981' }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Holdings */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                <h3 className="text-xl mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Individual Holdings
                </h3>
                <div className="space-y-4">
                  {holdings.map((holding, index) => (
                    <motion.div
                      key={holding.id}
                      className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm truncate pr-2">{holding.name}</h4>
                          <p className="text-xs text-gray-600">Invested: {holding.quantity}</p>
                        </div>
                        <Badge className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white border-0 text-xs">
                          {holding.yield}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg">{holding.currentValue}</p>
                        </div>
                        <div className="text-right">
                          <div className={`flex items-center space-x-1 ${holding.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {holding.isPositive ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            <span className="text-sm">{holding.change}</span>
                          </div>
                          <p className={`text-xs ${holding.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {holding.changeAmount}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 gap-4"
            >
              <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700">Avg. Portfolio Yield</p>
                    <p className="text-2xl text-green-800">7.6%</p>
                  </div>
                  <Percent className="h-8 w-8 text-green-600" />
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700">Monthly Income</p>
                    <p className="text-2xl text-blue-800">₹2,640</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-700">Avg. Maturity</p>
                    <p className="text-2xl text-purple-800">3.2 years</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <PortfolioEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        portfolioData={portfolioHoldings}
        onUpdatePortfolio={setPortfolioHoldings}
      />
    </div>
  );
}