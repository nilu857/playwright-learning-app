export interface CodeExample {
  language: string;
  code: string;
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  codeExamples?: CodeExample[];
  keyPoints?: string[];
  exercises?: string[];
  tips?: string[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Section {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  topics: Topic[];
}

export const curriculum: Section[] = [
  {
    id: 'basics',
    title: 'Getting Started',
    level: 'beginner',
    description: 'Learn the fundamentals of Playwright and write your first tests',
    topics: [
      {
        id: 'introduction',
        title: 'Introduction to Playwright',
        description: 'What is Playwright and why use it?',
        lessons: [
          {
            id: 'what-is-playwright',
            title: 'What is Playwright?',
            description: 'Understanding Playwright and its capabilities',
            content: `
Playwright is a modern, open-source automation framework developed by Microsoft. It allows you to automate web browsers for testing and web scraping purposes.

## Why Playwright?

**Cross-Browser Support**: Playwright supports Chromium, Firefox, and WebKit (Safari) with a single API.

**Auto-Wait**: Playwright automatically waits for elements to be ready before performing actions, reducing flaky tests.

**Fast Execution**: Tests run fast due to browser context isolation and parallel execution capabilities.

**Powerful Selectors**: Provides multiple strategies to locate elements including CSS, text content, and accessibility attributes.

**Network Control**: Intercept and modify network requests, mock API responses.

**Multiple Languages**: Supports JavaScript, TypeScript, Python, Java, and .NET.

## Key Features

- **Reliable end-to-end testing** with auto-waiting and web-first assertions
- **Cross-browser testing** on Chromium, Firefox, and WebKit
- **Multiple tab and origin support** for complex scenarios
- **Network interception** for mocking and testing
- **Screenshots and videos** for debugging
- **Trace viewer** for post-mortem debugging
- **Mobile emulation** for responsive testing
            `,
            keyPoints: [
              'Playwright is a modern browser automation framework',
              'Supports multiple browsers with one API',
              'Built with reliability and speed in mind',
              'Powerful debugging and testing tools included'
            ]
          },
          {
            id: 'installation',
            title: 'Installation & Setup',
            description: 'Install Playwright and set up your first project',
            content: `
Setting up Playwright is straightforward. You can install it using npm, yarn, or pnpm.

## Installation Steps

1. **Initialize a new project** (if you haven't already)
2. **Install Playwright**
3. **Install browsers**
4. **Verify installation**

## Prerequisites

- Node.js version 16 or higher
- npm, yarn, or pnpm package manager

## Installation Methods

You can install Playwright in an existing project or create a new one with Playwright pre-configured.
            `,
            codeExamples: [
              {
                language: 'bash',
                code: `# Create a new project with Playwright
npm init playwright@latest

# Or install in existing project
npm install -D @playwright/test

# Install browsers (Chromium, Firefox, WebKit)
npx playwright install`,
                explanation: 'The init command sets up Playwright with example tests and configuration. The install command downloads the browser binaries.'
              },
              {
                language: 'bash',
                code: `# Install specific browsers
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit

# Install with dependencies (for CI)
npx playwright install --with-deps`,
                explanation: 'You can install specific browsers or all dependencies needed for CI environments.'
              }
            ],
            keyPoints: [
              'Use npm init playwright@latest for new projects',
              'Install browsers with npx playwright install',
              'Playwright requires Node.js 16 or higher',
              'Browser binaries are downloaded separately from the npm package'
            ],
            tips: [
              'Run playwright install with --with-deps in CI environments',
              'Keep Playwright updated for the latest features and fixes',
              'Use .gitignore to exclude test-results and node_modules'
            ]
          },
          {
            id: 'project-structure',
            title: 'Project Structure',
            description: 'Understanding the Playwright project structure',
            content: `
A typical Playwright project has a well-organized structure that separates tests, configuration, and utilities.

## Standard Project Structure

\`\`\`
project-root/
├── tests/                 # Test files
│   ├── example.spec.ts   # Test specification
│   └── utils/            # Test utilities
├── playwright.config.ts  # Main configuration
├── package.json          # Dependencies
└── .gitignore           # Git ignore rules
\`\`\`

## Important Files

**playwright.config.ts**: Main configuration file where you define browsers, test settings, and global options.

**tests/** directory: Contains all your test files (typically with .spec.ts or .test.ts extension).

**test-results/**: Auto-generated folder containing test execution results, screenshots, and videos.

**playwright-report/**: HTML report generated after test execution.

## Best Practices

- Keep tests organized by feature or page
- Use page object models for reusable components
- Store test data separately from test logic
- Use fixtures for test setup and teardown
            `,
            keyPoints: [
              'playwright.config.ts is the main configuration file',
              'Test files typically end with .spec.ts or .test.ts',
              'test-results/ and playwright-report/ are auto-generated',
              'Organize tests by feature or page for maintainability'
            ]
          }
        ]
      },
      {
        id: 'first-test',
        title: 'Your First Test',
        description: 'Write and run your first Playwright test',
        lessons: [
          {
            id: 'basic-test',
            title: 'Writing a Basic Test',
            description: 'Create your first test',
            content: `
Let's write a simple test that navigates to a website and verifies the page title.

## Test Structure

A Playwright test consists of:
1. **Import statement** - Import the test runner
2. **Test declaration** - Define your test using test()
3. **Test actions** - Interact with the page
4. **Assertions** - Verify expected behavior

## Understanding the Test

The test function receives two parameters:
- **Name**: A string describing what the test does
- **Callback function**: The actual test code with a 'page' parameter
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring
  await expect(page).toHaveTitle(/Playwright/);
});`,
                explanation: 'This test navigates to playwright.dev and verifies the page title contains "Playwright".'
              },
              {
                language: 'typescript',
                code: `import { test, expect } from '@playwright/test';

test('get started link', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://playwright.dev/');

  // Click the "Get started" link
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expect the URL to contain "intro"
  await expect(page).toHaveURL(/.*intro/);
});`,
                explanation: 'This test clicks a link and verifies navigation to the expected page.'
              }
            ],
            keyPoints: [
              'Use test() to declare a test',
              'Tests are async functions',
              'page is provided as a fixture',
              'Use await for all Playwright operations',
              'Use expect() for assertions'
            ],
            tips: [
              'Give tests descriptive names',
              'One test should verify one behavior',
              'Use async/await for all page operations'
            ]
          },
          {
            id: 'running-tests',
            title: 'Running Tests',
            description: 'Different ways to execute your tests',
            content: `
Playwright provides multiple ways to run tests, from command line to headed mode for debugging.

## Basic Execution

The simplest way is using the npx playwright test command.

## Running Modes

**Headless Mode**: Default mode where tests run in the background without opening a browser window. Fast and ideal for CI/CD.

**Headed Mode**: Opens the browser window so you can see tests execute. Great for development and debugging.

**UI Mode**: Interactive mode with a visual test runner. Best for writing and debugging tests.

**Debug Mode**: Runs tests with Playwright Inspector for step-by-step debugging.
            `,
            codeExamples: [
              {
                language: 'bash',
                code: `# Run all tests (headless)
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run tests in UI mode (interactive)
npx playwright test --ui

# Run a specific test file
npx playwright test tests/example.spec.ts

# Run tests with a specific title
npx playwright test -g "has title"`,
                explanation: 'Different ways to execute Playwright tests'
              },
              {
                language: 'bash',
                code: `# Debug tests
npx playwright test --debug

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests in parallel
npx playwright test --workers=4

# Show test report
npx playwright show-report`,
                explanation: 'Advanced test execution options'
              }
            ],
            keyPoints: [
              'Default mode is headless (no visible browser)',
              'Use --headed to see the browser',
              'Use --ui for interactive test development',
              'Use --debug to step through tests',
              'Tests run in parallel by default'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'core-concepts',
    title: 'Core Concepts',
    level: 'intermediate',
    description: 'Master the essential concepts of Playwright testing',
    topics: [
      {
        id: 'locators',
        title: 'Locators & Selectors',
        description: 'Find and interact with elements on the page',
        lessons: [
          {
            id: 'locator-basics',
            title: 'Understanding Locators',
            description: 'What are locators and how to use them',
            content: `
Locators are the way to find elements on a page. Playwright's locators are strict, meaning they will throw an error if multiple elements match.

## Why Locators?

Traditional selector methods (like querySelector) can be fragile. Playwright's locators are:
- **Auto-waiting**: Wait for elements to be ready
- **Strict**: Ensure only one element matches
- **Resilient**: Retry assertions until they pass

## Locator Methods

Playwright provides multiple built-in locators that follow best practices for testing:

- **getByRole**: Find by ARIA role (most recommended)
- **getByText**: Find by text content
- **getByLabel**: Find form elements by label
- **getByPlaceholder**: Find by placeholder text
- **getByTestId**: Find by test ID attribute

These locators are user-facing, meaning they find elements the way users would interact with them.
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `// Get by role (RECOMMENDED)
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByRole('link', { name: 'Get Started' }).click();
await page.getByRole('heading', { name: 'Welcome' });

// Get by text
await page.getByText('Welcome to Playwright').click();
await page.getByText(/case insensitive/i).click();

// Get by label (for form inputs)
await page.getByLabel('Email').fill('test@example.com');
await page.getByLabel('Password').fill('secret');

// Get by placeholder
await page.getByPlaceholder('Enter your name').fill('John');

// Get by test ID
await page.getByTestId('submit-button').click();`,
                explanation: 'These are the recommended ways to locate elements in Playwright'
              }
            ],
            keyPoints: [
              'Locators auto-wait for elements to be actionable',
              'getByRole is the most recommended locator',
              'Locators are strict by default (expect exactly one match)',
              'Use user-facing locators for more resilient tests'
            ],
            tips: [
              'Prefer getByRole for better accessibility testing',
              'Avoid CSS selectors when possible',
              'Use getByTestId as a last resort',
              'Locators can be chained and filtered'
            ]
          },
          {
            id: 'advanced-locators',
            title: 'Advanced Locator Techniques',
            description: 'Filtering, chaining, and complex selections',
            content: `
Sometimes you need to be more specific in finding elements. Playwright provides powerful methods to filter and chain locators.

## Chaining Locators

You can chain locators to narrow down your search within a specific container.

## Filtering Locators

Filter locators by additional criteria like text content or another locator.

## Multiple Elements

When you need to work with multiple elements, use locator.all() or locator.nth().
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `// Chaining locators
await page
  .getByRole('navigation')
  .getByRole('link', { name: 'Home' })
  .click();

// Filter by text
await page
  .getByRole('listitem')
  .filter({ hasText: 'Product 1' })
  .click();

// Filter by another locator
await page
  .getByRole('listitem')
  .filter({ has: page.getByRole('heading', { name: 'Product 1' }) })
  .click();

// Get nth element
await page.getByRole('button').nth(0).click(); // First button
await page.getByRole('button').nth(2).click(); // Third button

// Get first and last
await page.getByRole('button').first().click();
await page.getByRole('button').last().click();`,
                explanation: 'Advanced techniques for precise element selection'
              },
              {
                language: 'typescript',
                code: `// Working with multiple elements
const rows = page.getByRole('row');
const count = await rows.count();
console.log(\`Found \${count} rows\`);

// Iterate over elements
for (const row of await rows.all()) {
  console.log(await row.textContent());
}

// Complex filtering
await page
  .getByRole('article')
  .filter({
    has: page.getByRole('heading', { level: 2, name: 'Title' }),
    hasText: 'description'
  })
  .getByRole('button', { name: 'Read more' })
  .click();`,
                explanation: 'Working with multiple elements and complex filters'
              }
            ],
            keyPoints: [
              'Chain locators to search within containers',
              'Use filter() to narrow down results',
              'Use nth(), first(), last() for multiple matches',
              'Use count() and all() to work with lists'
            ]
          },
          {
            id: 'css-xpath-selectors',
            title: 'CSS and XPath Selectors',
            description: 'Traditional selector methods',
            content: `
While Playwright recommends user-facing locators, you can still use CSS and XPath selectors when needed.

## When to Use CSS/XPath

- Migrating from other tools
- Very specific element selection
- Dynamic content without good attributes

## Best Practice

Try to use user-facing locators (getByRole, getByText, etc.) first. Use CSS/XPath only when necessary.
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `// CSS selectors
await page.locator('button.submit').click();
await page.locator('#username').fill('john');
await page.locator('[data-test="submit"]').click();
await page.locator('div.container > button:first-child').click();

// XPath selectors
await page.locator('xpath=//button[text()="Submit"]').click();
await page.locator('xpath=//input[@type="email"]').fill('test@test.com');

// Combining locators
await page.locator('css=nav >> text=Home').click();`,
                explanation: 'CSS and XPath selector examples'
              }
            ],
            keyPoints: [
              'CSS and XPath are supported but not recommended',
              'Use locator() method for CSS/XPath',
              'Prefix XPath with "xpath="',
              'Prefer user-facing locators for maintainability'
            ],
            tips: [
              'Only use CSS/XPath when user-facing locators are not possible',
              'Document why you used CSS/XPath in comments',
              'CSS selectors are more performant than XPath'
            ]
          }
        ]
      },
      {
        id: 'actions',
        title: 'Actions & Interactions',
        description: 'Interact with page elements',
        lessons: [
          {
            id: 'basic-actions',
            title: 'Basic Actions',
            description: 'Click, fill, and common interactions',
            content: `
Playwright provides simple and intuitive methods to interact with web pages.

## Auto-Waiting

All actions in Playwright auto-wait for elements to be:
- **Attached** to the DOM
- **Visible** on the page
- **Stable** (not animating)
- **Enabled** (not disabled)
- **Not covered** by other elements

This makes tests more reliable without explicit waits.
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `// Click actions
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByRole('link', { name: 'Home' }).click();

// Double click
await page.getByRole('button').dblclick();

// Right click
await page.getByRole('button').click({ button: 'right' });

// Click with modifiers
await page.getByRole('link').click({ modifiers: ['Control'] });

// Fill text inputs
await page.getByLabel('Email').fill('user@example.com');
await page.getByLabel('Name').fill('John Doe');

// Clear input
await page.getByLabel('Search').clear();

// Type with delay (like real user)
await page.getByLabel('Email').type('slow@typing.com', { delay: 100 });`,
                explanation: 'Common interaction methods in Playwright'
              }
            ],
            keyPoints: [
              'All actions auto-wait for elements to be ready',
              'click() is the most common action',
              'fill() is preferred over type() for inputs',
              'Actions can be modified with options'
            ]
          },
          {
            id: 'form-interactions',
            title: 'Form Interactions',
            description: 'Working with forms, inputs, and selections',
            content: `
Forms are a critical part of web applications. Playwright makes form interaction simple and reliable.

## Input Types

Playwright handles all input types: text, email, password, number, date, etc.

## Checkboxes and Radio Buttons

Use check(), uncheck(), and setChecked() methods.

## Select Dropdowns

Use selectOption() to choose from dropdowns.
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `// Text inputs
await page.getByLabel('Username').fill('johndoe');
await page.getByLabel('Email').fill('john@example.com');
await page.getByLabel('Password').fill('secret123');

// Checkboxes
await page.getByLabel('Accept terms').check();
await page.getByLabel('Newsletter').uncheck();
await page.getByLabel('Remember me').setChecked(true);

// Radio buttons
await page.getByLabel('Male').check();

// Select dropdown (single)
await page.getByLabel('Country').selectOption('usa');
await page.getByLabel('Country').selectOption({ label: 'United States' });

// Select dropdown (multiple)
await page.getByLabel('Colors').selectOption(['red', 'blue', 'green']);`,
                explanation: 'Working with different form elements'
              },
              {
                language: 'typescript',
                code: `// File upload
await page.getByLabel('Upload file').setInputFiles('path/to/file.pdf');

// Multiple files
await page.getByLabel('Upload files').setInputFiles([
  'file1.pdf',
  'file2.pdf'
]);

// Remove files
await page.getByLabel('Upload file').setInputFiles([]);

// Date input
await page.getByLabel('Birth date').fill('2000-01-15');

// Focus and blur
await page.getByLabel('Email').focus();
await page.getByLabel('Email').blur();`,
                explanation: 'Advanced form interactions'
              }
            ],
            keyPoints: [
              'Use fill() for text inputs',
              'Use check() and uncheck() for checkboxes',
              'Use selectOption() for dropdowns',
              'setInputFiles() for file uploads'
            ],
            tips: [
              'Always use labels to find form elements',
              'check() and uncheck() are idempotent',
              'selectOption() accepts value, label, or index'
            ]
          },
          {
            id: 'keyboard-mouse',
            title: 'Keyboard & Mouse Events',
            description: 'Advanced keyboard and mouse interactions',
            content: `
For complex interactions, Playwright provides full control over keyboard and mouse events.

## Keyboard Actions

Press individual keys, combinations, or sequences.

## Mouse Actions

Click at specific coordinates, drag and drop, hover, etc.
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `// Keyboard - single key
await page.keyboard.press('Enter');
await page.keyboard.press('Tab');
await page.keyboard.press('Escape');

// Keyboard - key combinations
await page.keyboard.press('Control+A'); // Select all
await page.keyboard.press('Control+C'); // Copy
await page.keyboard.press('Control+V'); // Paste
await page.keyboard.press('Shift+Tab'); // Reverse tab

// Keyboard - typing
await page.keyboard.type('Hello World');

// Keyboard - hold and release
await page.keyboard.down('Shift');
await page.keyboard.press('A');
await page.keyboard.up('Shift');`,
                explanation: 'Keyboard interaction examples'
              },
              {
                language: 'typescript',
                code: `// Mouse - hover
await page.getByRole('button').hover();

// Mouse - click at coordinates
await page.mouse.click(100, 200);

// Mouse - drag and drop
await page.getByText('Item 1').dragTo(page.getByText('Drop Zone'));

// Mouse - custom drag
await page.mouse.move(100, 100);
await page.mouse.down();
await page.mouse.move(200, 200);
await page.mouse.up();

// Mouse - wheel
await page.mouse.wheel(0, 100); // Scroll down`,
                explanation: 'Mouse interaction examples'
              }
            ],
            keyPoints: [
              'Use keyboard.press() for key presses',
              'Use keyboard.type() for text input',
              'Use hover() to trigger hover effects',
              'dragTo() simplifies drag and drop operations'
            ]
          }
        ]
      },
      {
        id: 'assertions',
        title: 'Assertions & Verification',
        description: 'Verify expected behavior in tests',
        lessons: [
          {
            id: 'web-first-assertions',
            title: 'Web-First Assertions',
            description: 'Auto-retrying assertions for web elements',
            content: `
Playwright includes web-first assertions that automatically retry until the condition is met or timeout occurs. This eliminates flaky tests caused by timing issues.

## Why Web-First Assertions?

Traditional assertions fail immediately if the condition is not met. Web-first assertions:
- **Auto-retry** until timeout (default 5 seconds)
- **Auto-wait** for elements to be ready
- **More reliable** for dynamic content

## Common Assertions

Playwright provides assertions for visibility, content, attributes, state, and more.
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `import { test, expect } from '@playwright/test';

test('web-first assertions', async ({ page }) => {
  await page.goto('https://example.com');

  // Visibility assertions
  await expect(page.getByRole('heading')).toBeVisible();
  await expect(page.getByRole('button')).toBeHidden();

  // Content assertions
  await expect(page.getByRole('heading')).toHaveText('Welcome');
  await expect(page.getByRole('heading')).toContainText('Wel');

  // Attribute assertions
  await expect(page.getByRole('link')).toHaveAttribute('href', '/home');
  await expect(page.getByRole('button')).toHaveClass('btn-primary');

  // State assertions
  await expect(page.getByRole('checkbox')).toBeChecked();
  await expect(page.getByRole('button')).toBeEnabled();
  await expect(page.getByRole('button')).toBeDisabled();
});`,
                explanation: 'Common web-first assertions that auto-retry'
              },
              {
                language: 'typescript',
                code: `// Count assertions
await expect(page.getByRole('listitem')).toHaveCount(5);

// Value assertions
await expect(page.getByLabel('Email')).toHaveValue('test@example.com');

// URL assertions
await expect(page).toHaveURL('https://example.com/home');
await expect(page).toHaveURL(/.*home/);

// Title assertions
await expect(page).toHaveTitle('My Page');
await expect(page).toHaveTitle(/My Page/);

// Screenshot comparison
await expect(page).toHaveScreenshot();

// Negation
await expect(page.getByText('Error')).not.toBeVisible();`,
                explanation: 'Additional web-first assertions'
              }
            ],
            keyPoints: [
              'Web-first assertions auto-retry for up to 5 seconds',
              'Use toBeVisible() for visibility checks',
              'Use toHaveText() for exact text matching',
              'Use toContainText() for partial text matching',
              'Assertions can be negated with .not'
            ],
            tips: [
              'Web-first assertions are preferred over manual waits',
              'Increase timeout for slow operations: expect(element).toBeVisible({ timeout: 10000 })',
              'Use toHaveCount() to verify list lengths'
            ]
          },
          {
            id: 'generic-assertions',
            title: 'Generic Assertions',
            description: 'Standard expect assertions',
            content: `
In addition to web-first assertions, you can use standard expect assertions from the test runner for non-web values.

## When to Use

Use generic assertions for:
- Comparing values
- Checking types
- Testing logic
- Verifying API responses
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `import { test, expect } from '@playwright/test';

test('generic assertions', async ({ page }) => {
  // Equality
  expect(2 + 2).toBe(4);
  expect({ name: 'John' }).toEqual({ name: 'John' });

  // Truthiness
  expect(true).toBeTruthy();
  expect(false).toBeFalsy();
  expect(null).toBeNull();
  expect(undefined).toBeUndefined();

  // Numbers
  expect(10).toBeGreaterThan(5);
  expect(10).toBeGreaterThanOrEqual(10);
  expect(5).toBeLessThan(10);
  expect(0.1 + 0.2).toBeCloseTo(0.3);

  // Strings
  expect('Hello World').toContain('World');
  expect('test@example.com').toMatch(/.*@.*\\.com/);

  // Arrays
  expect([1, 2, 3]).toContain(2);
  expect([1, 2, 3]).toHaveLength(3);
});`,
                explanation: 'Standard Jest-style assertions'
              }
            ],
            keyPoints: [
              'Use generic assertions for values, not web elements',
              'toBe() for primitive values, toEqual() for objects',
              'Many assertions have opposites: toBeGreaterThan vs toBeLessThan',
              'String and array matchers are available'
            ]
          },
          {
            id: 'soft-assertions',
            title: 'Soft Assertions',
            description: 'Continue test execution after assertion failures',
            content: `
Normally, when an assertion fails, the test stops immediately. Soft assertions allow the test to continue and report all failures at the end.

## Use Cases

- Checking multiple properties of an element
- Validating forms with multiple fields
- Comprehensive page state verification

## Warning

Use soft assertions sparingly. They can hide the root cause of failures.
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `import { test, expect } from '@playwright/test';

test('soft assertions', async ({ page }) => {
  await page.goto('https://example.com');

  // These will all be checked even if some fail
  await expect.soft(page.getByRole('heading')).toHaveText('Welcome');
  await expect.soft(page.getByRole('button')).toBeVisible();
  await expect.soft(page.getByRole('link')).toHaveAttribute('href', '/home');

  // Test continues after soft assertion failures
  // All failures are reported at the end
});`,
                explanation: 'Soft assertions continue test execution on failure'
              },
              {
                language: 'typescript',
                code: `test('validate form fields', async ({ page }) => {
  await page.goto('/form');
  await page.getByRole('button', { name: 'Submit' }).click();

  // Check all validation errors
  await expect.soft(page.getByText('Email is required')).toBeVisible();
  await expect.soft(page.getByText('Password is required')).toBeVisible();
  await expect.soft(page.getByText('Name is required')).toBeVisible();

  // All errors are collected and reported together
});`,
                explanation: 'Useful for checking multiple validation messages'
              }
            ],
            keyPoints: [
              'Soft assertions use expect.soft() instead of expect()',
              'Test continues after soft assertion failures',
              'All failures are reported at the end',
              'Use sparingly for comprehensive checks'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Topics',
    level: 'advanced',
    description: 'Master advanced Playwright features and patterns',
    topics: [
      {
        id: 'fixtures',
        title: 'Test Fixtures',
        description: 'Setup and teardown with fixtures',
        lessons: [
          {
            id: 'built-in-fixtures',
            title: 'Built-in Fixtures',
            description: 'Understanding Playwright\'s built-in fixtures',
            content: `
Fixtures are a way to set up test environment. Playwright provides several built-in fixtures that are automatically available in your tests.

## What are Fixtures?

Fixtures are objects that are created for each test. They provide:
- **Isolation**: Each test gets fresh fixtures
- **Reusability**: Same setup code for multiple tests
- **Cleanup**: Automatic teardown after tests

## Built-in Fixtures

**page**: Browser page instance
**context**: Browser context (isolated session)
**browser**: Browser instance
**request**: API request context
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `import { test, expect } from '@playwright/test';

// page fixture - most common
test('using page fixture', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});

// context fixture - for multiple pages
test('using context fixture', async ({ context }) => {
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  await page1.goto('https://example.com');
  await page2.goto('https://playwright.dev');
});

// browser fixture - for multiple contexts
test('using browser fixture', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://example.com');
  await context.close();
});

// request fixture - for API testing
test('using request fixture', async ({ request }) => {
  const response = await request.get('https://api.example.com/users');
  expect(response.ok()).toBeTruthy();
});`,
                explanation: 'Built-in fixtures provided by Playwright'
              }
            ],
            keyPoints: [
              'Fixtures are created fresh for each test',
              'page is the most commonly used fixture',
              'context provides isolation between tests',
              'Fixtures are automatically cleaned up',
              'Multiple fixtures can be used in one test'
            ]
          },
          {
            id: 'custom-fixtures',
            title: 'Custom Fixtures',
            description: 'Create your own reusable fixtures',
            content: `
Custom fixtures allow you to create reusable setup and teardown logic specific to your application.

## Creating Custom Fixtures

Use test.extend() to create custom fixtures. They can:
- Depend on other fixtures
- Perform setup and teardown
- Return any value

## Use Cases

- Login as different user types
- Set up test data
- Configure application state
- Create page object models
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `import { test as base } from '@playwright/test';

// Extend basic test with custom fixtures
type MyFixtures = {
  authenticatedPage: Page;
  adminPage: Page;
};

export const test = base.extend<MyFixtures>({
  // Custom fixture: authenticated user
  authenticatedPage: async ({ page }, use) => {
    // Setup
    await page.goto('/login');
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('/dashboard');

    // Provide fixture to test
    await use(page);

    // Teardown (runs after test)
    await page.getByRole('button', { name: 'Logout' }).click();
  },

  // Another fixture: admin user
  adminPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('admin@example.com');
    await page.getByLabel('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await use(page);
  },
});

// Use custom fixtures in tests
test('user can view dashboard', async ({ authenticatedPage }) => {
  await expect(authenticatedPage.getByRole('heading')).toHaveText('Dashboard');
});`,
                explanation: 'Creating and using custom fixtures'
              },
              {
                language: 'typescript',
                code: `// Fixture that depends on another fixture
export const test = base.extend<MyFixtures>({
  // Create test data
  testData: async ({ request }, use) => {
    // Setup: Create test data via API
    const response = await request.post('/api/test-data', {
      data: { name: 'Test User' }
    });
    const data = await response.json();

    // Provide data to test
    await use(data);

    // Cleanup: Delete test data
    await request.delete(\`/api/test-data/\${data.id}\`);
  },

  // Use the test data in another fixture
  pageWithData: async ({ page, testData }, use) => {
    await page.goto(\`/user/\${testData.id}\`);
    await use(page);
  },
});`,
                explanation: 'Fixtures can depend on other fixtures'
              }
            ],
            keyPoints: [
              'Use test.extend() to create custom fixtures',
              'Fixtures have setup (before use) and teardown (after use)',
              'Fixtures can depend on other fixtures',
              'Call await use() to provide fixture value to test',
              'Teardown code runs even if test fails'
            ],
            tips: [
              'Keep fixtures focused and reusable',
              'Use fixtures for common setup patterns',
              'Document what your fixtures do',
              'Consider fixture scope (test vs worker)'
            ]
          }
        ]
      },
      {
        id: 'api-testing',
        title: 'API Testing',
        description: 'Test REST APIs with Playwright',
        lessons: [
          {
            id: 'api-basics',
            title: 'API Testing Basics',
            description: 'Making HTTP requests and validating responses',
            content: `
Playwright can test APIs directly without opening a browser. This is useful for:
- Testing backend APIs
- Setting up test data
- Validating API responses
- Integration testing

## API Context

Use the request fixture to make HTTP requests. It supports all HTTP methods and automatically handles cookies and authentication.
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `import { test, expect } from '@playwright/test';

test('API GET request', async ({ request }) => {
  const response = await request.get('https://api.example.com/users');

  // Check status
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Parse and validate JSON
  const data = await response.json();
  expect(data).toHaveLength(10);
  expect(data[0]).toHaveProperty('id');
  expect(data[0]).toHaveProperty('name');
});

test('API POST request', async ({ request }) => {
  const response = await request.post('https://api.example.com/users', {
    data: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);

  const user = await response.json();
  expect(user.name).toBe('John Doe');
  expect(user.email).toBe('john@example.com');
});`,
                explanation: 'Basic API testing with GET and POST requests'
              },
              {
                language: 'typescript',
                code: `// PUT request
test('API PUT request', async ({ request }) => {
  const response = await request.put('https://api.example.com/users/1', {
    data: {
      name: 'Jane Doe Updated'
    }
  });

  expect(response.ok()).toBeTruthy();
});

// DELETE request
test('API DELETE request', async ({ request }) => {
  const response = await request.delete('https://api.example.com/users/1');
  expect(response.status()).toBe(204);
});

// Custom headers
test('API with headers', async ({ request }) => {
  const response = await request.get('https://api.example.com/users', {
    headers: {
      'Authorization': 'Bearer token123',
      'Content-Type': 'application/json'
    }
  });

  expect(response.ok()).toBeTruthy();
});`,
                explanation: 'PUT, DELETE, and requests with custom headers'
              }
            ],
            keyPoints: [
              'Use request fixture for API testing',
              'Supports GET, POST, PUT, DELETE, PATCH',
              'Automatically handles JSON serialization',
              'Can add custom headers and authentication',
              'No browser needed for API-only tests'
            ]
          },
          {
            id: 'api-authentication',
            title: 'API Authentication',
            description: 'Handle authentication in API tests',
            content: `
Many APIs require authentication. Playwright makes it easy to handle various authentication methods.

## Authentication Methods

- Bearer tokens
- Basic auth
- API keys
- Session cookies

## Reusing Authentication

Create a fixture that handles authentication once and reuses it across tests.
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `import { test as base } from '@playwright/test';

// Create fixture with authentication
const test = base.extend({
  authenticatedRequest: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: 'https://api.example.com',
      extraHTTPHeaders: {
        'Authorization': 'Bearer my-token-123'
      }
    });

    await use(context);
    await context.dispose();
  }
});

// Use authenticated request in tests
test('get user profile', async ({ authenticatedRequest }) => {
  const response = await authenticatedRequest.get('/profile');
  expect(response.ok()).toBeTruthy();

  const profile = await response.json();
  expect(profile.email).toBeTruthy();
});`,
                explanation: 'Creating an authenticated API request fixture'
              },
              {
                language: 'typescript',
                code: `// Login and get token
test('login and use token', async ({ request }) => {
  // Login to get token
  const loginResponse = await request.post('/api/login', {
    data: {
      email: 'user@example.com',
      password: 'password123'
    }
  });

  const { token } = await loginResponse.json();

  // Use token in subsequent requests
  const profileResponse = await request.get('/api/profile', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  expect(profileResponse.ok()).toBeTruthy();
});

// Basic authentication
test('basic auth', async ({ request }) => {
  const response = await request.get('/api/secure', {
    headers: {
      'Authorization': 'Basic ' + btoa('username:password')
    }
  });

  expect(response.ok()).toBeTruthy();
});`,
                explanation: 'Different authentication patterns'
              }
            ],
            keyPoints: [
              'Set extraHTTPHeaders for token-based auth',
              'Use fixtures to reuse authentication',
              'Store tokens from login responses',
              'Request context maintains cookies automatically'
            ]
          }
        ]
      },
      {
        id: 'configuration',
        title: 'Configuration & Best Practices',
        description: 'Configure Playwright for your project',
        lessons: [
          {
            id: 'playwright-config',
            title: 'Playwright Configuration',
            description: 'Understanding playwright.config.ts',
            content: `
The playwright.config.ts file is the central configuration for your Playwright tests. It controls test execution, browser settings, and reporting.

## Key Configuration Options

**testDir**: Where test files are located
**timeout**: Test timeout in milliseconds
**retries**: Number of retries for failed tests
**workers**: Number of parallel workers
**reporter**: Test reporter(s)
**use**: Global options for all tests
**projects**: Configure multiple browsers/devices
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Test directory
  testDir: './tests',

  // Test timeout
  timeout: 30 * 1000, // 30 seconds

  // Retry failed tests
  retries: process.env.CI ? 2 : 0,

  // Parallel workers
  workers: process.env.CI ? 1 : undefined,

  // Reporter
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results.json' }]
  ],

  // Global test options
  use: {
    // Base URL
    baseURL: 'http://localhost:3000',

    // Browser options
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  // Configure projects for multiple browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});`,
                explanation: 'Comprehensive Playwright configuration'
              }
            ],
            keyPoints: [
              'playwright.config.ts is the main configuration file',
              'Set global options in the use property',
              'Configure multiple browsers with projects',
              'Control retries and parallelization',
              'Different settings for CI and local'
            ]
          },
          {
            id: 'page-object-model',
            title: 'Page Object Model',
            description: 'Organize tests with Page Object Model pattern',
            content: `
Page Object Model (POM) is a design pattern that creates an object repository for web elements. It helps:
- Reduce code duplication
- Improve maintainability
- Make tests more readable
- Centralize locators

## Benefits

- **Reusability**: Methods can be used across multiple tests
- **Maintainability**: Changes to UI require updates in one place
- **Readability**: Tests become more descriptive
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}`,
                explanation: 'Page Object Model for a login page'
              },
              {
                language: 'typescript',
                code: `// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');

  await expect(page).toHaveURL('/dashboard');
});

test('login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('invalid@example.com', 'wrongpassword');

  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Invalid credentials');
});`,
                explanation: 'Using Page Object in tests'
              },
              {
                language: 'typescript',
                code: `// pages/DashboardPage.ts
export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToSettings() {
    await this.page.getByRole('link', { name: 'Settings' }).click();
  }

  async getUserName() {
    return await this.page.getByTestId('user-name').textContent();
  }

  async getNotificationCount() {
    const badge = this.page.getByTestId('notification-badge');
    return parseInt(await badge.textContent() || '0');
  }
}

// Using multiple page objects together
test('navigate from login to settings', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');

  const userName = await dashboardPage.getUserName();
  expect(userName).toBe('John Doe');

  await dashboardPage.navigateToSettings();
  await expect(page).toHaveURL('/settings');
});`,
                explanation: 'Multiple page objects working together'
              }
            ],
            keyPoints: [
              'One class per page or component',
              'Store locators as class properties',
              'Create methods for common actions',
              'Return values when needed for assertions',
              'Pass page object to constructor'
            ],
            tips: [
              'Keep page objects simple and focused',
              'Don\'t put assertions in page objects',
              'Use readonly for properties',
              'Create base page class for common functionality'
            ]
          },
          {
            id: 'parallel-execution',
            title: 'Parallel Execution & Sharding',
            description: 'Speed up tests with parallelization',
            content: `
Playwright runs tests in parallel by default, dramatically reducing execution time.

## Parallelization Levels

**Worker-level**: Multiple test files run in parallel
**Test-level**: Tests within a file can run in parallel
**Sharding**: Split tests across multiple machines

## When to Disable Parallel

- Tests depend on shared state
- Testing resource-limited environments
- Debugging specific issues
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `// playwright.config.ts
export default defineConfig({
  // Number of parallel workers
  workers: 4, // Run 4 test files in parallel

  // In CI, reduce workers
  workers: process.env.CI ? 2 : undefined,

  // Fully parallel (default)
  fullyParallel: true,
});`,
                explanation: 'Configuring parallel execution'
              },
              {
                language: 'typescript',
                code: `// Disable parallelism for specific tests
import { test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test('first test', async ({ page }) => {
  // This runs first
});

test('second test', async ({ page }) => {
  // This runs after first test completes
});`,
                explanation: 'Running tests serially'
              },
              {
                language: 'typescript',
                code: `// Sharding: Split tests across machines
// Machine 1:
npx playwright test --shard=1/3

// Machine 2:
npx playwright test --shard=2/3

// Machine 3:
npx playwright test --shard=3/3

// All tests divided equally across 3 machines`,
                explanation: 'Sharding tests across multiple machines'
              }
            ],
            keyPoints: [
              'Tests run in parallel by default',
              'Each test file gets its own worker',
              'Use workers option to control parallelism',
              'Sharding divides tests across machines',
              'Use serial mode when tests depend on each other'
            ]
          }
        ]
      },
      {
        id: 'debugging',
        title: 'Debugging & Troubleshooting',
        description: 'Debug failing tests effectively',
        lessons: [
          {
            id: 'debugging-tools',
            title: 'Debugging Tools',
            description: 'Tools and techniques for debugging',
            content: `
Playwright provides excellent debugging tools to help you understand test failures.

## Debug Mode

Run tests with --debug to use Playwright Inspector:
- Step through tests line by line
- Inspect page state at each step
- Pick locators interactively
- View action logs

## Other Tools

- **Screenshots**: Capture page state
- **Videos**: Record test execution
- **Traces**: Detailed timeline of test
- **Console logs**: See browser console output
            `,
            codeExamples: [
              {
                language: 'bash',
                code: `# Debug mode - opens Playwright Inspector
npx playwright test --debug

# Debug specific test
npx playwright test example.spec.ts --debug

# Debug from specific line
npx playwright test --debug -g "test name"

# Headed mode (see browser)
npx playwright test --headed

# Slow motion (slow down actions)
npx playwright test --headed --slow-mo=1000`,
                explanation: 'Different debugging modes'
              },
              {
                language: 'typescript',
                code: `import { test } from '@playwright/test';

test('debug with pause', async ({ page }) => {
  await page.goto('https://example.com');

  // Pause test execution - opens inspector
  await page.pause();

  await page.getByRole('button').click();
});

// Enable verbose logging
DEBUG=pw:api npx playwright test

// Save trace for debugging
test.use({
  trace: 'on', // Always save trace
  screenshot: 'on',
  video: 'on'
});`,
                explanation: 'Programmatic debugging'
              }
            ],
            keyPoints: [
              'Use --debug to open Playwright Inspector',
              'Use page.pause() to pause execution',
              'Use --headed to see browser window',
              'Traces provide detailed execution timeline',
              'Screenshots and videos help diagnose failures'
            ]
          },
          {
            id: 'trace-viewer',
            title: 'Trace Viewer',
            description: 'Analyze test traces for debugging',
            content: `
Trace Viewer is a powerful tool for post-mortem debugging. It shows:
- Complete timeline of test execution
- Screenshots at each action
- Network requests
- Console logs
- DOM snapshots

## When to Use

- Debugging failed tests in CI
- Understanding test behavior
- Investigating flaky tests
- Performance analysis
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `// playwright.config.ts
export default defineConfig({
  use: {
    // Capture trace on first retry
    trace: 'on-first-retry',

    // Or always capture
    trace: 'on',

    // Or only on failure
    trace: 'retain-on-failure',
  },
});`,
                explanation: 'Configure trace collection'
              },
              {
                language: 'bash',
                code: `# Run tests (traces saved to test-results/)
npx playwright test

# Open trace viewer
npx playwright show-trace test-results/example-test/trace.zip

# View last trace
npx playwright show-trace

# Trace viewer shows:
# - Action timeline
# - Screenshots
# - Network activity
# - Console logs
# - DOM snapshots`,
                explanation: 'Viewing traces'
              }
            ],
            keyPoints: [
              'Traces provide complete test execution history',
              'Include screenshots, network, and console logs',
              'Use trace viewer to debug failed tests',
              'Configure when to capture traces',
              'Traces are saved as ZIP files'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'typescript',
    title: 'TypeScript for Playwright',
    level: 'intermediate',
    description: 'Master TypeScript concepts essential for Playwright testing',
    topics: [
      {
        id: 'typescript-basics',
        title: 'TypeScript Fundamentals',
        description: 'Essential TypeScript concepts',
        lessons: [
          {
            id: 'types-and-interfaces',
            title: 'Types and Interfaces',
            description: 'Understanding TypeScript types',
            content: `
TypeScript adds static typing to JavaScript, catching errors at compile time rather than runtime.

## Basic Types

TypeScript supports all JavaScript types plus additional ones:
- string, number, boolean
- array, tuple
- enum
- any, unknown, never
- void

## Interfaces

Interfaces define the shape of objects, ensuring type safety.

## Why Types Matter for Playwright

- Autocomplete for Playwright API
- Catch errors before running tests
- Better IDE support
- Self-documenting code
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `// Basic types
let testName: string = "Login test";
let timeout: number = 30000;
let isHeadless: boolean = true;

// Arrays
let browsers: string[] = ['chromium', 'firefox', 'webkit'];
let testResults: Array<boolean> = [true, true, false];

// Tuples (fixed-length arrays)
let browserConfig: [string, number] = ['chromium', 1280];

// Enums
enum TestStatus {
  Passed = 'passed',
  Failed = 'failed',
  Skipped = 'skipped'
}

let status: TestStatus = TestStatus.Passed;`,
                explanation: 'Basic TypeScript types'
              },
              {
                language: 'typescript',
                code: `// Interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role?: string; // Optional property
}

interface LoginCredentials {
  username: string;
  password: string;
}

// Using interfaces
const testUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
};

const credentials: LoginCredentials = {
  username: 'john@example.com',
  password: 'secret123'
};

// Interface for test data
interface TestData {
  input: string;
  expected: string;
}

const testCases: TestData[] = [
  { input: 'test', expected: 'TEST' },
  { input: 'hello', expected: 'HELLO' }
];`,
                explanation: 'Interfaces for structured data'
              }
            ],
            keyPoints: [
              'TypeScript provides static type checking',
              'Interfaces define object shapes',
              'Optional properties use ? modifier',
              'Types help catch errors early',
              'IDE provides better autocomplete with types'
            ]
          },
          {
            id: 'async-await',
            title: 'Async/Await & Promises',
            description: 'Asynchronous programming in TypeScript',
            content: `
Playwright is heavily asynchronous. Understanding async/await is crucial.

## Promises

A Promise represents a value that may not be available yet. It can be:
- **Pending**: Initial state
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

## Async/Await

Async/await is syntactic sugar over Promises, making async code look synchronous.

## Rules

- Use async keyword to define async function
- Use await keyword to wait for Promises
- await can only be used inside async functions
- All Playwright operations return Promises
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `// Promise basics
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Async function
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  const user = await response.json();
  return user;
}

// Using async/await in Playwright
import { test } from '@playwright/test';

test('example test', async ({ page }) => {
  // All these operations return Promises
  // await waits for them to complete
  await page.goto('https://example.com');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByRole('button').click();

  // Wait for navigation
  await page.waitForURL('/dashboard');
});`,
                explanation: 'Async/await in Playwright tests'
              },
              {
                language: 'typescript',
                code: `// Parallel async operations
test('parallel operations', async ({ page }) => {
  await page.goto('https://example.com');

  // Run operations in parallel with Promise.all
  const [title, url, screenshot] = await Promise.all([
    page.title(),
    page.url(),
    page.screenshot()
  ]);

  console.log(title, url);
});

// Sequential vs parallel
test('performance comparison', async ({ page }) => {
  // Sequential (slower) - waits for each one
  const text1 = await page.locator('#id1').textContent();
  const text2 = await page.locator('#id2').textContent();
  const text3 = await page.locator('#id3').textContent();

  // Parallel (faster) - all run at once
  const [t1, t2, t3] = await Promise.all([
    page.locator('#id1').textContent(),
    page.locator('#id2').textContent(),
    page.locator('#id3').textContent()
  ]);
});`,
                explanation: 'Parallel async operations for performance'
              },
              {
                language: 'typescript',
                code: `// Error handling with async/await
test('error handling', async ({ page }) => {
  try {
    await page.goto('https://example.com');
    await page.getByRole('button', { name: 'Submit' }).click();
  } catch (error) {
    console.error('Test failed:', error);
    // Handle error
  }
});

// Async helper functions
async function loginUser(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('/dashboard');
}

// Use in test
test('login test', async ({ page }) => {
  await page.goto('/login');
  await loginUser(page, 'user@example.com', 'password123');
});`,
                explanation: 'Error handling and helper functions'
              }
            ],
            keyPoints: [
              'All Playwright operations are async',
              'Always use await with Playwright methods',
              'async functions return Promises',
              'Use Promise.all() for parallel operations',
              'Error handling uses try/catch with async/await'
            ],
            tips: [
              'Never forget await - it will cause timing issues',
              'Use Promise.all() when operations are independent',
              'Create async helper functions for reusability',
              'TypeScript will warn about missing await'
            ]
          },
          {
            id: 'generics',
            title: 'Generics',
            description: 'Reusable components with generics',
            content: `
Generics allow you to write flexible, reusable code that works with multiple types.

## Why Generics?

Instead of writing the same code for different types, generics let you write it once and make it type-safe.

## Playwright Uses Generics

Many Playwright APIs use generics, especially for:
- Custom fixtures
- Page object models
- API response types
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `// Generic function
function getFirst<T>(array: T[]): T | undefined {
  return array[0];
}

// Usage with different types
const firstNumber = getFirst<number>([1, 2, 3]); // number
const firstName = getFirst<string>(['a', 'b']); // string

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

// Type-safe API response
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: 'John' },
  status: 200,
  message: 'Success'
};

