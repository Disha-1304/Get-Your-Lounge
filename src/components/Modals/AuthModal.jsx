import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck } from 'lucide-react';

export default function AuthModal({ initialMode = 'login', onClose }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '32px',
          maxWidth: '440px',
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
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ width: '56px', height: '56px', background: '#d1fae5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#10b981' }}>
              <ShieldCheck size={32} />
            </div>
            <h3 style={{ fontSize: '22px', color: '#0f172a', marginBottom: '8px' }}>
              {isLogin ? 'Welcome Back!' : 'Account Created!'}
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>Redirecting you to your LoungePair dashboard...</p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <h3 style={{ fontSize: '26px', color: '#0f172a', marginBottom: '6px' }}>
                {isLogin ? 'Log in to LoungePair' : 'Create VIP Account'}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b' }}>
                {isLogin ? 'Access your saved digital boarding passes.' : 'Start exploring 1,400+ airport lounges.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {!isLogin && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Full Name
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1.5px solid #cbd5e1', padding: '12px 14px', borderRadius: '12px' }}>
                    <User size={18} color="#64748b" />
                    <input 
                      type="text" 
                      placeholder="Alexander Wright" 
                      required 
                      style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', color: '#0f172a' }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Email Address
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1.5px solid #cbd5e1', padding: '12px 14px', borderRadius: '12px' }}>
                  <Mail size={18} color="#64748b" />
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    required 
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', color: '#0f172a' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Password
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1.5px solid #cbd5e1', padding: '12px 14px', borderRadius: '12px' }}>
                  <Lock size={18} color="#64748b" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', color: '#0f172a' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '15px', marginTop: '8px' }}
              >
                {isLogin ? 'Continue to Account' : 'Sign up for Free'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#64748b' }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, cursor: 'pointer' }}
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
