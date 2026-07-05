import React from 'react';
import { ArrowRight, Building2 } from 'lucide-react';

export default function PartnerCTA({ onOpenEnquire }) {
  return (
    <section id="partners-section" style={{ padding: '40px 20px 80px', background: '#F4F1EA', maxWidth: '1350px', margin: '0 auto' }}>
      <div 
        style={{
          background: '#2B221E',
          borderRadius: '32px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          boxShadow: '0 30px 60px -15px rgba(43, 34, 30, 0.25)',
          border: '1px solid rgba(247, 225, 215, 0.2)'
        }}
      >
        {/* Left Image Section */}
        <div style={{ position: 'relative', minHeight: '340px', overflow: 'hidden' }}>
          <img 
            src="/partner-with-us.png" 
            alt="VIP Lounge Partnership"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 60%, #2B221E 100%)'
          }} />
        </div>

        {/* Right Content Section adhering to Pale Oatmeal & Desert Rose */}
        <div style={{
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: '#F4F1EA'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#F7E1D7',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 700,
            color: '#2B221E',
            width: 'fit-content',
            marginBottom: '18px',
            border: '1px solid #2B221E'
          }}>
            <Building2 size={14} color="#2B221E" />
            B2B ENTERPRISE API & PASSES
          </div>

          <h2 className="luxury-serif" style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', color: '#F4F1EA', marginBottom: '16px', lineHeight: 1.2 }}>
            Want to partner with us?
          </h2>

          <p style={{ fontSize: '16px', color: '#EAE5DB', lineHeight: 1.7, marginBottom: '32px' }}>
            Whether you're an airline, a loyalty program, a travel agency, or a brand running promotional campaigns, we provide the turnkey API tools and guaranteed inventory to get you live fast.
          </p>

          <div>
            <button
              type="button"
              onClick={onOpenEnquire}
              className="btn-shimmer"
              style={{
                background: '#F7E1D7',
                color: '#2B221E',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 800,
                fontSize: '16px',
                padding: '16px 40px',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Enquire now
              <ArrowRight size={18} color="#2B221E" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