const usersResponse: ApiResponse<User[]> = {
  data: [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ],
  status: 200,
  message: 'Success'
};`,
                explanation: 'Basic generics'
              },
              {
                language: 'typescript',
                code: `// Generics in Playwright custom fixtures
import { test as base } from '@playwright/test';

interface MyFixtures<T> {
  testData: T;
}

const test = base.extend<MyFixtures<User>>({
  testData: async ({}, use) => {
    const data: User = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com'
    };
    await use(data);
  }
});

// Generic page object
class BasePage<T> {
  constructor(
    readonly page: Page,
    readonly data: T
  ) {}
}

class UserPage extends BasePage<User> {
  async displayUserInfo() {
    await this.page.getByText(this.data.name).waitFor();
  }
}`,
                explanation: 'Generics in Playwright'
              },
              {
                language: 'typescript',
                code: `// Generic API helper
async function apiRequest<T>(
  request: APIRequestContext,
  endpoint: string
): Promise<T> {
  const response = await request.get(endpoint);
  return await response.json() as T;
}

// Usage in tests
test('fetch user', async ({ request }) => {
  const user = await apiRequest<User>(request, '/api/users/1');
  expect(user.name).toBeTruthy();

  const users = await apiRequest<User[]>(request, '/api/users');
  expect(users.length).toBeGreaterThan(0);
});

