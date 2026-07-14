<?php
// components/partner_scroller.php
?>
<section style="padding: 60px 0 40px; background: #FFFFFF; overflow: hidden;">
  <div style="max-width: 1440px; margin: 0 auto; padding: 0 20px; text-align: center;">
    
    <!-- Featured Partners Heading -->
    <h3 class="luxury-cinzel" style="font-size: 14px; color: #334155; margin-bottom: 36px;">
      Featured Partners
    </h3>

    <!-- Level 1: First Line (7 Logos) -->
    <div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 20px; margin-bottom: 36px;">
      <?php foreach (array_slice($FEATURED_PARTNERS, 0, 7) as $idx => $partner): ?>
        <div
          style="padding: 4px 10px; display: flex; align-items: center; justify-content: center; cursor: default; animation: popBounce 6.5s infinite ease-in-out; animation-delay: <?php echo $idx * 0.4; ?>s; min-width: 160px; max-width: 210px; height: 85px; background: transparent; border: none; transition: transform 0.3s ease; mix-blend-mode: multiply;"
        >
          <img 
            src="<?php echo $partner['logo']; ?>" 
            alt="<?php echo htmlspecialchars($partner['name']); ?>" 
            style="height: 72px; width: auto; max-width: 195px; object-fit: contain; mix-blend-mode: multiply;" 
          />
        </div>
      <?php endforeach; ?>
    </div>

    <!-- Level 2: Second Line (4 Logos) -->
    <div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 20px;">
      <?php foreach (array_slice($FEATURED_PARTNERS, 7, 4) as $idx => $partner): ?>
        <div
          style="padding: 4px 10px; display: flex; align-items: center; justify-content: center; cursor: default; animation: popBounce 6.5s infinite ease-in-out; animation-delay: <?php echo ($idx + 7) * 0.4; ?>s; min-width: 160px; max-width: 210px; height: 85px; background: transparent; border: none; transition: transform 0.3s ease; mix-blend-mode: multiply;"
        >
          <img 
            src="<?php echo $partner['logo']; ?>" 
            alt="<?php echo htmlspecialchars($partner['name']); ?>" 
            style="height: 72px; width: auto; max-width: 195px; object-fit: contain; mix-blend-mode: multiply;" 
          />
        </div>
      <?php endforeach; ?>
    </div>

  </div>
</section>
