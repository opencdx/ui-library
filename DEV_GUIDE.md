# UI Library Developer Guide

**Welcome to the UI Library!** This guide will help you get started with development, testing, and contributing to the OpenCDx UI component library.

---

## 📑 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Interactive Menu](#interactive-menu)
- [Testing](#testing)
- [Building & Publishing](#building--publishing)
- [Code Quality](#code-quality)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v21 (see `.nvmrc`)
- **npm**: v10+
- **Git**: For version control

### First-Time Setup

```bash
# 1. Clone the repository
cd ui-library

# 2. Use correct Node version (if using nvm)
nvm use

# 3. Install dependencies
npm install

# 4. Verify installation
npm run build
npm run test:component

# 5. Start Storybook to explore components
npm run storybook
# Opens http://localhost:6006
```

### Using the Interactive Menu

```bash
./dev.sh
```

For first-time setup, use:
- **Option 18**: Install dependencies
- **Option 21**: Show project status
- **Option 10**: Start Storybook

---

## 💻 Development Workflow

### Daily Development

```bash
# Option 1: Use the interactive menu
./dev.sh → 10) Start Storybook

# Option 2: Use npm commands directly
npm run storybook
```

### Component Development Cycle

1. **Create/modify component** in `src/[component-name]/`
2. **Add/update tests**
   - Playwright CT in `tests/component/[ComponentName].spec.tsx` (browser behavior)
   - Vitest unit tests in `tests/unit/[ComponentName].test.tsx` (logic/props)
3. **Add Storybook story** in `src/stories/[ComponentName].stories.tsx`
4. **Run tests** to verify:
   ```bash
   npm run test:component
   # or
   ./dev.sh → 5) Run component tests
   ```
5. **Check in Storybook** for visual verification
6. **Lint code**:
   ```bash
   npm run lint:fix
   # or
   ./dev.sh → 13) Lint and auto-fix
   ```

### Recommended Workflow Tools

| Task | Interactive Menu | Direct Command |
|------|------------------|----------------|
| **Develop components** | `./dev.sh → 10` | `npm run storybook` |
| **Run CT tests** | `./dev.sh → 5` | `npm run test:component` |
| **Run unit tests** | `./dev.sh → 5` | `npm run test:unit` |
| **Debug tests** | `./dev.sh → 6` | `npm run test:ui` |
| **Lint & fix** | `./dev.sh → 13` | `npm run lint:fix` |
| **Build library** | `./dev.sh → 1` | `npm run build` |
| **Pre-commit check** | `./dev.sh → 23` | `npm run lint && npm test && npm run build` |

---

## 🎮 Interactive Menu

The `dev.sh` script provides a user-friendly interface for all development tasks.

### Menu Structure

```
╔════════════════════════════════════════════════════════╗
║         UI Library Development Menu v1.0.0             ║
╚════════════════════════════════════════════════════════╝

📦 BUILD & DEVELOPMENT (1-3)
  Build, type generation, clean builds

🧪 TESTING (4-9)
  All Playwright test options

🎨 STORYBOOK (10-11)
  Dev server and static builds

🔍 CODE QUALITY (12-13)
  Linting and auto-fixing

🔒 SECURITY & MAINTENANCE (14-17)
  Dependency auditing and updates

📦 PACKAGE MANAGEMENT (18-20)
  Installation and tarball creation

📊 PROJECT INFO (21-22)
  Status dashboard and reports

🚀 QUICK ACTIONS (23-24)
  Automated workflows
```

### Key Menu Options Explained

#### Option 21: Project Status Dashboard
Shows at-a-glance information:
```
✓ Dependencies installed
✓ Library built (dist/ exists)
ℹ Node version: v21.x.x
ℹ Package: ui-library v1.0.0
ℹ Component tests: 18 files
```

#### Option 23: Full CI Workflow
Simulates GitHub Actions CI pipeline:
```bash
npm run lint          # Code quality check
npm run test:component  # All 70 tests
npm run build         # Production build
```

**Use before:**
- Creating a pull request
- Pushing to remote
- Merging to main

#### Option 24: Pre-Release Checklist
Automated validation with 5 checks:
```
[1/5] Linting code...         ✓ Lint passed
[2/5] Running tests...         ✓ All tests passed
[3/5] Building library...      ✓ Build successful
[4/5] Checking security...     ✓ No vulnerabilities
[5/5] Checking git status...   ✓ No uncommitted changes

✅ All checks passed! Ready to release.
```

**Use before:**
- Publishing to npm
- Creating a release tag
- Version bumping

---

## 🧪 Testing

### Overview

- **Playwright Component Testing** for browser behavior
- **Vitest** for unit tests and coverage (fast, deterministic)

### Running Tests

**Via Interactive Menu:**
```bash
./dev.sh
→ 5) Run component tests (fastest)
→ 6) UI mode (best for debugging)
→ 7) Headed mode (see browser)
→ 8) Debug mode (Inspector)
→ 9) Coverage report
```

**Via npm:**
```bash
## Playwright CT
```
npm run test:component
npm run test:ui
npm run test:headed
npm run test:debug
npm run coverage
```

## Vitest Unit
```
npm run test:unit
npm run coverage:unit
open coverage/index.html
```
```

### Writing Tests

See [TESTING.md](./TESTING.md) for comprehensive testing guide including:
- Test structure and patterns
- Best practices
- Common issues and solutions
- Debugging strategies

**Quick example:**
```tsx
import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from '../../src/index';

test.describe('Button', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Button>Click me</Button>);
    await expect(component).toBeVisible();
    await expect(component).toContainText('Click me');
  });
});
```

### Test File Organization

```
tests/
├── component/           # Component tests (*.spec.tsx)
│   ├── Button.spec.tsx
│   ├── Input.spec.tsx
│   ├── Card.spec.tsx
│   └── ... (18 total)
└── e2e/                # End-to-end tests
```

---

## 🏗️ Building & Publishing

### Local Development Build

```bash
# Build library
npm run build
# Creates: dist/index.js (CJS) and dist/index.mjs (ESM)

# Or use menu
./dev.sh → 1) Build library
```

### Creating a Test Package

To test the library in another project locally:

```bash
# Method 1: Using the menu
./dev.sh → 20) Create tarball

# Method 2: Direct command
npm pack

# Then in your test project:
npm install ../ui-library/ui-library-1.0.0.tgz
```

### Publishing to npm/GitHub Packages

**Pre-publish validation:**
```bash
# Use the automated checklist
./dev.sh → 24) Pre-release checklist

# If all ✅, proceed with:
npm version patch  # or minor, major
git push
git push --tags
npm publish
```

### Version Management

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking API changes (2.0.0)
- **MINOR**: New features, backward compatible (1.1.0)
- **PATCH**: Bug fixes, backward compatible (1.0.1)

```bash
# Bump version
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0

# Always run pre-release checklist first!
./dev.sh → 24
```

---

## 🔍 Code Quality

### Linting

We use **ESLint** with TypeScript support.

```bash
# Check for issues
npm run lint
# or
./dev.sh → 12) Lint code

# Auto-fix issues
npm run lint:fix
# or
./dev.sh → 13) Lint and auto-fix
```

### TypeScript

```bash
# Type checking happens during build
npm run build

# Generate type definitions
npm run build:types
```

### Code Style

- **Formatter**: Prettier (integrated with ESLint)
- **Style**: 2 spaces, single quotes, semicolons
- **Imports**: Organized by React, libraries, local
- **Components**: PascalCase
- **Files**: kebab-case for utilities, PascalCase for components

---

## 🔒 Security

### Checking for Vulnerabilities

```bash
# Check production dependencies (what gets published)
npm run audit
# or
./dev.sh → 14) Check production dependencies

# Check all dependencies (including dev tools)
npm run audit:dev
# or
./dev.sh → 15) Check all dependencies
```

### Fixing Vulnerabilities

```bash
# Auto-fix (safe updates only)
npm run audit:fix
# or
./dev.sh → 16) Fix vulnerabilities

# Force fix (may break things)
npm audit fix --force
# ⚠️ Use with caution, test thoroughly after
```

### Checking for Updates

```bash
# See which packages have newer versions
npm run outdated
# or
./dev.sh → 17) Check outdated packages
```

### Security Best Practices

1. **Run `npm run audit` before every release**
2. **Fix critical/high vulnerabilities immediately**
3. **Review moderate/low on case-by-case basis**
4. **Keep dependencies updated monthly**
5. **Use exact versions for critical dependencies**

---

## 🎨 Component Development Guidelines

See [COMPONENT_GUIDELINES.md](./COMPONENT_GUIDELINES.md) for:
- Component composition patterns
- NextUI wrapper constraints
- React.Children.map compatibility
- Best practices and examples

### Quick Tips

1. **Always export from `src/index.ts`**
2. **Create a Storybook story** for visual testing
3. **Write Playwright tests** (minimum 3-5 tests per component)
4. **Follow naming conventions**:
   - Component: `Button.tsx`
   - Hook: `use-button.ts`
   - Test: `Button.spec.tsx`
   - Story: `Button.stories.tsx`

---

## 🐛 Troubleshooting

### Common Issues

#### Tests Failing Locally

```bash
# Clean and rebuild
./dev.sh → 19) Clean install
./dev.sh → 3) Clean build
./dev.sh → 5) Run tests

# Or manually:
rm -rf node_modules .next dist playwright/.cache
npm install
npm run build
npm run test:component
```

#### Build Errors

```bash
# Check for type errors
npm run build:types

# Clean and rebuild
rm -rf dist
npm run build
```

#### Storybook Not Starting

```bash
# Kill port if in use
lsof -ti:6006 | xargs kill -9

# Clear cache and restart
rm -rf node_modules/.cache
npm run storybook
```

#### Import Errors in Tests

All component imports should come from the main index:
```tsx
// ✅ Good
import { Button, Card, Input } from '../../src/index';

// ❌ Bad
import Button from '../../src/button/button';
```

### Getting Help

1. **Check documentation**:
   - [README.md](./README.md) - General usage
   - [TESTING.md](./TESTING.md) - Testing guide
   - [COMPONENT_GUIDELINES.md](./COMPONENT_GUIDELINES.md) - Component patterns
   - This guide (DEV_GUIDE.md) - Development workflows

2. **Use the menu**: `./dev.sh → 21` for project status

3. **Check existing tests**: See `tests/component/` for examples

4. **Review Storybook**: Running examples of all components

5. **Ask the team**: Slack #ui-library channel

---

## 🤝 Contributing

### Pull Request Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/new-component
   ```

2. **Make your changes**:
   - Add/modify components
   - Write tests (required)
   - Add Storybook stories
   - Update documentation

3. **Validate locally**:
   ```bash
   ./dev.sh → 23) Full CI workflow
   ```
   This runs the same checks as GitHub Actions.

4. **Commit with conventional commits**:
   ```bash
   git add .
   git commit -m "feat(button): add loading state"
   # or
   git commit -m "fix(input): resolve focus issue"
   # or
   git commit -m "test(card): add accessibility tests"
   ```

5. **Push and create PR**:
   ```bash
   git push origin feature/new-component
   ```

6. **PR will automatically**:
   - Run all tests
   - Check code quality
   - Verify build succeeds
   - Run security audit

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (deps, config, etc.)

**Examples:**
```bash
feat(modal): add customizable animation duration
fix(button): resolve ripple effect on Safari
docs(readme): update testing section
test(input): add keyboard navigation tests
chore(deps): update Playwright to v1.48
```

### Code Review Checklist

Before requesting review, ensure:
- ✅ All tests pass (`./dev.sh → 5`)
- ✅ No lint errors (`./dev.sh → 12`)
- ✅ Documentation updated
- ✅ Storybook story added
- ✅ CHANGELOG.md updated
- ✅ Types properly exported
- ✅ No console errors/warnings

---

## 📦 Package Management

### Installing Dependencies

```bash
# Standard install
npm install

# Clean install (recommended when switching branches)
rm -rf node_modules package-lock.json
npm install

# Or use menu
./dev.sh → 19) Clean install
```

### Managing Dependencies

**Adding a new dependency:**
```bash
# Production dependency
npm install package-name

# Dev dependency
npm install -D package-name

# Peer dependency (add to package.json manually)
```

**Checking for updates:**
```bash
npm run outdated
# or
./dev.sh → 17) Check outdated packages
```

**Updating dependencies:**
```bash
# Update a specific package
npm update package-name

