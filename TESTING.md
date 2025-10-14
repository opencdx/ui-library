# Testing Guide for UI Library

> **📖 For general development workflows, see [DEV_GUIDE.md](./DEV_GUIDE.md)**  
> This guide focuses specifically on testing strategies and best practices.

## Overview

This UI library uses **Playwright Component Testing** for browser behavior and **Vitest** for fast unit tests and coverage. Cypress is not used.

## Test Statistics

- **70 component tests** across 18 components
- **100% pass rate** ✅
- **~6 seconds** execution time
- **Multi-browser**: Chromium, Firefox, WebKit

## Quick Reference

### Using the Interactive Menu (Recommended for New Developers)

```bash
./dev.sh
```

The interactive menu provides easy access to all testing commands:
- **Option 4**: Run all tests (component + E2E)
- **Option 5**: Run component tests only (70 tests, ~6s)
- **Option 6**: Interactive UI mode with debugging
- **Option 7**: Headed mode (see browser)
- **Option 8**: Debug mode (Playwright Inspector)
- **Option 9**: Generate coverage report
- **Option 23**: Full CI workflow (lint + test + build)
- **Option 24**: Pre-release checklist (all validation checks)

### Running Tests Directly (Playwright CT)

```bash
# Run all component tests (recommended)
npm run test:component

# Run all tests (components + E2E)
npm run test

# Interactive UI mode with time-travel debugging
npm run test:ui

# Run tests in headed mode (visible browser)
npm run test:headed

# Debug mode with Playwright Inspector
npm run test:debug

# Generate Playwright HTML report
npm run coverage
```

## Component Tests (Playwright CT)

### Test Structure

Component tests are located in `tests/component/` with one file per component:

```
tests/component/
├── Button.spec.tsx
├── Input.spec.tsx
├── Card.spec.tsx
├── Modal.spec.tsx
├── Tooltip.spec.tsx
└── ... (18 total)
```

### Writing Component Tests

**Basic example:**
```tsx
import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from '../../src/index';

test.describe('Button', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Button>Click me</Button>);
    await expect(component).toBeVisible();
    await expect(component).toContainText('Click me');
  });

  test('should handle click events', async ({ mount }) => {
    let clicked = false;
    const component = await mount(
      <Button onClick={() => (clicked = true)}>Click</Button>
    );
    await component.click();
    expect(clicked).toBe(true);
  });
});
```

**Testing with props:**
```tsx
test('should render with color variant', async ({ mount }) => {
  const component = await mount(<Button color="primary">Primary</Button>);
  const classes = await component.getAttribute('class');
  expect(classes).toContain('bg-primary');
});
```

**Testing interactions:**
```tsx
test('should be checkable', async ({ mount }) => {
  const component = await mount(<Checkbox>Accept</Checkbox>);
  const checkbox = component.locator('input[type="checkbox"]');
  await checkbox.check({ force: true }); // Use force for overlay elements
  await expect(checkbox).toBeChecked();
});
```

**Testing portals (Modal, Tooltip, Dropdown):**
```tsx
test('should render modal content', async ({ mount, page }) => {
  await mount(
    <Modal isOpen>
      <ModalContent>
        <ModalHeader>Title</ModalHeader>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  );
  // Modal renders in portal, check page instead of component
  await expect(page.locator('text=Title')).toBeVisible();
});
```

## E2E Tests

E2E tests verify complete user workflows in Storybook:

```bash
# Run E2E tests (auto-starts Storybook)
npm run test

# Run only E2E tests
npx playwright test --grep @e2e
```

## Configuration (Playwright)

### Component Test Config: `playwright-ct.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/experimental-ct-react';

export default defineConfig({
  testDir: './tests/component',
  snapshotDir: './__snapshots__',
  timeout: 30000,
  use: {
    trace: 'on-first-retry',
    ctPort: 3100,
    ctTemplate: './playwright/index.html',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chromium'] },
    },
  ],
});
```

### Main Test Config: `playwright.config.ts`

Handles E2E tests and multi-browser configuration.

## Debugging

### 1. UI Mode (Recommended)

```bash
npm run test:ui
```

- Visual test runner with time-travel debugging
- See test execution step-by-step
- Inspect DOM at any point
- Re-run tests instantly

### 2. Headed Mode

```bash
npm run test:headed
```

- Tests run in visible browser
- See real-time interaction
- Good for visual debugging

### 3. Debug Mode

```bash
npm run test:debug
```

- Opens Playwright Inspector
- Step through test line-by-line
- Inspect locators
- Evaluate expressions

### 4. VS Code Extension

Install the [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension:

- Run/debug tests from editor
- Set breakpoints
- See live results
- Generate tests with codegen

## Test Reports (Playwright)

### HTML Report

```bash
# Generate report
npm run coverage

