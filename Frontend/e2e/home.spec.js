import { test, expect } from '@playwright/test';

test('home page shows backend status', async ({ page }) => {
  await page.goto('/');

  // The Home page renders the API status message returned by GET /api/status
  await expect(page.getByRole('heading', { name: 'Home Page' })).toBeVisible();
  await expect(page.getByText('API Status')).toBeVisible();

  // Should eventually show the backend status message
  await expect(page.getByText('Server is running')).toBeVisible();
});
