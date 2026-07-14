<?php
// components/modals.php
?>

<!-- 1. HOW IT WORKS MODAL -->
<div id="how-it-works-modal" class="modal-overlay" onclick="closeHowItWorksModal()" style="display: none;">
  <div
    onclick="event.stopPropagation()"
    style="background: #ffffff; border-radius: 32px; max-width: 620px; width: 100%; padding: 36px; box-shadow: 0 35px 65px -15px rgba(15, 23, 42, 0.3); position: relative;"
  >
    <button
      onclick="closeHowItWorksModal()"
      style="position: absolute; top: 24px; right: 24px; background: #f1f5f9; border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center;"
    >
      ✕
    </button>

    <div style="text-align: center; margin-bottom: 32px;">
      <span style="font-size: 12px; font-weight: 700; color: #E61E38; text-transform: uppercase; letter-spacing: 1px;">
        STEP-BY-STEP GUIDE
      </span>
      <h3 style="font-size: 28px; color: #0A192F; marginTop: 4px; font-family: 'Outfit', sans-serif;">How LoungePair Works</h3>
      <p style="font-size: 15px; color: #64748b; font-family: 'Plus Jakarta Sans', sans-serif;">Buy airport lounge access in under 30 seconds.</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 32px;">
      <!-- Step 1 -->
      <div style="display: flex; align-items: flex-start; gap: 18px; padding: 16px; border-radius: 16px; background: #f8fafc; border: 1px solid #e2e8f0;">
        <div style="background: #ffffff; padding: 12px; border-radius: 14px; box-shadow: 0 4px 10px rgba(15, 23, 42, 0.05); flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E61E38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <div>
          <h4 style="font-size: 17px; color: #0A192F; margin-bottom: 4px; font-weight: 800; font-family: 'Outfit', sans-serif;">1. Search Your Airport</h4>
          <p style="font-size: 14px; color: #334155; line-height: 1.5; font-family: 'Plus Jakarta Sans', sans-serif;">Enter your departure airport, layover city, or specific terminal into our global search engine.</p>
        </div>
      </div>
      <!-- Step 2 -->
      <div style="display: flex; align-items: flex-start; gap: 18px; padding: 16px; border-radius: 16px; background: #f8fafc; border: 1px solid #e2e8f0;">
        <div style="background: #ffffff; padding: 12px; border-radius: 14px; box-shadow: 0 4px 10px rgba(15, 23, 42, 0.05); flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
        </div>
        <div>
          <h4 style="font-size: 17px; color: #0A192F; margin-bottom: 4px; font-weight: 800; font-family: 'Outfit', sans-serif;">2. Select & Pay Per Pass</h4>
          <p style="font-size: 14px; color: #334155; line-height: 1.5; font-family: 'Plus Jakarta Sans', sans-serif;">No annual membership or business class ticket required. Pay only for the day you travel with guaranteed entry.</p>
        </div>
      </div>
      <!-- Step 3 -->
      <div style="display: flex; align-items: flex-start; gap: 18px; padding: 16px; border-radius: 16px; background: #f8fafc; border: 1px solid #e2e8f0;">
        <div style="background: #ffffff; padding: 12px; border-radius: 14px; box-shadow: 0 4px 10px rgba(15, 23, 42, 0.05); flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16V8"/><path d="M9 21h8"/><path d="M16 16v1"/><path d="M21 21v-1"/><path d="M12 3v6"/><path d="M12 12v3"/><path d="M18 12h-3"/><path d="M9 9H8"/></svg>
        </div>
        <div>
          <h4 style="font-size: 17px; color: #0A192F; margin-bottom: 4px; font-weight: 800; font-family: 'Outfit', sans-serif;">3. Receive Instant 3D QR Code</h4>
          <p style="font-size: 14px; color: #334155; line-height: 1.5; font-family: 'Plus Jakarta Sans', sans-serif;">Your digital boarding token is generated immediately on your phone screen with 100% cancellation protection.</p>
        </div>
      </div>
      <!-- Step 4 -->
      <div style="display: flex; align-items: flex-start; gap: 18px; padding: 16px; border-radius: 16px; background: #f8fafc; border: 1px solid #e2e8f0;">
        <div style="background: #ffffff; padding: 12px; border-radius: 14px; box-shadow: 0 4px 10px rgba(15, 23, 42, 0.05); flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"/><path d="M8 18v2"/><path d="M16 18v2"/></svg>
        </div>
        <div>
          <h4 style="font-size: 17px; color: #0A192F; margin-bottom: 4px; font-weight: 800; font-family: 'Outfit', sans-serif;">4. Relax & Enjoy</h4>
          <p style="font-size: 14px; color: #334155; line-height: 1.5; font-family: 'Plus Jakarta Sans', sans-serif;">Scan your code at the lounge reception desk and step into luxury gourmet dining, showers, and serenity.</p>
        </div>
      </div>
    </div>

    <button
      type="button"
      onclick="closeHowItWorksModal(); document.getElementById('guides-section').scrollIntoView({ behavior: 'smooth' });"
      class="btn-primary"
      style="width: 100%; padding: 16px; font-size: 16px; font-family: 'Plus Jakarta Sans', sans-serif;"
    >
      Explore Airport Guides Now
    </button>
  </div>
