import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, Shield, Zap, BarChart3, Users, Star, Brain, ChartLine, Lock, Clock, Smartphone, Globe, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'dashboard' | 'portfolio' | 'learning') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const platformFeatures = [
    {
      id: 'marketplace',
      icon: BarChart3,
      title: 'Smart Bond Marketplace',
      description: 'Trade bonds with real-time pricing and instant liquidity',
      stats: '1,200+ Bonds',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'ai',
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get personalized investment recommendations using advanced AI',
      stats: '92% Accuracy',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 'liquidity',
      icon: Zap,
      title: 'Instant Liquidity',
      description: 'Exit your positions anytime with our liquidity matching engine',
      stats: '0.3s Response',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      id: 'analytics',
      icon: ChartLine,
      title: 'Advanced Analytics',
      description: 'Track performance with institutional-grade analytics tools',
      stats: '15+ Metrics',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: 'security',
      icon: Lock,
      title: 'Bank-Grade Security',
      description: 'Multi-layer security with regulatory compliance',
      stats: '256-bit Encryption',
      color: 'from-red-500 to-rose-500',
      bgColor: 'from-red-500/20 to-rose-500/20'
    },
    {
      id: 'mobile',
      icon: Smartphone,
      title: 'Mobile Trading',
      description: 'Trade on-the-go with our responsive platform',
      stats: '24/7 Access',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-500/20 to-purple-500/20'
    }
  ];

  const platformStats = [
    { label: 'Active Traders', value: '50K+', icon: Users },
    { label: 'Total Volume', value: '₹500Cr+', icon: TrendingUp },
    { label: 'Avg Rating', value: '4.8/5', icon: Star },
    { label: 'Uptime', value: '99.9%', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Modern glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-800/50 via-purple-800/50 to-slate-800/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Floating icons */}
          <motion.div
            className="absolute top-1/4 left-1/4 text-white/10"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <TrendingUp className="h-8 w-8" />
          </motion.div>
          
          <motion.div
            className="absolute top-1/3 right-1/4 text-white/10"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <BarChart3 className="h-6 w-6" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-1/3 left-1/3 text-white/10"
            animate={{
              y: [0, -10, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <Zap className="h-7 w-7" />
          </motion.div>
        </div>
        <motion.div 
          className="relative container mx-auto px-6 py-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="max-w-5xl mx-auto text-center text-white">
            <motion.div
              className="inline-flex items-center bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-3 mb-8"
              variants={itemVariants}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
              <span className="text-slate-300 text-sm">Live Trading • 1,200+ Bonds Available</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight"
              variants={itemVariants}
            >
              Bond Liquidity Trading Platform
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-10 text-slate-200 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Trade bonds with unprecedented liquidity, AI-powered insights, and institutional-grade analytics. 
              Experience the future of fixed-income investing.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none text-lg px-10 py-4 shadow-2xl hover:shadow-3xl transition-all duration-300 group-hover:shadow-blue-500/25"
                  onClick={() => onNavigate('dashboard')}
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Start Trading
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-slate-800/50 backdrop-blur-sm text-white hover:bg-slate-700/60 border border-purple-500/30 hover:border-purple-400/50 text-lg px-10 py-4 shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={() => onNavigate('learning')}
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Learn First
                </Button>
              </motion.div>
            </motion.div>

            {/* Platform Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
              variants={itemVariants}
            >
              {platformStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-slate-800/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 transition-all duration-300">
                    <stat.icon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                    <div className="text-2xl md:text-3xl text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-300">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Why Choose BLTP Section */}
      <section className="relative py-20 bg-slate-800/40 backdrop-blur-sm">
        <motion.div 
          className="container mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-white">
              Why Choose BLTP?
            </h2>
            <p className="text-xl text-slate-300">
              We're revolutionizing bond trading with cutting-edge technology and unmatched user experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl text-white mb-3">Lightning Fast</h3>
              <p className="text-slate-300 text-sm">Execute trades in milliseconds with our high-performance matching engine</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl text-white mb-3">AI-Powered</h3>
              <p className="text-slate-300 text-sm">Get intelligent investment recommendations powered by machine learning</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl text-white mb-3">Ultra Secure</h3>
              <p className="text-slate-300 text-sm">Bank-grade security with multi-layer encryption and regulatory compliance</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl text-white mb-3">Expert Support</h3>
              <p className="text-slate-300 text-sm">24/7 dedicated support from our team of bond trading specialists</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Platform Features Showcase */}
      <section className="relative py-20 bg-slate-800/30 backdrop-blur-sm" data-section="features">
        <motion.div 
          className="container mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Platform Features
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Experience the future of bond trading with our comprehensive suite of professional-grade tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platformFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    onHoverStart={() => setHoveredFeature(feature.id)}
                    onHoverEnd={() => setHoveredFeature(null)}
                  >
                    <Card className={`relative overflow-hidden bg-slate-800/50 backdrop-blur-sm border-purple-500/20 p-6 h-full hover:border-purple-400/60 transition-all duration-300 ${
                      hoveredFeature === feature.id ? 'shadow-2xl' : 'shadow-lg'
                    }`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 hover:opacity-100 transition-opacity duration-300`} />
                      
                      <div className="relative z-10">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        
                        <h3 className="text-xl text-white mb-3">{feature.title}</h3>
                        <p className="text-slate-300 text-sm mb-4 leading-relaxed">{feature.description}</p>
                        
                        <div className={`inline-flex items-center text-sm px-3 py-1 rounded-full bg-gradient-to-r ${feature.color} text-white`}>
                          {feature.stats}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Returns vs Liquidity Infographic */}
      <section className="relative py-20 bg-slate-700/30 backdrop-blur-sm" data-section="infographic">
        <motion.div 
          className="container mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl text-center mb-12 text-white">
              Bond Types & Performance
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 bg-slate-700/60 backdrop-blur-sm border-green-500/30 hover:border-green-400/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl text-white">Government Bonds</h3>
                      <span className="text-3xl">📈</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-200">Avg. Return:</span>
                        <span className="text-green-400 text-lg">6.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-200">Liquidity:</span>
                        <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">🟡 Medium</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-200">Risk Level:</span>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Low</Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 bg-slate-700/60 backdrop-blur-sm border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl text-white">Corporate Bonds</h3>
                      <span className="text-3xl">🚀</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-200">Avg. Return:</span>
                        <span className="text-blue-400 text-lg">8.5%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-200">Liquidity:</span>
                        <Badge className="bg-red-500/20 text-red-300 border-red-500/30">🔥 High</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-200">Risk Level:</span>
                        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Medium</Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 bg-slate-700/60 backdrop-blur-sm border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl text-white">Municipal Bonds</h3>
                      <span className="text-3xl">🏛️</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-200">Avg. Return:</span>
                        <span className="text-purple-400 text-lg">5.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-200">Liquidity:</span>
                        <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">💤 Low</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-200">Risk Level:</span>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Low</Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1592495989226-03f88104f8cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmaW5hbmNpYWwlMjBpbmZvZ3JhcGhpY3xlbnwxfHx8fDE3NTY1NjQ1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Financial Investment Infographic"
                    className="w-full max-w-md mx-auto rounded-lg shadow-2xl border border-purple-500/20"
                  />
                </motion.div>
                
                <motion.div 
                  className="mt-8 p-6 bg-slate-700/60 backdrop-blur-sm rounded-lg border border-purple-500/30"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <BarChart3 className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl text-white mb-3">Smart Investing Made Simple</h3>
                  <p className="text-slate-200 leading-relaxed">
                    Our platform helps you balance returns and liquidity based on your investment goals.
                  </p>
                  <Button 
                    className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => onNavigate('learning')}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-800/60 to-pink-800/60 backdrop-blur-sm overflow-hidden">
        {/* Floating elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <motion.div 
          className="relative container mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl text-white mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Start Trading?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Join thousands of investors already trading on BLTP and experience the future of bond investing
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-2xl hover:shadow-3xl transition-all duration-300"
                onClick={() => onNavigate('dashboard')}
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Start Trading Now
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                variant="outline"
                className="border-white/50 text-white hover:bg-white/10 text-lg px-8 py-4 backdrop-blur-sm"
                onClick={() => onNavigate('learning')}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Learn First
              </Button>
            </motion.div>
          </motion.div>

          {/* Social proof */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-3xl text-white mb-2">₹500Cr+</div>
              <div className="text-slate-300">Total Volume Traded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-white mb-2">50K+</div>
              <div className="text-slate-300">Active Investors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-white mb-2">99.9%</div>
              <div className="text-slate-300">Platform Uptime</div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}