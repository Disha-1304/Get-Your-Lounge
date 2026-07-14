<?php
// components/social_gallery.php
?>
<section style="padding: 60px 20px 80px; max-width: 1350px; margin: 0 auto; text-align: center;">
  
  <div style="margin-bottom: 40px;">
    <h2 style="font-size: clamp(28px, 4vw, 42px); color: #0A192F; margin-bottom: 12px;">
      Share your lounge experience
    </h2>
    <p style="font-size: 16px; color: #475569;">
      Show your love by using <strong style="color: #E61E38;">#Ilovemylounge</strong> and tagging us <strong style="color: #0A192F;">@LoungePair</strong> to be featured!
    </p>
  </div>

  <!-- 4 Card Photo Grid -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
    <?php foreach ($SOCIAL_GALLERY as $item): ?>
      <div
        onclick="openSocialLightbox(<?php echo $item['id']; ?>)"
        class="card-3d-container"
        style="position: relative; height: 320px; border-radius: 24px; overflow: hidden; cursor: pointer; box-shadow: 0 15px 35px -10px rgba(15, 23, 42, 0.15); border: 1px solid #e2e8f0;"
      >
        <img 
          src="<?php echo $item['image']; ?>" 
          alt="<?php echo htmlspecialchars($item['location']); ?>"
          style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;"
          onmouseenter="this.style.transform = 'scale(1.08)'"
          onmouseleave="this.style.transform = 'scale(1)'"
        />

        <!-- Dark Gradient Overlay -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(180deg, transparent 50%, rgba(10, 25, 47, 0.85) 100%);"></div>

        <!-- Bottom Tag "@loungepair" -->
        <div style="position: absolute; bottom: 16px; left: 16px; right: 16px; display: flex; align-items: center; justify-content: space-between; color: #ffffff; font-weight: 700; font-size: 15px;">
          <span>@loungepair</span>
          <div style="display: flex; align-items: center; gap: 4px; font-size: 13px; background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); padding: 4px 10px; border-radius: 99px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <?php echo htmlspecialchars($item['likes']); ?>
          </div>
        </div>
      </div>
    <?php endforeach; ?>
  </div>

  <!-- Lightbox Modal (Populated Dynamically via JS) -->
  <div 
    id="social-lightbox"
    class="modal-overlay"
    onclick="closeSocialLightbox()"
    style="display: none;"
  >
    <div 
      onclick="event.stopPropagation()"
      style="background: #ffffff; border-radius: 24px; max-width: 560px; width: 100%; overflow: hidden; box-shadow: 0 30px 60px -15px rgba(0,0,0,0.3); position: relative;"
    >
      <button
        onclick="closeSocialLightbox()"
        style="position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10;"
      >
        ✕
      </button>

      <img 
        id="lightbox-image"
        src="" 
        alt="Post Image" 
        style="width: 100%; height: 320px; object-fit: cover;" 
      />

      <div style="padding: 24px; text-align: left;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <span id="lightbox-user" style="font-weight: 800; font-size: 16px; color: #0A192F;">User</span>
          <span id="lightbox-location" style="font-size: 13px; color: #64748b;">📍 Location</span>
        </div>
        <p id="lightbox-comment" style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 20px;">
          Comment
        </p>
        <div style="display: flex; align-items: center; gap: 16px; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
          <span style="display: flex; align-items: center; gap: 6px; color: #ef4444; font-weight: 700;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <span id="lightbox-likes-count">0</span> Likes
          </span>
          <span style="display: flex; align-items: center; gap: 6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg> 48 Comments
          </span>
          <span style="display: flex; align-items: center; gap: 6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share
          </span>
        </div>
      </div>
    </div>
  </div>

</section>
