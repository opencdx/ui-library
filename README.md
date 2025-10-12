## OpenCDx UI Library

### Overview
- React component library for OpenCDx apps
- Tech stack: React 18, NextUI/HeroUI, Framer Motion, Tailwind v3, ESM
- Purpose: shared UI primitives/design system for consistent UX across apps
- Usage examples are available in Storybook

**Important:** 
- See [COMPONENT_GUIDELINES.md](./COMPONENT_GUIDELINES.md) for composition patterns and compatibility constraints.
- See [VERSION_COMPATIBILITY.md](../.github/node/VERSION_COMPATIBILITY.md) for required dependency versions across OpenCDx apps.

### Requirements
- Node 20+ and npm 10+
- Peer deps provided by consumer:
  - react ^18.3
  - react-dom ^18.3
- Bundler that supports ESM and CSS imports (e.g., Vite or Next.js)
- Known-good toolchains: Vite, Next.js 14/15
- Version alignment: framer-motion ≥ 11.18 and NextUI/HeroUI 2.x

### Install (dev)
```bash
npm install
npm run build
npm run storybook
```
Note: use `npm ci` if you want to keep the exact lockfile state.

### Usage in apps
- Local tarball install (quick link):
```bash
# from ui-library
npm pack --silent        # creates ui-library-<ver>.tgz

# in your app
npm i ../ui-library/ui-library-*.tgz
```

- Workspace linking (monorepo):
  - Add ui-library as a workspace and depend on "ui-library": "workspace:*", then install.

- Example use
```tsx
import { Button } from 'ui-library';

export default function Page() {
  return <Button color="primary">Click me</Button>;
}
```

#### App setup (providers)
Wrap your app once with NextUI provider:
```tsx
import { NextUIProvider } from '@nextui-org/system';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
```

- ESM/CSS note
  - This package is ESM and imports CSS. Use a bundler/runtime (Vite/Next). Node’s plain `node` runner will not load it.

### Tailwind v3 setup
- Requires tailwindcss and autoprefixer in the consumer app:
```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Scripts

**Build & Development:**
- `npm run build` - Type-check and compile library
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run storybook` - Start Storybook dev server
- `npm run build-storybook` - Build static Storybook

**Testing (Playwright):**
- `npm run test` - Run all tests (component + E2E)
- `npm run test:component` - Run component tests only (70 tests, ~10s)
- `npm run test:ui` - Interactive test UI with time-travel debugging
- `npm run test:headed` - Run tests in visible browser
- `npm run test:debug` - Debug tests with Playwright Inspector
- `npm run coverage` - Generate test coverage report  

### Testing with Playwright
We use Playwright for both component and E2E testing, providing fast, reliable tests with excellent debugging capabilities.

#### Quick Start
```bash
# Run all component tests
npm run test:component

# Run tests with UI (interactive mode with time-travel debugging)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Debug a specific test
npm run test:debug
```

#### Component Tests
- **70 tests** covering 18 UI components
- **100% pass rate** ✅ with fast execution (~10-11 seconds)
- Tests located in `tests/component/`
- Each component has its own `.spec.tsx` file

**Example test:**
```tsx
import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from '../../src/index';

test('should render correctly', async ({ mount }) => {
  const component = await mount(<Button>Click me</Button>);
  await expect(component).toBeVisible();
  await expect(component).toContainText('Click me');
});
```

#### E2E Tests
- Test complete user workflows in Storybook
- Auto-starts Storybook server if needed
- Run with `npm run test`

#### Coverage & Reports
```bash
# Generate HTML coverage report
npm run coverage

# View results
open playwright-report/index.html
```

#### Multi-browser Support
Tests run on **Chromium**, **Firefox**, and **WebKit** by default, ensuring cross-browser compatibility.

#### Debugging Tips
1. **UI Mode**: `npm run test:ui` - Best for visual debugging with time-travel
2. **Headed Mode**: `npm run test:headed` - See tests run in real browser
3. **Debug Mode**: `npm run test:debug` - Step through tests with Playwright Inspector
4. **Screenshots**: Automatically captured on test failures in `test-results/`

#### CI/CD Integration
All tests run automatically in CI pipelines. Failed tests generate screenshots and traces for debugging.

### Clean builds
- Inside the ui-library folder (recreate lockfile):
```bash
rm -rf node_modules dist package-lock.json \
&& npm install --no-audit --no-fund \
&& npm run build \
&& npm run build:types
```
- Inside the ui-library folder (keep existing lockfile):
```bash
rm -rf node_modules dist \
&& npm ci --no-audit --no-fund \
&& npm run build \
&& npm run build:types
```

