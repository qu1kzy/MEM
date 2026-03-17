import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads and shows hero section', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('МЭМ');
    await expect(page.locator('text=Вода · Тепло · Электричество')).toBeVisible();
  });

  test('shows 6 feature cards', async ({ page }) => {
    const features = page.locator('[id="features"]');
    await features.scrollIntoViewIfNeeded();
    const cards = features.locator('[class*="card"], [class*="Card"], article, [role="article"]').or(features.locator('div > div > div').filter({ has: page.locator('h3') }));
    await expect(cards).toHaveCount(6);
  });

  test('gallery opens lightbox on image click', async ({ page }) => {
    const gallery = page.locator('[id="gallery"]');
    await gallery.scrollIntoViewIfNeeded();
    const firstImage = gallery.locator('img').first();
    await firstImage.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });

  test('CTA buttons are visible', async ({ page }) => {
    await expect(page.locator('text=Оставить заявку')).toBeVisible();
  });
});