# View report
open playwright-report/index.html
```

Reports include:
- Test results with timings
- Screenshots on failure
- Traces for debugging
- Coverage statistics

### CI/CD Reports

In CI pipelines:
- Tests run on all browsers
- Artifacts uploaded automatically
- Slack/email notifications on failures
- Test results integrated with PR checks

## Best Practices (Playwright CT)

### 1. Use Proper Selectors

✅ **Good:**
```tsx
await component.getByRole('button', { name: 'Submit' })
await component.getByText('Welcome')
await component.locator('input[type="email"]')
```

❌ **Bad:**
```tsx
await component.locator('.css-xyz123') // CSS classes may change
await component.locator('body > div:nth-child(3)') // Too brittle
```

### 2. Handle Overlays

For components with visual overlays (Checkbox, Radio, Switch), use `force: true`:

```tsx
await checkbox.check({ force: true });
```

### 3. Test User Behavior

✅ **Good:**
```tsx
test('user can submit form', async ({ mount }) => {
  const component = await mount(<LoginForm />);
  await component.locator('input[name="email"]').fill('user@example.com');
  await component.locator('input[name="password"]').fill('password');
  await component.getByRole('button', { name: 'Login' }).click();
  await expect(component).toContainText('Welcome');
});
```

❌ **Bad:**
```tsx
test('form has inputs', async ({ mount }) => {
  const component = await mount(<LoginForm />);
  expect(await component.locator('input').count()).toBe(2);
});
```

### 4. Keep Tests Independent

Each test should be self-contained:

```tsx
test.describe('Button', () => {
  // ✅ Each test is independent
  test('renders with text', async ({ mount }) => {
    const component = await mount(<Button>Text</Button>);
    await expect(component).toContainText('Text');
  });

  test('handles click', async ({ mount }) => {
    let clicked = false;
    const component = await mount(<Button onClick={() => clicked = true}>Click</Button>);
    await component.click();
    expect(clicked).toBe(true);
  });
});
```

### 5. Use Descriptive Test Names

✅ **Good:**
```tsx
test('should disable submit button when form is invalid')
test('should show error message on failed login')
test('should close modal on escape key press')
```

❌ **Bad:**
```tsx
test('test1')
test('button works')
test('check validation')
```

## Common Issues & Solutions

### Issue: Element Not Found

**Problem:** `Error: element(s) not found`

**Solution:**
```tsx
// Wait for element to appear
await expect(component.locator('button')).toBeVisible();

// Or use timeout
await component.locator('button').waitFor({ timeout: 10000 });
```

### Issue: Element Intercepted

**Problem:** `Element is covered by another element`

**Solution:**
```tsx
// Use force option
await checkbox.check({ force: true });

// Or click on wrapper
await component.getByText('Accept terms').click();
```

### Issue: Portal Elements Not Found

**Problem:** Modal/Tooltip/Dropdown content not found

**Solution:**
```tsx
// Use page instead of component for portals
test('modal shows content', async ({ mount, page }) => {
  await mount(<Modal isOpen><ModalBody>Content</ModalBody></Modal>);
  await expect(page.locator('text=Content')).toBeVisible();
});
```

### Issue: Flaky Tests

**Problem:** Tests pass/fail randomly

**Solutions:**
1. Add proper wait conditions:
   ```tsx
   await expect(element).toBeVisible();
   await expect(element).toHaveText('Expected');
   ```

2. Avoid hard timeouts:
   ```tsx
   // ❌ Bad
   await page.waitForTimeout(1000);
   
   // ✅ Good
   await expect(element).toBeVisible();
   ```

3. Use proper selectors (avoid nth-child, CSS classes)

## Coverage Goals

- Unit coverage target (Vitest): 80%+ lines; improve branches where meaningful
- Component coverage: All exported components tested in CT
- Interaction coverage: Click, hover, keyboard events (CT)
- State coverage: Default, active, disabled, error states (unit + CT)

## Vitest Unit Tests

### Overview
- Framework: Vitest + @testing-library/react + happy-dom
- Environment: jsdom alternative (happy-dom) for Node 21 compatibility
- Coverage: V8 provider, HTML report to `coverage/index.html`

### Commands
```bash
npm run test:unit
npm run coverage:unit
open coverage/index.html
```

### File Layout
```
tests/unit/
  Button.test.tsx
  Input.test.tsx
  ...
vitest.config.ts
vitest.setup.ts
```

### Patterns
- Prefer role-based queries and real interactions (user-event)
- Test prop permutations and branching logic for higher branch coverage
- Keep tests independent and deterministic

## Continuous Integration

Tests run automatically on:
- **Pull Requests**: All tests must pass before merge
- **Main branch**: Full test suite on every commit
- **Nightly**: Extended tests with visual regression
- **Release**: Complete test suite with all browsers

### CI Configuration

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 21
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:component
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: test-results
          path: test-results/
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Component Testing](https://playwright.dev/docs/test-components)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

## Developer Menu

For a **user-friendly interface** to all testing commands, use the interactive menu:

```bash
./dev.sh
```

This provides quick access to:
- All test commands (options 4-9)
- CI workflow simulation (option 23)
- Pre-release validation (option 24)

Perfect for developers who prefer menus over remembering CLI commands!

## Support

For questions or issues with testing:
1. Check this guide
2. Review existing tests in `tests/component/`
3. Use `./dev.sh` for guided workflows
4. Consult Playwright documentation
5. Ask in #testing Slack channel

