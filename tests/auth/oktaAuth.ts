import { Page, Browser } from '@playwright/test';
import { saveToken, getValidToken, isTokenValid, loadToken } from '../utils/tokenStorage';

export interface OktaCredentials {
  username: string;
  password: string;
  oktaDomain: string; // e.g., 'dev-12345678.okta.com'
}

/**
 * Get Okta credentials from environment variables
 */
export function getOktaCredentials(): OktaCredentials {
  const username = process.env.OKTA_USERNAME;
  const password = process.env.OKTA_PASSWORD;
  const oktaDomain = process.env.OKTA_DOMAIN;

  if (!username || !password || !oktaDomain) {
    throw new Error(
      'Missing Okta credentials. Please set OKTA_USERNAME, OKTA_PASSWORD, and OKTA_DOMAIN environment variables.'
    );
  }

  return { username, password, oktaDomain };
}

/**
 * Get cached token or authenticate to get a new one
 */
export async function getOktaToken(page?: Page): Promise<string> {
  // Check if we have a valid cached token
  const cachedToken = getValidToken();

  if (cachedToken) {
    console.log('✓ Using cached Okta token');
    return cachedToken;
  }

  // If no valid token, perform authentication
  console.log('ℹ No valid cached token found, performing authentication...');

  if (!page) {
    throw new Error('Page object required for authentication');
  }

  const token = await authenticateWithOkta(page);
  return token;
}

/**
 * Authenticate with Okta and save the token
 */
export async function authenticateWithOkta(page: Page): Promise<string> {
  const credentials = getOktaCredentials();

  console.log(`ℹ Authenticating with Okta domain: ${credentials.oktaDomain}`);

  try {
    // Navigate to Okta login page
    await page.goto(`https://${credentials.oktaDomain}/oauth2/default/v1/authorize?client_id=YOUR_CLIENT_ID&response_type=token&redirect_uri=http://localhost:3000&scope=openid profile email`);

    // Fill in username
    await page.fill('input[name="username"]', credentials.username);
    await page.fill('input[name="password"]', credentials.password);

    // Click sign in button
    await page.click('input[type="submit"]');

    // Wait for redirect and extract token from URL
    // Note: This is a simplified example. In real scenarios, you might need to:
    // 1. Handle MFA if enabled
    // 2. Parse the redirect URL for the token
    // 3. Handle different OAuth flows

    await page.waitForURL(/access_token=/, { timeout: 30000 });

    const url = page.url();
    const tokenMatch = url.match(/access_token=([^&]+)/);

    if (!tokenMatch) {
      throw new Error('Failed to extract access token from redirect URL');
    }

    const token = tokenMatch[1];

    // Save token for future use
    await saveToken(token);

    console.log('✓ Authentication successful');
    return token;
  } catch (error) {
    console.error('✗ Authentication failed:', error);
    throw error;
  }
}

/**
 * Alternative: Authenticate using Okta API directly (without browser)
 * This is useful for CI/CD environments
 */
export async function authenticateWithOktaAPI(): Promise<string> {
  const credentials = getOktaCredentials();

  // Check cache first
  const cachedToken = getValidToken();
  if (cachedToken) {
    console.log('✓ Using cached Okta token');
    return cachedToken;
  }

  console.log('ℹ Authenticating with Okta API...');

  try {
    // Using Okta Authentication API
    // https://developer.okta.com/docs/reference/api/authn/
    const response = await fetch(`https://${credentials.oktaDomain}/api/v1/authn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== 'SUCCESS') {
      throw new Error(`Authentication status: ${data.status}`);
    }

    const sessionToken = data.sessionToken;

    // Exchange session token for access token
    // Note: This requires OAuth client configuration
    const tokenResponse = await fetch(
      `https://${credentials.oktaDomain}/oauth2/default/v1/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.OKTA_CLIENT_ID || 'YOUR_CLIENT_ID',
          redirect_uri: 'http://localhost:3000',
          code: sessionToken,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error('Failed to obtain access token');
    }

    await saveToken(tokenData.access_token, tokenData.refresh_token);

    console.log('✓ API authentication successful');
    return tokenData.access_token;
  } catch (error) {
    console.error('✗ API authentication failed:', error);
    throw error;
  }
}

/**
 * Set authorization header with Okta token
 */
export async function setAuthorizationHeader(page: Page, token?: string): Promise<void> {
  const authToken = token || getValidToken();

  if (!authToken) {
    throw new Error('No valid token available');
  }

  // Set authorization header for all requests
  await page.setExtraHTTPHeaders({
    'Authorization': `Bearer ${authToken}`,
  });

  console.log('✓ Authorization header set');
}

/**
 * Save authentication state to file (for browser context reuse)
 */
export async function saveAuthState(page: Page, statePath: string): Promise<void> {
  await page.context().storageState({ path: statePath });
  console.log(`✓ Authentication state saved to ${statePath}`);
}
