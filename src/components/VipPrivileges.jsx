import React from 'react';
import { ShieldCheck, Utensils, Headphones, Car, Clock } from 'lucide-react';

export default function VipPrivileges({ onOpenEnquire }) {
  const privileges = [
    {
      icon: <Car className="w-8 h-8" style={{ color: '#D4AF37' }} />,
      title: 'Tarmac Chauffeur Buggy',
      subtitle: 'Private Electric Escort',
      desc: 'Seamless transfer via private electric limousine buggy from your arrival gate directly to the private lounge saloon doors.'
    },
    {
      icon: <Clock className="w-8 h-8" style={{ color: '#D4AF37' }} />,
      title: 'Rainfall Spa Suites',
      subtitle: 'Guaranteed Wellness',
      desc: 'Priority reservations for marble rainfall shower suites, organic botanical bath amenities, and acoustic nap cubicles.'
    },
    {
      icon: <Utensils className="w-8 h-8" style={{ color: '#D4AF37' }} />,
      title: 'Michelin-Star Dining',
      subtitle: 'Curated Gastronomy',
      desc: 'Complimentary access to à la carte gourmet dining menus, live chef noodle bars, and vintage champagne & cocktail cellars.'
    },
    {
      icon: <Headphones className="w-8 h-8" style={{ color: '#D4AF37' }} />,
      title: '24/7 Dedicated Concierge',
      subtitle: 'Bespoke Travel Assistance',
      desc: 'Personal AI & human concierge for proactive flight delay tracking, instant re-booking assistance, and fast-track escort.'
    }
  ];

  return (
    <section style={{ padding: '80px 20px', background: '#F4F1EA', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient Lighting Glows */}
      <div className="ambient-glow-rose" style={{ top: '-10%', left: '10%' }} />
      <div className="ambient-glow-gold" style={{ bottom: '-10%', right: '10%' }} />

      <div style={{ maxWidth: '1350px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          background: '#2B221E',
          borderRadius: '36px',
          padding: '64px 48px',
          color: '#F4F1EA',
          boxShadow: '0 30px 70px rgba(43, 34, 30, 0.35)',
          border: '1.5px solid rgba(212, 175, 55, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Top Gold Badge */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              borderRadius: '999px',
              marginBottom: '16px',
              color: '#D4AF37',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              Black Card Lifestyle
            </div>

            <h2 className="luxury-serif" style={{ fontSize: '42px', color: '#F4F1EA', marginBottom: '16px', fontWeight: 700 }}>
              Bespoke VIP <span className="champagne-text">Privileges</span>
            </h2>
            <p style={{ fontSize: '16px', color: '#EAE5DB', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7, fontWeight: 400 }}>
              Beyond the lounge doors. Experience world-class airport hospitality, private transfers, and curated lifestyle privileges designed for the discerning global traveler.
            </p>
          </div>

          {/* Privileges Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
            marginBottom: '48px'
          }}>
            {privileges.map((item, idx) => (
              <div
                key={idx}
                className="luxury-card-hover"
                style={{
                  background: 'rgba(244, 241, 234, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(247, 225, 215, 0.15)',
                  borderRadius: '24px',
                  padding: '36px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '18px',
                  background: 'rgba(212, 175, 55, 0.12)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}>
                  {item.icon}
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#D4AF37', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {item.subtitle}
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#F4F1EA', marginBottom: '12px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#EAE5DB', lineHeight: 1.6, opacity: 0.9 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => onOpenEnquire?.('Black Card VIP Concierge')}
              className="btn-shimmer"
              style={{
                padding: '18px 44px',
                background: 'linear-gradient(135deg, #F7E1D7 0%, #EED1C3 100%)',
                color: '#2B221E',
                border: 'none',
                borderRadius: '999px',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(247, 225, 215, 0.3)'
              }}
            >
              Request Black Card Concierge
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
