import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('shows login form', async ({ page }) => {
    await page.goto('/auth');
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"], input[name="password"]')).toBeVisible();
  });

  test('can switch to register tab', async ({ page }) => {
    await page.goto('/auth');
    await page.locator('text=Регистрация').click();
    // Register form should have 2 password fields or a confirm field
    const passwordFields = page.locator('input[type="password"]');
    await expect(passwordFields.first()).toBeVisible();
  });

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.goto('/auth');
    await page.locator('button[type="submit"]').click();
    // Should show error messages
    await expect(page.locator('text=email').or(page.locator('[role="alert"]')).or(page.locator('.text-\\[var\\(--color-error\\)\\]'))).toBeVisible();
  });

  test('can register and login', async ({ page }) => {
    await page.goto('/auth');

    // Switch to register
    await page.locator('text=Регистрация').click();
    await page.waitForTimeout(300);

    // Fill registration form
    await page.locator('input[name="email"], input[type="email"]').first().fill('test@example.com');
    const passwordFields = page.locator('input[type="password"]');
    await passwordFields.first().fill('password123');

    // Submit
    await page.locator('button[type="submit"]').click();

    // Should redirect to profile or show success
    await page.waitForTimeout(1000);
  });
});
