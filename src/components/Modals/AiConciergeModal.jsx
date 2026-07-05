import React, { useState } from 'react';
import { X, Send, Bot, User, ArrowRight } from 'lucide-react';
import { LOUNGE_GUIDES } from '../../data/loungesData';

export default function AiConciergeModal({ onClose, onSelectLounge }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "👋 Welcome to LoungePair AI Concierge! Tell me your layover airport, terminal number, or preferred amenities (e.g., showers, sleeping pods, buffet), and I'll find your perfect VIP match instantly."
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      let matchedLounge = LOUNGE_GUIDES[0];
      const lower = userMsg.toLowerCase();
      if (lower.includes('dubai') || lower.includes('dxb')) matchedLounge = LOUNGE_GUIDES.find(l => l.airportCode === 'DXB');
      else if (lower.includes('hong') || lower.includes('hkg')) matchedLounge = LOUNGE_GUIDES.find(l => l.airportCode === 'HKG');
      else if (lower.includes('york') || lower.includes('jfk')) matchedLounge = LOUNGE_GUIDES.find(l => l.airportCode === 'JFK');
      else if (lower.includes('tokyo') || lower.includes('hnd')) matchedLounge = LOUNGE_GUIDES.find(l => l.airportCode === 'HND');
      else if (lower.includes('london') || lower.includes('lhr')) matchedLounge = LOUNGE_GUIDES.find(l => l.airportCode === 'LHR');
      else if (lower.includes('delhi') || lower.includes('del')) matchedLounge = LOUNGE_GUIDES.find(l => l.airportCode === 'DEL');

      setIsThinking(false);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Based on your travel itinerary, I strongly recommend the ${matchedLounge.city} (${matchedLounge.airportCode}) VIP Lounge at ${matchedLounge.terminals[0]}. It features ${matchedLounge.amenities.slice(0, 3).join(', ')} with instant guaranteed entry starting at $${matchedLounge.priceUSD}.`,
          recommendedLounge: matchedLounge
        }
      ]);
    }, 1000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        maxWidth: '620px',
        width: '100%',
        height: '680px',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: '1px solid #e2e8f0'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#93c5fd'
            }}>
              <Bot size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', color: '#ffffff', margin: 0, fontWeight: 700 }}>LoungePair AI Concierge</h3>
              <div style={{ fontSize: '12px', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                Online • Powered by Gemini 2.0
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#ffffff',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Chat Messages */}
        <div style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: '#f8fafc'
        }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '12px',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%'
              }}
            >
              {msg.sender === 'ai' && (
                <div style={{ background: '#2563eb', padding: '6px', borderRadius: '50%', color: '#fff', flexShrink: 0 }}>
                  <Bot size={16} />
                </div>
              )}

              <div style={{
                background: msg.sender === 'user' ? '#2563eb' : '#ffffff',
                color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                padding: '14px 18px',
                borderRadius: '18px',
                border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
                fontSize: '14px',
                lineHeight: 1.6
              }}>
                <div>{msg.text}</div>

                {msg.recommendedLounge && (
                  <div style={{
                    marginTop: '14px',
                    padding: '12px',
                    background: '#eff6ff',
                    borderRadius: '12px',
                    border: '1px solid #bfdbfe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '15px', color: '#1e3a8a' }}>
                        {msg.recommendedLounge.city} ({msg.recommendedLounge.airportCode})
                      </div>
                      <div style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600 }}>
                        ⭐ {msg.recommendedLounge.rating} • ${msg.recommendedLounge.priceUSD} Instant Access
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectLounge(msg.recommendedLounge);
                      }}
                      className="btn-primary"
                      style={{ padding: '8px 14px', fontSize: '13px' }}
                    >
                      Book Pass
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isThinking && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px', fontStyle: 'italic', paddingLeft: '12px' }}>
              <Bot size={16} className="animate-pulse-glow" color="#2563eb" />
              Scanning 1,400+ international hubs for optimal amenities...
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ padding: '10px 20px', background: '#f1f5f9', display: 'flex', gap: '8px', overflowX: 'auto', borderTop: '1px solid #e2e8f0' }}>
          {[
            'Best lounge in Singapore T3?',
            'Showers in Dubai DXB?',
            '4 hr layover in London Heathrow'
          ].map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setInput(chip)}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '6px 12px',
                borderRadius: '99px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#334155',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} style={{ padding: '16px 20px', background: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Type layover details or city..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: '999px',
              border: '1.5px solid #cbd5e1',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ width: '44px', height: '44px', padding: 0, borderRadius: '50%', flexShrink: 0 }}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
