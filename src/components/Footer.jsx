import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background: '#2B221E', color: '#F4F1EA', paddingTop: '64px', paddingBottom: '40px', borderTop: '1px solid rgba(247, 225, 215, 0.15)' }}>
      <div style={{ maxWidth: '1350px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '56px'
        }}>
          {/* Brand Emblem Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src="/loungepair-logo.png" 
                  alt="Lounge Pair International"
                  style={{ height: '86px', width: 'auto', display: 'block' }}
                />
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#EAE5DB', lineHeight: 1.6, maxWidth: '260px' }}>
              Instant global airport lounge access. No memberships or credit card requirements needed.
            </p>
          </div>

          {/* Explore Column */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: '#F7E1D7' }}>Explore</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#EAE5DB' }}>
              <li><a href="#guides-section" style={{ color: 'inherit', textDecoration: 'none' }}>Airports</a></li>
              <li><a href="#faq-section" style={{ color: 'inherit', textDecoration: 'none' }}>Pass Protection</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: '#F7E1D7' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#EAE5DB' }}>
              <li><a href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>About</a></li>
              <li><a href="#business" style={{ color: 'inherit', textDecoration: 'none' }}>Business</a></li>
              <li><a href="#partners" style={{ color: 'inherit', textDecoration: 'none' }}>Partners</a></li>
              <li><a href="#affiliates" style={{ color: 'inherit', textDecoration: 'none' }}>Affiliates</a></li>
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: '#F7E1D7' }}>Community</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#EAE5DB' }}>
              <li><a href="#support" style={{ color: 'inherit', textDecoration: 'none' }}>Support</a></li>
              <li><a href="#creators" style={{ color: 'inherit', textDecoration: 'none' }}>Travel Creators</a></li>
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: '#F7E1D7' }}>Social</h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://www.instagram.com/loungepair/" target="_blank" rel="noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(247, 225, 215, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F4F1EA', textDecoration: 'none' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#facebook" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(247, 225, 215, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F4F1EA', textDecoration: 'none' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#twitter" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(247, 225, 215, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F4F1EA', textDecoration: 'none', fontWeight: 800, fontSize: '14px' }}>
                𝕏
              </a>
              <a href="#linkedin" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(247, 225, 215, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F4F1EA', textDecoration: 'none' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Divider */}
        <div style={{ borderTop: '1px solid rgba(247, 225, 215, 0.15)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#EAE5DB' }}>
          <div>
            Copyright 2026 LoungePair, Inc. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
            <a href="#sitemap" style={{ color: 'inherit', textDecoration: 'none' }}>Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
