import React from 'react';
import { FEATURED_PARTNERS } from '../data/loungesData';

export default function PartnerScroller() {
  return (
    <section style={{ padding: '60px 0 40px', background: '#F4F1EA', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        
        {/* Featured Partners Heading */}
        <h3 className="luxury-cinzel" style={{
          fontSize: '14px',
          color: '#5C4B43',
          marginBottom: '36px'
        }}>
          Featured Partners
        </h3>

        {/* Level 1: First Line (7 Logos - Increased Size & Tightened Spacing) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '36px' }}>
          {FEATURED_PARTNERS.slice(0, 7).map((partner, idx) => (
            <div
              key={`l1-${idx}`}
              style={{
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'default',
                animation: 'popBounce 6.5s infinite ease-in-out',
                animationDelay: `${idx * 0.4}s`,
                minWidth: '160px',
                maxWidth: '210px',
                height: '85px',
                background: 'transparent',
                border: 'none',
                transition: 'transform 0.3s ease',
                mixBlendMode: 'multiply'
              }}
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                style={{ 
                  height: '72px', 
                  width: 'auto', 
                  maxWidth: '195px', 
                  objectFit: 'contain',
                  mixBlendMode: 'multiply'
                }} 
              />
            </div>
          ))}
        </div>

        {/* Level 2: Second Line (4 Logos - Increased Size & Tightened Spacing) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          {FEATURED_PARTNERS.slice(7, 11).map((partner, idx) => (
            <div
              key={`l2-${idx}`}
              style={{
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'default',
                animation: 'popBounce 6.5s infinite ease-in-out',
                animationDelay: `${(idx + 7) * 0.4}s`,
                minWidth: '160px',
                maxWidth: '210px',
                height: '85px',
                background: 'transparent',
                border: 'none',
                transition: 'transform 0.3s ease',
                mixBlendMode: 'multiply'
              }}
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                style={{ 
                  height: '72px', 
                  width: 'auto', 
                  maxWidth: '195px', 
                  objectFit: 'contain',
                  mixBlendMode: 'multiply'
                }} 
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
