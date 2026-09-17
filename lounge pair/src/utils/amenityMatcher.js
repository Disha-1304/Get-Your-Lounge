/**
 * amenityMatcher.js
 * ────────────────────────────────────────────────────────────
 * Flexible matching helper for lounge amenities filtering.
 * Handles variations like WiFi / Wi-Fi, Shower / Showers, Food / Buffet, etc.
 */

export const matchesAmenity = (lounge, selectedAmenity) => {
  if (!selectedAmenity) return true;

  const rawAmenities = lounge?.amenities || [];
  const text = (Array.isArray(rawAmenities) ? rawAmenities.join(' ') : String(rawAmenities)) + ' ' + (lounge?.description || '');
  const lowerText = text.toLowerCase();
  const cleanText = lowerText.replace(/[^a-z0-9]/g, '');

  const key = selectedAmenity.trim().toLowerCase();
  const cleanKey = key.replace(/[^a-z0-9]/g, '');

  if (cleanText.includes(cleanKey)) return true;

  // Key-specific alias matching
  if (cleanKey === 'wifi') {
    return lowerText.includes('wifi') || lowerText.includes('wi-fi') || lowerText.includes('internet') || lowerText.includes('wireless');
  }
  if (cleanKey === 'shower' || cleanKey === 'showers') {
    return lowerText.includes('shower') || lowerText.includes('bath');
  }
  if (cleanKey === 'food' || cleanKey === 'buffet' || cleanKey === 'dining') {
    return lowerText.includes('food') || lowerText.includes('buffet') || lowerText.includes('dining') || lowerText.includes('snack') || lowerText.includes('meal') || lowerText.includes('refreshment');
  }
  if (cleanKey === 'bar' || cleanKey === 'drinks') {
    return lowerText.includes('bar') || lowerText.includes('drink') || lowerText.includes('cocktail') || lowerText.includes('wine') || lowerText.includes('beer') || lowerText.includes('liquor') || lowerText.includes('spirits');
  }
  if (cleanKey === 'ac' || cleanKey === 'airconditioning') {
    return lowerText.includes('ac') || lowerText.includes('air conditioning') || lowerText.includes('air-conditioning');
  }
  if (cleanKey === 'tv' || cleanKey === 'entertainment') {
    return lowerText.includes('tv') || lowerText.includes('television') || lowerText.includes('entertainment');
  }

  return false;
};