# Update all to latest (within semver range)
npm update

# Update to latest (breaking changes)
npm install package-name@latest
```

---

## 🏗️ Build System

### Build Process

The library is built with **tsup** (TypeScript Universal Package builder):

```bash
npm run build
```

**Outputs:**
- `dist/index.js` - CommonJS (for Node.js)
- `dist/index.mjs` - ES Modules (for bundlers)
- `dist/**/*.d.ts` - TypeScript types

### Build Configuration

**`tsup.config.ts`:**
- Formats: CJS + ESM
- Source maps: Enabled
- Type declarations: Generated
- Minification: Disabled (bundlers handle this)

### Verifying Build

```bash
# Build and check output
npm run build
ls -la dist/

# Or use menu
./dev.sh → 1) Build library
```

---

## 🧪 Testing Strategy

### Test Pyramid

```
       /\
      /E2E\      ← Few tests (critical user flows)
     /------\
    /  API   \   ← Some tests (integration)
   /----------\
  / Component \ ← Many tests (70+ component tests)
 /--------------\
```

### Component Tests (70 tests)

**Purpose**: Verify individual components work correctly

**What to test:**
- ✅ Component renders
- ✅ Props are applied
- ✅ User interactions work
- ✅ Accessibility features
- ✅ Different states (disabled, error, loading)

**Example:**
```tsx
test('should render with color variant', async ({ mount }) => {
  const component = await mount(<Button color="primary">Click</Button>);
  const classes = await component.getAttribute('class');
  expect(classes).toContain('bg-primary');
});
```

### E2E Tests (Coming Soon)

**Purpose**: Verify complete user workflows

**What to test:**
- User registration flow
- Form submissions
- Navigation between pages
- Real API integration

### Test Coverage Goals

- **Component coverage**: 100% (all exported components)
- **Line coverage**: 80%+
- **Branch coverage**: 75%+
- **Function coverage**: 80%+

```bash
# Generate coverage report
npm run coverage
# or
./dev.sh → 9) Generate coverage report

