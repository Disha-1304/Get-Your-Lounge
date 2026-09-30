import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CurrencyProvider } from './context/CurrencyContext';
import { ScrollToTop } from './components/home/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { LoungeDetailsPage } from './pages/LoungeDetailsPage';
import { BookingPage } from './pages/BookingPage';
import { PaymentPage } from './pages/PaymentPage';
import { AuthPage } from './pages/AuthPage';
import { UserProfilePage } from './pages/UserProfilePage';
import './index.css';

// Replace this with your actual Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <CurrencyProvider>
        <Router>
          <ScrollToTop />
          <div className="app-container">
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
              <Route path="/lounge/:id" element={<ProtectedRoute><LoungeDetailsPage /></ProtectedRoute>} />
              <Route path="/book/:id" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
              <Route path="/payment/:id" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
            </Routes>
          </div>
        </Router>
      </CurrencyProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