</div>


<!-- 2. BOOKING MODAL -->
<div id="booking-modal" class="modal-overlay" onclick="closeBookingModal()" style="display: none;">
  <div
    onclick="event.stopPropagation()"
    style="background: #ffffff; border-radius: 32px; max-width: 540px; width: 100%; overflow: hidden; box-shadow: 0 35px 65px -15px rgba(15, 23, 42, 0.3); border: 1px solid #e2e8f0;"
  >
    <!-- Header -->
    <div style="background: 'linear-gradient(135deg, #0A192F 0%, #162C46 100%)'; background-color: #0A192F; color: #ffffff; padding: 24px 28px; position: relative;">
      <button
        onclick="closeBookingModal()"
        style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.15); border: none; border-radius: 50%; width: 32px; height: 32px; color: #ffffff; cursor: pointer; display: flex; align-items: center; justify-content: center;"
      >
        ✕
      </button>

      <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: #FDECEF; font-family: 'Plus Jakarta Sans', sans-serif;">
        INSTANT PASS ISSUANCE
      </span>
      <h3 id="booking-modal-lounge-name" style="font-size: 24px; font-weight: 800; font-family: 'Outfit', sans-serif;">Lounge Name</h3>
      <p id="booking-modal-lounge-terminal" style="font-size: 13px; color: #cbd5e1; font-family: 'Plus Jakarta Sans', sans-serif;">Terminal • Guaranteed Entry</p>
    </div>

    <!-- Booking Form step 1 -->
    <form id="booking-form-step-1" onsubmit="submitBooking(event)" style="padding: 28px;">
      <input type="hidden" id="booking-lounge-id" value="" />
      
      <!-- Date & Travelers -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
        <div>
          <label style="display: block; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px; font-family: 'Plus Jakarta Sans', sans-serif;">
            Entry Date
          </label>
          <div style="display: flex; align-items: center; gap: 8px; border: 1.5px solid #cbd5e1; padding: 10px 14px; border-radius: 12px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E61E38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <input 
              type="date"
              id="booking-date"
              value="2026-07-10"
              style="border: none; outline: none; font-weight: 600; color: #0A192F; width: 100%; font-family: 'Plus Jakarta Sans', sans-serif;"
              required
            />
          </div>
        </div>

        <div>
          <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px; font-family: 'Plus Jakarta Sans', sans-serif;">
            Travelers
          </label>
          <div style="display: flex; align-items: center; gap: 8px; border: 1.5px solid #cbd5e1; padding: 10px 14px; border-radius: 12px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <select 
              id="booking-travelers"
              onchange="calculateBookingPrice()"
              style="width: 100%; border: none; outline: none; font-weight: 600; color: #0A192F; background: transparent; font-family: 'Plus Jakarta Sans', sans-serif;"
            >
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5 People</option>
              <option value="6">6 People</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Add-ons (Spa / Fast Track) -->
      <div style="margin-bottom: 24px;">
        <label style="display: block; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 10px; font-family: 'Plus Jakarta Sans', sans-serif;">
          Optional VIP Add-ons
        </label>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <!-- Spa -->
          <label style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="booking-addon-spa" onchange="calculateBookingPrice()" style="width: 18px; height: 18px; accent-color: #E61E38;" />
              <div>
                <span style="font-size: 14px; font-weight: 700; color: #0A192F; display: block;">Ayurvedic Spa & Hydrotherapy</span>
                <span style="font-size: 12px; color: #64748b;">Relaxing 30-min therapy (Add $15/person)</span>
              </div>
            </div>
          </label>
          <!-- Fast Track -->
          <label style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="booking-addon-fasttrack" checked onchange="calculateBookingPrice()" style="width: 18px; height: 18px; accent-color: #E61E38;" />
              <div>
                <span style="font-size: 14px; font-weight: 700; color: #0A192F; display: block;">Priority VIP Boarding Lane</span>
                <span style="font-size: 12px; color: #64748b;">Skip terminal queues (Complimentary)</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      <!-- Price Breakdown -->
      <div style="background: #f8fafc; padding: 16px 20px; border-radius: 16px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <span style="font-size: 14px; font-weight: 800; color: #0A192F; display: block;">Instant Guaranteed VIP Pass</span>
          <span style="font-size: 12px; color: #10b981; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; margin-top: 4px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Verified Capacity Allocation
          </span>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 12px; color: #64748b; display: block;">Total Price:</span>
          <span id="booking-total-price-display" class="price-display" data-price-usd="36" style="font-size: 24px; font-weight: 900; color: #E61E38; font-family: 'Plus Jakarta Sans', sans-serif;">$36</span>
        </div>
      </div>

      <button
        type="submit"
        class="btn-primary"
        style="width: 100%; padding: 16px; font-size: 16px; font-family: 'Plus Jakarta Sans', sans-serif;"
      >
        Issue Digital VIP Pass Now
      </button>
    </form>

    <!-- Confirmation state (step 2) -->
    <div id="booking-form-step-2" style="padding: 36px 28px; text-align: center; display: none;">
      <div style="width: 64px; height: 64px; background: #d1fae5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #10b981;">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      </div>

      <h3 style="font-size: 24px; color: #0A192F; margin-bottom: 8px; font-family: 'Outfit', sans-serif;">Pass Issued Successfully!</h3>
      <p style="font-size: 14px; color: #64748b; margin-bottom: 24px; font-family: 'Plus Jakarta Sans', sans-serif;">
        Your digital boarding token has been generated for <strong id="confirmation-lounge-name">Lounge</strong>. Present the code below at the lounge entrance desk.
      </p>

      <div style="background: #f8fafc; border: 2px dashed #E61E38; padding: 24px; border-radius: 20px; display: inline-block; margin-bottom: 24px;">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#0A192F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: 0 auto;"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16V8"/><path d="M9 21h8"/><path d="M16 16v1"/><path d="M21 21v-1"/><path d="M12 3v6"/><path d="M12 12v3"/><path d="M18 12h-3"/><path d="M9 9H8"/></svg>
        <div style="font-weight: 800; font-size: 14px; color: #E61E38; margin-top: 8px; letter-spacing: 2px; font-family: 'Outfit', sans-serif;">
          LP-2026-VIP-994
        </div>
      </div>

      <div>
        <button
          type="button"
          onclick="closeBookingModal()"
          class="btn-primary"
          style="width: 100%; padding: 14px; font-family: 'Plus Jakarta Sans', sans-serif;"
        >
          Done & Return to Homepage
        </button>
      </div>
    </div>
  </div>
