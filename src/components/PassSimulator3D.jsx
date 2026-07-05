import React, { useState } from 'react';
import { QrCode, RotateCcw, CheckCircle2, Shield, Wifi, Coffee, Utensils, Award } from 'lucide-react';
import { CURRENCIES } from '../data/loungesData';

export default function PassSimulator3D({ onSelectLounge, currency }) {
  const [selectedHub, setSelectedHub] = useState({
    city: 'Singapore Changi',
    code: 'SIN',
    terminal: 'Terminal 3 VIP Lounge',
    basePrice: 36
  });

  const [tier, setTier] = useState('Gold Executive');
  const [travelerName, setTravelerName] = useState('ALEXANDER WRIGHT');
  const [perks, setPerks] = useState({
    shower: true,
    buffet: true,
    napPod: false,
    fastTrack: true
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const currInfo = CURRENCIES[currency] || CURRENCIES.USD;

  const hubs = [
    { city: 'Singapore Changi', code: 'SIN', terminal: 'Terminal 3 VIP Lounge', basePrice: 36 },
    { city: 'Dubai International', code: 'DXB', terminal: 'Concourse B Royal Oasis', basePrice: 42 },
    { city: 'New York JFK', code: 'JFK', terminal: 'Terminal 4 Sky Club', basePrice: 45 },
    { city: 'Tokyo Haneda', code: 'HND', terminal: 'Terminal 3 Zen Lounge', basePrice: 40 },
    { city: 'London Heathrow', code: 'LHR', terminal: 'Terminal 5 Clubhouse', basePrice: 44 }
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / 15),
      y: x / 15
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const calculateTotal = () => {
    let total = selectedHub.basePrice;
    if (tier === 'Gold Executive') total += 15;
    if (tier === 'Diamond Suite') total += 35;
    return Math.round(total * currInfo.rate);
  };

  const togglePerk = (key) => {
    setPerks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="pass-simulator" style={{ padding: '80px 20px', maxWidth: '1350px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#fef3c7',
          color: '#b45309',
          padding: '6px 16px',
          borderRadius: '999px',
          fontWeight: 700,
          fontSize: '13px',
          marginBottom: '14px'
        }}>
          INTERACTIVE 3D EXPERIENCE
        </div>
        <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 46px)', color: '#0f172a', marginBottom: '16px' }}>
          LoungePair+ <span style={{ color: '#2563eb' }}>3D Digital Pass Simulator</span>
        </h2>
        <p style={{ fontSize: '18px', color: '#475569', maxWidth: '650px', margin: '0 auto' }}>
          Customize your digital lounge pass in real-time. Test our instant 3D holographic boarding pass technology before your next flight.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '40px',
        alignItems: 'center',
        background: '#ffffff',
        borderRadius: '32px',
        padding: '40px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.08)'
      }}>
        
        {/* Left Control Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Hub Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
              1. Select International Airport Hub
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
              {hubs.map((h) => (
                <button
                  key={h.code}
                  type="button"
                  onClick={() => setSelectedHub(h)}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    border: selectedHub.code === h.code ? '2px solid #2563eb' : '1px solid #cbd5e1',
                    background: selectedHub.code === h.code ? '#eff6ff' : '#f8fafc',
                    color: selectedHub.code === h.code ? '#1e3a8a' : '#334155',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontSize: '16px', color: '#2563eb' }}>{h.code}</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>{h.city}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tier Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
              2. Choose VIP Access Tier
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['Standard VIP', 'Gold Executive', 'Diamond Suite'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTier(t)}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: tier === t ? '2px solid #d97706' : '1px solid #cbd5e1',
                    background: tier === t ? '#fffbeb' : '#f8fafc',
                    color: tier === t ? '#b45309' : '#334155',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Traveler Name */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
              3. Traveler Name
            </label>
            <input 
              type="text"
              value={travelerName}
              onChange={(e) => setTravelerName(e.target.value.toUpperCase())}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1.5px solid #cbd5e1',
                fontSize: '15px',
                fontWeight: 600,
                color: '#0f172a',
                outline: 'none'
              }}
            />
          </div>

          {/* Perks Switches */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
              4. Included Complimentary Perks
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { key: 'shower', label: 'Rainfall Shower Spa', icon: <Utensils size={16} /> },
                { key: 'buffet', label: 'Gourmet Chef Buffet', icon: <Coffee size={16} /> },
                { key: 'napPod', label: 'Private Sleep Pod', icon: <Wifi size={16} /> },
                { key: 'fastTrack', label: 'Priority Security Escort', icon: <Award size={16} /> }
              ].map((item) => (
                <div
                  key={item.key}
                  onClick={() => togglePerk(item.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: perks[item.key] ? '#eff6ff' : '#f1f5f9',
                    border: perks[item.key] ? '1px solid #bfdbfe' : '1px solid transparent',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: perks[item.key] ? '#1e3a8a' : '#64748b'
                  }}
                >
                  <CheckCircle2 size={18} color={perks[item.key] ? '#2563eb' : '#94a3b8'} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 3D Card Display Area */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* 3D Holographic Card Container */}
          <div 
            className="card-3d-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              width: '100%',
              maxWidth: '420px',
              height: '260px',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            <div 
              className="card-3d"
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                transform: `rotateX(${isFlipped ? 0 : tilt.x}deg) rotateY(${isFlipped ? 180 : tilt.y}deg)`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '24px',
                boxShadow: '0 30px 60px -15px rgba(37, 99, 235, 0.3)'
              }}
            >
              {/* Front Side of 3D Pass */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)',
                borderRadius: '24px',
                padding: '24px',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                overflow: 'hidden'
              }}>
                {/* Holographic Shimmer Effect Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
                  transform: `translate(${tilt.y * 3}px, ${tilt.x * 3}px)`,
                  pointerEvents: 'none'
                }} />

                {/* Card Top Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', opacity: 0.8 }}>DIGITAL LOUNGE PASS</span>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#60a5fa' }}>LoungePair+</div>
                  </div>
                  <div style={{
                    background: tier === 'Diamond Suite' ? '#d97706' : '#2563eb',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }}>
                    {tier}
                  </div>
                </div>

                {/* Hub Details */}
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '1px' }}>
                    {selectedHub.code} • {selectedHub.city}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>{selectedHub.terminal}</div>
                </div>

                {/* Traveler & Flip Indicator */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '12px' }}>
                  <div>
                    <div style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase' }}>Passenger Name</div>
                    <div style={{ fontSize: '15px', fontWeight: 700 }}>{travelerName || 'TRAVELER'}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#93c5fd' }}>
                    <RotateCcw size={13} />
                    <span>Click to flip QR</span>
                  </div>
                </div>
              </div>

              {/* Back Side of 3D Pass (QR Code) */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: '#ffffff',
                borderRadius: '24px',
                padding: '24px',
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '2px solid #2563eb',
                boxShadow: 'inset 0 0 20px rgba(37, 99, 235, 0.05)'
              }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>BIOMETRIC QR TOKEN</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                    {selectedHub.code}-{tier.substring(0, 4).toUpperCase()}-9841
                  </div>
                  <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={14} /> INSTANT ACCESS VERIFIED
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '12px' }}>
                    Scan at reception for entry.
                  </div>
                </div>

                <div style={{
                  padding: '12px',
                  background: '#f8fafc',
                  borderRadius: '16px',
                  border: '1px solid #cbd5e1'
                }}>
                  <QrCode size={96} color="#0f172a" />
                </div>
              </div>

            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setIsFlipped(!isFlipped)}
              className="btn-secondary"
              style={{ fontSize: '13px', padding: '8px 16px' }}
            >
              <RotateCcw size={15} /> {isFlipped ? 'Show Pass Front' : 'Flip to QR Code'}
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectLounge({
                  id: selectedHub.code.toLowerCase(),
                  city: selectedHub.city,
                  airportCode: selectedHub.code,
                  terminals: [selectedHub.terminal],
                  rating: 4.9,
                  priceUSD: selectedHub.basePrice + (tier === 'Gold Executive' ? 15 : tier === 'Diamond Suite' ? 35 : 0),
                  image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
                  heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
                  description: `Custom ${tier} pass for ${selectedHub.city}. Includes high-speed Wi-Fi, food spreads, and luxury services.`
                });
              }}
              className="btn-primary"
              style={{ fontSize: '15px', padding: '12px 28px' }}
            >
              Buy Customized Pass ({currInfo.symbol}{calculateTotal()})
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
