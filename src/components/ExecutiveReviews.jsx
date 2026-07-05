import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function ExecutiveReviews() {
  const reviews = [
    {
      quote: "LoungePair transformed our international corporate travel. Having instant guaranteed access to private suites and rainfall showers during 8-hour layovers in Singapore and Dubai is invaluable.",
      author: "Julianne Vance",
      title: "Managing Director, Global Wealth Partners",
      route: "Frequent Flyer • JFK ⇄ SIN",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    {
      quote: "The zero-membership model is brilliant. I bought my digital 3D QR pass while standing right outside the Plaza Premium Concierge in Concourse B and entered within 20 seconds. Exceptional service.",
      author: "Rajesh Mehta",
      title: "Founder & CEO, Horizon Tech Labs",
      route: "First Class Club • DXB ⇄ LHR",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    },
    {
      quote: "As a diplomatic courier, schedule flexibility is critical. Knowing my pass remains valid for 365 days across any flight delay or reschedule gives me total peace of mind. Truly 5-star airport hospitality.",
      author: "Lord Alistair Sterling",
      title: "Senior Diplomatic Advisor",
      route: "Global Ambassador • CDG ⇄ HND",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section style={{ padding: '80px 20px', background: '#F4F1EA', position: 'relative' }}>
      <div style={{ maxWidth: '1350px', margin: '0 auto' }}>
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: '#EAE5DB',
            border: '1px solid rgba(43, 34, 30, 0.15)',
            borderRadius: '999px',
            marginBottom: '16px',
            color: '#2B221E',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            <Star className="w-3.5 h-3.5 fill-current" style={{ color: '#D4AF37' }} />
            Executive Testimonials
          </div>

          <h2 className="luxury-serif" style={{ fontSize: '42px', color: '#2B221E', marginBottom: '16px' }}>
            Accolades from the <span className="champagne-text">Discerning Flyer</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#5C4B43', maxWidth: '580px', margin: '0 auto', lineHeight: 1.6 }}>
            Read how global executives, diplomats, and frequent travelers experience effortless airport hospitality with LoungePair International.
          </p>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px'
        }}>
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="luxury-card-hover"
              style={{
                background: '#ffffff',
                borderRadius: '28px',
                padding: '40px 36px',
                border: '1.5px solid rgba(247, 225, 215, 0.8)',
                boxShadow: '0 12px 36px rgba(43, 34, 30, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '28px',
                position: 'relative'
              }}
            >
              <Quote className="w-10 h-10" style={{ color: 'rgba(212, 175, 55, 0.2)', position: 'absolute', top: '28px', right: '32px' }} />

              <div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#D4AF37' }} />
                  ))}
                </div>

                {/* Quote */}
                <p className="luxury-serif" style={{ fontSize: '19px', color: '#2B221E', lineHeight: 1.6, fontStyle: 'italic', fontWeight: 600 }}>
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid rgba(43, 34, 30, 0.1)', paddingTop: '20px' }}>
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #F7E1D7' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#2B221E' }}>{rev.author}</h4>
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#10b981' }} />
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#5C4B43', marginBottom: '2px' }}>{rev.title}</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.5px' }}>{rev.route}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
