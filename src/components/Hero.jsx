import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { LOUNGE_GUIDES } from '../data/loungesData';

const ELITE_LOUNGE_PHOTOS = [
  {
    url: '/carousel-1.jpg',
    title: 'Modern Dramatic High-Ceiling Atrium Lounge'
  },
  {
    url: '/carousel-2.jpg',
    title: 'Skyline Airport Concourse & Bar Sanctuary'
  },
  {
    url: '/carousel-3.jpg',
    title: 'Luxury Panoramas & Executive Suite Dining'
  },
  {
    url: '/carousel-4.jpg',
    title: 'Golden Chandelier Conference & Retreat Lounge'
  },
  {
    url: '/carousel-5.jpg',
    title: 'Contemporary Espresso Roast & Gold Library Salon'
  }
];

export default function Hero({ onOpenHowItWorks, onSelectLounge }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide interval every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ELITE_LOUNGE_PHOTOS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Filter for autocomplete dropdown
  const filteredLounges = searchQuery.trim() === '' ? [] : LOUNGE_GUIDES.filter(lounge => 
    lounge.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lounge.airportCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lounge.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lounge.terminals.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '680px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '130px 24px 80px',
      overflow: 'hidden'
    }}>
      {/* Background Carousel with Soft Light Blur */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        {ELITE_LOUNGE_PHOTOS.map((photo, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
              overflow: 'hidden'
            }}
          >
            <img 
              src={photo.url} 
              alt={photo.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                filter: 'blur(1.8px)',
                transform: 'scale(1.03)'
              }}
            />
          </div>
        ))}

        {/* Soft Espresso Roast overlay ensuring clear visibility of photos and high readability for white text */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(43, 34, 30, 0.76) 0%, rgba(55, 42, 36, 0.68) 50%, rgba(43, 34, 30, 0.78) 100%)',
          zIndex: 2
        }} />
      </div>

      {/* Centered Composition */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '820px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Bold, large, editorial serif headline adhering to Pale Oatmeal (#F4F1EA) */}
        <h1 className="luxury-serif" style={{
          fontSize: 'clamp(42px, 5.5vw, 64px)',
          color: '#F4F1EA',
          marginBottom: '12px',
          textShadow: '0 4px 12px rgba(0,0,0,0.4)'
        }}>
          Buy access to 1,400+ airport lounges
        </h1>

        {/* Subtitle adhering to Desert Rose (#F7E1D7) */}
        <p style={{
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          fontWeight: 600,
          color: '#F7E1D7',
          marginBottom: '36px',
          opacity: 0.98,
          textShadow: '0 2px 6px rgba(0,0,0,0.35)'
        }}>
          No membership required
        </p>

        {/* Pill-shaped White Search Input Field */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '580px', marginBottom: '22px' }}>
          <div style={{
            background: '#F4F1EA',
            borderRadius: '999px',
            padding: '6px 8px 6px 24px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 20px 40px rgba(43, 34, 30, 0.45)',
            width: '100%'
          }}>
            <MapPin size={20} color="#5C4B43" style={{ marginRight: '14px', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="City, airport or lounge"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '16px',
                color: '#2B221E',
                fontWeight: 600,
                background: 'transparent',
                fontFamily: 'Plus Jakarta Sans, sans-serif'
              }}
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: '#5C4B43', cursor: 'pointer', padding: '0 12px', fontSize: '18px' }}
              >
                ✕
              </button>
            )}
            {/* Rounded Espresso Roast primary button on the right side */}
            <button
              type="button"
              style={{
                background: '#2B221E',
                color: '#F7E1D7',
                border: 'none',
                borderRadius: '999px',
                padding: '13px 32px',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.2s ease',
                fontFamily: 'Plus Jakarta Sans, sans-serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3F322D';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2B221E';
                e.currentTarget.style.color = '#F7E1D7';
              }}
            >
              Search
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          {filteredLounges.length > 0 && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              left: 0,
              right: 0,
              background: '#F4F1EA',
              borderRadius: '24px',
              boxShadow: '0 25px 60px -15px rgba(43, 34, 30, 0.35)',
              border: '1px solid rgba(43, 34, 30, 0.15)',
              maxHeight: '340px',
              overflowY: 'auto',
              textAlign: 'left',
              zIndex: 50
            }}>
              <div style={{ padding: '12px 20px', fontSize: '11px', fontWeight: 700, color: '#5C4B43', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(43, 34, 30, 0.1)' }}>
                Matching Airport Lounges ({filteredLounges.length})
              </div>
              {filteredLounges.map((lounge) => (
                <div
                  key={lounge.id}
                  onClick={() => {
                    onSelectLounge(lounge);
                    setSearchQuery('');
                  }}
                  style={{
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(43, 34, 30, 0.08)',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#EAE5DB'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#F4F1EA'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img 
                      src={lounge.image} 
                      alt={lounge.city}
                      style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '15px', color: '#2B221E' }}>
                        {lounge.city} ({lounge.airportCode})
                      </div>
                      <div style={{ fontSize: '13px', color: '#5C4B43' }}>
                        {lounge.terminals.join(', ')}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '13px', color: '#2B221E', fontWeight: 700 }}>
                      Select Lounge →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Small, secondary call-to-action text below search bar */}
        <div style={{ fontSize: '15px', color: '#F4F1EA', fontWeight: 500, marginBottom: '36px' }}>
          <span>Not sure where to start? </span>
          <button
            type="button"
            onClick={onOpenHowItWorks}
            style={{
              background: 'none',
              border: 'none',
              color: '#F7E1D7',
              textDecoration: 'underline',
              fontWeight: 600,
              fontSize: '15px',
              cursor: 'pointer',
              padding: 0
            }}
          >
            Learn how to buy a lounge pass
          </button>
        </div>

        {/* Carousel Indicators adhering to Desert Rose (#F7E1D7) */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {ELITE_LOUNGE_PHOTOS.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              title={photo.title}
              style={{
                width: currentSlide === idx ? '28px' : '8px',
                height: '8px',
                borderRadius: '999px',
                background: currentSlide === idx ? '#F7E1D7' : 'rgba(244, 241, 234, 0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
