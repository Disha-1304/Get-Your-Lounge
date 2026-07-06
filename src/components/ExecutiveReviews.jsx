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
    <section style={{ padding: '80px 20px', background: '#FFFFFF', position: 'relative' }}>
      <div style={{ maxWidth: '1350px', margin: '0 auto' }}>
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: '#FDECEF',
            border: '1px solid rgba(230, 30, 56, 0.3)',
            borderRadius: '999px',
            marginBottom: '16px',
            color: '#E61E38',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            <Star className="w-3.5 h-3.5 fill-current" style={{ color: '#E61E38' }} />
            Executive Testimonials
          </div>

          <h2 className="luxury-serif" style={{ fontSize: '42px', color: '#0A192F', marginBottom: '16px' }}>
            Accolades from the <span className="champagne-text">Discerning Flyer</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#334155', maxWidth: '580px', margin: '0 auto', lineHeight: 1.6 }}>
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
                border: '1.5px solid rgba(230, 30, 56, 0.2)',
                boxShadow: '0 12px 36px rgba(10, 25, 47, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '28px',
                position: 'relative'
              }}
            >
              <Quote className="w-10 h-10" style={{ color: 'rgba(230, 30, 56, 0.15)', position: 'absolute', top: '28px', right: '32px' }} />

              <div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#E61E38' }} />
                  ))}
                </div>

                {/* Quote */}
                <p className="luxury-serif" style={{ fontSize: '19px', color: '#0A192F', lineHeight: 1.6, fontStyle: 'italic', fontWeight: 600 }}>
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid rgba(10, 25, 47, 0.1)', paddingTop: '20px' }}>
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E61E38' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0A192F' }}>{rev.author}</h4>
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#10b981' }} />
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '2px' }}>{rev.title}</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#E61E38', letterSpacing: '0.5px' }}>{rev.route}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
