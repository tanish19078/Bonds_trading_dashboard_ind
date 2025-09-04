import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle, 
  Play, 
  FileText, 
  Star,
  Clock,
  Users,
  Download,
  ExternalLink,
  Shield,
  Calculator,
  BarChart3,
  Lightbulb,
  Target,
  DollarSign,
  Info
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LearningDashboardProps {
  onNavigate: (page: 'landing' | 'dashboard' | 'portfolio' | 'learning') => void;
}

export default function LearningDashboard({ onNavigate }: LearningDashboardProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>(['basics']);

  const learningModules = [
    {
      id: 'basics',
      title: 'Bond Basics',
      description: 'Understanding what bonds are and how they work',
      duration: '15 min',
      difficulty: 'Beginner',
      progress: 100,
      icon: BookOpen,
      color: 'from-green-500 to-emerald-600',
      topics: [
        'What are bonds?',
        'Types of bonds',
        'Bond vs Stock investing',
        'Key bond terminology'
      ]
    },
    {
      id: 'yield',
      title: 'Yield & Returns',
      description: 'How to calculate and understand bond yields',
      duration: '20 min',
      difficulty: 'Intermediate',
      progress: 65,
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-600',
      topics: [
        'Current yield vs YTM',
        'Yield curve analysis',
        'Interest rate impact',
        'Real vs nominal returns'
      ]
    },
    {
      id: 'risks',
      title: 'Risk Management',
      description: 'Understanding and managing bond investment risks',
      duration: '25 min',
      difficulty: 'Advanced',
      progress: 30,
      icon: AlertTriangle,
      color: 'from-red-500 to-pink-600',
      topics: [
        'Credit risk assessment',
        'Interest rate risk',
        'Inflation risk',
        'Liquidity risk'
      ]
    },
    {
      id: 'portfolio',
      title: 'Portfolio Construction',
      description: 'Building diversified bond portfolios',
      duration: '30 min',
      difficulty: 'Advanced',
      progress: 0,
      icon: Target,
      color: 'from-purple-500 to-indigo-600',
      topics: [
        'Asset allocation',
        'Duration matching',
        'Diversification strategies',
        'Rebalancing'
      ]
    }
  ];

  const marketNews = [
    {
      id: 1,
      title: 'RBI Keeps Repo Rate Unchanged at 6.5%',
      source: 'Reserve Bank of India',
      time: '2 hours ago',
      impact: 'Neutral',
      summary: 'Monetary Policy Committee maintains status quo on interest rates citing inflation concerns.',
      tag: 'Policy Update'
    },
    {
      id: 2,
      title: 'Corporate Bond Issuances Rise 15% in Q4',
      source: 'Economic Times',
      time: '5 hours ago',
      impact: 'Positive',
      summary: 'Increased corporate funding requirements drive higher bond market activity.',
      tag: 'Market Trends'
    },
    {
      id: 3,
      title: 'Government Bond Yields Show Stability',
      source: 'Business Standard',
      time: '1 day ago',
      impact: 'Neutral',
      summary: '10-year G-Sec yields remain range-bound as market awaits policy signals.',
      tag: 'Government Bonds'
    }
  ];

  const riskFactors = [
    {
      risk: 'Credit Risk',
      level: 'Medium',
      description: 'Risk of issuer defaulting on payments',
      mitigation: 'Invest in rated bonds and diversify across issuers',
      color: 'orange'
    },
    {
      risk: 'Interest Rate Risk',
      level: 'High',
      description: 'Bond prices fall when interest rates rise',
      mitigation: 'Match bond duration to investment horizon',
      color: 'red'
    },
    {
      risk: 'Inflation Risk',
      level: 'Medium',
      description: 'Real returns may be eroded by inflation',
      mitigation: 'Consider inflation-indexed bonds',
      color: 'yellow'
    },
    {
      risk: 'Liquidity Risk',
      level: 'Low',
      description: 'Difficulty in selling bonds before maturity',
      mitigation: 'Use our high-liquidity platform for easy exits',
      color: 'green'
    }
  ];

  const documents = [
    {
      title: 'Bond Investment Guide 2024',
      type: 'PDF',
      size: '2.4 MB',
      downloads: 1247,
      category: 'Education'
    },
    {
      title: 'Risk Assessment Framework',
      type: 'PDF',
      size: '1.8 MB',
      downloads: 892,
      category: 'Risk Management'
    },
    {
      title: 'Indian Bond Market Analysis',
      type: 'XLSX',
      size: '3.1 MB',
      downloads: 534,
      category: 'Market Data'
    },
    {
      title: 'Portfolio Allocation Templates',
      type: 'PDF',
      size: '1.2 MB',
      downloads: 756,
      category: 'Tools'
    }
  ];

  const markModuleComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Header */}
      <div className="relative z-10 bg-slate-800/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => onNavigate('landing')}
                className="text-white hover:bg-slate-700/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl text-white">Bond Learning Hub</h1>
                <p className="text-slate-300">Master bond investing with expert guidance</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => onNavigate('dashboard')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Start Trading
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20">
            <TabsTrigger value="modules" className="data-[state=active]:bg-purple-600">
              <BookOpen className="h-4 w-4 mr-2" />
              Learning Modules
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-purple-600">
              <FileText className="h-4 w-4 mr-2" />
              Market News
            </TabsTrigger>
            <TabsTrigger value="risks" className="data-[state=active]:bg-purple-600">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Risk Analysis
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-purple-600">
              <Download className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>

          {/* Learning Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {learningModules.map((module) => {
                const Icon = module.icon;
                const isCompleted = completedModules.includes(module.id);
                
                return (
                  <motion.div
                    key={module.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 p-6 h-full hover:border-purple-400/40 transition-all duration-300">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg text-white">{module.title}</h3>
                          {isCompleted && (
                            <Badge className="bg-green-600 text-white">
                              <Star className="h-3 w-3 mr-1" />
                              Done
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-slate-300 text-sm">{module.description}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-slate-400">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {module.duration}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {module.difficulty}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Progress</span>
                            <span className="text-white">{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>

                        <ul className="space-y-1 text-xs text-slate-400">
                          {module.topics.map((topic, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-1 h-1 bg-purple-400 rounded-full mr-2" />
                              {topic}
                            </li>
                          ))}
                        </ul>

                        <Button 
                          className="w-full mt-4"
                          variant={isCompleted ? "outline" : "default"}
                          onClick={() => {
                            setSelectedModule(module.id);
                            if (module.progress < 100) {
                              markModuleComplete(module.id);
                            }
                          }}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {isCompleted ? 'Review' : 'Start Learning'}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Progress Overview */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 p-6">
              <h3 className="text-xl text-white mb-4">Your Learning Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl text-purple-400 mb-2">{completedModules.length}</div>
                  <div className="text-slate-300">Modules Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-blue-400 mb-2">
                    {Math.round(learningModules.reduce((acc, module) => acc + module.progress, 0) / learningModules.length)}%
                  </div>
                  <div className="text-slate-300">Overall Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-green-400 mb-2">2.5h</div>
                  <div className="text-slate-300">Learning Time</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Market News Tab */}
          <TabsContent value="news" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl text-white">Latest Market News</h3>
                {marketNews.map((news) => (
                  <Card key={news.id} className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={`${
                        news.impact === 'Positive' ? 'bg-green-600' :
                        news.impact === 'Negative' ? 'bg-red-600' : 'bg-gray-600'
                      } text-white`}>
                        {news.tag}
                      </Badge>
                      <span className="text-xs text-slate-400">{news.time}</span>
                    </div>
                    <h4 className="text-lg text-white mb-2">{news.title}</h4>
                    <p className="text-slate-300 text-sm mb-3">{news.summary}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">{news.source}</span>
                      <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Read More
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl text-white">Market Insights</h3>
                <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 p-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
                    <h4 className="text-lg text-white">Bond Market Overview</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">10Y Government Bond</span>
                      <span className="text-green-400">7.15% ↑</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">AAA Corporate Average</span>
                      <span className="text-blue-400">8.25% →</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">RBI Repo Rate</span>
                      <span className="text-gray-400">6.50% →</span>
                    </div>
                  </div>
                </Card>

                <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 p-6">
                  <div className="flex items-center mb-4">
                    <Lightbulb className="h-5 w-5 text-yellow-400 mr-2" />
                    <h4 className="text-lg text-white">Expert Tip</h4>
                  </div>
                  <p className="text-slate-300 text-sm">
                    With stable repo rates, this is an ideal time to lock in longer-duration bonds 
                    for better yields. Consider diversifying across government and high-rated corporate bonds.
                  </p>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Risk Analysis Tab */}
          <TabsContent value="risks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl text-white">Bond Investment Risks</h3>
                {riskFactors.map((risk, index) => (
                  <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg text-white">{risk.risk}</h4>
                      <Badge className={`${
                        risk.color === 'red' ? 'bg-red-600' :
                        risk.color === 'orange' ? 'bg-orange-600' :
                        risk.color === 'yellow' ? 'bg-yellow-600' : 'bg-green-600'
                      } text-white`}>
                        {risk.level}
                      </Badge>
                    </div>
                    <p className="text-slate-300 text-sm mb-3">{risk.description}</p>
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-start">
                        <Shield className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-blue-400 mb-1">Mitigation Strategy</div>
                          <p className="text-slate-300 text-sm">{risk.mitigation}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl text-white">Risk Assessment Tools</h3>
                
                <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 p-6">
                  <div className="flex items-center mb-4">
                    <Calculator className="h-5 w-5 text-purple-400 mr-2" />
                    <h4 className="text-lg text-white">Bond Risk Calculator</h4>
                  </div>
                  <p className="text-slate-300 text-sm mb-4">
                    Assess the risk profile of any bond based on credit rating, duration, and market conditions.
                  </p>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                    <Calculator className="h-4 w-4 mr-2" />
                    Launch Calculator
                  </Button>
                </Card>

                <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 p-6">
                  <div className="flex items-center mb-4">
                    <BarChart3 className="h-5 w-5 text-blue-400 mr-2" />
                    <h4 className="text-lg text-white">Portfolio Risk Analyzer</h4>
                  </div>
                  <p className="text-slate-300 text-sm mb-4">
                    Analyze the overall risk of your bond portfolio and get optimization suggestions.
                  </p>
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analyze Portfolio
                  </Button>
                </Card>

                <Card className="bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-sm border-red-500/20 p-6">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg text-white mb-2">Risk Disclaimer</h4>
                      <p className="text-slate-300 text-sm">
                        Bond investments carry risks including credit risk, interest rate risk, and inflation risk. 
                        Past performance does not guarantee future results. Please consider your risk tolerance 
                        and investment objectives before investing.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl text-white">Download Resources</h3>
                {documents.map((doc, index) => (
                  <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white">{doc.title}</h4>
                          <div className="flex items-center space-x-3 text-xs text-slate-400">
                            <span>{doc.type}</span>
                            <span>{doc.size}</span>
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {doc.downloads}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{doc.category}</Badge>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl text-white">Quick References</h3>
                
                <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 p-6">
                  <h4 className="text-lg text-white mb-4">Bond Rating Scale</h4>
                  <div className="space-y-2">
                    {[
                      { rating: 'AAA', description: 'Highest credit quality', color: 'green' },
                      { rating: 'AA', description: 'High credit quality', color: 'blue' },
                      { rating: 'A', description: 'Good credit quality', color: 'yellow' },
                      { rating: 'BBB', description: 'Investment grade', color: 'orange' },
                      { rating: 'Below BBB', description: 'Speculative grade', color: 'red' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-white">{item.rating}</span>
                        <span className={`text-sm text-${item.color}-400`}>{item.description}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 p-6">
                  <h4 className="text-lg text-white mb-4">Key Formulas</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-slate-700/50 rounded p-3">
                      <div className="text-blue-400 mb-1">Current Yield</div>
                      <div className="text-slate-300 font-mono">= Annual Coupon / Current Price</div>
                    </div>
                    <div className="bg-slate-700/50 rounded p-3">
                      <div className="text-purple-400 mb-1">Duration</div>
                      <div className="text-slate-300 font-mono">= Price sensitivity to interest rate changes</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}