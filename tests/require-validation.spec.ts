import { expect, test } from '@playwright/test';

test('should require validation if button is clicked without filling the form. ', async ({
  page,
}) => {
  await page.goto('http://localhost:3000/add');
  await page.click('text=Add Appointment');
  await expect(page).toHaveURL('http://localhost:3000/add');
  // shouldn't redirect to '/' page
});
