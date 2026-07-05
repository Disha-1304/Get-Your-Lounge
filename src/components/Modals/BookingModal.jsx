import React, { useState } from 'react';
import { X, Calendar, Users, ShieldCheck, QrCode, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({ lounge, onClose }) {
  const [step, setStep] = useState(1);
  const [travelers, setTravelers] = useState(1);
  const [date, setDate] = useState('2026-07-10');
  const [addSpa, setAddSpa] = useState(false);
  const [addFastTrack, setAddFastTrack] = useState(true);

  if (!lounge) return null;

  const handleCompleteBooking = (e) => {
    e.preventDefault();
    setStep(2);
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti triggered');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '32px',
          maxWidth: '540px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 35px 65px -15px rgba(15, 23, 42, 0.3)',
          border: '1px solid #e2e8f0'
        }}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
          color: '#ffffff',
          padding: '24px 28px',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>

          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#93c5fd' }}>
            INSTANT PASS ISSUANCE
          </span>
          <h3 style={{ fontSize: '24px', fontWeight: 800 }}>{lounge.city} Lounge</h3>
          <p style={{ fontSize: '13px', color: '#cbd5e1' }}>{lounge.terminals?.[0]} • Guaranteed Entry</p>
        </div>

        {/* Body */}
        {step === 1 ? (
          <form onSubmit={handleCompleteBooking} style={{ padding: '28px' }}>
            
            {/* Date & Travelers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Entry Date
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #cbd5e1', padding: '10px 14px', borderRadius: '12px' }}>
                  <Calendar size={18} color="#2563eb" />
                  <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontWeight: 600, color: '#0f172a', width: '100%' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  <Users size={14} style={{ display: 'inline', marginRight: '6px' }} />
                  Travelers
                </label>
                <select 
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    color: '#0f172a'
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{
              background: '#f8fafc',
              padding: '16px 20px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>Instant Guaranteed VIP Pass</span>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Instant digital QR entry</span>
              </div>
              <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={16} /> Verified Allocation
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '16px', fontSize: '16px' }}
            >
              Issue Digital VIP Pass Now
            </button>
          </form>
        ) : (
          /* Confirmation State */
          <div style={{ padding: '36px 28px', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: '#d1fae5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: '#10b981'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '24px', color: '#0f172a', marginBottom: '8px' }}>Pass Issued Successfully!</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
              Your digital boarding token has been generated for <strong>{lounge.city}</strong>. Present the code below at the lounge entrance desk.
            </p>

            <div style={{
              background: '#f8fafc',
              border: '2px dashed #2563eb',
              padding: '24px',
              borderRadius: '20px',
              display: 'inline-block',
              marginBottom: '24px'
            }}>
              <QrCode size={120} color="#0f172a" />
              <div style={{ fontWeight: 800, fontSize: '14px', color: '#2563eb', marginTop: '8px', letterSpacing: '2px' }}>
                LP-2026-VIP-994
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={onClose}
                className="btn-primary"
                style={{ width: '100%', padding: '14px' }}
              >
                Done & Return to Homepage
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