# View report
open playwright-report/index.html
```

---

## 📊 Code Quality Standards

### TypeScript

- **Strict mode**: Enabled
- **Type safety**: No `any` types (use `unknown` if needed)
- **Explicit returns**: Always declare return types for functions
- **No unused vars**: Compiler enforces this

### React Best Practices

- **Hooks**: Follow Rules of Hooks
- **Memoization**: Use `useMemo`/`useCallback` for expensive operations
- **Props**: Destructure for clarity
- **Event handlers**: Use `onPress` for NextUI components (not `onClick`)
- **Accessibility**: Always provide proper ARIA attributes

### File Organization

```
src/
├── [component-name]/
│   ├── component-name.tsx       # Main component
│   ├── use-component-name.ts    # Custom hook
│   ├── component-name-*.tsx     # Sub-components
│   └── *-context.ts             # Context (if needed)
└── index.ts                     # Main export file
```

---

## 🔐 Security Practices

### Dependency Management

**Always audit before releasing:**
```bash
./dev.sh → 24) Pre-release checklist
# Includes security audit
```

### Known Vulnerabilities

Current status (as of v1.0.1):
- **Production dependencies**: 0 vulnerabilities ✅
- **Dev dependencies**: 3 moderate (low risk, dev tools only)

### Security Scanning Schedule

- **Daily**: Automated in CI/CD
- **Weekly**: Manual review (`npm run audit`)
- **Before release**: Required check (option 24)
- **Monthly**: Full dependency audit and updates

---

## 📝 Documentation Standards

### What to Document

When adding/changing components:
1. ✅ **Update README.md** if adding new scripts/features
2. ✅ **Update CHANGELOG.md** with changes
3. ✅ **Add Storybook story** with examples
4. ✅ **Write tests** with clear descriptions
5. ✅ **Add JSDoc comments** to component props
6. ✅ **Update COMPONENT_GUIDELINES.md** if adding patterns

### Documentation Files

| File | Purpose | Update When |
|------|---------|-------------|
| `README.md` | Getting started, usage | Adding features/scripts |
| `DEV_GUIDE.md` | Development workflows | Changing dev process |
| `TESTING.md` | Testing guide | Adding test patterns |
| `COMPONENT_GUIDELINES.md` | Component patterns | Architecture changes |
| `CHANGELOG.md` | Release history | Every release |

### JSDoc Example

```tsx
/**
 * Primary button component for user actions.
 * 
 * @param color - Visual style variant (primary, secondary, success, etc.)
 * @param size - Size variant (sm, md, lg)
 * @param isDisabled - Whether the button is disabled
 * @param onPress - Click handler (use onPress, not onClick for NextUI)
 * 
 * @example
 * ```tsx
 * <Button color="primary" size="lg" onPress={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 */