// Generic test data provider
class TestDataProvider<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  getAll(): T[] {
    return this.data;
  }

  getById(id: keyof T): T | undefined {
    return this.data.find(item => item[id]);
  }
}`,
                explanation: 'Advanced generic patterns'
              }
            ],
            keyPoints: [
              'Generics enable type-safe reusable code',
              'Use <T> syntax for generic parameters',
              'Generics are common in Playwright fixtures',
              'API responses benefit from generic typing',
              'Generics maintain type information'
            ]
          }
        ]
      },
      {
        id: 'advanced-typescript',
        title: 'Advanced TypeScript',
        description: 'Advanced concepts for robust tests',
        lessons: [
          {
            id: 'type-guards',
            title: 'Type Guards & Narrowing',
            description: 'Runtime type checking',
            content: `
Type guards allow you to narrow down types at runtime, making your code more type-safe.

## Why Type Guards?

TypeScript needs to know the exact type to provide proper autocomplete and type checking. Type guards help narrow union types to specific types.

## Common Type Guards

- typeof
- instanceof
- Custom type predicates
- Truthiness checking
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `// Type guard with typeof
function processValue(value: string | number) {
  if (typeof value === 'string') {
    // TypeScript knows value is string here
    return value.toUpperCase();
  } else {
    // TypeScript knows value is number here
    return value.toFixed(2);
  }
}

// Custom type guard
interface Dog {
  bark: () => void;
}

interface Cat {
  meow: () => void;
}

function isDog(animal: Dog | Cat): animal is Dog {
  return (animal as Dog).bark !== undefined;
}

function makeSound(animal: Dog | Cat) {
  if (isDog(animal)) {
    animal.bark(); // TypeScript knows it's a Dog
  } else {
    animal.meow(); // TypeScript knows it's a Cat
  }
}`,
                explanation: 'Type guards for runtime type checking'
              },
              {
                language: 'typescript',
                code: `// Using type guards in Playwright
import { test, Locator } from '@playwright/test';

async function getElementText(
  element: Locator | string
): Promise<string> {
  if (typeof element === 'string') {
    // It's a string selector
    return element;
  } else {
    // It's a Locator
    return await element.textContent() ?? '';
  }
}

// Null/undefined checking
test('handle optional elements', async ({ page }) => {
  const errorMessage = await page
    .getByRole('alert')
    .textContent();

  // Type guard for null/undefined
  if (errorMessage) {
    console.log('Error:', errorMessage);
  } else {
    console.log('No error message');
  }
});`,
                explanation: 'Type guards in Playwright tests'
              }
            ],
            keyPoints: [
              'Type guards narrow union types',
              'typeof checks primitive types',
              'instanceof checks class instances',
              'Custom type predicates use "is" keyword',
              'Helps TypeScript understand runtime types'
            ]
          },
          {
            id: 'utility-types',
            title: 'Utility Types',
            description: 'Built-in TypeScript utility types',
            content: `
TypeScript provides utility types to transform existing types.

## Common Utility Types

**Partial<T>**: Makes all properties optional
**Required<T>**: Makes all properties required
**Pick<T, K>**: Pick specific properties
**Omit<T, K>**: Omit specific properties
**Record<K, T>**: Create object type with specific keys

These are useful for test data, configurations, and type transformations.
            `,
            codeExamples: [
              {
                language: 'typescript',
                code: `interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - all properties optional
type PartialUser = Partial<User>;
const updateUser: PartialUser = {
  name: 'John' // Only updating name
};

// Required - all properties required
interface OptionalConfig {
  timeout?: number;
  retries?: number;
}
type RequiredConfig = Required<OptionalConfig>;

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;
const preview: UserPreview = {
  id: 1,
  name: 'John'
};

// Omit - exclude specific properties
type UserWithoutId = Omit<User, 'id'>;
const newUser: UserWithoutId = {
  name: 'John',
  email: 'john@example.com',
  age: 30
};

// Record - create object type
type TestResults = Record<string, boolean>;
const results: TestResults = {
  'login-test': true,
  'signup-test': false,
  'checkout-test': true
};`,
                explanation: 'Utility types for type transformations'
              },
              {
                language: 'typescript',
                code: `// Using utility types in Playwright

// Test data builder with Partial
class UserBuilder {
  private user: Partial<User> = {};

  withName(name: string): this {
    this.user.name = name;
    return this;
  }

  withEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  build(): User {
    return this.user as User;
  }
}

// Usage
const testUser = new UserBuilder()
  .withName('John')
  .withEmail('john@example.com')
  .build();

// Configuration with Pick
type BrowserConfig = Pick<
  PlaywrightTestConfig,
  'timeout' | 'retries' | 'workers'
>;

const config: BrowserConfig = {
  timeout: 30000,
  retries: 2,
  workers: 4
};`,
                explanation: 'Utility types in test code'
              }
            ],
            keyPoints: [
              'Utility types transform existing types',
              'Partial makes properties optional',
              'Pick selects specific properties',
              'Omit excludes specific properties',
              'Record creates dictionary types'
            ]
          }
        ]
      }
    ]
  }
];
