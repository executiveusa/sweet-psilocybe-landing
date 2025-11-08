import { getProductImages } from '../../../../libs/images';

// Product showcase data
export const showcaseProducts = [
  {
    id: 'tshirt-1',
    name: 'Spore Print Tee',
    description: 'Organic cotton with artistic mushroom design',
    image: getProductImages()[0], // product-tshirt-1
  },
  {
    id: 'hoodie-1',
    name: 'Mycelium Hoodie',
    description: 'Cozy fleece with embroidered logo',
    image: getProductImages()[2], // product-hoodie-1
  },
  {
    id: 'hat-1',
    name: 'Research Cap',
    description: 'Adjustable cap with subtle branding',
    image: getProductImages()[4], // product-hat-1
  },
  {
    id: 'sticker-1',
    name: 'Sticker Pack',
    description: 'Waterproof vinyl stickers (5 pack)',
    image: getProductImages()[5], // product-sticker-1
  },
];

export const headerPhrases = ['Support the Science', 'Through Art'];

export const paragraphPhrases = [
  'Every purchase supports educational content and harm reduction research.',
  'Explore our full collection in the store.',
];

export const mobileParagraphPhrases = [
  'Every purchase supports educational content',
  'and harm reduction research.',
];
