import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, X } from 'lucide-react';
import { SOCIAL_GALLERY } from '../data/loungesData';

export default function SocialGallery() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section style={{ padding: '60px 20px 80px', maxWidth: '1350px', margin: '0 auto', textAlign: 'center' }}>
      
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#0A192F', marginBottom: '12px' }}>
          Share your lounge experience
        </h2>
        <p style={{ fontSize: '16px', color: '#475569' }}>
          Show your love by using <strong style={{ color: '#E61E38' }}>#Ilovemylounge</strong> and tagging us <strong style={{ color: '#0A192F' }}>@LoungePair</strong> to be featured!
        </p>
      </div>

      {/* 4 Card Photo Grid matching screenshots */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px'
      }}>
        {SOCIAL_GALLERY.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedPost(item)}
            className="card-3d-container"
            style={{
              position: 'relative',
              height: '320px',
              borderRadius: '24px',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 15px 35px -10px rgba(15, 23, 42, 0.15)',
              border: '1px solid #e2e8f0'
            }}
          >
            <img 
              src={item.image} 
              alt={item.location}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />

            {/* Dark Gradient Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, transparent 50%, rgba(10, 25, 47, 0.85) 100%)'
            }} />

            {/* Bottom Tag "@loungepair" matching Image 6 & 7 */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '15px'
            }}>
              <span>@loungepair</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', padding: '4px 10px', borderRadius: '99px' }}>
                <Heart size={14} fill="#ef4444" color="#ef4444" /> {item.likes}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPost && (
        <div 
          className="modal-overlay"
          onClick={() => setSelectedPost(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              maxWidth: '560px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 30px 60px -15px rgba(0,0,0,0.3)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setSelectedPost(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <X size={20} color="#0A192F" />
            </button>

            <img 
              src={selectedPost.image} 
              alt={selectedPost.location} 
              style={{ width: '100%', height: '320px', objectFit: 'cover' }} 
            />

            <div style={{ padding: '24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontWeight: 800, fontSize: '16px', color: '#0A192F' }}>{selectedPost.user}</span>
                <span style={{ fontSize: '13px', color: '#64748b' }}>📍 {selectedPost.location}</span>
              </div>
              <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6, marginBottom: '20px' }}>
                "{selectedPost.comment}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748b', fontSize: '14px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontWeight: 700 }}>
                  <Heart size={18} fill="#ef4444" /> {selectedPost.likes} Likes
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MessageCircle size={18} /> 48 Comments
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Share2 size={18} /> Share
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
