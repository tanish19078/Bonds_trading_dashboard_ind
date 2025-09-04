// BLTP Backend Server - Complete Implementation
// server.js

const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Environment Variables
const PORT = process.env.PORT || 3001;
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
let marketData = {
  indices: {},
  bonds: {},
  portfolios: {},
  news: [],
  learningContent: {}
};

let connectedClients = new Set();

// WebSocket Connection Handler
wss.on('connection', (ws) => {
  connectedClients.add(ws);
  console.log('Client connected. Total clients:', connectedClients.size);
  
  // Send initial data
  ws.send(JSON.stringify({
    type: 'INITIAL_DATA',
    data: marketData
  }));

  ws.on('close', () => {
    connectedClients.delete(ws);
    console.log('Client disconnected. Total clients:', connectedClients.size);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    connectedClients.delete(ws);
  });
});

// Broadcast to all clients
function broadcast(data) {
  const message = JSON.stringify(data);
  connectedClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Alpha Vantage API Integration
class AlphaVantageService {
  constructor() {
    this.baseURL = 'https://www.alphavantage.co/query';
    this.apiKey = ALPHA_VANTAGE_API_KEY;
  }

  async getIndianMarketData() {
    try {
      // Fetch major Indian indices (using ETFs as proxies since Alpha Vantage doesn't have direct index access)
      const indices = [
        { symbol: 'INDA', name: 'Nifty 50 (MSCI India ETF)', type: 'equity' },
        { symbol: 'MINDX', name: 'Sensex Proxy', type: 'equity' },
        { symbol: 'INDY', name: 'India Small Cap', type: 'equity' }
      ];

      const results = {};
      
      for (const index of indices) {
        try {
          const response = await axios.get(this.baseURL, {
            params: {
              function: 'GLOBAL_QUOTE',
              symbol: index.symbol,
              apikey: this.apiKey
            }
          });

          const quote = response.data['Global Quote'];
          if (quote) {
            results[index.symbol] = {
              name: index.name,
              symbol: index.symbol,
              price: parseFloat(quote['05. price']),
              change: parseFloat(quote['09. change']),
              changePercent: quote['10. change percent'].replace('%', ''),
              high: parseFloat(quote['03. high']),
              low: parseFloat(quote['04. low']),
              volume: parseInt(quote['06. volume']),
              timestamp: quote['07. latest trading day']
            };
          }
        } catch (error) {
          console.error(`Error fetching ${index.symbol}:`, error.message);
        }
        
        // Rate limiting - Alpha Vantage allows 5 calls per minute for free tier
        await new Promise(resolve => setTimeout(resolve, 12000));
      }

      return results;
    } catch (error) {
      console.error('Error fetching Indian market data:', error);
      return {};
    }
  }

  async getBondData() {
    try {
      // Fetch bond-related ETFs and treasury data
      const bondSymbols = [
        { symbol: 'IEF', name: '7-10 Year Treasury Bond ETF', duration: '7-10Y' },
        { symbol: 'TLT', name: '20+ Year Treasury Bond ETF', duration: '20Y+' },
        { symbol: 'SHY', name: '1-3 Year Treasury Bond ETF', duration: '1-3Y' }
      ];

      const bonds = {};
      
      for (const bond of bondSymbols) {
        try {
          const response = await axios.get(this.baseURL, {
            params: {
              function: 'GLOBAL_QUOTE',
              symbol: bond.symbol,
              apikey: this.apiKey
            }
          });

          const quote = response.data['Global Quote'];
          if (quote) {
            bonds[bond.symbol] = {
              name: bond.name,
              symbol: bond.symbol,
              price: parseFloat(quote['05. price']),
              yield: (Math.random() * 3 + 5).toFixed(2), // Mock yield data
              duration: bond.duration,
              rating: 'AAA',
              liquidity: Math.floor(Math.random() * 100) + 50,
              volume: parseInt(quote['06. volume']),
              change: parseFloat(quote['09. change']),
              changePercent: quote['10. change percent'].replace('%', ''),
              timestamp: quote['07. latest trading day']
            };
          }
        } catch (error) {
          console.error(`Error fetching bond ${bond.symbol}:`, error);
        }
        
        await new Promise(resolve => setTimeout(resolve, 12000));
      }

      return bonds;
    } catch (error) {
      console.error('Error fetching bond data:', error);
      return {};
    }
  }

  async getHistoricalData(symbol, interval = 'daily') {
    try {
      const response = await axios.get(this.baseURL, {
        params: {
          function: interval === 'intraday' ? 'TIME_SERIES_INTRADAY' : 'TIME_SERIES_DAILY',
          symbol: symbol,
          interval: interval === 'intraday' ? '5min' : undefined,
          apikey: this.apiKey
        }
      });

      const timeSeriesKey = interval === 'intraday' ? 'Time Series (5min)' : 'Time Series (Daily)';
      const timeSeries = response.data[timeSeriesKey];
      
      if (!timeSeries) return [];

      return Object.entries(timeSeries).slice(0, 100).map(([date, data]) => ({
        date,
        open: parseFloat(data['1. open']),
        high: parseFloat(data['2. high']),
        low: parseFloat(data['3. low']),
        close: parseFloat(data['4. close']),
        volume: parseInt(data['5. volume'])
      }));
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return [];
    }
  }
}

// Gemini AI Service
class GeminiAIService {
  constructor() {
    this.model = model;
  }

  async getChatResponse(message, context = {}) {
    try {
      const prompt = `You are BLTP AI, an expert bond trading assistant for Indian markets. 
      
      User message: ${message}
      
      Context: ${JSON.stringify(context)}
      
      Provide helpful, accurate information about bonds, trading strategies, market analysis, or platform features. 
      Keep responses concise but informative. Focus on Indian bond markets when relevant.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini AI error:', error);
      return "I'm sorry, I'm having trouble processing your request right now. Please try again.";
    }
  }

  async generateMarketInsights(marketData) {
    try {
      const prompt = `Analyze this Indian market data and provide 3 key insights for bond traders:
      
      Market Data: ${JSON.stringify(marketData)}
      
      Provide insights in this format:
      1. Market trend analysis
      2. Bond opportunity identification  
      3. Risk assessment
      
      Keep each insight under 50 words.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating market insights:', error);
      return "Market analysis temporarily unavailable.";
    }
  }
}

// Initialize services
const alphaVantage = new AlphaVantageService();
const geminiAI = new GeminiAIService();

// Generate mock Indian bond data
function generateMockBondData() {
  const bondTypes = [
    'Government Securities', 'Corporate Bonds', 'Municipal Bonds', 
    'PSU Bonds', 'Tax-Free Bonds', 'Infrastructure Bonds'
  ];
  
  const issuers = [
    'Government of India', 'SBI', 'HDFC', 'ICICI Bank', 'Reliance Industries',
    'Tata Group', 'Adani Group', 'L&T', 'NTPC', 'Power Grid Corporation'
  ];

  const bonds = {};
  
  for (let i = 0; i < 50; i++) {
    const bondId = `BOND_${i + 1}`;
    const issuer = issuers[Math.floor(Math.random() * issuers.length)];
    const bondType = bondTypes[Math.floor(Math.random() * bondTypes.length)];
    const maturity = Math.floor(Math.random() * 20) + 1;
    const rating = ['AAA', 'AA+', 'AA', 'AA-', 'A+'][Math.floor(Math.random() * 5)];
    
    bonds[bondId] = {
      id: bondId,
      name: `${issuer} ${maturity}Y Bond`,
      issuer: issuer,
      type: bondType,
      faceValue: 1000,
      currentPrice: 950 + Math.random() * 100,
      yield: (Math.random() * 4 + 6).toFixed(2),
      maturityYears: maturity,
      rating: rating,
      liquidity: Math.floor(Math.random() * 100) + 20,
      volume: Math.floor(Math.random() * 10000000) + 100000,
      lastUpdated: new Date().toISOString(),
      trends: {
        price: Math.random() > 0.5 ? 'up' : 'down',
        volume: Math.random() > 0.5 ? 'up' : 'down'
      }
    };
  }
  
  return bonds;
}

// Generate learning content
function generateLearningContent() {
  return {
    basics: {
      title: "Bond Basics",
      modules: [
        {
          id: 1,
          title: "What are Bonds?",
          content: "Bonds are debt securities issued by corporations, governments, or other entities to raise capital.",
          duration: "5 min read"
        },
        {
          id: 2,
          title: "Types of Bonds in India",
          content: "Government Securities, Corporate Bonds, PSU Bonds, and Tax-Free Bonds explained.",
          duration: "8 min read"
        }
      ]
    },
    trading: {
      title: "Trading Strategies",
      modules: [
        {
          id: 3,
          title: "Duration Risk Management",
          content: "Understanding interest rate sensitivity and managing duration risk in bond portfolios.",
          duration: "10 min read"
        }
      ]
    },
    risks: {
      title: "Risk Management",
      modules: [
        {
          id: 4,
          title: "Credit Risk Assessment",
          content: "How to evaluate creditworthiness and default risk in corporate bonds.",
          duration: "12 min read"
        }
      ]
    }
  };
}

// API Routes

// Market Data Routes
app.get('/api/market/indices', async (req, res) => {
  try {
    const indices = await alphaVantage.getIndianMarketData();
    marketData.indices = indices;
    res.json({ success: true, data: indices });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market indices' });
  }
});

app.get('/api/market/bonds', async (req, res) => {
  try {
    // Combine real bond ETF data with mock Indian bond data
    const realBondData = await alphaVantage.getBondData();
    const mockBondData = generateMockBondData();
    
    const combinedBonds = { ...realBondData, ...mockBondData };
    marketData.bonds = combinedBonds;
    
    res.json({ success: true, data: combinedBonds });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bond data' });
  }
});

app.get('/api/market/historical/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { interval = 'daily' } = req.query;
    
    const historicalData = await alphaVantage.getHistoricalData(symbol, interval);
    res.json({ success: true, data: historicalData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});

// Portfolio Management Routes
app.get('/api/portfolio', (req, res) => {
  const portfolios = Object.values(marketData.portfolios);
  res.json({ success: true, data: portfolios });
});

app.post('/api/portfolio', (req, res) => {
  try {
    const { name, bonds = [] } = req.body;
    const portfolioId = `PORTFOLIO_${Date.now()}`;
    
    const portfolio = {
      id: portfolioId,
      name,
      bonds,
      createdAt: new Date().toISOString(),
      totalValue: bonds.reduce((sum, bond) => sum + (bond.quantity * bond.price), 0)
    };
    
    marketData.portfolios[portfolioId] = portfolio;
    
    // Broadcast update
    broadcast({
      type: 'PORTFOLIO_CREATED',
      data: portfolio
    });
    
    res.json({ success: true, data: portfolio });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create portfolio' });
  }
});

app.put('/api/portfolio/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (marketData.portfolios[id]) {
      marketData.portfolios[id] = { ...marketData.portfolios[id], ...updates };
      
      broadcast({
        type: 'PORTFOLIO_UPDATED',
        data: marketData.portfolios[id]
      });
      
      res.json({ success: true, data: marketData.portfolios[id] });
    } else {
      res.status(404).json({ error: 'Portfolio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update portfolio' });
  }
});

