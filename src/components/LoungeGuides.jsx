import React, { useState } from 'react';
import { Star, MapPin, Video, ArrowRight } from 'lucide-react';
import { LOUNGE_GUIDES } from '../data/loungesData';

export default function LoungeGuides({ onSelectLounge, onOpenVirtualTour }) {
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [sortBy, setSortBy] = useState('Default');
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  const countries = ['All Countries', ...Array.from(new Set(LOUNGE_GUIDES.map(l => l.country)))];

  let filteredLounges = selectedCountry === 'All Countries' 
    ? [...LOUNGE_GUIDES] 
    : LOUNGE_GUIDES.filter(l => l.country === selectedCountry);

  if (sortBy === 'Name (a-z)') {
    filteredLounges.sort((a, b) => a.city.localeCompare(b.city));
  } else if (sortBy === 'Name (z-a)') {
    filteredLounges.sort((a, b) => b.city.localeCompare(a.city));
  } else if (sortBy === 'Price (low to high)') {
    filteredLounges.sort((a, b) => a.priceUSD - b.priceUSD);
  } else if (sortBy === 'Price (high to low)') {
    filteredLounges.sort((a, b) => b.priceUSD - a.priceUSD);
  }

  const getAmenityImage = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('shower')) return 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80';
    if (lower.includes('chef') || lower.includes('buffet') || lower.includes('noodle')) return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
    if (lower.includes('bar') || lower.includes('cocktail') || lower.includes('champagne')) return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80';
    if (lower.includes('nap') || lower.includes('suite') || lower.includes('sleep')) return 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80';
    return 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80';
  };

  return (
    <section id="guides-section" style={{ padding: '80px 24px', background: '#F8F9FB', maxWidth: '1440px', margin: '0 auto', position: 'relative' }}>
      {/* Ambient Glow */}
      <div className="ambient-glow-rose" style={{ top: '10%', right: '5%' }} />
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '48px', position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FDECEF', color: '#E61E38', padding: '6px 16px', borderRadius: '999px', fontWeight: 700, fontSize: '13px', marginBottom: '14px', border: '1px solid #E61E38' }}>
            CURATED VIP COLLECTION
          </div>
          <h2 className="luxury-serif" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', color: '#0A192F', marginBottom: '12px' }}>
            International <span className="champagne-text">Lounge Guides</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#334155', maxWidth: '640px' }}>
            Explore verified 3D virtual previews, shower suite availability, and guaranteed VIP entry at top global transit hubs. Click any amenity to view details.
          </p>
        </div>

        {/* Country & Sort Controls adhering to White & Red */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Countries Select */}
          <div style={{ position: 'relative' }}>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              style={{
                appearance: 'none',
                background: '#FFFFFF',
                color: '#0A192F',
                fontWeight: 700,
                fontSize: '14px',
                padding: '12px 38px 12px 20px',
                borderRadius: '14px',
                border: '1.5px solid rgba(10, 25, 47, 0.15)',
                cursor: 'pointer',
                outline: 'none',
                boxShadow: '0 4px 12px rgba(10, 25, 47, 0.05)',
                fontFamily: 'inherit'
              }}
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#E61E38', fontSize: '12px' }}>
              ▼
            </div>
          </div>

          {/* Sort By Select */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0A192F' }}>Sort by:</span>
            <div style={{ position: 'relative' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  appearance: 'none',
                  background: '#FFFFFF',
                  color: '#0A192F',
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '12px 38px 12px 20px',
                  borderRadius: '14px',
                  border: '1.5px solid rgba(10, 25, 47, 0.15)',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: '0 4px 12px rgba(10, 25, 47, 0.05)',
                  fontFamily: 'inherit'
                }}
              >
                <option value="Default">Default</option>
                <option value="Name (a-z)">Name (a-z)</option>
                <option value="Name (z-a)">Name (z-a)</option>
                <option value="Price (low to high)">Price (low to high)</option>
                <option value="Price (high to low)">Price (high to low)</option>
              </select>
              <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#E61E38', fontSize: '12px' }}>
                ▼
              </div>
            </div>
          </div>
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
                border: '1px solid rgba(10, 25, 47, 0.1)',
                boxShadow: isHovered 
                  ? '0 25px 50px -12px rgba(10, 25, 47, 0.15)' 
                  : '0 10px 30px -10px rgba(10, 25, 47, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Top Image Showcase Area */}
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden', background: '#0A192F' }}>
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

                {/* Navy Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(10, 25, 47, 0.2) 0%, rgba(10, 25, 47, 0.8) 100%)'
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
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 12px',
                    borderRadius: '99px',
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#0A192F',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Star size={14} fill="#E61E38" color="#E61E38" /> {lounge.rating} ({lounge.reviewsCount})
                  </span>

                  <span style={{
                    background: '#E61E38',
                    color: '#FFFFFF',
                    padding: '6px 12px',
                    borderRadius: '99px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    border: '1px solid #E61E38'
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
                    background: 'rgba(10, 25, 47, 0.9)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(230, 30, 56, 0.4)',
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
                  color: '#FFFFFF',
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>
                    <MapPin size={15} color="#E61E38" /> {lounge.country} • {lounge.terminals?.[0]}
                  </div>

                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0A192F', marginBottom: '10px' }}>
                    {lounge.city} Lounge
                  </h3>

                  <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6, marginBottom: '18px' }}>
                    {lounge.description}
                  </p>

                  {/* Interactive Amenities Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                    {lounge.amenities.slice(0, 4).map((amenity, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedAmenity({ name: amenity, lounge: lounge.city, loungeObj: lounge })}
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid rgba(10, 25, 47, 0.15)',
                          color: '#0A192F',
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
                          e.currentTarget.style.background = '#FDECEF';
                          e.currentTarget.style.borderColor = '#E61E38';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#FFFFFF';
                          e.currentTarget.style.borderColor = 'rgba(10, 25, 47, 0.15)';
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
                  borderTop: '1px solid rgba(10, 25, 47, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#E61E38' }}>
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
            background: 'rgba(10, 25, 47, 0.8)',
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
              background: '#0A192F',
              borderRadius: '32px',
              maxWidth: '540px',
              width: '100%',
              overflow: 'hidden',
              color: '#FFFFFF',
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
                background: 'linear-gradient(180deg, transparent 40%, #0A192F 100%)'
              }} />
              <div style={{ position: 'absolute', bottom: '16px', left: '24px' }}>
                <span style={{ fontSize: '12px', color: '#E61E38', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  VIP Privilege Preview
                </span>
                <h3 className="luxury-serif" style={{ fontSize: '28px', color: '#FFFFFF' }}>
                  {selectedAmenity.name}
                </h3>
              </div>
            </div>

            <div style={{ padding: '28px 28px 36px' }}>
              <p style={{ fontSize: '15px', color: '#F1F5F9', lineHeight: 1.7, marginBottom: '24px' }}>
                Enjoy complimentary, guaranteed priority access to **{selectedAmenity.name}** at the **{selectedAmenity.lounge} Lounge**. Included seamlessly with your LoungePair digital boarding pass—no extra fees or waitlists.
              </p>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setSelectedAmenity(null)}
                  style={{
                    padding: '12px 24px',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    color: '#FFFFFF',
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
                    background: 'linear-gradient(135deg, #E61E38 0%, #C8102E 100%)',
                    color: '#FFFFFF',
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
