type FAQItem = {
  question: string;
  answer: string;
};

export const desktopHeaderPhrase = ['Frequently asked', 'questions'];
export const mobileHeaderPhrase = ['Frequently', 'asked', 'questions'];
export const animate = {
  initial: {
    y: '100%',
    opacity: 0,
  },
  open: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 1, delay: 0.1 * i, ease: [0.33, 1, 0.68, 1] },
  }),
};

export const faqData: FAQItem[] = [
  {
    question: 'What is psilocybin and why is research important?',
    answer:
      'Psilocybin is a naturally occurring psychedelic compound found in certain mushroom species. Recent scientific research has shown promising potential for therapeutic applications in treating depression, anxiety, PTSD, and addiction. This platform provides educational resources about ongoing research, harm reduction, and the science behind these studies. All content is for educational purposes only and is intended for adults 18 years and older.',
  },
  {
    question: 'Does this website sell psilocybin mushrooms or related products?',
    answer:
      'No. Sweet Psilocybe is strictly an educational platform focused on sharing research, science, and harm reduction information. We offer artistic merchandise (apparel, accessories, wellness products) that support our educational mission. We do not sell, distribute, or facilitate the sale of psilocybin mushrooms or any controlled substances. Please check your local laws regarding psilocybin research and education.',
  },
  {
    question: 'Who should use this educational platform?',
    answer:
      'This platform is designed for adults 18+ who are interested in learning about psilocybin research, including researchers, students, healthcare professionals, advocates, and curious minds. All information is for educational purposes only and should not be considered medical advice. If you are seeking treatment for mental health conditions, please consult with a qualified healthcare provider. Content focuses on scientific research, harm reduction, and responsible education.',
  },
  {
    question: 'How can I support psilocybin research and education?',
    answer:
      'There are several ways to support the movement: Stay informed by subscribing to our email list for research updates and educational content. Purchase our artistic merchandise—proceeds support educational initiatives and harm reduction resources. Share credible, science-based information with your community. Support legitimate research organizations like MAPS, Johns Hopkins Center for Psychedelic Research, and other accredited institutions advancing clinical studies.',
  },
];
