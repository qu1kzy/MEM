import { test, expect } from '@playwright/test';

test.describe('Constructor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to constructor section
    const constructor = page.locator('[id="constructor"]');
    await constructor.scrollIntoViewIfNeeded();
  });

  test('shows step 1 by default', async ({ page }) => {
    await expect(page.locator('text=Выберите модель')).toBeVisible();
  });

  test('can navigate through all 4 steps', async ({ page }) => {
    // Step 1: Model select
    await expect(page.locator('text=Стандарт')).toBeVisible();
    await page.locator('text=Далее').first().click();

    // Step 2: Specs
    await expect(page.locator('text=Характеристики').or(page.locator('text=Дополнительные'))).toBeVisible();
    await page.locator('text=Далее').first().click();

    // Step 3: Services
    await expect(page.locator('text=Услуги').or(page.locator('text=Доставка'))).toBeVisible();
    await page.locator('text=Далее').first().click();

    // Step 4: Contacts
    await expect(page.locator('text=Контактные данные').or(page.locator('input[name="name"]'))).toBeVisible();
  });

  test('sidebar shows price', async ({ page }) => {
    // The sidebar should show the base model price
    await expect(page.locator('text=450 000').or(page.locator('text=450000')).or(page.locator('text=450\u00a0000'))).toBeVisible();
  });
});
