import { test, expect } from '@playwright/test';
import { getOktaToken, setAuthorizationHeader } from '../auth/oktaAuth';
import { getTokenInfo } from '../utils/tokenStorage';

/**
 * Example test that uses the cached Okta token
 */
test.describe('Example tests with Okta authentication', () => {
  test.beforeEach(async ({ page }) => {
    // Display token status before each test
    const tokenInfo = getTokenInfo();
    console.log(`\nℹ Token status: ${tokenInfo.isValid ? '✓ Valid' : '✗ Invalid'}`);
    if (tokenInfo.isValid) {
      console.log(`ℹ Remaining time: ${tokenInfo.remainingMinutes} minutes\n`);
    }

    // Get token (will use cached token if valid)
    const token = await getOktaToken();

    // Set authorization header for all requests
    await setAuthorizationHeader(page, token);
  });

  test('should access protected resource', async ({ page }) => {
    // Example: Navigate to a protected page
    // Replace with your actual protected URL
    await page.goto('https://your-app.example.com/protected');

    // Verify you're authenticated
    // This is just an example - adjust based on your app
    await expect(page.locator('body')).toContainText(/welcome|dashboard|profile/i);

    console.log('✓ Successfully accessed protected resource');
  });

  test('should make authenticated API call', async ({ request }) => {
    // Get token
    const token = await getOktaToken();

    // Make API call with token
    const response = await request.get('https://your-api.example.com/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    expect(response.ok()).toBeTruthy();
    console.log('✓ API call successful');

    const data = await response.json();
    console.log('✓ User data received:', data);
  });

  test('should maintain session across page navigations', async ({ page }) => {
    // Navigate to multiple pages using the same token
    await page.goto('https://your-app.example.com/dashboard');
    await expect(page).toHaveURL(/dashboard/);

    await page.goto('https://your-app.example.com/profile');
    await expect(page).toHaveURL(/profile/);

    await page.goto('https://your-app.example.com/settings');
    await expect(page).toHaveURL(/settings/);

    console.log('✓ Session maintained across navigations');
  });
});

/**
 * Example test demonstrating token reuse across test files
 */
test.describe('Another test suite using the same token', () => {
  test('should reuse cached token efficiently', async ({ page }) => {
    const startTime = Date.now();

    // This should be instant since token is cached
    const token = await getOktaToken();

    const duration = Date.now() - startTime;

    console.log(`✓ Token retrieved in ${duration}ms (cached)`);
    expect(duration).toBeLessThan(100); // Should be very fast

    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
  });
});
