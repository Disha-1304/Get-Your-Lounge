import React, { useState } from 'react';
import { Star, MapPin, Video, ArrowRight } from 'lucide-react';
import { LOUNGE_GUIDES } from '../data/loungesData';

export default function LoungeGuides({ onSelectLounge, onOpenVirtualTour }) {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  const regions = ['All', 'Asia', 'Europe', 'Middle East', 'Americas'];

  const filteredLounges = selectedRegion === 'All' 
    ? LOUNGE_GUIDES 
    : LOUNGE_GUIDES.filter(l => l.region === selectedRegion);

  const getAmenityImage = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('shower')) return 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80';
    if (lower.includes('chef') || lower.includes('buffet') || lower.includes('noodle')) return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
    if (lower.includes('bar') || lower.includes('cocktail') || lower.includes('champagne')) return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80';
    if (lower.includes('nap') || lower.includes('suite') || lower.includes('sleep')) return 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80';
    return 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80';
  };

  return (
    <section id="guides-section" style={{ padding: '80px 24px', background: '#F4F1EA', maxWidth: '1440px', margin: '0 auto', position: 'relative' }}>
      {/* Ambient Glow */}
      <div className="ambient-glow-rose" style={{ top: '10%', right: '5%' }} />
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '48px', position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#F7E1D7', color: '#2B221E', padding: '6px 16px', borderRadius: '999px', fontWeight: 700, fontSize: '13px', marginBottom: '14px', border: '1px solid #2B221E' }}>
            CURATED VIP COLLECTION
          </div>
          <h2 className="luxury-serif" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', color: '#2B221E', marginBottom: '12px' }}>
            International <span className="champagne-text">Lounge Guides</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#5C4B43', maxWidth: '640px' }}>
            Explore verified 3D virtual previews, shower suite availability, and guaranteed VIP entry at top global transit hubs. Click any amenity to view details.
          </p>
        </div>

        {/* Region Pills adhering to Pale Oatmeal & Espresso Roast */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', background: '#EAE5DB', padding: '6px', borderRadius: '16px', border: '1px solid rgba(43, 34, 30, 0.12)' }}>
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              style={{
                background: selectedRegion === region ? '#2B221E' : 'transparent',
                color: selectedRegion === region ? '#F7E1D7' : '#5C4B43',
                fontWeight: 700,
                fontSize: '14px',
                padding: '10px 20px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: selectedRegion === region ? '0 4px 12px rgba(43, 34, 30, 0.25)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '32px',
        position: 'relative',
        zIndex: 1
      }}>
        {filteredLounges.map((lounge) => {
          const isHovered = hoveredId === lounge.id;

          return (
            <div
              key={lounge.id}
              className="card-3d-container luxury-card-hover"
              onMouseEnter={() => setHoveredId(lounge.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: '#ffffff',
                borderRadius: '28px',
                overflow: 'hidden',
                border: '1px solid rgba(43, 34, 30, 0.15)',
                boxShadow: isHovered 
                  ? '0 25px 50px -12px rgba(43, 34, 30, 0.25)' 
                  : '0 10px 30px -10px rgba(43, 34, 30, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Top Image Showcase Area */}
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden', background: '#2B221E' }}>
                <img 
                  src={lounge.image} 
                  alt={lounge.city}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />

                {/* Espresso Roast Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(43, 34, 30, 0.2) 0%, rgba(43, 34, 30, 0.8) 100%)'
                }} />

                {/* Top Bar Badges */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    background: 'rgba(244, 241, 234, 0.95)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 12px',
                    borderRadius: '99px',
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#2B221E',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Star size={14} fill="#2B221E" color="#2B221E" /> {lounge.rating} ({lounge.reviewsCount})
                  </span>

                  <span style={{
                    background: '#F7E1D7',
                    color: '#2B221E',
                    padding: '6px 12px',
                    borderRadius: '99px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    border: '1px solid #2B221E'
                  }}>
                    {lounge.status}
                  </span>
                </div>

                {/* 3D Virtual Tour Button overlay */}
                <button
                  onClick={() => onOpenVirtualTour(lounge)}
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    background: 'rgba(43, 34, 30, 0.9)',
                    color: '#F7E1D7',
                    border: '1px solid rgba(247, 225, 215, 0.4)',
                    padding: '8px 14px',
                    borderRadius: '99px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backdropFilter: 'blur(6px)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <Video size={14} /> 360° Virtual Preview
                </button>

                {/* Airport Code Pill */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  color: '#F4F1EA',
                  fontWeight: 900,
                  fontSize: '22px',
                  letterSpacing: '1px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                  {lounge.airportCode}
                </div>
              </div>

              {/* Content Body */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#5C4B43', fontWeight: 600, marginBottom: '6px' }}>
                    <MapPin size={15} color="#2B221E" /> {lounge.country} • {lounge.terminals?.[0]}
                  </div>

                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#2B221E', marginBottom: '10px' }}>
                    {lounge.city} Lounge
                  </h3>

                  <p style={{ fontSize: '14px', color: '#5C4B43', lineHeight: 1.6, marginBottom: '18px' }}>
                    {lounge.description}
                  </p>

                  {/* Interactive Amenities Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                    {lounge.amenities.slice(0, 4).map((amenity, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedAmenity({ name: amenity, lounge: lounge.city, loungeObj: lounge })}
                        style={{
                          background: '#F4F1EA',
                          border: '1px solid rgba(43, 34, 30, 0.15)',
                          color: '#2B221E',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#F7E1D7';
                          e.currentTarget.style.borderColor = '#2B221E';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#F4F1EA';
                          e.currentTarget.style.borderColor = 'rgba(43, 34, 30, 0.15)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        ✓ {amenity}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div style={{
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(43, 34, 30, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#2B221E' }}>
                      ✓ Guaranteed Entry Available
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectLounge(lounge)}
                    className="btn-primary"
                    style={{
                      padding: '12px 22px',
                      fontSize: '14px'
                    }}
                  >
                    Explore Pass <ArrowRight size={16} />
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Amenity Preview Modal */}
      {selectedAmenity && (
        <div 
          onClick={() => setSelectedAmenity(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(43, 34, 30, 0.8)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="champagne-border"
            style={{
              background: '#2B221E',
              borderRadius: '32px',
              maxWidth: '540px',
              width: '100%',
              overflow: 'hidden',
              color: '#F4F1EA',
              boxShadow: '0 30px 60px rgba(0,0,0,0.6)'
            }}
          >
            <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
              <img 
                src={getAmenityImage(selectedAmenity.name)}
                alt={selectedAmenity.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(180deg, transparent 40%, #2B221E 100%)'
              }} />
              <div style={{ position: 'absolute', bottom: '16px', left: '24px' }}>
                <span style={{ fontSize: '12px', color: '#D4AF37', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  VIP Privilege Preview
                </span>
                <h3 className="luxury-serif" style={{ fontSize: '28px', color: '#F4F1EA' }}>
                  {selectedAmenity.name}
                </h3>
              </div>
            </div>

            <div style={{ padding: '28px 28px 36px' }}>
              <p style={{ fontSize: '15px', color: '#EAE5DB', lineHeight: 1.7, marginBottom: '24px' }}>
                Enjoy complimentary, guaranteed priority access to **{selectedAmenity.name}** at the **{selectedAmenity.lounge} Lounge**. Included seamlessly with your LoungePair digital boarding pass—no extra fees or waitlists.
              </p>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setSelectedAmenity(null)}
                  style={{
                    padding: '12px 24px',
                    background: 'transparent',
                    border: '1px solid rgba(247, 225, 215, 0.4)',
                    color: '#F4F1EA',
                    borderRadius: '99px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Close Preview
                </button>

                <button
                  onClick={() => {
                    const l = selectedAmenity.loungeObj;
                    setSelectedAmenity(null);
                    if (l) onSelectLounge(l);
                  }}
                  className="btn-shimmer"
                  style={{
                    padding: '12px 28px',
                    background: 'linear-gradient(135deg, #F7E1D7 0%, #EED1C3 100%)',
                    color: '#2B221E',
                    border: 'none',
                    borderRadius: '99px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Select This Pass
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
