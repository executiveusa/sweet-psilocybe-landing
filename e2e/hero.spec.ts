import { test, expect } from '@playwright/test';

test.describe('Hero visual tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#hero, section[aria-label="Sweet Psilocybe hero"], .parallax', { state: 'visible' });
    await page.waitForTimeout(700);
  });

  test('hero visual snapshot', async ({ page }) => {
    // try to locate hero container
    const hero = page.locator('#hero, section[aria-label="Sweet Psilocybe hero"], .parallax').first();
    const screenshot = await hero.screenshot();
    expect(screenshot).toMatchSnapshot('hero.png');
  });
});
