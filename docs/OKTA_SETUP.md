# Okta Token Authentication Setup for Playwright

This guide will help you set up and use Okta authentication with token caching in your Playwright test automation framework.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Token Management](#token-management)
- [Troubleshooting](#troubleshooting)
- [CI/CD Integration](#cicd-integration)

---

## Overview

This implementation provides:
- **Okta authentication** with automatic token management
- **Token caching** to avoid repeated logins (2-hour validity)
- **Automatic token expiration detection**
- **Token reuse across multiple test runs**
- **Secure token storage** with encryption support

---

## Features

✅ **Smart Token Caching**
- Tokens are cached for 2 hours
- Automatically reuses valid tokens
- Only authenticates when token expires or is missing

✅ **Fast Test Execution**
- Authentication happens once per session
- Subsequent tests use cached token instantly
- No login delays for each test

✅ **Security Best Practices**
- Tokens never committed to Git
- Environment variable configuration
- Encryption support for stored tokens
- Comprehensive security documentation

✅ **Flexible Authentication**
- Browser-based authentication
- API-based authentication (headless)
- Support for MFA (manual adaptation needed)

---

## Prerequisites

1. **Node.js** (v16 or higher)
2. **Okta account** with OAuth configured
3. **Okta credentials** (username, password, domain)
4. **Basic understanding** of Playwright and TypeScript

---

## Installation

### 1. Install Dependencies

```bash
npm install
```

This installs:
- `@playwright/test` - Playwright testing framework
- `dotenv` - Environment variable management

### 2. Install Playwright Browsers

```bash
npx playwright install
```

---

## Configuration

### 1. Create Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

### 2. Configure Okta Credentials

Edit `.env` with your Okta credentials:

```env
# Your Okta domain (without https://)
OKTA_DOMAIN=dev-12345678.okta.com

# Your Okta username
OKTA_USERNAME=your-email@example.com

# Your Okta password
OKTA_PASSWORD=your-secure-password

# Optional: OAuth Client ID
OKTA_CLIENT_ID=your-client-id
```

⚠️ **IMPORTANT**: Never commit the `.env` file to version control!

### 3. Update Authentication URLs (Important!)

Edit `tests/auth/oktaAuth.ts` and replace placeholder URLs:

```typescript
// Line ~38 - Update with your actual Okta OAuth URL
await page.goto(`https://${credentials.oktaDomain}/oauth2/default/v1/authorize?client_id=YOUR_CLIENT_ID&response_type=token&redirect_uri=http://localhost:3000&scope=openid profile email`);

// Update YOUR_CLIENT_ID with your actual client ID
```

### 4. Update Test URLs

Edit `tests/e2e/example.spec.ts` and replace example URLs with your actual application URLs:

```typescript
// Replace these with your actual protected URLs
await page.goto('https://your-app.example.com/protected');
await request.get('https://your-api.example.com/api/user');
```

---

## Usage

### Project Structure

```
playwright-learning-app/
├── tests/
│   ├── auth/
│   │   ├── oktaAuth.ts          # Okta authentication helper
│   │   └── setup.spec.ts        # Authentication setup test
│   ├── e2e/
│   │   ├── example.spec.ts      # Example tests using token
│   │   └── advanced-auth.spec.ts # Advanced auth scenarios
│   └── utils/
│       └── tokenStorage.ts      # Token storage utilities
├── .auth/
│   ├── okta-token.json          # Cached token (auto-generated)
│   └── user.json                # Browser auth state
├── .env                         # Your credentials (DO NOT COMMIT)
├── .env.example                 # Example env file
├── playwright.config.ts         # Playwright configuration
└── docs/
    ├── OKTA_SETUP.md            # This file
    └── TOKEN_SECURITY.md        # Security best practices
```

### How It Works

1. **First Run**:
   - Setup test authenticates with Okta
   - Token is saved to `.auth/okta-token.json`
   - Browser state saved to `.auth/user.json`

2. **Subsequent Runs** (within 2 hours):
   - Token is loaded from cache
   - Authentication is skipped
   - Tests run immediately

3. **After Token Expires**:
   - Expired token is detected
   - New authentication is performed
   - Fresh token is cached

---

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Setup Only

```bash
npm run test:setup
```

This authenticates and caches the token without running other tests.

### Run Tests with UI

```bash
npm run test:ui
```

Interactive mode to see tests running.

### Run in Headed Mode

```bash
npm run test:headed
```

See the browser window during test execution.

### Run Specific Browser

```bash
npm run test:chromium
```

### Debug Mode

```bash
npm run test:debug
```

Step through tests with Playwright Inspector.

### View Test Report

```bash
npm run report
```

---

## Token Management

### Check Token Status

The token information is displayed before each test:

```
ℹ Token status: ✓ Valid
ℹ Remaining time: 87 minutes
```

### Manually Clear Token

If you need to force re-authentication:

```bash
rm -rf .auth/
```

Or create a helper script:

```typescript
// tests/utils/clearToken.ts
import { clearToken } from './tokenStorage';
clearToken();
```

### Token Validity

- **Default validity**: 2 hours
- **Configurable** in `tests/utils/tokenStorage.ts`
- **Automatic detection** of expiration

---

## Troubleshooting

### Problem: Authentication Fails

**Solution:**
1. Verify credentials in `.env` file
2. Check Okta domain is correct (without `https://`)
3. Ensure OAuth client is configured in Okta
4. Check network connectivity

### Problem: Token Not Cached

**Solution:**
1. Ensure `.auth/` directory exists and is writable
2. Check file permissions
3. Verify no errors during authentication

### Problem: Tests Fail with "No valid token"

**Solution:**
1. Run setup test first: `npm run test:setup`
2. Check token hasn't expired
3. Clear token cache and re-authenticate

### Problem: MFA Not Working

**Solution:**
Our current implementation doesn't handle MFA automatically. You need to:
1. Add manual MFA handling in `tests/auth/oktaAuth.ts`
2. Or use a service account without MFA
3. Or configure Okta to skip MFA for your app

### Problem: Token Appears in Logs

**Solution:**
1. Never log the actual token value
2. Review `tests/auth/oktaAuth.ts` for any `console.log(token)`
3. Use `console.log('Token obtained successfully')` instead

---

## CI/CD Integration

### GitHub Actions

Add secrets to your repository settings, then create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - uses: actions/setup-node@v3
      with:
        node-version: 18

    - name: Install dependencies
      run: npm ci

    - name: Install Playwright Browsers
      run: npx playwright install --with-deps

    - name: Run Playwright tests
      env:
        OKTA_USERNAME: ${{ secrets.OKTA_USERNAME }}
        OKTA_PASSWORD: ${{ secrets.OKTA_PASSWORD }}
        OKTA_DOMAIN: ${{ secrets.OKTA_DOMAIN }}
        OKTA_CLIENT_ID: ${{ secrets.OKTA_CLIENT_ID }}
      run: npm test

    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

### GitLab CI/CD

Add variables in your GitLab project settings, then create `.gitlab-ci.yml`:

```yaml
playwright-tests:
  image: mcr.microsoft.com/playwright:v1.49.0-jammy
  script:
    - npm ci
    - npx playwright test
  artifacts:
    when: always
    paths:
      - playwright-report/
    expire_in: 30 days
  variables:
    OKTA_USERNAME: $OKTA_USERNAME
    OKTA_PASSWORD: $OKTA_PASSWORD
    OKTA_DOMAIN: $OKTA_DOMAIN
```

### Jenkins

```groovy
pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Test') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'okta-creds',
                        usernameVariable: 'OKTA_USERNAME',
                        passwordVariable: 'OKTA_PASSWORD'
                    ),
                    string(
                        credentialsId: 'okta-domain',
                        variable: 'OKTA_DOMAIN'
                    )
                ]) {
                    sh 'npm test'
                }
            }
        }
    }

    post {
        always {
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}
```

---

## Advanced Features

### Using API Authentication Instead of Browser

For CI/CD environments, you might prefer API-based authentication:

1. Uncomment the API auth setup in `tests/auth/setup.spec.ts`
2. Comment out the browser-based setup
3. Configure your Okta OAuth client for authorization code flow

### Adding Token Refresh

To implement automatic token refresh:

```typescript
// In tests/utils/tokenStorage.ts
export async function refreshToken(refreshToken: string): Promise<string> {
  // Implement OAuth refresh token flow
  // Call Okta's /token endpoint with refresh_token grant
  // Update cached token
}
```

### Encrypting Tokens

For production use, implement encryption:

```typescript
// See docs/TOKEN_SECURITY.md for full implementation
import * as crypto from 'crypto';

function encryptToken(token: string): string {
  // Implement AES-256-GCM encryption
}

function decryptToken(encryptedToken: string): string {
  // Implement decryption
}
```

---

## Best Practices

1. **Never commit credentials**
   - Always use `.env` file
   - Keep `.env` in `.gitignore`

2. **Use service accounts in CI/CD**
   - Don't use personal Okta accounts
   - Create dedicated test accounts

3. **Rotate credentials regularly**
   - Change passwords every 90 days
   - Update CI/CD secrets accordingly

4. **Monitor token usage**
   - Log authentication events
   - Track token expiration

5. **Secure your `.auth/` directory**
   - Ensure proper file permissions
   - Consider encryption for sensitive environments

---

## Security

⚠️ **CRITICAL SECURITY REMINDERS**:

- Never commit `.env` or `.auth/` to version control
- Never log actual token values
- Use HTTPS for all Okta communications
- Implement encryption for production use
- Follow the guidelines in `docs/TOKEN_SECURITY.md`

---

## Support

For issues or questions:
1. Check [Troubleshooting](#troubleshooting) section
2. Review [Security Documentation](./TOKEN_SECURITY.md)
3. Check [Playwright Documentation](https://playwright.dev)
4. Review [Okta Developer Docs](https://developer.okta.com)

---

## License

This project is part of the Playwright Learning App.

---

## Next Steps

1. ✅ Configure your Okta credentials
2. ✅ Update authentication URLs in code
3. ✅ Run the setup test
4. ✅ Create your own test cases
5. ✅ Review security documentation
6. ✅ Set up CI/CD integration

Happy Testing! 🎭
