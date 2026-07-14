<?php
// components/faq_section.php
?>
<section id="faq-section" style="padding: 60px 20px 80px; max-width: 960px; margin: 0 auto;">
  
  <!-- Section Header -->
  <div style="text-align: center; margin-bottom: 40px;">
    <h2 style="font-size: clamp(28px, 4vw, 40px); color: #0A192F; margin-bottom: 12px;">
      Buying lounge access with <span style="color: #E61E38;">LoungePair</span>
    </h2>
    <p style="font-size: 16px; color: #334155; margin-bottom: 24px;">
      Everything you need to know about our instant international airport lounge pass system.
    </p>

    <!-- FAQ Search Bar -->
    <div style="max-width: 480px; margin: 0 auto; position: relative;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input 
        type="text"
        id="faq-search-input"
        placeholder="Search FAQs (e.g., immediate entry, refund policy, payment)..."
        oninput="handleFaqSearch(this.value)"
        style="width: 100%; padding: 12px 16px 12px 44px; border-radius: 999px; border: 1.5px solid #cbd5e1; background: #ffffff; fontSize: 14px; color: #0f172a; outline: none; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04); font-family: 'Plus Jakarta Sans', sans-serif;"
      />
    </div>
  </div>

  <!-- Accordion Container -->
  <div id="faq-accordion-container" style="display: flex; flex-direction: column; gap: 14px;">
    <?php foreach ($FAQ_ITEMS as $idx => $faq): ?>
      <?php $isOpen = ($idx === 0); ?>
      <div
        class="faq-item"
        data-q="<?php echo htmlspecialchars(strtolower($faq['q'])); ?>"
        data-a="<?php echo htmlspecialchars(strtolower($faq['a'])); ?>"
        style="background: #ffffff; border-radius: 16px; border: <?php echo $isOpen ? '1.5px solid #E61E38' : '1px solid #e2e8f0'; ?>; box-shadow: <?php echo $isOpen ? '0 10px 25px -5px rgba(230, 30, 56, 0.1)' : '0 2px 8px rgba(15, 23, 42, 0.03)'; ?>; transition: all 0.3s ease; overflow: hidden;"
      >
        <button
          type="button"
          onclick="toggleFaqAccordion(this)"
          style="width: 100%; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; background: transparent; border: none; text-align: left; cursor: pointer; gap: 16px;"
        >
          <span class="faq-question-text" style="font-size: 17px; font-weight: 700; color: <?php echo $isOpen ? '#E61E38' : '#0A192F'; ?>; font-family: 'Plus Jakarta Sans', sans-serif;">
            <?php echo htmlspecialchars($faq['q']); ?>
          </span>
          <div class="faq-icon-wrapper" style="width: 32px; height: 32px; border-radius: 50%; background: <?php echo $isOpen ? '#FDECEF' : '#f8fafc'; ?>; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <?php if ($isOpen): ?>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E61E38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-icon-up"><polyline points="18 15 12 9 6 15"/></svg>
            <?php else: ?>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-icon-down"><polyline points="6 9 12 15 18 9"/></svg>
            <?php endif; ?>
          </div>
        </button>

        <div class="faq-answer-container" style="padding: <?php echo $isOpen ? '0 24px 22px' : '0'; ?>; font-size: 15px; color: #475569; line-height: 1.7; border-top: <?php echo $isOpen ? '1px solid #f1f5f9' : 'none'; ?>; padding-top: <?php echo $isOpen ? '16px' : '0'; ?>; display: <?php echo $isOpen ? 'block' : 'none'; ?>; font-family: 'Plus Jakarta Sans', sans-serif;">
          <?php echo htmlspecialchars($faq['a']); ?>
        </div>
      </div>
    <?php endforeach; ?>

    <!-- No results message placeholder -->
    <div id="faq-no-results" style="text-align: center; padding: 40px; background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; display: none;">
      <p style="font-size: 16px; color: #64748b; font-family: 'Plus Jakarta Sans', sans-serif;">No matching questions found.</p>
    </div>
  </div>
</section>
