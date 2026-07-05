import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ 
  onOpenAuth, 
  activeTab, 
  setActiveTab 
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(43, 34, 30, 0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(247, 225, 215, 0.18)' : 'none',
        transition: 'all 0.3s ease',
        padding: scrolled ? '12px 0' : '20px 0'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Luxury Signature Brand Emblem (High Visibility & Ultra-Luxury Styling) */}
        <div 
          onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src="/loungepair-logo.png" 
              alt="Lounge Pair International"
              style={{
                height: '96px',
                width: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Action Links */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          
          <button 
            onClick={() => scrollToSection('guides-section')}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              fontSize: '15px', 
              fontWeight: 600, 
              color: '#F4F1EA', 
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              fontFamily: 'Plus Jakarta Sans, sans-serif'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            LoungePair+
          </button>

          <button 
            onClick={() => onOpenAuth('login')}
            style={{
              background: 'transparent',
              border: 'none',
              fontWeight: 600,
              fontSize: '15px',
              color: '#F4F1EA',
              cursor: 'pointer',
              padding: '6px 10px',
              fontFamily: 'Plus Jakarta Sans, sans-serif'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Login
          </button>

          <button 
            onClick={() => onOpenAuth('signup')}
            style={{
              background: '#F7E1D7',
              color: '#2B221E',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              padding: '10px 24px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F4F1EA';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F7E1D7';
              e.currentTarget.style.transform = 'translateY(0px)';
            }}
          >
            Sign up
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: 'none', background: 'transparent', border: 'none' }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={26} color="#F4F1EA" /> : <Menu size={26} color="#F4F1EA" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: '#2B221E',
          padding: '24px',
          borderBottom: '1px solid rgba(247, 225, 215, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <button 
            onClick={() => scrollToSection('guides-section')}
            style={{ textAlign: 'left', background: 'none', border: 'none', fontSize: '16px', fontWeight: 600, color: '#F4F1EA' }}
          >
            LoungePair+
          </button>
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenAuth('login'); }}
              style={{ flex: 1, background: 'transparent', border: '1px solid rgba(247, 225, 215, 0.4)', color: '#F4F1EA', padding: '10px', borderRadius: '999px', fontWeight: 600 }}
            >
              Login
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenAuth('signup'); }}
              style={{ flex: 1, background: '#F7E1D7', color: '#2B221E', border: 'none', padding: '10px', borderRadius: '999px', fontWeight: 700 }}
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
