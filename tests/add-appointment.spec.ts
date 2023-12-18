import { expect, test } from '@playwright/test';

test("Should navigate to /add when 'add appointment' button is clicked, should show validation error messages upon submitting without filling the form, and should be able to fill the form and submit then navigate back to the home page", async ({
  page,
}) => {
  // Navigate successfully to /add page and check if the page is correct.
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Add Appointment' }).click();
  await expect(page).toHaveURL('http://localhost:3000/add');
  await expect(
    page.getByRole('heading', { name: 'New Appointment' })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Add Appointment' })
  ).toBeVisible();

  // Click on the 'Add Appointment' button without filling the form.
  await page.getByRole('button', { name: 'Add Appointment' }).click();

  // Check if the validation error messages are visible.
  await expect(
    page.getByText('Please select the title of your appointment.')
  ).toBeVisible();
  await expect(
    page.getByText('Please select the type of your appointment.')
  ).toBeVisible();
  await expect(
    page.getByText('Please select the host of your appointment.')
  ).toBeVisible();
  await expect(
    page.getByText('Please select the client of your appointment.')
  ).toBeVisible();
  // Fill the form
  await page.getByPlaceholder('Type in your appointment').click();
  await page.getByPlaceholder('Type in your appointment').fill('Title Test');
  await page.getByLabel('Type').click();
  await page.getByLabel('Physical').click();
  await page.getByPlaceholder('Type in your appointment location.').click();
  await page
    .getByPlaceholder('Type in your appointment location.')
    .fill('Location Test');
  await page.getByLabel('Host').click();
  await page.getByLabel('Sophia Laurent').getByText('Sophia Laurent').click();
  await page.getByLabel('Client').click();
  await page.getByLabel('Olivia Johnson from Eclipse').click();
  await page.getByLabel('Start Time').click();
  await page.getByLabel('Start Time').fill('2030-01-02T08:00');
  await page.getByLabel('End Time').click();
  await page.getByLabel('End Time').fill('2030-01-03T08:01');

  // Submit the form.
  await page.getByRole('button', { name: 'Add Appointment' }).click();

  // Check if the page navigates back to the home page.
  await expect(page).toHaveURL('http://localhost:3000/add');
  await expect(
    page.getByRole('button', { name: 'Add Appointment' })
  ).toBeVisible();
});
