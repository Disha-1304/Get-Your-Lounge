export const getCleanLoungeImage = (lounge) => {
  if (lounge?.image) return lounge.image;
  if (lounge?.heroImage) return lounge.heroImage;
  if (lounge?.images && lounge.images.length > 0) return lounge.images[0];
  return '/lounge-pair-final-image.jpg'; // Fallback image instead of empty string
};
