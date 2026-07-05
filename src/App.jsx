import React, { useState } from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PartnerScroller from './components/PartnerScroller';
import LoungeGuides from './components/LoungeGuides';
import FeaturedAirlines from './components/FeaturedAirlines';
import VipComparison from './components/VipComparison';
import VipPrivileges from './components/VipPrivileges';
import PartnerCTA from './components/PartnerCTA';
import AboutSection from './components/AboutSection';
import ExecutiveReviews from './components/ExecutiveReviews';
import FaqSection from './components/FaqSection';
import SocialGallery from './components/SocialGallery';
import Footer from './components/Footer';

import BookingModal from './components/Modals/BookingModal';
import VirtualTourModal from './components/Modals/VirtualTourModal';
import HowItWorksModal from './components/Modals/HowItWorksModal';
import AuthModal from './components/Modals/AuthModal';
import EnquiryModal from './components/Modals/EnquiryModal';

export default function App() {
  const [currency, setCurrency] = useState('USD');
  const [activeTab, setActiveTab] = useState('home');

  // Modal states
  const [selectedLoungeForBooking, setSelectedLoungeForBooking] = useState(null);
  const [selectedLoungeForVirtualTour, setSelectedLoungeForVirtualTour] = useState(null);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState(null); // 'login' or 'signup'
  const [showEnquireModal, setShowEnquireModal] = useState(false);

  return (
    <div className="app-container">
      {/* Top Glass Navigation matching Image 1 */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        onOpenAuth={(mode) => setAuthModalMode(mode)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Hero Section matching Image 1 */}
      <Hero
        currency={currency}
        onOpenHowItWorks={() => setShowHowItWorksModal(true)}
        onSelectLounge={(lounge) => setSelectedLoungeForBooking(lounge)}
      />

      {/* 1. Featured Partners */}
      <PartnerScroller />

      {/* 2. Airport Lounge Guides */}
      <LoungeGuides
        currency={currency}
        onSelectLounge={(lounge) => setSelectedLoungeForBooking(lounge)}
        onOpenVirtualTour={(lounge) => setSelectedLoungeForVirtualTour(lounge)}
      />

      {/* 3. Featured Airline Lounges */}
      <FeaturedAirlines />

      {/* VIP Side-by-Side Comparison */}
      <VipComparison />

      {/* Black Card VIP Concierge & Privileges */}
      <VipPrivileges
        onOpenEnquire={() => setShowEnquireModal(true)}
      />

      {/* About FlyAnyTrip Section */}
      <AboutSection />

      {/* Magazine-Style Executive Testimonials (#7 Social Proof) */}
      <ExecutiveReviews />

      {/* Partnership CTA Banner matching Image 4 */}
      <PartnerCTA
        onOpenEnquire={() => setShowEnquireModal(true)}
      />

      {/* Searchable FAQ Accordion Section matching Image 4 & 5 */}
      <FaqSection />

      {/* Social Gallery matching Image 5, 6, 7 */}
      <SocialGallery />

      {/* Footer matching Image 6 & 7 */}
      <Footer />

      {/* Interactive Booking & Info Modals */}
      {selectedLoungeForBooking && (
        <BookingModal
          lounge={selectedLoungeForBooking}
          currency={currency}
          onClose={() => setSelectedLoungeForBooking(null)}
        />
      )}

      {selectedLoungeForVirtualTour && (
        <VirtualTourModal
          lounge={selectedLoungeForVirtualTour}
          onClose={() => setSelectedLoungeForVirtualTour(null)}
          onSelectLounge={(lounge) => setSelectedLoungeForBooking(lounge)}
        />
      )}

      {showHowItWorksModal && (
        <HowItWorksModal
          onClose={() => setShowHowItWorksModal(false)}
          onStartExploring={() => {
            const el = document.getElementById('guides-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {authModalMode && (
        <AuthModal
          initialMode={authModalMode}
          onClose={() => setAuthModalMode(null)}
        />
      )}

      {showEnquireModal && (
        <EnquiryModal
          onClose={() => setShowEnquireModal(false)}
        />
      )}
    </div>
  );
}
