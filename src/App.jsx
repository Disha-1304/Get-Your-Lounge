import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { ScrollToTop } from './components/home/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { LoungeDetailsPage } from './pages/LoungeDetailsPage';
import { BookingPage } from './pages/BookingPage';
import { PaymentPage } from './pages/PaymentPage';
import './index.css';

function App() {
  return (
    <CurrencyProvider>
      <Router>
        <ScrollToTop />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/lounge/:id" element={<LoungeDetailsPage />} />
            <Route path="/book/:id" element={<BookingPage />} />
            <Route path="/payment/:id" element={<PaymentPage />} />
          </Routes>
        </div>
      </Router>
    </CurrencyProvider>
  );
}

export default App;
