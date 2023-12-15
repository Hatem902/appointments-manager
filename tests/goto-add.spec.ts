import { expect, test } from '@playwright/test';

test("should navigate to '/add' page", async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.click('text=Add Appointment');
  await expect(page).toHaveURL('http://localhost:3000/add');
  await expect(page.locator('h1')).toContainText('New Appointment');
});
