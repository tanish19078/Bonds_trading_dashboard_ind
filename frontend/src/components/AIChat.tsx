import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { MessageCircle, X, Send, Sparkles, TrendingUp, DollarSign, Maximize2, Minimize2, Brain, Lightbulb, AlertCircle } from 'lucide-react';

interface AIChatProps {
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

export default function AIChat({ isExpanded = false, onToggleExpanded }: AIChatProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai' as const,
      content: "Hi! I'm your AI investment assistant powered by Gemini. I can help you with bond analysis, portfolio optimization, and market insights. What would you like to know?",
      timestamp: new Date(Date.now() - 300000)
    }
  ]);

  const suggestedQuestions = [
    "What bonds should I buy today?",
    "Analyze my portfolio performance",
    "Show me high-yield opportunities",
    "Explain bond liquidity to me",
    "What's the market outlook?",
    "How to diversify my portfolio?"
  ];

  // Removed auto-opening - chat now only opens when user clicks

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai' as const,
        content: getAIResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);

    setMessage('');
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('bond') && lowerMessage.includes('buy')) {
      return "Based on current market conditions, I recommend considering HDFC Bank Bonds (8.2% yield) and SBI Infrastructure Bonds (8.1% yield). Both offer high liquidity and strong credit ratings. Would you like a detailed analysis of these options?";
    } else if (lowerMessage.includes('portfolio')) {
      return "Your portfolio shows a healthy 7.6% average yield with ₹4,650 total gains (+1.1%). I notice you're heavily weighted in corporate bonds (45%). Consider adding some government bonds for better diversification. Should I show you some options?";
    } else if (lowerMessage.includes('high-yield') || lowerMessage.includes('opportunity')) {
      return "I've identified 3 high-yield opportunities: 1) HDFC Bank Bond 2027 (8.2%), 2) SBI Infrastructure (8.1%), 3) Axis Bank Corporate (8.0%). All have high liquidity ratings. Would you like risk assessments for these?";
    } else if (lowerMessage.includes('liquidity')) {
      return "Bond liquidity refers to how quickly you can sell your bonds without affecting the price. Our platform shows real-time liquidity scores: 🔥 High (can sell within minutes), 🟡 Medium (few hours), 💤 Low (may take days). This helps you choose bonds that match your flexibility needs.";
    } else {
      return "That's an interesting question! Based on current market data and your portfolio, I can provide personalized insights. Could you be more specific about what aspect of bond investing you'd like to explore?";
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-slate-800 to-purple-800 hover:from-slate-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden border border-purple-500/20"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
        
        {/* Subtle AI indicator */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 h-4 w-4 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs border-2 border-slate-800"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 2 }}
          >
            <span className="text-xs">AI</span>
          </motion.div>
        )}

        {/* Subtle hint tooltip on hover only */}
        {!isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 w-48 opacity-0 hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ opacity: 1, x: 0 }}
          >
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-purple-500/20">
              <div className="flex items-center space-x-2 mb-1">
                <Brain className="h-3 w-3 text-purple-400" />
                <span className="text-xs text-purple-300">AI Assistant</span>
              </div>
              <p className="text-xs text-slate-300">
                Get personalized bond insights and portfolio advice
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className={`${isExpanded ? 'w-[600px] h-[700px]' : 'w-96 h-[500px]'} shadow-2xl border-0 overflow-hidden bg-white transition-all duration-300`}>
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-5 w-5" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg">BLTP AI Assistant</h3>
                    <p className="text-sm text-blue-100">Powered by Gemini • Real-time Analysis</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500/80 text-white border-0 text-xs">
                      <div className="w-2 h-2 bg-green-300 rounded-full mr-1 animate-pulse" />
                      Live
                    </Badge>
                    {onToggleExpanded && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-white hover:bg-white/20"
                        onClick={onToggleExpanded}
                      >
                        {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className={`flex-1 p-4 space-y-4 overflow-y-auto ${isExpanded ? 'max-h-96' : 'max-h-80'}`}>
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Suggested Questions */}
                {messages.length === 1 && (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <p className="text-xs text-gray-600">Quick suggestions for you:</p>
                    </div>
                    <div className={`grid ${isExpanded ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
                      {suggestedQuestions.slice(0, isExpanded ? 6 : 4).map((question, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-left justify-start h-auto py-2 px-3 text-xs hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 transition-all duration-200"
                            onClick={() => handleSuggestionClick(question)}
                          >
                            <span className="truncate">{question}</span>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="p-3 bg-gradient-to-r from-gray-50 to-blue-50 border-t">
                <div className="flex space-x-2 mb-2">
                  <Button size="sm" variant="ghost" className="flex-1 text-xs hover:bg-white/50">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Market Insights
                  </Button>
                  <Button size="sm" variant="ghost" className="flex-1 text-xs hover:bg-white/50">
                    <DollarSign className="h-3 w-3 mr-1" />
                    Portfolio Analysis
                  </Button>
                  {isExpanded && (
                    <Button size="sm" variant="ghost" className="flex-1 text-xs hover:bg-white/50">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Risk Assessment
                    </Button>
                  )}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask about bonds, portfolio..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={!message.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}