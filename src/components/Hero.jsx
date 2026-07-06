import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { LOUNGE_GUIDES } from '../data/loungesData';

export default function Hero({ onOpenHowItWorks, onSelectLounge }) {
  const [searchQuery, setSearchQuery] = useState('');

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
      {/* Top Brand Logo Header */}
      <div style={{
        position: 'absolute',
        top: '28px',
        left: '36px',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        gap: '14px'
      }}>
        <img 
          src="/logo.png" 
          alt="LoungePair Logo" 
          style={{
            height: '108px',
            width: 'auto',
            display: 'block'
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <div style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '26px',
            fontWeight: 800,
            letterSpacing: '1px',
            color: '#FFFFFF',
            textTransform: 'uppercase'
          }}>
            Lounge<span style={{ color: '#E61E38' }}>Pair</span>
          </div>
          <div style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '3px',
            color: 'rgba(255, 255, 255, 0.7)',
            textTransform: 'uppercase',
            marginTop: '2px'
          }}>
            International
          </div>
        </div>
      </div>

      {/* Background Cinematic Video with scaling to hide watermark */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/hero-video.mp4"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            transform: 'scale(1.25)', /* Scaled up 25% to completely crop out any edge/corner watermarks */
            filter: 'brightness(0.95) contrast(1.05)'
          }}
        />

        {/* Soft Navy & Red overlay ensuring clear visibility of video and high readability for white text */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(10, 25, 47, 0.65) 0%, rgba(230, 30, 56, 0.35) 50%, rgba(10, 25, 47, 0.70) 100%)',
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
        
        {/* Bold, large, editorial serif headline adhering to Pure White */}
        <h1 className="luxury-serif" style={{
          fontSize: 'clamp(42px, 5.5vw, 64px)',
          color: '#FFFFFF',
          marginBottom: '12px',
          textShadow: '0 4px 12px rgba(0,0,0,0.4)'
        }}>
          Buy access to 1,400+ airport lounges
        </h1>

        {/* Subtitle adhering to Soft Red/Pink */}
        <p style={{
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          fontWeight: 600,
          color: '#FFCCD3',
          marginBottom: '36px',
          opacity: 0.98,
          textShadow: '0 2px 6px rgba(0,0,0,0.35)'
        }}>
          No membership required
        </p>

        {/* Pill-shaped White Search Input Field */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '580px', marginBottom: '22px' }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '999px',
            padding: '6px 8px 6px 24px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 20px 40px rgba(10, 25, 47, 0.35)',
            width: '100%'
          }}>
            <MapPin size={20} color="#E61E38" style={{ marginRight: '14px', flexShrink: 0 }} />
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
                color: '#0A192F',
                fontWeight: 600,
                background: 'transparent',
                fontFamily: 'Plus Jakarta Sans, sans-serif'
              }}
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: '#E61E38', cursor: 'pointer', padding: '0 12px', fontSize: '18px' }}
              >
                ✕
              </button>
            )}
            {/* Rounded Ruby Red primary button on the right side */}
            <button
              type="button"
              style={{
                background: '#E61E38',
                color: '#FFFFFF',
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
                e.currentTarget.style.background = '#C8102E';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#E61E38';
                e.currentTarget.style.color = '#FFFFFF';
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
              background: '#FFFFFF',
              borderRadius: '24px',
              boxShadow: '0 25px 60px -15px rgba(10, 25, 47, 0.25)',
              border: '1px solid rgba(230, 30, 56, 0.2)',
              maxHeight: '340px',
              overflowY: 'auto',
              textAlign: 'left',
              zIndex: 50
            }}>
              <div style={{ padding: '12px 20px', fontSize: '11px', fontWeight: 700, color: '#E61E38', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(10, 25, 47, 0.1)' }}>
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
                    borderBottom: '1px solid rgba(10, 25, 47, 0.08)',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F8F9FB'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img 
                      src={lounge.image} 
                      alt={lounge.city}
                      style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '15px', color: '#0A192F' }}>
                        {lounge.city} ({lounge.airportCode})
                      </div>
                      <div style={{ fontSize: '13px', color: '#334155' }}>
                        {lounge.terminals.join(', ')}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '13px', color: '#E61E38', fontWeight: 700 }}>
                      Select Lounge →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Small, secondary call-to-action text below search bar */}
        <div style={{ fontSize: '15px', color: '#FFFFFF', fontWeight: 500, marginBottom: '28px' }}>
          <span>Not sure where to start? </span>
          <button
            type="button"
            onClick={onOpenHowItWorks}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFCCD3',
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

        {/* Stats Strip Below Search Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: '20px',
          background: 'rgba(10, 25, 47, 0.8)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(230, 30, 56, 0.45)',
          padding: '22px 32px',
          borderRadius: '24px',
          maxWidth: '820px',
          width: '100%',
          boxShadow: '0 20px 45px rgba(0,0,0,0.4)',
          marginBottom: '20px'
        }}>
          <div style={{ textAlign: 'center', minWidth: '110px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFCCD3', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>INTERNATIONAL</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>1022</div>
          </div>
          <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ textAlign: 'center', minWidth: '110px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFCCD3', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>DOMESTIC</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>50</div>
          </div>
          <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ textAlign: 'center', minWidth: '110px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFCCD3', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>TRAIN</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>17</div>
          </div>
          <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ textAlign: 'center', minWidth: '110px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFCCD3', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>COUNTRIES</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>60+</div>
          </div>
        </div>



      </div>
    </section>
  );
}
