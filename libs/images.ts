// Image path helpers
// Dynamically checks for images in /public/images folder

export const IMAGES = {
  // Hero images (try multiple variations)
  hero: {
    background: '/images/hero-background.jpg',
    backgroundAlt: '/images/hero-mushroom.jpg',
    backgroundPng: '/images/hero-background.png',
  },
  
  // Logo images
  logo: {
    main: '/images/logo.svg',
    mainPng: '/images/logo.png',
    icon: '/images/logo-icon.svg',
    iconPng: '/images/logo-icon.png',
  },
  
  // Pillar section images
  pillars: {
    research: '/images/pillar-research.jpg',
    play: '/images/pillar-play.jpg',
    shop: '/images/pillar-shop.jpg',
  },
  
  // About section
  about: {
    mushrooms: '/images/about-mushrooms.jpg',
    education: '/images/about-education.jpg',
  },
  
  // Product images (for showcase)
  products: {
    tshirt1: '/images/product-tshirt-1.jpg',
    tshirt2: '/images/product-tshirt-2.jpg',
    hoodie1: '/images/product-hoodie-1.jpg',
    hoodie2: '/images/product-hoodie-2.jpg',
    hat1: '/images/product-hat-1.jpg',
    sticker1: '/images/product-sticker-1.jpg',
  },
};

// Helper to get first available image from array
export const getFirstAvailableImage = (paths: string[]): string => {
  // In a real implementation, this would check if files exist
  // For now, return first path
  return paths[0];
};

// Helper to check if image exists (client-side only)
export const imageExists = async (url: string): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Get hero background with fallback
export const getHeroBackground = (): string => {
  return getFirstAvailableImage([
    IMAGES.hero.background,
    IMAGES.hero.backgroundAlt,
    IMAGES.hero.backgroundPng,
  ]);
};

// Get logo with fallback
export const getLogo = (): string => {
  return getFirstAvailableImage([
    IMAGES.logo.main,
    IMAGES.logo.mainPng,
  ]);
};

// Get logo icon with fallback
export const getLogoIcon = (): string => {
  return getFirstAvailableImage([
    IMAGES.logo.icon,
    IMAGES.logo.iconPng,
  ]);
};

// Get all product images as array
export const getProductImages = (): string[] => {
  return Object.values(IMAGES.products);
};
