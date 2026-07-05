import React from 'react';
import { FEATURED_AIRLINES } from '../data/loungesData';

export default function FeaturedAirlines() {
  return (
    <section style={{ padding: '50px 0 70px', background: '#F4F1EA', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        
        {/* Luxury Cinzel Heading */}
        <h3 className="luxury-cinzel" style={{
          fontSize: '15px',
          color: '#5C4B43',
          marginBottom: '40px',
          letterSpacing: '2px'
        }}>
          Featured Airline Lounges
        </h3>

        {/* First Line: 5 Static Frameless Logos (Increased Size & Tightened Spacing) */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '24px',
          marginBottom: '36px'
        }}>
          {FEATURED_AIRLINES.slice(0, 5).map((airline, idx) => (
            <div 
              key={`line1-${idx}`}
              className="logo-glow-hover"
              style={{
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '220px',
                maxWidth: '290px',
                height: '115px',
                background: 'transparent',
                border: 'none',
                mixBlendMode: 'multiply'
              }}
            >
              <img 
                src={airline.logo} 
                alt={airline.name} 
                style={{ 
                  height: '96px', 
                  width: 'auto', 
                  maxWidth: '280px', 
                  objectFit: 'contain',
                  mixBlendMode: 'multiply'
                }} 
              />
            </div>
          ))}
        </div>

        {/* Second Line: 2 Static Frameless Logos (Increased Size & Tightened Spacing) */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '24px'
        }}>
          {FEATURED_AIRLINES.slice(5, 7).map((airline, idx) => (
            <div 
              key={`line2-${idx}`}
              className="logo-glow-hover"
              style={{
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '220px',
                maxWidth: '290px',
                height: '115px',
                background: 'transparent',
                border: 'none',
                mixBlendMode: 'multiply'
              }}
            >
              <img 
                src={airline.logo} 
                alt={airline.name} 
                style={{ 
                  height: '96px', 
                  width: 'auto', 
                  maxWidth: '280px', 
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
