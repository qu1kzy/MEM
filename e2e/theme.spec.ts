import { test, expect } from '@playwright/test';

test.describe('Theme', () => {
  test('starts with dark theme', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('toggles to light theme', async ({ page }) => {
    await page.goto('/');
    // Find and click theme toggle button
    const toggle = page.locator('button').filter({ hasText: /🌙|☀️|theme/i }).or(page.locator('[aria-label*="тем"]')).or(page.locator('[aria-label*="Theme"]'));
    await toggle.first().click();
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  test('persists theme across navigation', async ({ page }) => {
    await page.goto('/');
    // Toggle to light
    const toggle = page.locator('button').filter({ hasText: /🌙|☀️/ }).or(page.locator('[aria-label*="тем"]'));
    await toggle.first().click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    // Navigate to auth and check theme persists
    await page.goto('/auth');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });
});
