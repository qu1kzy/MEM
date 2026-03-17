import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('skip link is present and works', async ({ page }) => {
    await page.goto('/');
    // Tab to reveal skip link
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();
    await skipLink.click();
    // Main content should exist
    await expect(page.locator('#main-content')).toBeVisible();
  });

  test('navigation has proper aria labels', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav[aria-label="Главная навигация"]')).toBeVisible();
  });

  test('lightbox can be closed with Escape', async ({ page }) => {
    await page.goto('/');
    const gallery = page.locator('[id="gallery"]');
    await gallery.scrollIntoViewIfNeeded();
    const firstImage = gallery.locator('img').first();
    await firstImage.click();

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });
});
