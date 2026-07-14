<?php
// components/executive_reviews.php
$reviews = [
    [
        'quote' => "LoungePair transformed our international corporate travel. Having instant guaranteed access to private suites and rainfall showers during 8-hour layovers in Singapore and Dubai is invaluable.",
        'author' => "Julianne Vance",
        'title' => "Managing Director, Global Wealth Partners",
        'route' => "Frequent Flyer • JFK ⇄ SIN",
        'avatar' => "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    ],
    [
        'quote' => "The zero-membership model is brilliant. I bought my digital 3D QR pass while standing right outside the Plaza Premium Concierge in Concourse B and entered within 20 seconds. Exceptional service.",
        'author' => "Rajesh Mehta",
        'title' => "Founder & CEO, Horizon Tech Labs",
        'route' => "First Class Club • DXB ⇄ LHR",
        'avatar' => "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    ],
    [
        'quote' => "As a diplomatic courier, schedule flexibility is critical. Knowing my pass remains valid for 365 days across any flight delay or reschedule gives me total peace of mind. Truly 5-star airport hospitality.",
        'author' => "Lord Alistair Sterling",
        'title' => "Senior Diplomatic Advisor",
        'route' => "Global Ambassador • CDG ⇄ HND",
        'avatar' => "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
    ]
];
?>
<section style="padding: 80px 20px; background: #FFFFFF; position: relative;">
  <div style="max-width: 1350px; margin: 0 auto;">
    <!-- Section Title -->
    <div style="text-align: center; margin-bottom: 64px;">
      <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; background: #FDECEF; border: 1px solid rgba(230, 30, 56, 0.3); border-radius: 999px; margin-bottom: 16px; color: #E61E38; fontSize: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="color: #E61E38;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        Executive Testimonials
      </div>

      <h2 class="luxury-serif" style="font-size: 42px; color: #0A192F; margin-bottom: 16px;">
        Accolades from the <span class="champagne-text">Discerning Flyer</span>
      </h2>
      <p style="font-size: 16px; color: #334155; max-width: 580px; margin: 0 auto; line-height: 1.6;">
        Read how global executives, diplomats, and frequent travelers experience effortless airport hospitality with LoungePair International.
      </p>
    </div>

    <!-- Reviews Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 32px;">
      <?php foreach ($reviews as $rev): ?>
        <div
          class="luxury-card-hover"
          style="background: #ffffff; border-radius: 28px; padding: 40px 36px; border: 1.5px solid rgba(230, 30, 56, 0.2); box-shadow: 0 12px 36px rgba(10, 25, 47, 0.08); display: flex; flex-direction: column; justify-content: space-between; gap: 28px; position: relative;"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: rgba(230, 30, 56, 0.15); position: absolute; top: 28px; right: 32px;"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H5c-1.25 0-2 .75-2 2v3c0 1.25.75 2 2 2h3c0 1.5-1 4-4 4-.5 0-1 .25-1 .75v3.5c0 .5.25.75.75.75Zm11 0c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-3c-1.25 0-2 .75-2 2v3c0 1.25.75 2 2 2h3c0 1.5-1 4-4 4-.5 0-1 .25-1 .75v3.5c0 .5.25.75.75.75Z"/></svg>

          <div>
            <!-- 5 Stars -->
            <div style="display: flex; gap: 4px; margin-bottom: 20px;">
              <?php for ($i = 0; $i < 5; $i++): ?>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="color: #E61E38;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <?php endfor; ?>
            </div>

            <!-- Quote -->
            <p class="luxury-serif" style="font-size: 19px; color: #0A192F; line-height: 1.6; font-style: italic; font-weight: 600;">
              "<?php echo htmlspecialchars($rev['quote']); ?>"
            </p>
          </div>

          <!-- Author Info -->
          <div style="display: flex; align-items: center; gap: 16px; border-top: 1px solid rgba(10, 25, 47, 0.1); padding-top: 20px;">
            <img
              src="<?php echo $rev['avatar']; ?>"
              alt="<?php echo htmlspecialchars($rev['author']); ?>"
              style="width: 54px; height: 54px; border-radius: 50%; object-fit: cover; border: 2px solid #E61E38;"
            />
            <div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <h4 style="font-size: 16px; font-weight: 800; color: #0A192F;"><?php echo htmlspecialchars($rev['author']); ?></h4>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div style="font-size: 12px; font-weight: 600; color: #334155; margin-bottom: 2px;"><?php echo htmlspecialchars($rev['title']); ?></div>
              <div style="font-size: 11px; font-weight: 700; color: #E61E38; letter-spacing: 0.5px;"><?php echo htmlspecialchars($rev['route']); ?></div>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
