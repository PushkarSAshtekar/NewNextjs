// tests/example.spec.js
const { test, expect } = require('@playwright/test');

test('Next.js Installation Docs Page', async ({ page }) => {
  await page.goto('https://nextjs.org/docs/app/getting-started/installation');

  // More precise selector for "Installation" heading
  const heading = page.getByRole('heading', { name: 'Installation', exact: true });
  await expect(heading).toBeVisible();

});
