import { test, expect } from '@playwright/test';

const links = [
  { href: '/about/our-mission', title: 'Our Mission' },
  { href: '/about/research-partners', title: 'Research Partners' },
  { href: '/about/contact', title: 'Contact' },
  { href: '/legal/terms-of-use', title: 'Terms of Use' },
  { href: '/legal/privacy-policy', title: 'Privacy Policy' },
  { href: '/legal/disclaimers', title: 'Disclaimers' },
  { href: '/resources/research-hub', title: 'Research Hub' },
  { href: '/resources/safety-info', title: 'Safety Info' },
  { href: '/resources/faq', title: 'FAQ' },
];

test.describe('Footer links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const link of links) {
    test(`navigate ${link.href} and see ${link.title}`, async ({ page }) => {
      await page.goto(link.href);
      await expect(page.locator('h1')).toHaveText(link.title, { timeout: 5000 });
    });
  }
});