app.delete('/api/portfolio/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    if (marketData.portfolios[id]) {
      delete marketData.portfolios[id];
      
      broadcast({
        type: 'PORTFOLIO_DELETED',
        data: { id }
      });
      
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Portfolio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete portfolio' });
  }
});

// AI Chat Routes
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, context = {} } = req.body;
    
    const response = await geminiAI.getChatResponse(message, {
      ...context,
      marketData: marketData.indices,
      bondData: Object.keys(marketData.bonds).length
    });
    
    res.json({ success: true, data: { response } });
  } catch (error) {
    res.status(500).json({ error: 'AI chat service unavailable' });
  }
});

app.get('/api/ai/insights', async (req, res) => {
  try {
    const insights = await geminiAI.generateMarketInsights({
      indices: marketData.indices,
      bondsCount: Object.keys(marketData.bonds).length,
      timestamp: new Date().toISOString()
    });
    
    res.json({ success: true, data: { insights } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

// Learning Content Routes
app.get('/api/learn', (req, res) => {
  const content = generateLearningContent();
  marketData.learningContent = content;
  res.json({ success: true, data: content });
});

app.get('/api/learn/:category', (req, res) => {
  const { category } = req.params;
  const content = generateLearningContent();
  
  if (content[category]) {
    res.json({ success: true, data: content[category] });
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

// News Routes (Mock data)
app.get('/api/news', (req, res) => {
  const mockNews = [
    {
      id: 1,
      title: "RBI Maintains Repo Rate at 6.5%",
      summary: "Reserve Bank of India keeps key interest rates unchanged, supporting bond market stability.",
      category: "monetary-policy",
      timestamp: new Date().toISOString(),
      source: "Economic Times"
    },
    {
      id: 2,
      title: "Corporate Bond Issuances Hit Record High",
      summary: "Indian corporations raise ₹2.5 lakh crore through bond markets in current fiscal year.",
      category: "market-news",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      source: "Business Standard"
    },
    {
      id: 3,
      title: "New Tax-Free Infrastructure Bonds Launched",
      summary: "Government introduces new tax-free bonds for infrastructure development projects.",
      category: "policy",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      source: "Mint"
    }
  ];
  
  marketData.news = mockNews;
  res.json({ success: true, data: mockNews });
});

// Analytics Routes
app.get('/api/analytics/overview', (req, res) => {
  const analytics = {
    totalBonds: Object.keys(marketData.bonds).length,
    totalVolume: Object.values(marketData.bonds).reduce((sum, bond) => sum + bond.volume, 0),
    avgYield: Object.values(marketData.bonds).reduce((sum, bond) => sum + parseFloat(bond.yield), 0) / Object.keys(marketData.bonds).length,
    activePortfolios: Object.keys(marketData.portfolios).length,
    marketTrend: 'positive',
    timestamp: new Date().toISOString()
  };
  
  res.json({ success: true, data: analytics });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: {
      alphaVantage: !!ALPHA_VANTAGE_API_KEY,
      geminiAI: !!GEMINI_API_KEY,
      websocket: wss.clients.size > 0
    }
  });
});

// Real-time data updates
setInterval(async () => {
  try {
    // Update market data every 5 minutes
    const indices = await alphaVantage.getIndianMarketData();
    if (Object.keys(indices).length > 0) {
      marketData.indices = { ...marketData.indices, ...indices };
      
      broadcast({
        type: 'MARKET_UPDATE',
        data: {
          indices: marketData.indices,
          timestamp: new Date().toISOString()
        }
      });
    }
  } catch (error) {
    console.error('Error updating market data:', error);
  }
}, 300000); // 5 minutes

// Update bond liquidity simulation every 30 seconds
setInterval(() => {
  Object.keys(marketData.bonds).forEach(bondId => {
    if (marketData.bonds[bondId].liquidity) {
      // Simulate liquidity changes
      const change = (Math.random() - 0.5) * 10;
      marketData.bonds[bondId].liquidity = Math.max(20, Math.min(100, 
        marketData.bonds[bondId].liquidity + change));
      
      // Update trends
      marketData.bonds[bondId].trends = {
        liquidity: change > 0 ? 'up' : 'down',
        volume: Math.random() > 0.5 ? 'up' : 'down'
      };
      
      marketData.bonds[bondId].lastUpdated = new Date().toISOString();
    }
  });
  
  broadcast({
    type: 'BOND_UPDATE',
    data: {
      bonds: marketData.bonds,
      timestamp: new Date().toISOString()
    }
  });
}, 30000); // 30 seconds

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 BLTP Backend Server running on port ${PORT}`);
  console.log(`📊 Alpha Vantage API: ${ALPHA_VANTAGE_API_KEY ? 'Connected' : 'Not configured'}`);
  console.log(`🤖 Gemini AI: ${GEMINI_API_KEY ? 'Connected' : 'Not configured'}`);
  console.log(`🔗 WebSocket Server: Active`);
  
  // Initialize with mock data
  marketData.bonds = generateMockBondData();
  console.log(`💼 Generated ${Object.keys(marketData.bonds).length} mock bonds`);
});

module.exports = app;