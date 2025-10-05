## OpenCDx UI Library

### Overview
- React component library for OpenCDx apps
- Tech stack: React 18, NextUI/HeroUI, Framer Motion, Tailwind v4, ESM
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
npm ci
npm run build
npm run storybook
```

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

- ESM/CSS note
  - This package is ESM and imports CSS. Use a bundler/runtime (Vite/Next). Node’s plain `node` runner will not load it.

### Tailwind v4 setup
- Requires the Tailwind v4 PostCSS plugin in the consumer app:
```js
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### Scripts
- `npm run build`: type-check/compile
- `npm run lint`: run ESLint
- `npm run storybook`: dev Storybook
- `npm run build-storybook`: static Storybook

### Storybook
- Framework: `@storybook/react-vite`
- Run locally:
  - `npm run storybook`
- Build static docs:
  - `npm run build-storybook`
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
