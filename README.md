## OpenCDx UI Library

### Overview
- React component library for OpenCDx apps
- Tech stack: React 18, NextUI/HeroUI, Framer Motion, Tailwind v3, ESM
- Purpose: shared UI primitives/design system for consistent UX across apps
- Usage examples are available in Storybook

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
- `npm run build`: type-check/compile
- `npm run lint`: run ESLint
- `npm run storybook`: dev Storybook
- `npm run build-storybook`: static Storybook
- `npm run cy:report:component`: headless Cypress component tests with report
- `npm run coverage:report`: human‑readable coverage report  

### Cypress
- Component runner (GUI):
  - `npm run cy:open`
- Component tests (headless + mochawesome report):
  - `npm run cy:report:component`
- E2E tests (if added) with report:
  - `npm run cy:report`
- Coverage:
  - Instrumentation via Babel (Istanbul) and `@cypress/code-coverage` is enabled.
  - After a run, raw coverage is written to `.nyc_output/` and reports can be generated with:
    - `npx nyc report --reporter=html` (outputs to `coverage/`)
  - Mochawesome artifacts are under `cypress/results/`.
  - If coverage is empty, ensure tests import `@cypress/code-coverage/support` (already configured) and rebuild after dependency changes.

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

### Troubleshooting
- “Cannot use import statement outside a module”: run under a bundler or mark your app as ESM.
- Tailwind error about PostCSS plugin: install `@tailwindcss/postcss` and update `postcss.config.js`.
- Framer Motion/NextUI peer warnings: align versions as noted above.
- Next-only modules in Storybook (e.g., next/image): this Storybook uses a mock alias; ensure `.storybook/main.ts` includes the alias and `preview.tsx` provides any required providers.
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
