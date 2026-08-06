import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import loungesData from '../data/loungesData.json';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  
  // Initial rates from local data as fallback
  const [rates, setRates] = useState(() => {
    const initial = {};
    Object.keys(loungesData.CURRENCIES).forEach(code => {
      initial[code] = loungesData.CURRENCIES[code].rate;
    });
    return initial;
  });

  const [isLiveRate, setIsLiveRate] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch live exchange rates from financial API
  const fetchLiveRates = useCallback(async () => {
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!response.ok) throw new Error('Failed to fetch live rates');
      
      const data = await response.json();
      if (data && data.rates) {
        setRates(prev => {
          const updated = { ...prev };
          Object.keys(loungesData.CURRENCIES).forEach(code => {
            if (data.rates[code]) {
              updated[code] = data.rates[code];
            }
          });
          return updated;
        });
        setIsLiveRate(true);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.warn('Using fallback exchange rates:', err.message);
    }
  }, []);

  useEffect(() => {
    fetchLiveRates();

    // Auto-refresh rates every 60 seconds for live market movements
    const interval = setInterval(fetchLiveRates, 60000);
    return () => clearInterval(interval);
  }, [fetchLiveRates]);

  const currentRate = rates[currency] || loungesData.CURRENCIES[currency]?.rate || 1;
  const currentSymbol = loungesData.CURRENCIES[currency]?.symbol || '$';

  const convertPrice = (usdPrice) => {
    if (!usdPrice || isNaN(usdPrice)) return 0;
    const converted = usdPrice * currentRate;
    // For currencies like INR, round to nearest integer, for others round cleanly
    return Math.round(converted);
  };

  const currencies = loungesData.CURRENCIES;

  return (
    <CurrencyContext.Provider 
      value={{ 
        currency, 
        setCurrency, 
        currencies, 
        rates,
        currentRate, 
        currentSymbol, 
        convertPrice,
        isLiveRate,
        lastUpdated,
        refreshRates: fetchLiveRates
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