</div>


<!-- 3. VIRTUAL TOUR MODAL -->
<div id="tour-modal" class="modal-overlay" onclick="closeVirtualTourModal()" style="display: none;">
  <div
    onclick="event.stopPropagation()"
    style="background: #ffffff; border-radius: 32px; max-width: 760px; width: 100%; overflow: hidden; box-shadow: 0 35px 65px -15px rgba(15, 23, 42, 0.4); border: 1px solid #e2e8f0;"
  >
    <!-- Top Bar -->
    <div style="padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
      <div>
        <span style="font-size: 11px; font-weight: 700; color: #E61E38; text-transform: uppercase; letter-spacing: 1px; font-family: 'Plus Jakarta Sans', sans-serif;">
          360° VIRTUAL PREVIEW
        </span>
        <h3 id="tour-modal-title" style="font-size: 20px; color: #0A192F; font-family: 'Outfit', sans-serif;">Lounge Name (Code)</h3>
      </div>

      <button
        onclick="closeVirtualTourModal()"
        style="background: #e2e8f0; border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center;"
      >
        ✕
      </button>
    </div>

    <!-- Panoramic Viewer Area -->
    <div style="position: relative; height: 400px; background: #0A192F;">
      <img 
        id="tour-modal-slide-image"
        src="" 
        alt="Lounge Preview"
        style="width: 100%; height: 100%; object-fit: cover;"
      />

      <!-- Navigation Arrows -->
      <button
        onclick="prevTourSlide()"
        style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.85); border: none; border-radius: 50%; width: 44px; height: 44px; cursor: pointer; display: flex; align-items: center; justify-content: center;"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A192F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      <button
        onclick="nextTourSlide()"
        style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.85); border: none; border-radius: 50%; width: 44px; height: 44px; cursor: pointer; display: flex; align-items: center; justify-content: center;"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A192F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <!-- Slide Caption Banner -->
      <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 16px 24px; background: linear-gradient(180deg, transparent 0%, rgba(10, 25, 47, 0.9) 100%); color: #ffffff; display: flex; justify-content: space-between; align-items: center; box-sizing: border-box;">
        <div>
          <span id="tour-modal-slide-counter" style="font-size: 12px; opacity: 0.8; font-family: 'Plus Jakarta Sans', sans-serif;">Area 1 of 2</span>
          <div id="tour-modal-slide-title" style="font-size: 18px; font-weight: 700; font-family: 'Outfit', sans-serif;">Main Executive Atrium</div>
        </div>

        <div id="tour-modal-dots" style="display: flex; gap: 6px;">
          <!-- Dots filled dynamically -->
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div style="padding: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
      <div>
        <div style="font-size: 14px; font-weight: 700; color: #0A192F; font-family: 'Plus Jakarta Sans', sans-serif;">Included Amenities:</div>
        <div id="tour-modal-amenities" style="font-size: 13px; color: #64748b; font-family: 'Plus Jakarta Sans', sans-serif;">Buffet, Showers...</div>
      </div>

      <button
        id="tour-modal-book-btn"
        onclick=""
        class="btn-primary"
        style="padding: 12px 28px; font-size: 15px; font-family: 'Plus Jakarta Sans', sans-serif;"
      >
        Book This Lounge
      </button>
    </div>
  </div>
</div>
