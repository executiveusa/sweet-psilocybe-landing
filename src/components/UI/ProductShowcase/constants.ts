import { getProductImages } from '../../../../libs/images';

// Product showcase data
export const showcaseProducts = [
  {
    id: 'chocolate-bars',
    name: 'Artisan Chocolate Bars',
    description: 'Premium dark chocolate with botanical art',
    image: getProductImages()[0], // chocolate-bars
    link: '/shop/chocolate-bars',
  },
  {
    id: 'herbal-tea',
    name: 'Wellness Tea Blend',
    description: 'Organic herbal tea for mindful moments',
    image: getProductImages()[1], // tea-2
    link: '/shop/herbal-tea',
  },
  {
    id: 'beanie',
    name: 'Comfort Beanie',
    description: 'Soft knit beanie with embroidered logo',
    image: getProductImages()[2], // beanie-1
    link: '/shop/beanie',
  },
  {
    id: 'mushroom-diary',
    name: 'Research Journal',
    description: 'Beautiful diary for notes & reflections',
    image: getProductImages()[6], // mushroom-diary
    link: '/shop/mushroom-diary',
  },
  {
    id: 'iphone-case',
    name: 'Mushroom Art Case',
    description: 'Protective case with botanical design',
    image: getProductImages()[5], // iphone-case
    link: '/shop/iphone-case',
  },
  {
    id: 'bon-bons',
    name: 'Wellness Bon Bons',
    description: 'Gourmet treats with botanical infusion',
    image: getProductImages()[4], // bon-bons
    link: '/shop/bon-bons',
  },
];

export const headerPhrases = ['Support the Science'];

export const paragraphPhrases = [
  'Every purchase supports educational content and natural alternatives research.',
  'Explore our full collection in the store.',
];

export const mobileParagraphPhrases = [
  'Every purchase supports educational content',
  'and natural alternatives research.',
];