export interface ButtonProps {
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  onPress?: () => void;
}
```

---

## 🚀 Release Process

### Step-by-Step Release Guide

**1. Prepare for release:**
```bash
# Update version in package.json
npm version patch  # or minor/major

# Update CHANGELOG.md
# Add release date and version
```

**2. Run pre-release checklist:**
```bash
./dev.sh → 24) Pre-release checklist
```

Wait for all 5 checks to complete:
- [1/5] Linting code... ✓
- [2/5] Running tests... ✓
- [3/5] Building library... ✓
- [4/5] Checking security... ✓
- [5/5] Checking git status... ✓

**3. If all ✅, publish:**
```bash
# Commit version bump
git add package.json CHANGELOG.md
git commit -m "chore: release v1.0.1"

# Create tag
git tag v1.0.1

# Push
git push
git push --tags

# Publish to npm
npm publish
```

**4. Post-release:**
```bash
# Create GitHub release with CHANGELOG notes
# Notify team in Slack
# Update dependent projects
```

### Release Checklist (Manual)

- [ ] All tests pass (70/70)
- [ ] No lint errors
- [ ] Build succeeds
- [ ] No security vulnerabilities in production deps
- [ ] CHANGELOG.md updated with version and date
- [ ] Documentation reflects new changes
- [ ] Version bumped in package.json
- [ ] Git tag created
- [ ] Published to npm/GitHub Packages
- [ ] GitHub release created
- [ ] Team notified

**💡 Tip:** Option 24 in `./dev.sh` automates the first 5 items!

---

## 🎓 Learning Resources

### Internal Documentation

1. **[README.md](./README.md)** - Start here for basic usage
2. **[DEV_GUIDE.md](./DEV_GUIDE.md)** - This guide (workflows and processes)
3. **[TESTING.md](./TESTING.md)** - Comprehensive testing guide
4. **[COMPONENT_GUIDELINES.md](./COMPONENT_GUIDELINES.md)** - Component architecture
5. **[CHANGELOG.md](./CHANGELOG.md)** - Version history
6. **[VERSION_COMPATIBILITY.md](../.github/node/VERSION_COMPATIBILITY.md)** - Dependency versions

### External Resources

- **Playwright**: https://playwright.dev/
- **NextUI**: https://nextui.org/
- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/
- **Tailwind CSS**: https://tailwindcss.com/
- **Storybook**: https://storybook.js.org/

### Example Projects

See how ui-library is used in:
- **opencdx-dashboard**: Main admin dashboard
- **ADR-gui**: Analysis Data Repository UI

---

## 💡 Tips & Tricks

### Performance

**Fast test feedback loop:**
```bash
# Run only one test file
npx playwright test Button.spec.tsx --config=playwright-ct.config.ts

