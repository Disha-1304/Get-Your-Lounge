import React from 'react';
import { X, Search, CreditCard, QrCode, Armchair } from 'lucide-react';

export default function HowItWorksModal({ onClose, onStartExploring }) {
  const steps = [
    {
      icon: <Search size={28} color="#2563eb" />,
      title: '1. Search Your Airport',
      desc: 'Enter your departure airport, layover city, or specific terminal into our global search engine.'
    },
    {
      icon: <CreditCard size={28} color="#10b981" />,
      title: '2. Select & Pay Per Pass',
      desc: 'No annual membership or business class ticket required. Pay only for the day you travel with guaranteed entry.'
    },
    {
      icon: <QrCode size={28} color="#d97706" />,
      title: '3. Receive Instant 3D QR Code',
      desc: 'Your digital boarding token is generated immediately on your phone screen with 100% cancellation protection.'
    },
    {
      icon: <Armchair size={28} color="#8b5cf6" />,
      title: '4. Relax & Enjoy',
      desc: 'Scan your code at the lounge reception desk and step into luxury gourmet dining, showers, and serenity.'
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '32px',
          maxWidth: '620px',
          width: '100%',
          padding: '36px',
          boxShadow: '0 35px 65px -15px rgba(15, 23, 42, 0.3)',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} color="#0f172a" />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
            STEP-BY-STEP GUIDE
          </span>
          <h3 style={{ fontSize: '28px', color: '#0f172a', marginTop: '4px' }}>How LoungePair Works</h3>
          <p style={{ fontSize: '15px', color: '#64748b' }}>Buy airport lounge access in under 30 seconds.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
          {steps.map((step, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '18px',
                padding: '16px',
                borderRadius: '16px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0'
              }}
            >
              <div style={{
                background: '#ffffff',
                padding: '12px',
                borderRadius: '14px',
                boxShadow: '0 4px 10px rgba(15, 23, 42, 0.05)',
                flexShrink: 0
              }}>
                {step.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '17px', color: '#0f172a', marginBottom: '4px' }}>{step.title}</h4>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            onClose();
            if (onStartExploring) onStartExploring();
          }}
          className="btn-primary"
          style={{ width: '100%', padding: '16px', fontSize: '16px' }}
        >
          Explore Airport Guides Now
        </button>
      </div>
    </div>
  );
}
