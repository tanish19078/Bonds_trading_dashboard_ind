import { useState, useEffect, useRef } from 'react';

interface LiveData {
  bondId: string;
  liquidity: number;
  yield: number;
  volume: string;
  trend: 'up' | 'down';
  trendValue: string;
  timestamp: number;
}

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [liveData, setLiveData] = useState<LiveData[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate WebSocket connection with live data updates
  useEffect(() => {
    setIsConnected(true);
    
    // Simulate real-time updates every 2-5 seconds
    const startLiveUpdates = () => {
      intervalRef.current = setInterval(() => {
        const bondIds = ['HDFC', 'Reliance', 'TCS', 'SBI', 'ICICI', 'Infosys', 'Wipro', 'Axis'];
        const randomBond = bondIds[Math.floor(Math.random() * bondIds.length)];
        
        const newUpdate: LiveData = {
          bondId: randomBond,
          liquidity: Math.floor(Math.random() * 40) + 60, // 60-100
          yield: parseFloat((Math.random() * 2 + 7).toFixed(1)), // 7.0-9.0
          volume: `₹${Math.floor(Math.random() * 50 + 15)}L`, // 15L-65L
          trend: Math.random() > 0.5 ? 'up' : 'down',
          trendValue: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 3).toFixed(1)}%`,
          timestamp: Date.now()
        };
        
        setLiveData(prev => {
          const filtered = prev.filter(item => item.bondId !== randomBond);
          return [newUpdate, ...filtered.slice(0, 19)]; // Keep last 20 updates
        });
      }, Math.random() * 3000 + 2000); // 2-5 seconds
    };

    startLiveUpdates();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsConnected(false);
    };
  }, []);

  const getLatestDataForBond = (bondId: string): LiveData | null => {
    return liveData.find(data => data.bondId === bondId) || null;
  };

  return {
    isConnected,
    liveData,
    getLatestDataForBond
  };
};