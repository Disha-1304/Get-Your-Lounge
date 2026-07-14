<?php
// components/footer.php
?>
<footer style="background: #0A192F; color: #FFFFFF; paddingTop: 64px; padding-bottom: 40px; border-top: 1px solid rgba(255, 255, 255, 0.15); font-family: 'Plus Jakarta Sans', sans-serif;">
  <div style="max-width: 1350px; margin: 0 auto; padding: 64px 24px 40px;">
    
    <!-- Main Footer Grid -->
    <div style="display: grid; grid-template-columns: minmax(360px, 2.2fr) repeat(auto-fit, minmax(145px, 1fr)); gap: 40px; margin-bottom: 56px;">
      <!-- Brand Emblem Column -->
      <div>
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 22px;">
          <img 
            src="/logo.png" 
            alt="LoungePair Logo" 
            style="height: 120px; width: auto; display: block;" 
          />
          <div style="display: flex; flex-direction: column; line-height: 1.1;">
            <div style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; letter-spacing: 1px; color: #FFFFFF; text-transform: uppercase;">
              Lounge<span style="color: #E61E38;">Pair</span>
            </div>
            <div style="font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 3.5px; color: rgba(255, 255, 255, 0.6); text-transform: uppercase; margin-top: 3px;">
              International
            </div>
          </div>
        </div>
      </div>

      <!-- Explore Column -->
      <div>
        <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 20px; color: #E61E38;">Explore</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 14px; color: #cbd5e1;">
          <li><a href="#guides-section" style="color: inherit; text-decoration: none;">Airports</a></li>
          <li><a href="#faq-section" style="color: inherit; text-decoration: none;">Pass Protection</a></li>
        </ul>
      </div>

      <!-- Company Column -->
      <div>
        <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 20px; color: #E61E38;">Company</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 14px; color: #cbd5e1;">
          <li><a href="#about" style="color: inherit; text-decoration: none;">About</a></li>
          <li><a href="#business" style="color: inherit; text-decoration: none;">Business</a></li>
          <li><a href="#partners" style="color: inherit; text-decoration: none;">Partners</a></li>
          <li><a href="#affiliates" style="color: inherit; text-decoration: none;">Affiliates</a></li>
        </ul>
      </div>

      <!-- Community Column -->
      <div>
        <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 20px; color: #E61E38;">Community</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 14px; color: #cbd5e1;">
          <li><a href="#support" style="color: inherit; text-decoration: none;">Support</a></li>
          <li><a href="#creators" style="color: inherit; text-decoration: none;">Travel Creators</a></li>
        </ul>
      </div>

      <!-- Social Column -->
      <div>
        <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 20px; color: #E61E38;">Social</h4>
        <div style="display: flex; gap: 12px;">
          <a href="https://www.instagram.com/loungepair/" target="_blank" rel="noreferrer" style="width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.3); display: flex; align-items: center; justify-content: center; color: #FFFFFF; text-decoration: none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#facebook" style="width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.3); display: flex; align-items: center; justify-content: center; color: #FFFFFF; text-decoration: none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#twitter" style="width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.3); display: flex; align-items: center; justify-content: center; color: #FFFFFF; text-decoration: none; font-weight: 800; font-size: 14px;">
            𝕏
          </a>
          <a href="#linkedin" style="width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.3); display: flex; align-items: center; justify-content: center; color: #FFFFFF; text-decoration: none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom Horizontal Divider -->
    <div style="border-top: 1px solid rgba(255, 255, 255, 0.15); padding-top: 24px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; font-size: 13px; color: #cbd5e1;">
      <div>
        Copyright 2026 LoungePair, Inc. All rights reserved.
      </div>
      <div style="display: flex; gap: 24px;">
        <a href="#privacy" style="color: inherit; text-decoration: none;">Privacy Policy</a>
        <a href="#terms" style="color: inherit; text-decoration: none;">Terms</a>
        <a href="#sitemap" style="color: inherit; text-decoration: none;">Sitemap</a>
      </div>
    </div>

  </div>
</footer>