### Dependency resolution: React versions
This library builds and tests against React 18 (devDependencies), and publishes with `peerDependencies` requiring `react >=18` and `react-dom >=18`. Consumers choose their exact React version.

If you later move the library to React 19 for development:
- Ensure all transitive deps (@react-aria/*, @react-stately/*, @nextui-org/*, framer-motion) publish React 19–compatible peer ranges.
- Bump React devDependencies to 19.x, update dependent packages, then regenerate the lockfile using the “recreate lockfile” command above.

### Storybook
- Framework: `@storybook/react-vite`
- Run locally (http://localhost:6006):
  - `npm run storybook`
- Build static docs:
  - `npm run build-storybook` (outputs `storybook-static/`)
- Notes:
  - The config disables React Docgen to avoid parsing `.babelrc` in Storybook context.
  - If the preview fails to load, clear caches and reinstall:
    - `rm -rf node_modules .storybook-cache storybook-static dist && npm install && npm run storybook`
- Composition (consume built docs in another Storybook):
  1) In ui-library:
```bash
npm run build-storybook
npx http-server storybook-static -p 6007
```
  2) In the consuming app’s `.storybook/main.(ts|js)`:
```ts
export default {
  refs: {
    'ui-library': { title: 'UI Library', url: 'http://localhost:6007' },
  },
};
```

### Component Composition Guidelines

#### Using User component in constrained contexts

**Problem:** Some parent components (like NextUI `Navbar`, custom wrappers using `React.Children.map`) cannot accept `User` as a direct child inside `Button` due to how React element validation works.

**Symptoms:**
```
Error: Objects are not valid as a React child (found: object with keys {$$typeof, type, key, props, _owner, _store})
```

**Solutions:**

1. **Use `UserButton` composite component** (Recommended):
```tsx
import { UserButton } from 'ui-library';

<DropdownTrigger>
  <UserButton
    userProps={{ name: "John Doe", description: "Admin" }}
    buttonProps={{ variant: "light", color: "primary" }}
    endContent={<ChevronDownIcon />}
  />
</DropdownTrigger>
```

2. **Render User outside constrained components**:
```tsx
// Good: User is a sibling, not nested in Button
<div className="flex items-center gap-2">
  <User name="John Doe" />
  <Button>Actions</Button>
</div>

// Avoid: User directly inside Button inside Navbar
<Navbar>
  <Button><User name="John" /></Button>  {/* ❌ May fail */}
</Navbar>
```

3. **Use plain text when User display isn't critical**:
```tsx
<Button>John Doe</Button>
```

#### Component compatibility matrix

| Parent Component | Direct `User` child | `UserButton` | Plain text |
|-----------------|---------------------|--------------|------------|
| `Button` (standalone) | ✅ Works | ✅ Works | ✅ Works |
| `Button` in `Navbar` | ❌ Fails | ✅ Works | ✅ Works |
| `Button` in `Dropdown` | ✅ Works | ✅ Works | ✅ Works |
| Custom components using `React.Children.map` | ❌ May fail | ✅ Works | ✅ Works |

### Troubleshooting

#### Common errors

- **"Cannot use import statement outside a module"**: run under a bundler or mark your app as ESM.
- **Tailwind error about PostCSS plugin**: install `@tailwindcss/postcss` and update `postcss.config.js`.
- **Framer Motion/NextUI peer warnings**: align versions as noted above.
- **Next-only modules in Storybook** (e.g., next/image): this Storybook uses a mock alias; ensure `.storybook/main.ts` includes the alias and `preview.tsx` provides any required providers.

#### Button Ripple error: `NaN is an invalid value for the 'top' css style property`

**Cause:** Button's ripple effect can't calculate click position when:
- NextUI theme CSS isn't loaded (missing `position: relative` on button)
- App isn't wrapped with `NextUIProvider`
- Styles not imported in consuming app

**Fix:**
1. Import theme CSS in your app entry:
```tsx
import '@nextui-org/theme/dist/index.css';
```

2. Wrap your app with NextUIProvider:
```tsx
import { NextUIProvider } from '@nextui-org/react';

export default function App() {
  return (
    <NextUIProvider>
      {/* your app */}
    </NextUIProvider>
  );
}
```

3. **Or** disable ripple if you don't need it:
```tsx
<Button disableRipple>Click me</Button>
```

#### Stale dependencies

- Stale lock/ERESOLVE (clean reinstall):
```bash
rm -rf node_modules package-lock.json
npm install
```
- If issues persist:
```bash
npm dedupe
npm cache verify
```
- Avoid `--legacy-peer-deps` unless you fully understand the impact.