# Or watch mode for development
npx playwright test --ui
```

**Fast build iteration:**
```bash
# Build watches for changes (add to package.json if needed)
npm run build -- --watch
```

### Productivity

**Useful aliases** (add to your `.zshrc` or `.bashrc`):
```bash
alias uilib='cd /path/to/ui-library'
alias uidev='cd /path/to/ui-library && ./dev.sh'
alias uitest='cd /path/to/ui-library && npm run test:ui'
```

**VS Code snippets** for common patterns:
```json
{
  "Playwright Component Test": {
    "prefix": "pwtest",
    "body": [
      "test('should $1', async ({ mount }) => {",
      "  const component = await mount(<$2 />);",
      "  await expect(component).toBeVisible();",
      "});"
    ]
  }
}
```

### Multi-tasking

**Run Storybook and tests side-by-side:**
```bash
# Terminal 1
npm run storybook

# Terminal 2
npm run test:ui
```

**Watch mode for development:**
```bash
# Terminal 1: Storybook (auto-reloads on changes)
npm run storybook

# Terminal 2: Tests in UI mode (rerun on change)
npm run test:ui
```

---

## 📋 Quick Reference Card

### Most Common Commands

| What You Want To Do | Interactive Menu | Direct Command |
|---------------------|------------------|----------------|
| **Start developing** | `./dev.sh → 10` | `npm run storybook` |
| **Run tests** | `./dev.sh → 5` | `npm run test:component` |
| **Debug a test** | `./dev.sh → 6` | `npm run test:ui` |
| **Fix lint issues** | `./dev.sh → 13` | `npm run lint:fix` |
| **Check security** | `./dev.sh → 14` | `npm run audit` |
| **Before commit** | `./dev.sh → 23` | `npm run lint && npm test && npm run build` |
| **Before release** | `./dev.sh → 24` | See release checklist above |
| **Build library** | `./dev.sh → 1` | `npm run build` |
| **Create package** | `./dev.sh → 20` | `npm pack` |
| **View status** | `./dev.sh → 21` | Check files manually |

### File Locations

| What | Where |
|------|-------|
| **Components** | `src/[component-name]/` |
| **Tests** | `tests/component/[Component].spec.tsx` |
| **Stories** | `src/stories/[Component].stories.tsx` |
| **Build output** | `dist/` |
| **Test reports** | `playwright-report/` |
| **Documentation** | `*.md` files in root |

---

## 🎯 Next Steps

Now that you're familiar with the development workflow:

1. **Explore components** in Storybook: `npm run storybook`
2. **Read the guides**:
   - [TESTING.md](./TESTING.md) for testing patterns
   - [COMPONENT_GUIDELINES.md](./COMPONENT_GUIDELINES.md) for architecture
3. **Try the menu**: `./dev.sh` for guided workflows
4. **Make your first change** and run `./dev.sh → 23` before committing

---

## 📞 Support

- **Documentation**: This guide + other `.md` files
- **Interactive help**: `./dev.sh` menu system
- **Issues**: GitHub Issues
- **Team chat**: Slack #ui-library
- **Email**: ui-library-team@opencdx.org

---

**Happy coding! 🚀**

*Last updated: October 12, 2025*

