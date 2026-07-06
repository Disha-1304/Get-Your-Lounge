import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { FAQ_ITEMS } from '../data/loungesData';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQ_ITEMS.filter(item => 
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq-section" style={{ padding: '60px 20px 80px', maxWidth: '960px', margin: '0 auto' }}>
      
      {/* Section Header matching Image 4 & 5 */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#0A192F', marginBottom: '12px' }}>
          Buying lounge access with <span style={{ color: '#E61E38' }}>LoungePair</span>
        </h2>
        <p style={{ fontSize: '16px', color: '#334155', marginBottom: '24px' }}>
          Everything you need to know about our instant international airport lounge pass system.
        </p>

        {/* FAQ Search Bar */}
        <div style={{
          maxWidth: '480px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <Search size={18} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="Search FAQs (e.g., immediate entry, refund policy, payment)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 44px',
              borderRadius: '999px',
              border: '1.5px solid #cbd5e1',
              background: '#ffffff',
              fontSize: '14px',
              color: '#0f172a',
              outline: 'none',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)'
            }}
          />
        </div>
      </div>

      {/* Accordion Container matching Image 4 & 5 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredFaqs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '16px', color: '#64748b' }}>No matching questions found.</p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: isOpen ? '1.5px solid #E61E38' : '1px solid #e2e8f0',
                  boxShadow: isOpen ? '0 10px 25px -5px rgba(230, 30, 56, 0.1)' : '0 2px 8px rgba(15, 23, 42, 0.03)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    gap: '16px'
                  }}
                >
                  <span style={{ fontSize: '17px', fontWeight: 700, color: isOpen ? '#E61E38' : '#0A192F' }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isOpen ? '#FDECEF' : '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {isOpen ? <ChevronUp size={18} color="#E61E38" /> : <ChevronDown size={18} color="#64748b" />}
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 24px 22px',
                    fontSize: '15px',
                    color: '#475569',
                    lineHeight: 1.7,
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '16px'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
