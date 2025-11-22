# Okta Token Automation for Playwright

🎭 **Automated Okta authentication with smart token caching for Playwright tests**

## Quick Start

### 1. Install Dependencies

```bash
npm install
npx playwright install
```

### 2. Configure Okta Credentials

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your Okta credentials
# OKTA_DOMAIN=your-domain.okta.com
# OKTA_USERNAME=your-email@example.com
# OKTA_PASSWORD=your-password
```

### 3. Update Code with Your URLs

**Required Changes:**
1. Open `tests/auth/oktaAuth.ts` (line ~38)
   - Replace `YOUR_CLIENT_ID` with your actual Okta OAuth Client ID

2. Open `tests/e2e/example.spec.ts`
   - Replace example URLs with your actual application URLs

### 4. Run Tests

```bash
# First time: Authenticate and cache token
npm run test:setup

# Run all tests (uses cached token)
npm test

# Run with UI mode
npm run test:ui
```

---

## How It Works

### 🔐 Token Caching Flow

```
┌─────────────────────────────────────────────────────┐
│  First Run                                          │
├─────────────────────────────────────────────────────┤
│  1. Setup test runs                                 │
│  2. Authenticates with Okta (browser/API)           │
│  3. Saves token to .auth/okta-token.json            │
│  4. Token valid for 2 hours                         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Subsequent Runs (within 2 hours)                   │
├─────────────────────────────────────────────────────┤
│  1. Loads token from cache                          │
│  2. Validates expiration                            │
│  3. Skips authentication ⚡                         │
│  4. Tests run immediately                           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  After Token Expires                                │
├─────────────────────────────────────────────────────┤
│  1. Detects expired token                           │
│  2. Re-authenticates automatically                  │
│  3. Caches new token                                │
│  4. Continues testing                               │
└─────────────────────────────────────────────────────┘
```

---

## Features

### ✅ Smart Token Management
- **Automatic caching**: Token stored after first authentication
- **Expiration detection**: Knows when token needs refresh
- **Zero-delay reuse**: Instant token retrieval from cache
- **2-hour validity**: Configurable token lifetime

### ✅ Flexible Authentication
- **Browser-based**: Visual authentication flow
- **API-based**: Headless authentication for CI/CD
- **MFA support**: Extensible for multi-factor auth

### ✅ Security First
- **No commits**: Tokens never in version control
- **Environment vars**: Credentials in `.env` file
- **Encryption ready**: Built-in encryption support
- **Best practices**: Comprehensive security docs

---

## Project Structure

```
playwright-learning-app/
├── tests/
│   ├── auth/
│   │   ├── oktaAuth.ts          ← Okta auth helper
│   │   └── setup.spec.ts        ← Auth setup test
│   ├── e2e/
│   │   ├── example.spec.ts      ← Example tests
│   │   └── advanced-auth.spec.ts ← Advanced scenarios
│   └── utils/
│       └── tokenStorage.ts      ← Token caching logic
│
├── .auth/                        ← Token storage (gitignored)
│   ├── okta-token.json          ← Cached token
│   └── user.json                ← Browser state
│
├── docs/
│   ├── OKTA_SETUP.md            ← Full setup guide
│   └── TOKEN_SECURITY.md        ← Security best practices
│
├── .env                          ← Your credentials (DO NOT COMMIT)
├── .env.example                  ← Template
├── playwright.config.ts          ← Playwright config
└── package.json
```

---

## Common Commands

```bash
# Development
npm test                    # Run all tests
npm run test:setup         # Run auth setup only
npm run test:ui            # Interactive UI mode
npm run test:headed        # See browser window
npm run test:debug         # Debug with inspector

# Specific browsers
npm run test:chromium      # Chrome only

# Reports
npm run report             # View test report

# Utilities
rm -rf .auth/              # Clear cached token
```

---

## Example Test

```typescript
import { test, expect } from '@playwright/test';
import { getOktaToken, setAuthorizationHeader } from '../auth/oktaAuth';

test('access protected resource', async ({ page }) => {
  // Get token (uses cache if valid, otherwise authenticates)
  const token = await getOktaToken();

  // Set authorization header
  await setAuthorizationHeader(page, token);

  // Navigate to protected page
  await page.goto('https://your-app.com/protected');

  // Your test assertions
  await expect(page.locator('h1')).toContainText('Dashboard');
});
```

---

## Token Status Display

During test runs, you'll see token information:

```
========================================
OKTA AUTHENTICATION SETUP
========================================

✓ Valid token already exists (87 minutes remaining)
ℹ Skipping authentication

