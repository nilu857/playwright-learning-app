# Secure Token Storage - Best Practices

## Table of Contents
1. [Overview](#overview)
2. [Security Considerations](#security-considerations)
3. [Storage Options](#storage-options)
4. [Implementation Recommendations](#implementation-recommendations)
5. [Environment-Specific Strategies](#environment-specific-strategies)
6. [Common Vulnerabilities](#common-vulnerabilities)
7. [Compliance Requirements](#compliance-requirements)

---

## Overview

This document outlines best practices for securely storing Okta authentication tokens in Playwright automation frameworks. Tokens are sensitive credentials that require careful handling to prevent unauthorized access and security breaches.

---

## Security Considerations

### Key Principles

1. **Least Privilege**: Only grant access to tokens when absolutely necessary
2. **Defense in Depth**: Use multiple layers of security
3. **Short-lived Tokens**: Minimize token lifetime (2 hours recommended)
4. **Encryption at Rest**: Always encrypt stored tokens
5. **Secure Transmission**: Use HTTPS/TLS for all token transfers
6. **Audit Logging**: Track token access and usage

---

## Storage Options

### 1. Environment Variables (RECOMMENDED for CI/CD)

**Pros:**
- No files to commit accidentally
- Easy to rotate
- Platform-agnostic
- Supported by all CI/CD platforms

**Cons:**
- Can be exposed in process listings
- Not encrypted by default
- Harder to manage locally

**Implementation:**
```bash
# .env file (never commit this)
OKTA_USERNAME=your-username
OKTA_PASSWORD=your-secure-password
OKTA_DOMAIN=dev-12345678.okta.com
OKTA_CLIENT_ID=your-client-id
```

**Security Tips:**
- Use secret management in CI/CD (GitHub Secrets, GitLab CI/CD Variables)
- Never log environment variables
- Rotate credentials regularly
- Use service accounts, not personal accounts

---

### 2. File System with Encryption (Current Implementation)

**Pros:**
- Fast access
- No external dependencies
- Works offline

**Cons:**
- File can be accessed by other processes
- Requires manual encryption
- Risk of accidental commit

**Current Implementation Location:**
```
.auth/okta-token.json  ← This file is gitignored
```

**Improvements Needed:**
```typescript
// Add encryption using Node.js crypto module
import * as crypto from 'crypto';

const ENCRYPTION_KEY = process.env.TOKEN_ENCRYPTION_KEY || 'your-32-byte-key';
const ALGORITHM = 'aes-256-gcm';

function encrypt(text: string): { encrypted: string; iv: string; tag: string } {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const tag = cipher.getAuthTag();

  return {
    encrypted,
    iv: iv.toString('hex'),
    tag: tag.toString('hex')
  };
}

function decrypt(encrypted: string, iv: string, tag: string): string {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    Buffer.from(iv, 'hex')
  );

  decipher.setAuthTag(Buffer.from(tag, 'hex'));

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
```

---

### 3. Secure Vault Services (BEST for Production)

**Options:**
- **HashiCorp Vault** - Industry standard
- **AWS Secrets Manager** - For AWS environments
- **Azure Key Vault** - For Azure environments
- **Google Secret Manager** - For GCP environments

**Example with HashiCorp Vault:**
```typescript
import * as vault from 'node-vault';

const vaultClient = vault({
  apiVersion: 'v1',
  endpoint: process.env.VAULT_ADDR,
  token: process.env.VAULT_TOKEN,
});

async function storeToken(token: string): Promise<void> {
  await vaultClient.write('secret/data/okta-token', {
    data: {
      token,
      timestamp: Date.now(),
    },
  });
}

async function retrieveToken(): Promise<string> {
  const result = await vaultClient.read('secret/data/okta-token');
  return result.data.data.token;
}
```

---

### 4. Operating System Keychain (BEST for Local Development)

**Options:**
- **macOS Keychain** - Secure and encrypted by default
- **Windows Credential Manager** - Built into Windows
- **Linux Secret Service** - GNOME Keyring, KWallet

**Example using `keytar` library:**
```typescript
import * as keytar from 'keytar';

const SERVICE_NAME = 'playwright-okta-automation';
const ACCOUNT_NAME = 'okta-token';

async function saveTokenToKeychain(token: string): Promise<void> {
  await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, token);
}

async function getTokenFromKeychain(): Promise<string | null> {
  return await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
}

async function deleteTokenFromKeychain(): Promise<void> {
  await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
}
```

---

### 5. In-Memory Storage (For Short-lived Sessions)

**Pros:**
- Most secure - no persistence
- Automatic cleanup on process exit

**Cons:**
- Lost on restart
- Not suitable for long-running tests

**Implementation:**
```typescript
class TokenCache {
  private static token: string | null = null;
  private static expiresAt: number = 0;

  static set(token: string, expiresIn: number): void {
    this.token = token;
    this.expiresAt = Date.now() + expiresIn;
  }

  static get(): string | null {
    if (!this.token || Date.now() >= this.expiresAt) {
      return null;
    }
    return this.token;
  }

  static clear(): void {
    this.token = null;
    this.expiresAt = 0;
  }
}
```

---

## Implementation Recommendations

### For Local Development
1. Use OS keychain (keytar library)
2. Store credentials in `.env` file (gitignored)
3. Enable file system encryption if using file storage

### For CI/CD
1. Use platform secret management (GitHub Secrets, etc.)
2. Consider using short-lived tokens
3. Implement automatic token rotation
4. Use service accounts with limited permissions

### For Production
1. Use cloud-native secret management (AWS Secrets Manager, etc.)
2. Implement token refresh mechanisms
3. Monitor token usage and access
4. Set up alerts for suspicious activity

---

## Environment-Specific Strategies

### GitHub Actions
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run Playwright tests
        env:
          OKTA_USERNAME: ${{ secrets.OKTA_USERNAME }}
          OKTA_PASSWORD: ${{ secrets.OKTA_PASSWORD }}
          OKTA_DOMAIN: ${{ secrets.OKTA_DOMAIN }}
        run: npx playwright test
```

### GitLab CI/CD
```yaml
test:
  script:
    - npx playwright test
  variables:
    OKTA_USERNAME: $OKTA_USERNAME
    OKTA_PASSWORD: $OKTA_PASSWORD
    OKTA_DOMAIN: $OKTA_DOMAIN
```

### Jenkins
```groovy
withCredentials([
  usernamePassword(credentialsId: 'okta-creds',
                   usernameVariable: 'OKTA_USERNAME',
                   passwordVariable: 'OKTA_PASSWORD')
]) {
  sh 'npx playwright test'
}
```

---

## Common Vulnerabilities

### ❌ What NOT to Do

1. **Never commit tokens to Git**
   ```bash
   # Add to .gitignore
   .env
   .auth/
   *token*.json
   ```

2. **Never log tokens**
   ```typescript
   // BAD
   console.log('Token:', token);

   // GOOD
   console.log('Token obtained successfully');
   ```

3. **Never hardcode credentials**
   ```typescript
   // BAD
   const username = 'user@example.com';
   const password = 'MyPassword123';

   // GOOD
   const username = process.env.OKTA_USERNAME;
   const password = process.env.OKTA_PASSWORD;
   ```

4. **Never share tokens between environments**
   - Use separate tokens for dev/staging/prod
   - Each environment should have its own credentials

5. **Never use long-lived tokens**
   - Maximum 2-4 hours
   - Implement automatic refresh

---

## Compliance Requirements

### GDPR (General Data Protection Regulation)
- Encrypt all tokens at rest and in transit
- Implement right to erasure (token deletion)
- Log token access for audit purposes
- Use pseudonymization where possible

### SOC 2
- Implement access controls
- Regular security audits
- Incident response procedures
- Continuous monitoring

### PCI DSS (if handling payment data)
- Strong encryption (AES-256)
- Secure key management
- Regular penetration testing
- Network segmentation

---

## Recommended Security Checklist

- [ ] Tokens are never committed to version control
- [ ] `.gitignore` includes all token storage locations
- [ ] Tokens are encrypted at rest
- [ ] Environment variables are used for credentials
- [ ] CI/CD uses secret management features
- [ ] Token lifetime is limited (≤ 2 hours)
- [ ] Automatic token refresh is implemented
- [ ] Tokens are cleared after test completion
- [ ] Access logging is enabled
- [ ] Regular security audits are scheduled
- [ ] Incident response plan is documented
- [ ] Team members are trained on security practices

---

## Additional Resources

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Okta Security Best Practices](https://developer.okta.com/docs/guides/security-best-practices/)
- [Playwright Security Considerations](https://playwright.dev/docs/security)
- [NIST Cryptographic Standards](https://csrc.nist.gov/publications/fips)

---

## Questions or Concerns?

If you discover a security vulnerability or have questions about token storage:
1. Do NOT post in public channels
2. Contact your security team immediately
3. Follow your organization's security incident response procedures
