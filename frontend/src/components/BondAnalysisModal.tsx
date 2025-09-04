import React from 'react';
import { motion } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Activity, DollarSign, Clock, Shield, AlertTriangle, Star } from 'lucide-react';

interface BondData {
  id: number;
  issuer: string;
  liquidity: number;
  yield: number;
  volume: string;
  trend: 'up' | 'down';
  trendValue: string;
  score: string;
  responseTime: string;
}

interface BondAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  bondData: BondData | null;
}

export default function BondAnalysisModal({ isOpen, onClose, bondData }: BondAnalysisModalProps) {
  if (!bondData) return null;

  // Generate mock historical data
  const historicalData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    liquidity: bondData.liquidity + Math.random() * 20 - 10,
    yield: bondData.yield + Math.random() * 2 - 1,
    volume: Math.floor(Math.random() * 50 + 20),
    trades: Math.floor(Math.random() * 100 + 50)
  }));

  const riskMetrics = [
    { name: 'Credit Risk', value: Math.floor(Math.random() * 30 + 10), color: 'bg-red-500' },
    { name: 'Market Risk', value: Math.floor(Math.random() * 40 + 20), color: 'bg-orange-500' },
    { name: 'Liquidity Risk', value: Math.floor(Math.random() * 25 + 5), color: 'bg-yellow-500' },
    { name: 'Interest Rate Risk', value: Math.floor(Math.random() * 35 + 15), color: 'bg-purple-500' }
  ];

  const fundamentals = {
    maturityDate: '2028-12-15',
    couponRate: (bondData.yield - 0.5).toFixed(1),
    faceValue: '₹1,000',
    currentPrice: '₹' + (1000 + Math.random() * 100 - 50).toFixed(0),
    duration: '4.2 years',
    convexity: '18.7',
    creditRating: bondData.score === 'A+' ? 'AAA' : bondData.score === 'A' ? 'AA+' : 'AA',
    sector: ['Banking', 'Technology', 'Energy', 'Healthcare'][Math.floor(Math.random() * 4)]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {bondData.issuer} Bond Analysis
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="risk">Risk Profile</TabsTrigger>
            <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Key Metrics */}
              <Card className="p-6">
                <h3 className="text-lg mb-4">Live Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Liquidity Score</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={bondData.liquidity} className="w-20" />
                      <span>{bondData.liquidity}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Current Yield</span>
                    <span className="text-green-600">{bondData.yield}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">24h Volume</span>
                    <span>{bondData.volume}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="text-blue-600">{bondData.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Trend</span>
                    <div className={`flex items-center space-x-1 ${bondData.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {bondData.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span>{bondData.trendValue}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Star className="w-4 h-4 mr-2" />
                    Add to Watchlist
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Activity className="w-4 h-4 mr-2" />
                    Set Price Alert
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule Trade
                  </Button>
                </div>
              </Card>
            </div>

            {/* Liquidity Trend */}
            <Card className="p-6">
              <h3 className="text-lg mb-4">30-Day Liquidity Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="liquidity" stroke="#3B82F6" fill="#3B82F650" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg mb-4">Yield History</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="yield" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg mb-4">Trading Volume</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={historicalData.slice(-7)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="volume" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg mb-4">Trade Frequency</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="trades" stroke="#F59E0B" fill="#F59E0B50" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg mb-4">Risk Breakdown</h3>
                <div className="space-y-4">
                  {riskMetrics.map((risk, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">{risk.name}</span>
                        <span className="text-sm">{risk.value}%</span>
                      </div>
                      <Progress value={risk.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg mb-4">Risk Score</h3>
                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {Math.round(riskMetrics.reduce((sum, risk) => sum + risk.value, 0) / riskMetrics.length)}
                  </div>
                  <Badge className="mb-4 bg-yellow-100 text-yellow-800">
                    Moderate Risk
                  </Badge>
                  <p className="text-sm text-gray-600">
                    Based on credit, market, liquidity, and interest rate risk factors
                  </p>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg mb-4">Risk Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm">Interest rate volatility expected this week</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Credit rating stable with positive outlook</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="fundamentals" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg mb-4">Bond Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Maturity Date</span>
                    <span>{fundamentals.maturityDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coupon Rate</span>
                    <span>{fundamentals.couponRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Face Value</span>
                    <span>{fundamentals.faceValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Price</span>
                    <span>{fundamentals.currentPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span>{fundamentals.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Convexity</span>
                    <span>{fundamentals.convexity}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg mb-4">Credit Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Credit Rating</span>
                    <Badge className="bg-green-100 text-green-800">{fundamentals.creditRating}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sector</span>
                    <span>{fundamentals.sector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Issuer</span>
                    <span>{bondData.issuer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed Exchange</span>
                    <span>NSE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ISIN</span>
                    <span>INE{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg mb-4">Recent News & Updates</h3>
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                  <p className="text-sm">Q3 earnings beat expectations by 12%</p>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
                <div className="p-3 border-l-4 border-green-500 bg-green-50">
                  <p className="text-sm">Credit rating upgraded to {fundamentals.creditRating}</p>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>
                <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                  <p className="text-sm">New bond issuance announced for Q1 2024</p>
                  <span className="text-xs text-gray-500">2 weeks ago</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}