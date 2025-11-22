import * as fs from 'fs';
import * as path from 'path';

export interface TokenData {
  accessToken: string;
  expiresAt: number; // Unix timestamp in milliseconds
  refreshToken?: string;
  tokenType?: string;
  scope?: string;
}

const TOKEN_FILE_PATH = path.join(process.cwd(), '.auth', 'okta-token.json');
const TOKEN_VALIDITY_HOURS = 2;

/**
 * Save token data to file system
 */
export async function saveToken(token: string, refreshToken?: string): Promise<void> {
  const tokenData: TokenData = {
    accessToken: token,
    expiresAt: Date.now() + (TOKEN_VALIDITY_HOURS * 60 * 60 * 1000), // 2 hours from now
    refreshToken,
    tokenType: 'Bearer',
  };

  // Ensure directory exists
  const dir = path.dirname(TOKEN_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(tokenData, null, 2), 'utf-8');
  console.log('✓ Token saved successfully');
}

/**
 * Load token from file system
 */
export function loadToken(): TokenData | null {
  if (!fs.existsSync(TOKEN_FILE_PATH)) {
    console.log('ℹ No token file found');
    return null;
  }

  try {
    const data = fs.readFileSync(TOKEN_FILE_PATH, 'utf-8');
    const tokenData: TokenData = JSON.parse(data);
    return tokenData;
  } catch (error) {
    console.error('✗ Error reading token file:', error);
    return null;
  }
}

/**
 * Check if token is still valid (not expired)
 */
export function isTokenValid(tokenData: TokenData | null): boolean {
  if (!tokenData) {
    return false;
  }

  const now = Date.now();
  const isValid = now < tokenData.expiresAt;

  if (isValid) {
    const remainingMinutes = Math.floor((tokenData.expiresAt - now) / (60 * 1000));
    console.log(`✓ Token is valid (expires in ${remainingMinutes} minutes)`);
  } else {
    console.log('✗ Token has expired');
  }

  return isValid;
}

/**
 * Get valid token or return null if expired/missing
 */
export function getValidToken(): string | null {
  const tokenData = loadToken();

  if (!tokenData) {
    return null;
  }

  if (!isTokenValid(tokenData)) {
    return null;
  }

  return tokenData.accessToken;
}

/**
 * Clear token file
 */
export function clearToken(): void {
  if (fs.existsSync(TOKEN_FILE_PATH)) {
    fs.unlinkSync(TOKEN_FILE_PATH);
    console.log('✓ Token file cleared');
  }
}

/**
 * Get token information without exposing the token value
 */
export function getTokenInfo(): { isValid: boolean; expiresAt?: Date; remainingMinutes?: number } {
  const tokenData = loadToken();

  if (!tokenData) {
    return { isValid: false };
  }

  const isValid = isTokenValid(tokenData);
  const remainingMinutes = Math.floor((tokenData.expiresAt - Date.now()) / (60 * 1000));

  return {
    isValid,
    expiresAt: new Date(tokenData.expiresAt),
    remainingMinutes: isValid ? remainingMinutes : 0,
  };
}
