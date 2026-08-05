// Curated collection of 20 verified high-resolution Airport Lounge photos from Unsplash
export const CURATED_LOUNGE_IMAGES = [
  'https://images.unsplash.com/photo-1540939527632-4e94ccdbd20c?auto=format&fit=crop&w=900&q=85', // Luxury Airport Lounge Hall
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=85', // Modern Airport Lounge Seating
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85', // VIP Lounge Room
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85', // Airport Dining & Buffet Lounge
  'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=900&q=85', // Airport Terminal Lounge
  'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=900&q=85', // Airport Runway View Lounge
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85', // Armchair Seating Lounge
  'https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?auto=format&fit=crop&w=900&q=85', // Business Center Lounge
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=85', // Interior Luxury Lounge
  'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=85', // Airport VIP Lounge
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85', // First Class Lounge
  'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=900&q=85', // Lounge Bar & Refreshments
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85', // Airport Gate Lounge View
  'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=900&q=85', // Flight Lounge
  'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=900&q=85', // Airport Lounge Suite
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=85', // Private Suite Lounge
  'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=85', // Departure Lounge
  'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=900&q=85', // International Terminal Lounge
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=85', // Premium Restaurant Lounge
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85'  // Quiet Work & Relax Lounge
];

export const getCleanLoungeImage = (lounge, index = 0) => {
  const hashStr = String(lounge?.id || lounge?.outletId || lounge?.outletName || index);
  let hash = 0;
  for (let i = 0; i < hashStr.length; i++) {
    hash = (hash << 5) - hash + hashStr.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % CURATED_LOUNGE_IMAGES.length;
  return CURATED_LOUNGE_IMAGES[idx];
};
