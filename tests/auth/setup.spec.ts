import { test as setup, expect } from '@playwright/test';
import { authenticateWithOkta, getValidToken, saveAuthState } from './oktaAuth';
import { getTokenInfo } from '../utils/tokenStorage';

const authFile = '.auth/user.json';

/**
 * Setup test to authenticate with Okta and cache the token
 * This runs before all other tests
 */
setup('authenticate with Okta', async ({ page }) => {
  console.log('\n========================================');
  console.log('OKTA AUTHENTICATION SETUP');
  console.log('========================================\n');

  // Check if we already have a valid token
  const tokenInfo = getTokenInfo();

  if (tokenInfo.isValid) {
    console.log(`✓ Valid token already exists (${tokenInfo.remainingMinutes} minutes remaining)`);
    console.log('ℹ Skipping authentication\n');
    return;
  }

  console.log('ℹ No valid token found, initiating authentication...\n');

  try {
    // Perform authentication
    const token = await authenticateWithOkta(page);

    console.log('\n✓ Token obtained successfully');
    console.log(`✓ Token will expire in 2 hours`);

    // Save browser authentication state for future tests
    await saveAuthState(page, authFile);

    console.log('\n========================================');
    console.log('SETUP COMPLETE');
    console.log('========================================\n');
  } catch (error) {
    console.error('\n✗ Authentication setup failed:', error);
    throw error;
  }
});

/**
 * Alternative setup using API authentication
 * Uncomment this and comment out the above if you prefer API-based auth
 */
/*
setup('authenticate with Okta API', async () => {
  console.log('\n========================================');
  console.log('OKTA API AUTHENTICATION SETUP');
  console.log('========================================\n');

  const tokenInfo = getTokenInfo();

  if (tokenInfo.isValid) {
    console.log(`✓ Valid token already exists (${tokenInfo.remainingMinutes} minutes remaining)`);
    console.log('ℹ Skipping authentication\n');
    return;
  }

  console.log('ℹ No valid token found, initiating API authentication...\n');

  try {
    const { authenticateWithOktaAPI } = await import('./oktaAuth');
    const token = await authenticateWithOktaAPI();

    console.log('\n✓ Token obtained successfully via API');
    console.log(`✓ Token will expire in 2 hours`);

    console.log('\n========================================');
    console.log('SETUP COMPLETE');
    console.log('========================================\n');
  } catch (error) {
    console.error('\n✗ API authentication setup failed:', error);
    throw error;
  }
});
*/
