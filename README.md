## OpenCDx UI Library

### Overview
- React component library for OpenCDx apps
- Tech stack: React 18, NextUI/HeroUI, Framer Motion, Tailwind v3, ESM
- Purpose: shared UI primitives/design system for consistent UX across apps
- Usage examples are available in Storybook

---

## 📚 Documentation Map

**Start here based on what you need:**

| What You Need | Read This |
|---------------|-----------|
| 🚀 **First time here?** | This README (installation & quick start) |
| 💻 **Developing components?** | [DEV_GUIDE.md](./DEV_GUIDE.md) - Complete workflows |
| 🧪 **Writing tests?** | [TESTING.md](./TESTING.md) - Testing guide & best practices |
| 🏗️ **Component architecture?** | [COMPONENT_GUIDELINES.md](./COMPONENT_GUIDELINES.md) - Patterns & constraints |
| 🔄 **Version compatibility?** | [VERSION_COMPATIBILITY.md](../.github/node/VERSION_COMPATIBILITY.md) - Dependency matrix |
| 📝 **Release history?** | [CHANGELOG.md](./CHANGELOG.md) - Version history |

---

## 🚀 Quick Start

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

**🎯 Quick Start - Interactive Development Menu:**
```bash
./dev.sh
```
Opens an interactive menu with 24+ commands organized into 7 categories:
- 📦 Build & Development (build, clean, types)
- 🧪 Testing (Playwright tests, UI mode, coverage)
- 🎨 Storybook (dev server, build)
- 🔍 Code Quality (lint, auto-fix)
- 🔒 Security & Maintenance (audit, outdated)
- 📦 Package Management (install, clean, tarball)
- 🚀 Quick Actions (CI workflow, pre-release checklist)

**Perfect for:**
- New developers discovering available commands
- Running pre-commit checks (`option 23: CI workflow`)
- Pre-release validation (`option 24: Pre-release checklist`)
- Quick access to common tasks without memorizing commands

**Build & Development:**
- `npm run build` - Type-check and compile library
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run storybook` - Start Storybook dev server
- `npm run build-storybook` - Build static Storybook

**Testing:**
- Playwright Component Testing
  - `npm run test` - Run all tests (component + E2E)
  - `npm run test:component` - Component tests only (~6s)
  - `npm run test:ui` - Interactive test UI
  - `npm run test:headed` - Visible browser
  - `npm run test:debug` - Inspector
- Vitest Unit Tests (library-focused)
  - `npm run test:unit` - Run unit tests (Vitest + Testing Library)
  - `npm run coverage:unit` - HTML coverage report (coverage/index.html)

**Security & Maintenance:**
- `npm run audit` - Check production dependencies for vulnerabilities
- `npm run audit:dev` - Check all dependencies (including dev)
- `npm run audit:fix` - Auto-fix vulnerabilities (safe updates)
- `npm run outdated` - List packages with available updates  

### Testing

**Quick start:**
```bash
# Component tests (Playwright CT)
npm run test:component
npm run test:ui

# Unit tests + coverage (Vitest)
npm run test:unit
npm run coverage:unit
```

- Component tests cover UI behavior across browsers.
- Unit tests provide fast, deterministic coverage of `src/**` with detailed HTML reports.

**📖 See [TESTING.md](./TESTING.md) for both CT and unit testing guides.**

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

Explore all components visually:

```bash
npm run storybook  # Opens http://localhost:6006
```

- Framework: `@storybook/react-vite`
- All components have interactive examples
- Build static docs: `npm run build-storybook`

**📖 For advanced Storybook setup, see [DEV_GUIDE.md](./DEV_GUIDE.md)**

### Component Composition

**Common issue:** Using `User` inside `Button` in constrained contexts (Navbar, Dropdown triggers).

**Quick solution:** Use `UserButton` composite component:
```tsx
import { UserButton } from 'ui-library';

<UserButton
  userProps={{ name: "John Doe", description: "Admin" }}
  buttonProps={{ variant: "light" }}
/>
```

**📖 For complete patterns and compatibility matrix, see [COMPONENT_GUIDELINES.md](./COMPONENT_GUIDELINES.md)**

### Troubleshooting

**Common issues:**

- **Import errors**: Ensure using a bundler (Vite/Next.js) and app is ESM
- **NextUIProvider missing**: Wrap app with `<NextUIProvider>`
- **Peer dependency warnings**: Align versions (see VERSION_COMPATIBILITY.md)
- **Button ripple errors**: Import NextUI theme CSS or use `disableRipple`

**Quick fixes:**
```bash
# Clean reinstall
./dev.sh → 19) Clean install

# Or manually
rm -rf node_modules package-lock.json && npm install
```

**📖 For detailed troubleshooting, see [DEV_GUIDE.md](./DEV_GUIDE.md#troubleshooting)**

---

## 🛠️ Developer Menu

Interactive menu for all development tasks:

```bash
./dev.sh
```

**Features:**
- 24+ commands in 7 categories (Build, Test, Storybook, Quality, Security, etc.)
- Pre-commit validation (option 23: CI workflow)
- Pre-release checklist (option 24: 5 automated checks)
- Project status dashboard
- Color-coded, user-friendly interface

**📖 For detailed guide and workflows, see [DEV_GUIDE.md](./DEV_GUIDE.md)**
