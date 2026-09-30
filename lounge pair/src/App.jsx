import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CurrencyProvider } from './context/CurrencyContext';
import { ScrollToTop } from './components/home/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { LoungeDetailsPage } from './pages/LoungeDetailsPage';
import { BookingPage } from './pages/BookingPage';
import { PaymentPage } from './pages/PaymentPage';
import { AuthPage } from './pages/AuthPage';
import './index.css';

// Replace this with your actual Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </div>
        </Router>
      </CurrencyProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
