import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CreditCard, Calendar, Zap, Settings, TrendingUp } from 'lucide-react';

export default function AutoPayCard() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [frequency, setFrequency] = useState('monthly');

  const sipDetails = {
    amount: '₹10,000',
    nextDate: 'Feb 15, 2024',
    totalInvested: '₹1,20,000',
    currentValue: '₹1,26,400',
    returns: '+₹6,400 (5.3%)'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                AutoPay SIP
              </h3>
              <p className="text-sm text-green-600">Systematic Investment Plan</p>
            </div>
          </div>
          <Switch 
            checked={isEnabled} 
            onCheckedChange={setIsEnabled}
            className="data-[state=checked]:bg-green-500"
          />
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-700">Investment Amount</span>
            </div>
            <span className="text-lg text-green-800">{sipDetails.amount}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-700">Next Investment</span>
            </div>
            <span className="text-sm">{sipDetails.nextDate}</span>
          </div>

          <div className="p-3 bg-white rounded-lg border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Frequency</span>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-gradient-to-r from-white to-green-50 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <h4 className="text-sm text-green-800">SIP Performance</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-600">Total Invested</p>
              <p className="text-green-800">{sipDetails.totalInvested}</p>
            </div>
            <div>
              <p className="text-gray-600">Current Value</p>
              <p className="text-green-800">{sipDetails.currentValue}</p>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-green-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">Total Returns</span>
              <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0">
                {sipDetails.returns}
              </Badge>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
            disabled={!isEnabled}
          >
            Invest Now
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <Settings className="h-3 w-3 mr-1" />
            Settings
          </Button>
        </div>

        {!isEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg"
          >
            <p className="text-sm text-orange-700">
              AutoPay is currently disabled. Enable it to continue your systematic investments.
            </p>
          </motion.div>
        )}

        <div className="mt-4 text-center">
          <p className="text-xs text-green-600">
            💡 Pro tip: Regular investments help average out market volatility
          </p>
        </div>
      </Card>
    </motion.div>
  );
}