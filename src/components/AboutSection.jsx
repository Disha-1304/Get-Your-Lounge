import React from 'react';
import { Globe, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: '80px 24px 60px', background: '#FFFFFF', maxWidth: '1350px', margin: '0 auto' }}>
      
      {/* Container Card adhering to luxury palette */}
      <div style={{
        background: '#F8F9FB',
        borderRadius: '36px',
        padding: '56px 48px',
        border: '1px solid rgba(10, 25, 47, 0.15)',
        boxShadow: '0 20px 45px -10px rgba(10, 25, 47, 0.12)'
      }}>
        
        {/* Top Banner Image Area */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '56px',
          borderBottom: '1px solid rgba(10, 25, 47, 0.12)',
          paddingBottom: '48px'
        }}>
          <div style={{
            background: '#ffffff',
            padding: '20px 40px',
            borderRadius: '24px',
            boxShadow: '0 12px 30px rgba(10, 25, 47, 0.08)',
            marginBottom: '28px',
            border: '1px solid rgba(10, 25, 47, 0.08)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src="/anytrip-banner.png" 
              alt="AnyTrip & FlyAnyTrip Ecosystem" 
              style={{
                maxHeight: '70px',
                width: 'auto',
                display: 'block'
              }}
            />
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FDECEF',
            color: '#E61E38',
            padding: '6px 18px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            border: '1px solid #E61E38'
          }}>
            About FlyAnyTrip Ecosystem
          </div>

          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800,
            color: '#0A192F',
            maxWidth: '780px',
            lineHeight: 1.2
          }}>
            Architects of Your Global Travel Experience
          </h2>
        </div>

        {/* Content Section 1: Our Vision and Commitment to the Indian Traveler */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: '#E61E38',
              color: '#FFFFFF',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <HeartHandshake size={24} />
            </div>
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#0A192F', fontFamily: 'Outfit, sans-serif' }}>
              Our Vision and Commitment to the Indian Traveler
            </h3>
          </div>

          <div style={{
            fontSize: '16px',
            color: '#334155',
            lineHeight: 1.85,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            background: '#FFFFFF',
            padding: '36px',
            borderRadius: '24px',
            border: '1px solid rgba(10, 25, 47, 0.1)'
          }}>
            <p>
              FlyAnyTrip was founded on a singular, powerful belief: the world should be accessible to everyone, regardless of budget or travel experience. As India’s premier tour operator and travel arranger, we have built a one-stop digital ecosystem for all things travel. We understand that for the modern Indian traveler, the planning process can often feel fragmented, cluttered with hidden costs, and overwhelmed by conflicting information. Our mission is to dismantle these barriers by providing a transparent, intuitive, and highly efficient booking portal. Whether you are a student planning a budget-friendly trip, a professional seeking a seamless transition for a business conference, or a family looking to curate lifetime memories, FlyAnyTrip acts as your dedicated travel partner.
            </p>
            <p>
              We believe honesty is the absolute cornerstone of trust in the travel industry; hence, our business model is built entirely on the elimination of opaque surcharges and predatory pricing. When you browse our platform for airline tickets, luxury hotel accommodations, or comprehensive holiday packages, you see the true cost of your journey. By leveraging advanced booking technology and maintaining global strategic partnerships, we ensure our customers receive the most competitive rates available in the market. Our commitment extends far beyond simple booking; we view ourselves as architects of your travel experience. By centralizing essential services like visa assistance, airport transfers, and travel insurance, we reduce the stress of coordination, allowing you to focus on the joy of discovery and adventure.
            </p>
          </div>
        </div>

        {/* Content Section 2: Global Excellence and the Future of Seamless Travel */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: '#E61E38',
              color: '#FFFFFF',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Globe size={24} />
            </div>
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#0A192F', fontFamily: 'Outfit, sans-serif' }}>
              Global Excellence and the Future of Seamless Travel
            </h3>
          </div>

          <div style={{
            fontSize: '16px',
            color: '#334155',
            lineHeight: 1.85,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            background: '#FFFFFF',
            padding: '36px',
            borderRadius: '24px',
            border: '1px solid rgba(10, 25, 47, 0.1)'
          }}>
            <p>
              While our roots are deeply embedded in the Indian travel landscape, FlyAnyTrip’s ambition and operational reach are truly global. Our expansive network, bolstered by our strategic association with the AnyTrip brand—a recognized leader in African and international markets—allows us to offer an unparalleled level of service that bridges continents and cultures. Having successfully navigated the industry for over two years, we have scaled our operations to support thousands of satisfied users across more than 96 countries. This global footprint is a testament to our agility and our ability to adapt to diverse travel needs, from Delhi and Ahmedabad to Mumbai and beyond.
            </p>
            <p>
              We understand that a comfortable journey means something different to every traveler, which is why we offer highly personalized service levels. Whether it is finding the best-priced flight to your destination or securing reliable accommodation, our technology is designed to anticipate your needs. We continuously evolve our platform, integrating real-time analytics to ensure our loyalty programs are rewarding and our booking processes lightning-fast. As we look toward the future, our goal remains clear: to remain the most reliable and transparent travel arranger in the industry. When you choose FlyAnyTrip, you are choosing a partner that values your time, respects your budget, and is dedicated to making your travel aspirations a reality. Join us as we continue to redefine travel, ensuring every trip you take is a comfortable, memorable, and expertly curated adventure.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}
