import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Building2, Calendar, TrendingUp, Zap } from 'lucide-react';

interface BondMarketplaceProps {
  searchQuery: string;
}

export default function BondMarketplace({ searchQuery }: BondMarketplaceProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const bonds = [
    {
      id: 1,
      name: 'HDFC Bank Bond',
      issuer: 'HDFC Bank Ltd',
      coupon: '8.2%',
      maturity: 'Mar 2027',
      yield: '8.2%',
      liquidity: 'high',
      price: '₹1,02,450',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      icon: Building2
    },
    {
      id: 2,
      name: 'Reliance Industries',
      issuer: 'Reliance Industries Ltd',
      coupon: '7.9%',
      maturity: 'Dec 2026',
      yield: '7.9%',
      liquidity: 'high',
      price: '₹98,750',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      icon: Building2
    },
    {
      id: 3,
      name: 'TCS Corporate Bond',
      issuer: 'Tata Consultancy Services',
      coupon: '7.5%',
      maturity: 'Jun 2028',
      yield: '7.5%',
      liquidity: 'medium',
      price: '₹1,01,200',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      icon: Building2
    },
    {
      id: 4,
      name: 'SBI Infrastructure',
      issuer: 'State Bank of India',
      coupon: '8.1%',
      maturity: 'Sep 2025',
      yield: '8.1%',
      liquidity: 'high',
      price: '₹99,850',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      icon: Building2
    },
    {
      id: 5,
      name: 'ICICI Bank Bond',
      issuer: 'ICICI Bank Ltd',
      coupon: '7.7%',
      maturity: 'Jan 2029',
      yield: '7.7%',
      liquidity: 'medium',
      price: '₹1,00,500',
      gradient: 'from-teal-500 to-blue-500',
      bgGradient: 'from-teal-50 to-blue-50',
      icon: Building2
    },
    {
      id: 6,
      name: 'Infosys Corporate',
      issuer: 'Infosys Ltd',
      coupon: '7.3%',
      maturity: 'Aug 2027',
      yield: '7.3%',
      liquidity: 'low',
      price: '₹97,900',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      icon: Building2
    }
  ];

  const getLiquidityBadge = (liquidity: string) => {
    switch (liquidity) {
      case 'high':
        return { text: '🔥 High', className: 'bg-gradient-to-r from-red-400 to-orange-500 text-white' };
      case 'medium':
        return { text: '🟡 Medium', className: 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' };
      case 'low':
        return { text: '💤 Low', className: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white' };
      default:
        return { text: '🟡 Medium', className: 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' };
    }
  };

  const filteredBonds = bonds.filter(bond =>
    bond.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bond.issuer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-6 bg-white shadow-lg border-0">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bond Marketplace
          </h3>
          <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 px-3 py-1">
            {filteredBonds.length} bonds available
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBonds.map((bond, index) => (
            <motion.div
              key={bond.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              onHoverStart={() => setHoveredCard(bond.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ y: -5 }}
              className="relative"
            >
              <Card className={`p-5 bg-gradient-to-br ${bond.bgGradient} border-0 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                {/* Glowing effect on hover */}
                {hoveredCard === bond.id && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${bond.gradient} opacity-10`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${bond.gradient}`}>
                        <bond.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm mb-1">{bond.name}</h4>
                        <p className="text-xs text-gray-600">{bond.issuer}</p>
                      </div>
                    </div>
                    <Badge className={getLiquidityBadge(bond.liquidity).className}>
                      {getLiquidityBadge(bond.liquidity).text}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <TrendingUp className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">Coupon</span>
                      </div>
                      <p className="text-lg">{bond.coupon}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <Calendar className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">Maturity</span>
                      </div>
                      <p className="text-sm">{bond.maturity}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs text-gray-500">Current Yield</span>
                      <p className="text-xl text-green-600">{bond.yield}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">Price</span>
                      <p className="text-lg">{bond.price}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className={`flex-1 bg-gradient-to-r ${bond.gradient} hover:shadow-lg transition-all duration-300 text-white border-0`}
                      style={hoveredCard === bond.id ? { 
                        boxShadow: `0 0 20px rgba(59, 130, 246, 0.5)`,
                        transform: 'translateY(-2px)'
                      } : {}}
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Buy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-300 hover:bg-gray-50 transition-all duration-300"
                    >
                      Sell
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredBonds.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-gray-400" />
            </div>
            <h4 className="text-lg text-gray-600 mb-2">No bonds found</h4>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}