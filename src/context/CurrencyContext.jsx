import React, { createContext, useState, useContext, useEffect } from 'react';
import loungesData from '../data/loungesData.json';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const currencies = loungesData.CURRENCIES;

  const currentRate = currencies[currency].rate;
  const currentSymbol = currencies[currency].symbol;

  const convertPrice = (usdPrice) => {
    return Math.round(usdPrice * currentRate);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies, currentSymbol, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
