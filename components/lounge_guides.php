<?php
// components/lounge_guides.php
$countries = array_unique(array_map(function($l) { return $l['country']; }, $LOUNGE_GUIDES));
sort($countries);
?>
<section id="guides-section" style="padding: 80px 24px; background: #F8F9FB; max-width: 1440px; margin: 0 auto; position: relative;">
  <!-- Ambient Glow -->
  <div class="ambient-glow-rose" style="top: 10%; right: 5%;"></div>
  
  <!-- Header -->
  <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 24px; margin-bottom: 48px; position: relative; z-index: 1;">
    <div>
      <div style="display: inline-flex; align-items: center; gap: 8px; background: #FDECEF; color: #E61E38; padding: 6px 16px; border-radius: 999px; font-weight: 700; font-size: 13px; margin-bottom: 14px; border: 1px solid #E61E38;">
        CURATED VIP COLLECTION
      </div>
      <h2 class="luxury-serif" style="font-size: clamp(36px, 4.5vw, 52px); color: #0A192F; margin-bottom: 12px;">
        International <span class="champagne-text">Lounge Guides</span>
      </h2>
      <p style="font-size: 18px; color: #334155; max-width: 640px;">
        Explore verified 3D virtual previews, shower suite availability, and guaranteed VIP entry at top global transit hubs. Click any amenity to view details.
      </p>
    </div>

    <!-- Country & Sort Controls -->
    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
      <!-- Countries Select -->
      <div style="position: relative;">
        <select
          id="country-filter"
          onchange="filterLounges()"
          style="appearance: none; background: #FFFFFF; color: #0A192F; font-weight: 700; font-size: 14px; padding: 12px 38px 12px 20px; border-radius: 14px; border: 1.5px solid rgba(10, 25, 47, 0.15); cursor: pointer; outline: none; box-shadow: 0 4px 12px rgba(10, 25, 47, 0.05); font-family: 'Plus Jakarta Sans', sans-serif;"
        >
          <option value="All Countries">All Countries</option>
          <?php foreach ($countries as $country): ?>
            <option value="<?php echo htmlspecialchars($country); ?>"><?php echo htmlspecialchars($country); ?></option>
          <?php endforeach; ?>
        </select>
        <div style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #E61E38; font-size: 12px;">
          ▼
        </div>
      </div>

      <!-- Sort By Select -->
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 14px; font-weight: 700; color: #0A192F;">Sort by:</span>
        <div style="position: relative;">
          <select
            id="sort-select"
            onchange="filterLounges()"
            style="appearance: none; background: #FFFFFF; color: #0A192F; font-weight: 700; font-size: 14px; padding: 12px 38px 12px 20px; border-radius: 14px; border: 1.5px solid rgba(10, 25, 47, 0.15); cursor: pointer; outline: none; box-shadow: 0 4px 12px rgba(10, 25, 47, 0.05); font-family: 'Plus Jakarta Sans', sans-serif;"
          >
            <option value="Default">Default</option>
            <option value="Name (a-z)">Name (a-z)</option>
            <option value="Name (z-a)">Name (z-a)</option>
            <option value="Price (low to high)">Price (low to high)</option>
            <option value="Price (high to low)">Price (high to low)</option>
          </select>
          <div style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #E61E38; font-size: 12px;">
            ▼
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Cards Grid -->
  <div id="lounges-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 32px; position: relative; z-index: 1;">
    <?php foreach ($LOUNGE_GUIDES as $lounge): ?>
      <div
        class="lounge-card card-3d-container luxury-card-hover"
        data-id="<?php echo $lounge['id']; ?>"
        data-city="<?php echo htmlspecialchars($lounge['city']); ?>"
        data-country="<?php echo htmlspecialchars($lounge['country']); ?>"
        data-price-usd="<?php echo $lounge['priceUSD']; ?>"
        style="background: #ffffff; border-radius: 28px; overflow: hidden; border: 1px solid rgba(10, 25, 47, 0.1); box-shadow: 0 10px 30px -10px rgba(10, 25, 47, 0.08); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column;"
      >
        <!-- Top Image Showcase Area -->
        <div style="position: relative; height: 260px; overflow: hidden; background: #0A192F;">
          <img 
            src="<?php echo $lounge['image']; ?>" 
            alt="<?php echo htmlspecialchars($lounge['city']); ?>"
            style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);"
            onmouseenter="this.style.transform = 'scale(1.08)'"
            onmouseleave="this.style.transform = 'scale(1)'"
          />

          <!-- Navy Overlay -->
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(180deg, rgba(10, 25, 47, 0.2) 0%, rgba(10, 25, 47, 0.8) 100%);"></div>

          <!-- Top Bar Badges -->
          <div style="position: absolute; top: 16px; left: 16px; right: 16px; display: flex; justify-content: space-between; align-items: center;">
            <span style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(8px); padding: 6px 12px; border-radius: 99px; fontSize: 12px; font-weight: 800; color: #0A192F; display: flex; align-items: center; gap: 4px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#E61E38" stroke="#E61E38" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <?php echo $lounge['rating']; ?> (<?php echo $lounge['reviewsCount']; ?>)
            </span>

            <span style="background: #E61E38; color: #FFFFFF; padding: 6px 12px; border-radius: 99px; fontSize: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid #E61E38;">
              <?php echo htmlspecialchars($lounge['status']); ?>
            </span>
          </div>

          <!-- 3D Virtual Tour Button overlay -->
          <button
            onclick="openVirtualTourModal('<?php echo $lounge['id']; ?>')"
            style="position: absolute; bottom: 16px; left: 16px; background: rgba(10, 25, 47, 0.9); color: #FFFFFF; border: 1px solid rgba(230, 30, 56, 0.4); padding: 8px 14px; border-radius: 99px; fontSize: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; backdrop-filter: blur(6px); transition: transform 0.2s;"
            onmouseenter="this.style.transform = 'scale(1.05)'"
            onmouseleave="this.style.transform = 'scale(1)'"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
            360° Virtual Preview
          </button>

          <!-- Airport Code Pill -->
          <div style="position: absolute; bottom: 16px; right: 16px; color: #FFFFFF; font-weight: 900; fontSize: 22px; letter-spacing: 1px; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
            <?php echo htmlspecialchars($lounge['airportCode']); ?>
          </div>
        </div>

        <!-- Content Body -->
        <div style="padding: 24px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: center; gap: 6px; fontSize: 13px; color: #334155; font-weight: 600; margin-bottom: 6px;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E61E38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <?php echo htmlspecialchars($lounge['country']); ?> • <?php echo htmlspecialchars($lounge['terminals'][0]); ?>
            </div>

            <h3 style="fontSize: 22px; font-weight: 800; color: #0A192F; margin-bottom: 10px;">
              <?php echo htmlspecialchars($lounge['city']); ?> Lounge
            </h3>

            <p style="font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 18px;">
              <?php echo htmlspecialchars($lounge['description']); ?>
            </p>

            <!-- Interactive Amenities Tags -->
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px;">
              <?php foreach (array_slice($lounge['amenities'], 0, 4) as $amenity): ?>
                <button
                  onclick="openAmenityModal('<?php echo htmlspecialchars($amenity); ?>', '<?php echo htmlspecialchars($lounge['city']); ?>', '<?php echo $lounge['id']; ?>')"
                  style="background: #FFFFFF; border: 1px solid rgba(10, 25, 47, 0.15); color: #0A192F; padding: 6px 12px; border-radius: 8px; fontSize: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 4px;"
                  onmouseenter="this.style.background = '#FDECEF'; this.style.borderColor = '#E61E38'; this.style.transform = 'translateY(-2px)';"
                  onmouseleave="this.style.background = '#FFFFFF'; this.style.borderColor = 'rgba(10, 25, 47, 0.15)'; this.style.transform = 'translateY(0)';"
                >
                  ✓ <?php echo htmlspecialchars($amenity); ?>
                </button>
              <?php endforeach; ?>
            </div>
          </div>

          <!-- Card Footer -->
          <div style="padding-top: 20px; border-top: 1px solid rgba(10, 25, 47, 0.1); display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span style="font-size: 15px; font-weight: 800; color: #E61E38;">
                ✓ Guaranteed Entry Available
              </span>
            </div>

            <button
              onclick="openBookingModal('<?php echo $lounge['id']; ?>')"
              class="btn-primary"
              style="padding: 12px 22px; fontSize: 14px;"
            >
              Explore Pass <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>
      </div>
    <?php endforeach; ?>
  </div>

  <!-- Interactive Amenity Preview Modal (Populated Dynamically via Plain JS) -->
  <div id="amenity-modal" onclick="closeAmenityModal()" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(10, 25, 47, 0.8); backdrop-filter: blur(16px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px; display: none;">
    <div
      onclick="event.stopPropagation()"
      class="champagne-border"
      style="background: #0A192F; border-radius: 32px; max-width: 540px; width: 100%; overflow: hidden; color: #FFFFFF; box-shadow: 0 30px 60px rgba(0,0,0,0.6);"
    >
      <div style="position: relative; height: 240px; overflow: hidden;">
        <img 
          id="amenity-modal-image"
          src=""
          alt="Amenity Preview"
          style="width: 100%; height: 100%; object-fit: cover;"
        />
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(180deg, transparent 40%, #0A192F 100%);"></div>
        <div style="position: absolute; bottom: 16px; left: 24px;">
          <span style="font-size: 12px; color: #E61E38; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">
            VIP Privilege Preview
          </span>
          <h3 id="amenity-modal-title" class="luxury-serif" style="font-size: 28px; color: #FFFFFF;">
            Amenity
          </h3>
        </div>
      </div>

      <div style="padding: 28px 28px 36px;">
        <p id="amenity-modal-description" style="font-size: 15px; color: #F1F5F9; line-height: 1.7; margin-bottom: 24px;">
          Enjoy complimentary, guaranteed priority access.
        </p>

        <div style="display: flex; gap: 14px; justify-content: flex-end;">
          <button
            onclick="closeAmenityModal()"
            style="padding: 12px 24px; background: transparent; border: 1px solid rgba(255, 255, 255, 0.4); color: #FFFFFF; border-radius: 99px; font-weight: 700; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;"
          >
            Close Preview
          </button>

          <button
            id="amenity-select-pass-btn"
            onclick=""
            class="btn-shimmer"
            style="padding: 12px 28px; background: linear-gradient(135deg, #E61E38 0%, #C8102E 100%); color: #FFFFFF; border: none; border-radius: 99px; font-weight: 800; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;"
          >
            Select This Pass
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
