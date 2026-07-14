<?php
// components/featured_airlines.php
?>
<section style="padding: 50px 0 70px; background: #FFFFFF; overflow: hidden;">
  <div style="max-width: 1440px; margin: 0 auto; padding: 0 20px; text-align: center;">
    
    <!-- Luxury Cinzel Heading -->
    <h3 class="luxury-cinzel" style="font-size: 15px; color: #334155; margin-bottom: 40px; letter-spacing: 2px;">
      Featured Airline Lounges
    </h3>

    <!-- First Line: 5 Static Frameless Logos -->
    <div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 24px; margin-bottom: 36px;">
      <?php foreach (array_slice($FEATURED_AIRLINES, 0, 5) as $airline): ?>
        <div 
          class="logo-glow-hover"
          style="padding: 4px 10px; display: flex; align-items: center; justify-content: center; min-width: 220px; max-width: 290px; height: 115px; background: transparent; border: none; mix-blend-mode: multiply;"
        >
          <img 
            src="<?php echo $airline['logo']; ?>" 
            alt="<?php echo htmlspecialchars($airline['name']); ?>" 
            style="height: 96px; width: auto; max-width: 280px; object-fit: contain; mix-blend-mode: multiply;" 
          />
        </div>
      <?php endforeach; ?>
    </div>

    <!-- Second Line: 2 Static Frameless Logos -->
    <div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 24px;">
      <?php foreach (array_slice($FEATURED_AIRLINES, 5, 2) as $airline): ?>
        <div 
          class="logo-glow-hover"
          style="padding: 4px 10px; display: flex; align-items: center; justify-content: center; min-width: 220px; max-width: 290px; height: 115px; background: transparent; border: none; mix-blend-mode: multiply;"
        >
          <img 
            src="<?php echo $airline['logo']; ?>" 
            alt="<?php echo htmlspecialchars($airline['name']); ?>" 
            style="height: 96px; width: auto; max-width: 280px; object-fit: contain; mix-blend-mode: multiply;" 
          />
        </div>
      <?php endforeach; ?>
    </div>

  </div>
</section>
