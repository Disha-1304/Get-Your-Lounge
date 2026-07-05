import React, { useState } from 'react';
import { Check, X, Armchair, AlertCircle, ShieldCheck } from 'lucide-react';
import { VIP_COMPARISON } from '../data/loungesData';

export default function VipComparison() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeCompare = VIP_COMPARISON[selectedIdx] || VIP_COMPARISON[0];

  return (
    <section id="vip-compare" style={{ padding: '80px 24px', maxWidth: '1440px', margin: '0 auto', position: 'relative' }}>
      {/* Ambient Glow */}
      <div className="ambient-glow-gold" style={{ top: '15%', left: '10%' }} />

      <div style={{ textAlign: 'center', marginBottom: '56px', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#F7E1D7',
          color: '#2B221E',
          padding: '6px 18px',
          borderRadius: '999px',
          fontWeight: 800,
          fontSize: '12px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '16px',
          border: '1px solid #2B221E'
        }}>
          THE LOUNGEPAIR VISUAL DIFFERENCE
        </div>
        <h2 className="luxury-serif" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', color: '#2B221E', marginBottom: '16px' }}>
          Why Wait at the <span className="champagne-text">Standard Gate?</span>
        </h2>
        <p style={{ fontSize: '18px', color: '#5C4B43', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
          See the side-by-side photographic comparison. Over 250,000 discerning international travelers choose guaranteed VIP lounge serenity over crowded terminal gates.
        </p>
      </div>

      {/* Visual Side-by-Side Photographic Showcase */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '36px',
        marginBottom: '56px',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Left Card: Standard Gate Chaos */}
        <div className="luxury-card-hover" style={{
          background: '#ffffff',
          border: '1px solid rgba(43, 34, 30, 0.2)',
          borderRadius: '32px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px -15px rgba(43, 34, 30, 0.15)'
        }}>
          <div style={{ position: 'relative', height: '300px' }}>
            <img 
              src={activeCompare.terminalImage} 
              alt="Standard Terminal Gate"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(40%) contrast(110%)' }}
            />
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: '#2B221E',
              color: '#F4F1EA',
              padding: '8px 16px',
              borderRadius: '99px',
              fontWeight: 800,
              fontSize: '12px',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <X size={16} style={{ color: '#ef4444' }} /> PUBLIC TERMINAL GATE
            </div>
          </div>
          <div style={{ padding: '32px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#5C4B43', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
              Aspect: {activeCompare.feature}
            </div>
            <h3 className="luxury-serif" style={{ fontSize: '26px', color: '#2B221E', marginBottom: '12px' }}>
              Crowded & Uncomfortable
            </h3>
            <p style={{ fontSize: '15px', color: '#5C4B43', lineHeight: 1.7 }}>
              {activeCompare.terminal}
            </p>
          </div>
        </div>

        {/* Right Card: LoungePair VIP Serenity */}
        <div className="champagne-border luxury-card-hover" style={{
          borderRadius: '32px',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', height: '300px' }}>
            <img 
              src={activeCompare.loungeImage} 
              alt="LoungePair VIP Lounge"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'linear-gradient(135deg, #2B221E 0%, #5C4B43 100%)',
              color: '#F7E1D7',
              padding: '8px 18px',
              borderRadius: '99px',
              fontWeight: 800,
              fontSize: '12px',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
              border: '1px solid rgba(212, 175, 55, 0.5)'
            }}>
              <Check size={16} style={{ color: '#D4AF37' }} /> LOUNGEPAIR GUARANTEED ENTRY
            </div>
          </div>
          <div style={{ padding: '32px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
              Aspect: {activeCompare.feature}
            </div>
            <h3 className="luxury-serif" style={{ fontSize: '28px', color: '#2B221E', marginBottom: '12px' }}>
              Guaranteed VIP Sanctuary
            </h3>
            <p style={{ fontSize: '15px', color: '#2B221E', lineHeight: 1.7, fontWeight: 500 }}>
              {activeCompare.loungePair}
            </p>
          </div>
        </div>

      </div>

      {/* Interactive Feature Selector Tabs */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        {VIP_COMPARISON.map((row, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            className={selectedIdx === idx ? 'btn-shimmer' : ''}
            style={{
              padding: '14px 28px',
              borderRadius: '999px',
              fontWeight: 800,
              fontSize: '14px',
              letterSpacing: '0.5px',
              background: selectedIdx === idx ? '#2B221E' : '#EAE5DB',
              color: selectedIdx === idx ? '#F7E1D7' : '#5C4B43',
              border: selectedIdx === idx ? '1px solid #D4AF37' : '1px solid rgba(43, 34, 30, 0.15)',
              cursor: 'pointer',
              boxShadow: selectedIdx === idx ? '0 10px 25px rgba(43, 34, 30, 0.3)' : 'none',
              transition: 'all 0.25s ease'
            }}
          >
            {row.feature}
          </button>
        ))}
      </div>
    </section>
  );
}
