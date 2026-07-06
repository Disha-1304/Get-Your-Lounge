import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export default function VirtualTourModal({ lounge, onClose, onSelectLounge }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!lounge) return null;

  const slides = lounge.virtualTour && lounge.virtualTour.length > 0 
    ? lounge.virtualTour 
    : [
        { title: 'Main Executive Atrium', url: lounge.heroImage || lounge.image },
        { title: 'Gourmet Dining Spread', url: lounge.image }
      ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '32px',
          maxWidth: '760px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 35px 65px -15px rgba(15, 23, 42, 0.4)',
          border: '1px solid #e2e8f0'
        }}
      >
        {/* Top Bar */}
        <div style={{
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc'
        }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#E61E38', textTransform: 'uppercase', letterSpacing: '1px' }}>
              360° VIRTUAL PREVIEW
            </span>
            <h3 style={{ fontSize: '20px', color: '#0A192F' }}>{lounge.city} ({lounge.airportCode})</h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#e2e8f0',
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
            <X size={20} color="#0A192F" />
          </button>
        </div>

        {/* Panoramic Viewer Area */}
        <div style={{ position: 'relative', height: '400px', background: '#0A192F' }}>
          <img 
            src={slides[currentSlide].url} 
            alt={slides[currentSlide].title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.85)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ChevronLeft size={24} color="#0A192F" />
          </button>

          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.85)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ChevronRight size={24} color="#0A192F" />
          </button>

          {/* Slide Caption Banner */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '16px 24px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(10, 25, 47, 0.9) 100%)',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ fontSize: '12px', opacity: 0.8 }}>Area {currentSlide + 1} of {slides.length}</span>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>{slides[currentSlide].title}</div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {slides.map((_, i) => (
                <span 
                  key={i}
                  style={{
                    width: i === currentSlide ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === currentSlide ? '#E61E38' : 'rgba(255,255,255,0.4)',
                    transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0A192F' }}>Included Amenities:</div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>{lounge.amenities.join(', ')}</div>
          </div>

          <button
            onClick={() => {
              onClose();
              onSelectLounge(lounge);
            }}
            className="btn-primary"
            style={{ padding: '12px 28px', fontSize: '15px' }}
          >
            Book This Lounge
          </button>
        </div>
      </div>
    </div>
  );
}
