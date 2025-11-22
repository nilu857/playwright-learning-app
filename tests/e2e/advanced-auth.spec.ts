import { test, expect } from '@playwright/test';
import { getOktaToken } from '../auth/oktaAuth';
import { getTokenInfo, clearToken, saveToken } from '../utils/tokenStorage';

/**
 * Advanced authentication scenarios
 */
test.describe('Advanced authentication scenarios', () => {
  test('should detect expired token', async () => {
    // Save a token that expires in the past
    await saveToken('fake-expired-token');

    // Manually set expiration to the past
    const fs = require('fs');
    const path = require('path');
    const tokenPath = path.join(process.cwd(), '.auth', 'okta-token.json');
    const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
    tokenData.expiresAt = Date.now() - 1000; // 1 second ago
    fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));

    // Check token validity
    const tokenInfo = getTokenInfo();
    expect(tokenInfo.isValid).toBe(false);

    console.log('✓ Correctly detected expired token');

    // Clean up
    clearToken();
  });

  test('should handle missing token gracefully', async () => {
    // Clear any existing token
    clearToken();

    // Try to get token info
    const tokenInfo = getTokenInfo();
    expect(tokenInfo.isValid).toBe(false);

    console.log('✓ Gracefully handled missing token');
  });

  test('should show remaining token lifetime', async () => {
    // This test assumes you have a valid token from setup
    const tokenInfo = getTokenInfo();

    if (tokenInfo.isValid) {
      console.log(`\nToken Information:`);
      console.log(`  Status: Valid ✓`);
      console.log(`  Expires at: ${tokenInfo.expiresAt?.toLocaleString()}`);
      console.log(`  Remaining: ${tokenInfo.remainingMinutes} minutes`);

      expect(tokenInfo.remainingMinutes).toBeGreaterThan(0);
      expect(tokenInfo.remainingMinutes).toBeLessThanOrEqual(120); // Max 2 hours
    } else {
      console.log('\nNo valid token found. Run setup first.');
    }
  });
});

/**
 * Example: Parallel test execution with shared token
 */
test.describe.parallel('Parallel tests with shared token', () => {
  test('parallel test 1', async ({ page }) => {
    const token = await getOktaToken();
    expect(token).toBeTruthy();
    console.log('✓ Parallel test 1 using cached token');
  });

  test('parallel test 2', async ({ page }) => {
    const token = await getOktaToken();
    expect(token).toBeTruthy();
    console.log('✓ Parallel test 2 using cached token');
  });

  test('parallel test 3', async ({ page }) => {
    const token = await getOktaToken();
    expect(token).toBeTruthy();
    console.log('✓ Parallel test 3 using cached token');
  });

  test('parallel test 4', async ({ page }) => {
    const token = await getOktaToken();
    expect(token).toBeTruthy();
    console.log('✓ Parallel test 4 using cached token');
  });
});