========================================
SETUP COMPLETE
========================================
```

---

## Parallel Test Execution

Tokens work seamlessly with parallel tests:

```typescript
test.describe.parallel('Parallel tests', () => {
  test('test 1', async ({ page }) => {
    const token = await getOktaToken(); // Uses cached token
    // ... test code
  });

  test('test 2', async ({ page }) => {
    const token = await getOktaToken(); // Uses same cached token
    // ... test code
  });
});
```

All tests share the same cached token for efficiency.

---

## CI/CD Integration

### GitHub Actions

```yaml
- name: Run Playwright tests
  env:
    OKTA_USERNAME: ${{ secrets.OKTA_USERNAME }}
    OKTA_PASSWORD: ${{ secrets.OKTA_PASSWORD }}
    OKTA_DOMAIN: ${{ secrets.OKTA_DOMAIN }}
  run: npm test
```

### GitLab CI

```yaml
playwright-tests:
  script:
    - npm test
  variables:
    OKTA_USERNAME: $OKTA_USERNAME
    OKTA_PASSWORD: $OKTA_PASSWORD
```

See `docs/OKTA_SETUP.md` for complete CI/CD examples.

---

## Security Recommendations

### ⚠️ DO NOT:
- ❌ Commit `.env` file
- ❌ Commit `.auth/` directory
- ❌ Log token values
- ❌ Use personal Okta accounts in CI/CD
- ❌ Share tokens between environments

### ✅ DO:
- ✓ Use environment variables
- ✓ Create service accounts for automation
- ✓ Rotate credentials regularly
- ✓ Enable encryption for production
- ✓ Follow `docs/TOKEN_SECURITY.md`

---

## Troubleshooting

### Authentication Fails
1. Check credentials in `.env`
2. Verify Okta domain format (no `https://`)
3. Ensure OAuth client is configured
4. Check network connectivity

### Token Not Reused
1. Check `.auth/okta-token.json` exists
2. Verify token hasn't expired
3. Check file permissions

### Need Fresh Token
```bash
# Clear cache and re-authenticate
rm -rf .auth/
npm run test:setup
```

---

## Customization

### Change Token Validity

Edit `tests/utils/tokenStorage.ts`:

```typescript
const TOKEN_VALIDITY_HOURS = 2; // Change this value
```

### Add Encryption

See `docs/TOKEN_SECURITY.md` for encryption implementation.

### Support MFA

Modify `tests/auth/oktaAuth.ts` to handle MFA flow:

```typescript
// Wait for MFA prompt
await page.waitForSelector('.mfa-challenge');
// Handle MFA (SMS, authenticator app, etc.)
```

---

## Documentation

📚 **Comprehensive Guides:**
- [Full Setup Guide](docs/OKTA_SETUP.md) - Detailed setup instructions
- [Security Best Practices](docs/TOKEN_SECURITY.md) - Token security guide

---

## What You Need to Customize

Before using with your actual Okta setup:

1. **Environment Variables** (`.env`):
   - `OKTA_DOMAIN` - Your Okta domain
   - `OKTA_USERNAME` - Your username/email
   - `OKTA_PASSWORD` - Your password
   - `OKTA_CLIENT_ID` - Your OAuth client ID

2. **Authentication URLs** (`tests/auth/oktaAuth.ts`):
   - Replace `YOUR_CLIENT_ID` with actual client ID
   - Update OAuth authorization URL if needed

3. **Test URLs** (`tests/e2e/example.spec.ts`):
   - Replace example URLs with your application URLs
   - Update API endpoints
   - Adjust selectors and assertions

---

## Benefits

### For Developers
- ⚡ **Fast feedback**: No repeated logins
- 🔄 **Easy debugging**: Token persists across runs
- 🎯 **Focus on testing**: Authentication handled automatically

### For CI/CD
- 🚀 **Faster pipelines**: Authentication once per session
- 💰 **Cost savings**: Reduced execution time
- 🔒 **Secure**: Uses secret management

### For Teams
- 📖 **Well documented**: Clear setup guides
- 🛡️ **Secure by default**: Best practices built-in
- 🔧 **Maintainable**: Clean, modular code

---

## Support

**Need help?**
1. Check [docs/OKTA_SETUP.md](docs/OKTA_SETUP.md)
2. Review [docs/TOKEN_SECURITY.md](docs/TOKEN_SECURITY.md)
3. See [Playwright docs](https://playwright.dev)
4. See [Okta developer docs](https://developer.okta.com)

---

## License

Part of the Playwright Learning App project.

---

**Ready to get started?**

```bash
cp .env.example .env
# Edit .env with your credentials
npm install
npx playwright install
npm run test:setup
npm test
```

Happy Testing! 🎭✨
