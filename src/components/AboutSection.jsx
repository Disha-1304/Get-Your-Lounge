import React from 'react';
import { Globe, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: '80px 24px 60px', background: '#F4F1EA', maxWidth: '1350px', margin: '0 auto' }}>
      
      {/* Container Card adhering to luxury palette */}
      <div style={{
        background: '#EAE5DB',
        borderRadius: '36px',
        padding: '56px 48px',
        border: '1px solid rgba(43, 34, 30, 0.15)',
        boxShadow: '0 20px 45px -10px rgba(43, 34, 30, 0.12)'
      }}>
        
        {/* Top Banner Image Area */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '56px',
          borderBottom: '1px solid rgba(43, 34, 30, 0.12)',
          paddingBottom: '48px'
        }}>
          <div style={{
            background: '#ffffff',
            padding: '20px 40px',
            borderRadius: '24px',
            boxShadow: '0 12px 30px rgba(43, 34, 30, 0.08)',
            marginBottom: '28px',
            border: '1px solid rgba(43, 34, 30, 0.08)',
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
            background: '#F7E1D7',
            color: '#2B221E',
            padding: '6px 18px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            border: '1px solid #2B221E'
          }}>
            About FlyAnyTrip Ecosystem
          </div>

          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800,
            color: '#2B221E',
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
              background: '#2B221E',
              color: '#F7E1D7',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <HeartHandshake size={24} />
            </div>
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#2B221E', fontFamily: 'Outfit, sans-serif' }}>
              Our Vision and Commitment to the Indian Traveler
            </h3>
          </div>

          <div style={{
            fontSize: '16px',
            color: '#5C4B43',
            lineHeight: 1.85,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            background: '#F4F1EA',
            padding: '36px',
            borderRadius: '24px',
            border: '1px solid rgba(43, 34, 30, 0.1)'
          }}>
            <p>
              FlyAnyTrip was founded on a singular, powerful belief: the world should be accessible to everyone, regardless of their budget or travel experience. As India’s premier tour operator and travel arranger, we have built a one-stop digital ecosystem for all things travel. We understand that for the modern Indian traveler, the planning process can often feel fragmented, cluttered with hidden costs, and overwhelmed by conflicting information. Our mission is to dismantle these barriers by providing a transparent, intuitive, and highly efficient booking portal. Whether you are a student planning a budget-friendly trip, a professional seeking a seamless transition for a business conference, or a family looking to curate a lifetime of memories, FlyAnyTrip acts as your dedicated travel partner.
            </p>
            <p>
              We believe that honesty is the absolute cornerstone of trust in the travel industry; hence, our business model is built entirely on the elimination of opaque surcharges and predatory pricing. When you browse our platform for cheap airline tickets, luxury hotel accommodations, or comprehensive holiday packages, you see the true cost of your journey. By leveraging advanced booking technology and maintaining strategic partnerships across the globe, we ensure that our customers receive the most competitive rates available in the market. Our commitment extends far beyond the simple act of booking; we view ourselves as architects of your travel experience. From the initial search query to the final boarding pass, our team works tirelessly to curate options that prioritize convenience, affordability, and comfort. We know that traveling requires a nuanced understanding of logistics, visa regulations, and regional hospitality standards. By centralizing services like visa assistance, airport transfers, and travel insurance, we reduce the stress of coordination, allowing you to focus on the joy of discovery. At FlyAnyTrip, we are not just selling tickets; we are providing the infrastructure for adventure, ensuring that every user feels supported, valued, and informed at every step of their journey.
            </p>
          </div>
        </div>

        {/* Content Section 2: Global Excellence and the Future of Seamless Travel */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: '#2B221E',
              color: '#F7E1D7',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Globe size={24} />
            </div>
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#2B221E', fontFamily: 'Outfit, sans-serif' }}>
              Global Excellence and the Future of Seamless Travel
            </h3>
          </div>

          <div style={{
            fontSize: '16px',
            color: '#5C4B43',
            lineHeight: 1.85,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            background: '#F4F1EA',
            padding: '36px',
            borderRadius: '24px',
            border: '1px solid rgba(43, 34, 30, 0.1)'
          }}>
            <p>
              While our roots are deeply embedded in the Indian travel landscape, FlyAnyTrip’s ambition and operational reach are truly global. Our expansive network, bolstered by our strategic association with the AnyTrip brand—a recognized leader in the African and Nigerian travel markets—allows us to offer an unparalleled level of service that bridges continents and cultures. Having successfully navigated the complexities of the travel industry for over two years, we have scaled our operations to support thousands of satisfied users across more than 96 countries. This global footprint is a testament to our agility and our ability to adapt to diverse travel needs, from the historic charm of Ahmedabad and the bustling streetscapes of Delhi to the vibrant, high-energy corridors of Mumbai.
            </p>
            <p>
              We understand that a "comfortable journey" means something different to every traveler, which is why we offer highly personalized service levels. Whether it is finding the best-priced flight to your destination or securing reliable, comfortable accommodation, our technology is designed to anticipate the needs of our users. We are continuously evolving our platform, integrating real-time analytics to ensure that our loyalty programs are rewarding and our booking processes are lightning-fast. Our success is measured not just in the volume of bookings, but in the trust we have built within our community. As we look toward the future, our goal remains clear: to remain the most reliable and transparent travel arranger in the industry. When you choose FlyAnyTrip, you are choosing a partner that values your time, respects your budget, and is dedicated to making your travel aspirations a reality. We are committed to fostering a world where borders are bridged by affordable airfare and where high-quality travel arrangements are the standard. Join us as we continue to redefine the travel experience, ensuring that every trip you take with us is a comfortable, memorable, and expertly curated adventure that leaves you ready for the next one.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}
