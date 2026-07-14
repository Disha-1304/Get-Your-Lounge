<?php
// components/hero.php
?>
<section style="position: relative; width: 100%; min-height: 680px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 130px 24px 80px; overflow: hidden;">
  <!-- Top Brand Logo Header -->
  <div style="position: absolute; top: 28px; left: 36px; z-index: 20; display: flex; align-items: center; gap: 14px;">
    <img 
      src="/logo.png" 
      alt="LoungePair Logo" 
      style="height: 108px; width: auto; display: block;"
    />
    <div style="display: flex; flex-direction: column; line-height: 1.1;">
      <div style="font-family: 'Outfit', sans-serif; fontSize: 26px; font-weight: 800; letter-spacing: 1px; color: #FFFFFF; text-transform: uppercase;">
        Lounge<span style="color: #E61E38;">Pair</span>
      </div>
      <div style="font-family: 'Outfit', sans-serif; fontSize: 10px; font-weight: 700; letter-spacing: 3px; color: rgba(255, 255, 255, 0.7); text-transform: uppercase; margin-top: 2px;">
        International
      </div>
    </div>
  </div>

  <!-- Top Right Currency Selector -->
  <div style="position: absolute; top: 28px; right: 36px; z-index: 20; display: flex; align-items: center; gap: 16px;">
    <select id="currency-select" onchange="changeCurrency(this.value)" style="background: rgba(10, 25, 47, 0.85); color: #FFFFFF; border: 1.5px solid rgba(230, 30, 56, 0.4); padding: 8px 16px; border-radius: 99px; font-weight: 700; cursor: pointer; outline: none; font-family: 'Plus Jakarta Sans', sans-serif;">
      <?php foreach ($CURRENCIES as $code => $info): ?>
        <option value="<?php echo $code; ?>"><?php echo $info['name']; ?></option>
      <?php endforeach; ?>
    </select>
  </div>

  <!-- Background Cinematic Video with scaling to hide watermark -->
  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; overflow: hidden;">
    <video
      autoplay
      loop
      muted
      playsinline
      src="/hero-video.mp4"
      style="width: 100%; height: 100%; object-fit: cover; object-position: center center; transform: scale(1.25); filter: brightness(0.95) contrast(1.05);"
    ></video>

    <!-- Soft Navy & Red overlay ensuring clear visibility of video and high readability for white text -->
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(10, 25, 47, 0.65) 0%, rgba(230, 30, 56, 0.35) 50%, rgba(10, 25, 47, 0.70) 100%); z-index: 2;"></div>
  </div>

  <!-- Centered Composition -->
  <div style="position: relative; z-index: 10; width: 100%; max-width: 820px; text-align: center; display: flex; flex-direction: column; align-items: center;">
    
    <!-- Bold, large, editorial serif headline adhering to Pure White -->
    <h1 class="luxury-serif" style="font-size: clamp(42px, 5.5vw, 64px); color: #FFFFFF; margin-bottom: 12px; text-shadow: 0 4px 12px rgba(0,0,0,0.4);">
      Buy access to 1,400+ airport lounges
    </h1>

    <!-- Subtitle adhering to Soft Red/Pink -->
    <p style="font-size: clamp(18px, 2.5vw, 24px); font-weight: 600; color: #FFCCD3; margin-bottom: 36px; opacity: 0.98; text-shadow: 0 2px 6px rgba(0,0,0,0.35);">
      No membership required
    </p>

    <!-- Pill-shaped White Search Input Field -->
    <div style="position: relative; width: 100%; max-width: 580px; margin-bottom: 22px;">
      <div style="background: #FFFFFF; border-radius: 999px; padding: 6px 8px 6px 24px; display: flex; align-items: center; box-shadow: 0 20px 40px rgba(10, 25, 47, 0.35); width: 100%;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E61E38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 14px; flex-shrink: 0;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        <input
          type="text"
          id="hero-search-input"
          placeholder="City, airport or lounge"
          style="border: none; outline: none; width: 100%; font-size: 16px; color: #0A192F; font-weight: 600; background: transparent; fontFamily: 'Plus Jakarta Sans', sans-serif;"
          oninput="handleHeroSearch(this.value)"
        />
        <button 
          type="button"
          id="hero-search-clear"
          onclick="clearHeroSearch()"
          style="background: none; border: none; color: #E61E38; cursor: pointer; padding: 0 12px; font-size: 18px; display: none;"
        >
          ✕
        </button>
        <!-- Rounded Ruby Red primary button on the right side -->
        <button
          type="button"
          onclick="submitHeroSearch()"
          style="background: #E61E38; color: #FFFFFF; border: none; border-radius: 999px; padding: 13px 32px; font-weight: 700; font-size: 15px; cursor: pointer; flex-shrink: 0; transition: all 0.2s ease; fontFamily: 'Plus Jakarta Sans', sans-serif;"
          onmouseenter="this.style.background = '#C8102E'; this.style.color = '#ffffff';"
          onmouseleave="this.style.background = '#E61E38'; this.style.color = '#FFFFFF';"
        >
          Search
        </button>
      </div>

      <!-- Autocomplete Dropdown -->
      <div id="hero-autocomplete" style="position: absolute; top: calc(100% + 10px); left: 0; right: 0; background: #FFFFFF; border-radius: 24px; box-shadow: 0 25px 60px -15px rgba(10, 25, 47, 0.25); border: 1px solid rgba(230, 30, 56, 0.2); max-height: 340px; overflow-y: auto; text-align: left; z-index: 50; display: none;">
        <!-- Filled dynamically by JavaScript -->
      </div>
    </div>

    <!-- Small, secondary call-to-action text below search bar -->
    <div style="font-size: 15px; color: #FFFFFF; font-weight: 500; margin-bottom: 28px;">
      <span>Not sure where to start? </span>
      <button
        type="button"
        onclick="openHowItWorksModal()"
        style="background: none; border: none; color: #FFCCD3; text-decoration: underline; font-weight: 600; font-size: 15px; cursor: pointer; padding: 0;"
      >
        Learn how to buy a lounge pass
      </button>
    </div>

    <!-- Stats Strip Below Search Bar -->
    <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center; gap: 20px; background: rgba(10, 25, 47, 0.8); backdrop-filter: blur(16px); border: 1px solid rgba(230, 30, 56, 0.45); padding: 22px 32px; border-radius: 24px; max-width: 820px; width: 100%; box-shadow: 0 20px 45px rgba(0,0,0,0.4); margin-bottom: 20px;">
      <div style="text-align: center; min-width: 110px;">
        <div style="font-size: 12px; font-weight: 800; color: #FFCCD3; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px;">INTERNATIONAL</div>
        <div style="font-size: 28px; font-weight: 800; color: #FFFFFF; fontFamily: 'Plus Jakarta Sans', sans-serif;">1022</div>
      </div>
      <div style="width: 1px; height: 36px; background: rgba(255,255,255,0.2);"></div>
      <div style="text-align: center; min-width: 110px;">
        <div style="font-size: 12px; font-weight: 800; color: #FFCCD3; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px;">DOMESTIC</div>
        <div style="font-size: 28px; font-weight: 800; color: #FFFFFF; fontFamily: 'Plus Jakarta Sans', sans-serif;">50</div>
      </div>
      <div style="width: 1px; height: 36px; background: rgba(255,255,255,0.2);"></div>
      <div style="text-align: center; min-width: 110px;">
        <div style="font-size: 12px; font-weight: 800; color: #FFCCD3; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px;">TRAIN</div>
        <div style="font-size: 28px; font-weight: 800; color: #FFFFFF; fontFamily: 'Plus Jakarta Sans', sans-serif;">17</div>
      </div>
      <div style="width: 1px; height: 36px; background: rgba(255,255,255,0.2);"></div>
      <div style="text-align: center; min-width: 110px;">
        <div style="font-size: 12px; font-weight: 800; color: #FFCCD3; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px;">COUNTRIES</div>
        <div style="font-size: 28px; font-weight: 800; color: #FFFFFF; fontFamily: 'Plus Jakarta Sans', sans-serif;">60+</div>
      </div>
    </div>
  </div>
</section>
