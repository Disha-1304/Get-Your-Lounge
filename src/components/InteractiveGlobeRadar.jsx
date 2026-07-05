import React, { useState } from 'react';
import { Globe, MapPin, Navigation, ArrowRight, Eye, ShieldCheck } from 'lucide-react';
import { LOUNGE_GUIDES, CURRENCIES } from '../data/loungesData';

export default function InteractiveGlobeRadar({ onSelectLounge, onOpenVirtualTour, currency }) {
  const [activeRegion, setActiveRegion] = useState('All');
  const [selectedHub, setSelectedHub] = useState(LOUNGE_GUIDES[0]);
  const currInfo = CURRENCIES[currency] || CURRENCIES.USD;

  const regions = ['All', 'Asia', 'Europe', 'Middle East', 'Americas'];

  const filteredLounges = activeRegion === 'All' 
    ? LOUNGE_GUIDES 
    : LOUNGE_GUIDES.filter(l => l.region === activeRegion);

  return (
    <section id="radar-section" style={{ padding: '80px 20px', maxWidth: '1350px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#eff6ff',
          color: '#2563eb',
          padding: '6px 16px',
          borderRadius: '999px',
          fontWeight: 700,
          fontSize: '13px',
          marginBottom: '14px'
        }}>
          <Globe size={16} />
          GLOBAL AVIATION NETWORK
        </div>
        <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 46px)', color: '#0f172a', marginBottom: '16px' }}>
          Live 3D <span style={{ color: '#2563eb' }}>Airport Lounge Radar</span>
        </h2>
        <p style={{ fontSize: '18px', color: '#475569', maxWidth: '650px', margin: '0 auto' }}>
          Click interactive radar pins across international flight corridors to explore virtual tours and real-time pass availability.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
        background: '#ffffff',
        borderRadius: '32px',
        padding: '32px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.08)'
      }}>
        
        {/* Radar Map Visualizer */}
        <div style={{
          position: 'relative',
          minHeight: '440px',
          borderRadius: '24px',
          background: 'radial-gradient(circle at 50% 50%, #eff6ff 0%, #dbeafe 100%)',
          border: '1px solid #bfdbfe',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Animated Radar Rings */}
          <div style={{
            position: 'absolute',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            border: '1px dashed rgba(37, 99, 235, 0.3)',
            animation: 'pulseGlow 4s infinite ease-in-out'
          }} />
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '1px solid rgba(37, 99, 235, 0.2)'
          }} />

          {/* Map Grid Background Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'radial-gradient(#3b82f6 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
            opacity: 0.25
          }} />

          {/* Interactive Hub Pins */}
          {filteredLounges.map((lounge) => {
            const isSelected = selectedHub.id === lounge.id;
            return (
              <button
                key={lounge.id}
                type="button"
                onClick={() => setSelectedHub(lounge)}
                style={{
                  position: 'absolute',
                  left: `${lounge.coordinates?.x || 50}%`,
                  top: `${lounge.coordinates?.y || 50}%`,
                  transform: 'translate(-50%, -50%)',
                  background: isSelected ? '#2563eb' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#0f172a',
                  border: isSelected ? '3px solid #93c5fd' : '1.5px solid #2563eb',
                  borderRadius: '999px',
                  padding: '6px 12px',
                  fontWeight: 800,
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isSelected 
                    ? '0 10px 25px rgba(37, 99, 235, 0.5)' 
                    : '0 4px 10px rgba(15, 23, 42, 0.1)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  zIndex: isSelected ? 10 : 5
                }}
              >
                <MapPin size={14} color={isSelected ? '#ffffff' : '#2563eb'} />
                <span>{lounge.airportCode}</span>
              </button>
            );
          })}

          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 700,
            color: '#1e3a8a'
          }}>
            🛰️ Live Radar Active • {filteredLounges.length} Hubs Showing
          </div>
        </div>

        {/* Selected Hub Detail Card */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          
          {/* Region Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {regions.map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => setActiveRegion(reg)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: activeRegion === reg ? 'none' : '1px solid #cbd5e1',
                  background: activeRegion === reg ? '#2563eb' : 'transparent',
                  color: activeRegion === reg ? '#ffffff' : '#475569',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Hub Content */}
          <div style={{
            background: '#f8fafc',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
                    {selectedHub.region} HUB
                  </span>
                  <h3 style={{ fontSize: '26px', color: '#0f172a' }}>{selectedHub.city}</h3>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>{selectedHub.terminals[0]}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#2563eb' }}>
                    {currInfo.symbol}{Math.round(selectedHub.priceUSD * currInfo.rate)}
                  </div>
                  <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>Per Pass</span>
                </div>
              </div>

              <p style={{ fontSize: '14px', color: '#475569', marginBottom: '16px' }}>
                {selectedHub.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {selectedHub.amenities.slice(0, 4).map((amenity, idx) => (
                  <span 
                    key={idx}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#334155'
                    }}
                  >
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => onOpenVirtualTour(selectedHub)}
                className="btn-secondary"
                style={{ flex: 1, fontSize: '14px', padding: '12px' }}
              >
                <Eye size={16} /> Virtual 3D Tour
              </button>

              <button
                type="button"
                onClick={() => onSelectLounge(selectedHub)}
                className="btn-primary"
                style={{ flex: 1, fontSize: '14px', padding: '12px' }}
              >
                Book Pass Now
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
