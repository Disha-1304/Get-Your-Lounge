<?php
// index.php
require_once __DIR__ . '/data/loungesData.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LoungePair International - Buy Airport Lounge Access</title>
  <meta name="description" content="Guaranteed access to 1,400+ premium airport lounges worldwide. No membership required. Relax in comfort with hot buffets, fast Wi-Fi, and showers.">
  
  <!-- System Styles -->
  <?php include_once __DIR__ . '/components/styles.php'; ?>

  <!-- Confetti Canvas Library -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
</head>
<body>

  <div class="app-container">
    <!-- Hero Section -->
    <?php include_once __DIR__ . '/components/hero.php'; ?>

    <!-- Featured Partners Marquee -->
    <?php include_once __DIR__ . '/components/partner_scroller.php'; ?>

    <!-- Airport Lounge Guides -->
    <?php include_once __DIR__ . '/components/lounge_guides.php'; ?>

    <!-- Featured Airline Lounges -->
    <?php include_once __DIR__ . '/components/featured_airlines.php'; ?>

    <!-- About Section -->
    <?php include_once __DIR__ . '/components/about_section.php'; ?>

    <!-- Testimonials -->
    <?php include_once __DIR__ . '/components/executive_reviews.php'; ?>

    <!-- FAQ Accordion -->
    <?php include_once __DIR__ . '/components/faq_section.php'; ?>

    <!-- Social Gallery -->
    <?php include_once __DIR__ . '/components/social_gallery.php'; ?>

    <!-- Footer -->
    <?php include_once __DIR__ . '/components/footer.php'; ?>

    <!-- Overlays & Modals -->
    <?php include_once __DIR__ . '/components/modals.php'; ?>
  </div>

  <!-- Interactive JavaScript Engine -->
  <script>
    // 1. Data Injection from PHP
    const loungesData = <?php echo json_encode($LOUNGE_GUIDES); ?>;
    const currencies = <?php echo json_encode($CURRENCIES); ?>;
    const socialGallery = <?php echo json_encode($SOCIAL_GALLERY); ?>;
    
    // 2. Global State
    let currentCurrency = 'USD';
    let activeVirtualTourLounge = null;
    let virtualTourCurrentSlide = 0;

    // 3. Currency Conversion Logic
    function changeCurrency(currCode) {
      currentCurrency = currCode;
      const rate = currencies[currCode].rate;
      const symbol = currencies[currCode].symbol;

      // Update all pricing elements on page
      document.querySelectorAll('.price-display').forEach(el => {
        const baseUSD = parseFloat(el.getAttribute('data-price-usd'));
        if (!isNaN(baseUSD)) {
          const converted = Math.round(baseUSD * rate);
          el.textContent = symbol + converted;
        }
      });
    }

    // Initialize currency
    changeCurrency('USD');

    // 4. Hero Autocomplete Search
    function handleHeroSearch(val) {
      const clearBtn = document.getElementById('hero-search-clear');
      const autocomplete = document.getElementById('hero-autocomplete');
      
      if (!val || val.trim() === '') {
        clearBtn.style.display = 'none';
        autocomplete.style.display = 'none';
        return;
      }

      clearBtn.style.display = 'block';
      const query = val.toLowerCase().trim();

      const matches = loungesData.filter(l => 
        l.city.toLowerCase().includes(query) ||
        l.airportCode.toLowerCase().includes(query) ||
        l.country.toLowerCase().includes(query) ||
        l.terminals.some(t => t.toLowerCase().includes(query))
      );

      if (matches.length === 0) {
        autocomplete.style.display = 'none';
        return;
      }

      autocomplete.innerHTML = `
        <div style="padding: 12px 20px; font-size: 11px; font-weight: 700; color: #E61E38; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(10, 25, 47, 0.1);">
          Matching Airport Lounges (${matches.length})
        </div>
      `;

      matches.forEach(l => {
        const div = document.createElement('div');
        div.style.padding = '14px 20px';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'space-between';
        div.style.borderBottom = '1px solid rgba(10, 25, 47, 0.08)';
        div.style.cursor = 'pointer';
        div.style.transition = 'background 0.2s';
        
        div.onmouseenter = () => div.style.background = '#F8F9FB';
        div.onmouseleave = () => div.style.background = '#FFFFFF';
        
        div.onclick = () => {
          window.location.href = '/search.php?q=' + encodeURIComponent(l.city) + '&id=' + encodeURIComponent(l.id);
        };

        div.innerHTML = `
          <div style="display: flex; align-items: center; gap: 14px;">
            <img src="${l.image}" alt="${l.city}" style="width: 48px; height: 48px; border-radius: 10px; object-fit: cover;" />
            <div>
              <div style="font-weight: 800; font-size: 15px; color: #0A192F;">${l.city} (${l.airportCode})</div>
              <div style="font-size: 13px; color: #334155;">${l.terminals.join(', ')}</div>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 13px; color: #E61E38; font-weight: 700;">Select Lounge →</span>
          </div>
        `;

        autocomplete.appendChild(div);
      });

      autocomplete.style.display = 'block';
    }

    function clearHeroSearch() {
      const searchInput = document.getElementById('hero-search-input');
      searchInput.value = '';
      document.getElementById('hero-search-clear').style.display = 'none';
      document.getElementById('hero-autocomplete').style.display = 'none';
    }

    function submitHeroSearch() {
      const searchInput = document.getElementById('hero-search-input');
      const val = searchInput.value.trim();
      if (val !== '') {
        window.location.href = '/search.php?q=' + encodeURIComponent(val);
      }
    }

    // 5. Lounge Guides Filtering and Sorting
    function filterLounges() {
      const countryFilter = document.getElementById('country-filter').value;
      const sortVal = document.getElementById('sort-select').value;
      const grid = document.getElementById('lounges-grid');
      const cards = Array.from(grid.querySelectorAll('.lounge-card'));

      // Filter
      let visibleCards = [];
      cards.forEach(card => {
        const country = card.getAttribute('data-country');
        if (countryFilter === 'All Countries' || country === countryFilter) {
          card.style.display = 'flex';
          visibleCards.push(card);
        } else {
          card.style.display = 'none';
        }
      });

      // Sort
      if (sortVal === 'Name (a-z)') {
        visibleCards.sort((a, b) => a.getAttribute('data-city').localeCompare(b.getAttribute('data-city')));
      } else if (sortVal === 'Name (z-a)') {
        visibleCards.sort((a, b) => b.getAttribute('data-city').localeCompare(a.getAttribute('data-city')));
      } else if (sortVal === 'Price (low to high)') {
        visibleCards.sort((a, b) => parseFloat(a.getAttribute('data-price-usd')) - parseFloat(b.getAttribute('data-price-usd')));
      } else if (sortVal === 'Price (high to low)') {
        visibleCards.sort((a, b) => parseFloat(b.getAttribute('data-price-usd')) - parseFloat(a.getAttribute('data-price-usd')));
      }

      // Re-append sorted elements
      visibleCards.forEach(card => grid.appendChild(card));
    }

    // 6. Amenity Preview Modal
    function openAmenityModal(amenityName, loungeName, loungeId) {
      const modal = document.getElementById('amenity-modal');
      const title = document.getElementById('amenity-modal-title');
      const desc = document.getElementById('amenity-modal-description');
      const image = document.getElementById('amenity-modal-image');
      const selectBtn = document.getElementById('amenity-select-pass-btn');

      title.textContent = amenityName;
      desc.innerHTML = `Enjoy complimentary, guaranteed priority access to <strong>${amenityName}</strong> at the <strong>${loungeName} Lounge</strong>. Included seamlessly with your LoungePair digital boarding pass—no extra fees or waitlists.`;
      
      const lower = amenityName.toLowerCase();
      if (lower.includes('shower')) {
        image.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80';
      } else if (lower.includes('chef') || lower.includes('buffet') || lower.includes('noodle')) {
        image.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
      } else if (lower.includes('bar') || lower.includes('cocktail') || lower.includes('champagne')) {
        image.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80';
      } else if (lower.includes('nap') || lower.includes('suite') || lower.includes('sleep')) {
        image.src = 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80';
      } else {
        image.src = 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80';
      }

      selectBtn.onclick = () => {
        closeAmenityModal();
        openBookingModal(loungeId);
      };

      modal.style.display = 'flex';
    }

    function closeAmenityModal() {
      document.getElementById('amenity-modal').style.display = 'none';
    }

    // 7. Social Lightbox Modal
    function openSocialLightbox(postId) {
      const post = socialGallery.find(item => item.id === postId);
      if (!post) return;

      document.getElementById('lightbox-image').src = post.image;
      document.getElementById('lightbox-user').textContent = post.user;
      document.getElementById('lightbox-location').textContent = '📍 ' + post.location;
      document.getElementById('lightbox-comment').textContent = `"${post.comment}"`;
      document.getElementById('lightbox-likes-count').textContent = post.likes;

      document.getElementById('social-lightbox').style.display = 'flex';
    }

    function closeSocialLightbox() {
      document.getElementById('social-lightbox').style.display = 'none';
    }

    // 8. FAQ Accordion Functions
    function toggleFaqAccordion(btn) {
      const item = btn.closest('.faq-item');
      const container = item.querySelector('.faq-answer-container');
      const iconWrapper = item.querySelector('.faq-icon-wrapper');
      
      const isOpen = container.style.display === 'block';

      // Close all first
      document.querySelectorAll('.faq-item').forEach(el => {
        el.style.border = '1px solid #e2e8f0';
        el.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.03)';
        el.querySelector('.faq-answer-container').style.display = 'none';
        el.querySelector('.faq-answer-container').style.padding = '0';
        el.querySelector('.faq-answer-container').style.borderTop = 'none';
        el.querySelector('.faq-answer-container').style.paddingTop = '0';
        el.querySelector('.faq-icon-wrapper').style.background = '#f8fafc';
        el.querySelector('.faq-icon-wrapper').innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-icon-down"><polyline points="6 9 12 15 18 9"/></svg>`;
      });

      if (!isOpen) {
        item.style.border = '1.5px solid #E61E38';
        item.style.boxShadow = '0 10px 25px -5px rgba(230, 30, 56, 0.1)';
        container.style.display = 'block';
        container.style.padding = '0 24px 22px';
        container.style.borderTop = '1px solid #f1f5f9';
        container.style.paddingTop = '16px';
        iconWrapper.style.background = '#FDECEF';
        iconWrapper.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E61E38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-icon-up"><polyline points="18 15 12 9 6 15"/></svg>`;
      }
    }

    function handleFaqSearch(val) {
      const query = val.toLowerCase().trim();
      const items = document.querySelectorAll('.faq-item');
      const noResults = document.getElementById('faq-no-results');
      let visibleCount = 0;

      items.forEach(item => {
        const q = item.getAttribute('data-q');
        const a = item.getAttribute('data-a');
        if (q.includes(query) || a.includes(query)) {
          item.style.display = 'block';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      noResults.style.display = (visibleCount === 0) ? 'block' : 'none';
    }

    // 9. Modals Implementation
    function openHowItWorksModal() {
      document.getElementById('how-it-works-modal').style.display = 'flex';
    }

    function closeHowItWorksModal() {
      document.getElementById('how-it-works-modal').style.display = 'none';
    }

    function openBookingModal(loungeId) {
      const lounge = loungesData.find(l => l.id === loungeId);
      if (!lounge) return;

      document.getElementById('booking-lounge-id').value = lounge.id;
      document.getElementById('booking-modal-lounge-name').textContent = lounge.city + " Lounge";
      document.getElementById('booking-modal-lounge-terminal').textContent = lounge.terminals[0] + " • Guaranteed Entry";
      
      // Default inputs
      document.getElementById('booking-travelers').value = "1";
      document.getElementById('booking-date').value = "2026-07-10";
      document.getElementById('booking-addon-spa').checked = false;
      document.getElementById('booking-addon-fasttrack').checked = true;

      // Update baseline price displays
      const priceDisplay = document.getElementById('booking-total-price-display');
      priceDisplay.setAttribute('data-price-usd', lounge.priceUSD);
      
      calculateBookingPrice();

      // Show step 1 form, hide confirmation state
      document.getElementById('booking-form-step-1').style.display = 'block';
      document.getElementById('booking-form-step-2').style.display = 'none';

      document.getElementById('booking-modal').style.display = 'flex';
    }

    function closeBookingModal() {
      document.getElementById('booking-modal').style.display = 'none';
    }

    function calculateBookingPrice() {
      const loungeId = document.getElementById('booking-lounge-id').value;
      const lounge = loungesData.find(l => l.id === loungeId);
      if (!lounge) return;

      const baseUSD = lounge.priceUSD;
      const travelersCount = parseInt(document.getElementById('booking-travelers').value);
      const isSpaEnabled = document.getElementById('booking-addon-spa').checked;
      
      let pricePerPersonUSD = baseUSD;
      if (isSpaEnabled) {
        pricePerPersonUSD += 15;
      }

      const totalUSD = pricePerPersonUSD * travelersCount;
      const priceDisplay = document.getElementById('booking-total-price-display');
      priceDisplay.setAttribute('data-price-usd', totalUSD);
      
      // Force changeCurrency trigger to display in correct selected currency
      const rate = currencies[currentCurrency].rate;
      const symbol = currencies[currentCurrency].symbol;
      const converted = Math.round(totalUSD * rate);
      priceDisplay.textContent = symbol + converted;
    }

    function submitBooking(e) {
      e.preventDefault();
      
      const loungeId = document.getElementById('booking-lounge-id').value;
      const lounge = loungesData.find(l => l.id === loungeId);
      if (!lounge) return;

      document.getElementById('confirmation-lounge-name').textContent = lounge.city;

      // Show confirmation view
      document.getElementById('booking-form-step-1').style.display = 'none';
      document.getElementById('booking-form-step-2').style.display = 'block';

      // Confetti burst!
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log("Confetti triggered");
      }
    }

    // 10. Virtual Tour Carousel
    function openVirtualTourModal(loungeId) {
      const lounge = loungesData.find(l => l.id === loungeId);
      if (!lounge) return;

      activeVirtualTourLounge = lounge;
      virtualTourCurrentSlide = 0;

      document.getElementById('tour-modal-title').textContent = `${lounge.city} (${lounge.airportCode})`;
      document.getElementById('tour-modal-amenities').textContent = lounge.amenities.join(', ');
      
      const bookBtn = document.getElementById('tour-modal-book-btn');
      bookBtn.onclick = () => {
        closeVirtualTourModal();
        openBookingModal(lounge.id);
      };

      renderTourSlide();

      document.getElementById('tour-modal').style.display = 'flex';
    }

    function closeVirtualTourModal() {
      document.getElementById('tour-modal').style.display = 'none';
      activeVirtualTourLounge = null;
    }

    function renderTourSlide() {
      if (!activeVirtualTourLounge) return;

      const slides = activeVirtualTourLounge.virtualTour && activeVirtualTourLounge.virtualTour.length > 0
        ? activeVirtualTourLounge.virtualTour
        : [
            { title: 'Main Executive Atrium', url: activeVirtualTourLounge.heroImage || activeVirtualTourLounge.image },
            { title: 'Gourmet Dining Spread', url: activeVirtualTourLounge.image }
          ];

      const slide = slides[virtualTourCurrentSlide];
      
      document.getElementById('tour-modal-slide-image').src = slide.url;
      document.getElementById('tour-modal-slide-counter').textContent = `Area ${virtualTourCurrentSlide + 1} of ${slides.length}`;
      document.getElementById('tour-modal-slide-title').textContent = slide.title;

      // Dots
      const dotsContainer = document.getElementById('tour-modal-dots');
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.style.width = (i === virtualTourCurrentSlide) ? '20px' : '8px';
        dot.style.height = '8px';
        dot.style.borderRadius = '4px';
        dot.style.background = (i === virtualTourCurrentSlide) ? '#E61E38' : 'rgba(255,255,255,0.4)';
        dot.style.transition = 'all 0.3s';
        dotsContainer.appendChild(dot);
      });
    }

    function prevTourSlide() {
      if (!activeVirtualTourLounge) return;
      const slides = activeVirtualTourLounge.virtualTour || [];
      const len = slides.length || 2;
      virtualTourCurrentSlide = (virtualTourCurrentSlide === 0) ? len - 1 : virtualTourCurrentSlide - 1;
      renderTourSlide();
    }

    function nextTourSlide() {
      if (!activeVirtualTourLounge) return;
      const slides = activeVirtualTourLounge.virtualTour || [];
      const len = slides.length || 2;
      virtualTourCurrentSlide = (virtualTourCurrentSlide === len - 1) ? 0 : virtualTourCurrentSlide + 1;
      renderTourSlide();
    }
  </script>

</body>
</html>
