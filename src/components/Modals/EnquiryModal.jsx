import React, { useState } from 'react';
import { X, Building2, Send, CheckCircle2 } from 'lucide-react';

export default function EnquiryModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '32px',
          maxWidth: '520px',
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
            top: '20px',
            right: '20px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} color="#0f172a" />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '24px', color: '#0f172a', marginBottom: '8px' }}>Enquiry Received</h3>
            <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '24px' }}>
              Thank you for reaching out. Our Global Partnerships team will review your enquiry and get back within 24 hours.
            </p>
            <button onClick={onClose} className="btn-primary" style={{ padding: '12px 32px' }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ background: '#eff6ff', padding: '8px', borderRadius: '10px', color: '#2563eb' }}>
                <Building2 size={20} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
                ENTERPRISE PARTNERSHIP
              </span>
            </div>
            <h3 style={{ fontSize: '26px', color: '#0f172a', marginBottom: '8px' }}>Partner with LoungePair</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
              Connect your airline, loyalty network, or fintech app with our global airport inventory.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Company / Organization Name
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Star Alliance / Revolut / Emirates" 
                  required 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Contact Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe" 
                    required 
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Business Email
                  </label>
                  <input 
                    type="email" 
                    placeholder="jane@company.com" 
                    required 
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Partnership Interest
                </label>
                <select style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', background: '#fff' }}>
                  <option>API Integration / Digital Passes</option>
                  <option>Airline Passenger Recovery Vouchers</option>
                  <option>Credit Card / Loyalty Perk Program</option>
                  <option>Lounge Operator Distribution</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Message
                </label>
                <textarea 
                  rows={3}
                  placeholder="Tell us about your volume requirements or timeline..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontFamily: 'inherit' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px' }}>
                Submit Partnership Enquiry <Send size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
