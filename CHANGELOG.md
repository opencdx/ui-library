# Changelog

All notable changes to the OpenCDx UI Library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Vitest unit testing and coverage for ui-library
  - Setup: `vitest.config.ts`, `vitest.setup.ts`
  - Commands: `npm run test:unit`, `npm run coverage:unit`
  - HTML coverage report at `coverage/index.html`
- Unit tests added for multiple components (Button, Input, Select, Modal, Card, etc.)
- Documentation updates (README, DEV_GUIDE, TESTING) to reflect unit testing flow

## [1.0.1] - 2025-10-11

### Added
- **Playwright testing**: Complete migration from Cypress to Playwright for component and E2E tests
  - ✅ Migrated 18 component test suites (70 total tests)
  - ✅ **100% pass rate** with fast execution (~6 seconds)
  - ✅ Multi-browser support (Chromium, Firefox, WebKit)
  - ✅ Interactive debugging with UI mode and time-travel
  - ✅ Comprehensive test coverage for all core components
  - Created `TESTING.md` guide with best practices and examples
  - Enhanced README with detailed testing documentation
- **Interactive Development Menu** (`dev.sh`): User-friendly menu system for all development tasks
  - 24 organized commands across 7 categories (Build, Test, Storybook, Quality, Security, etc.)
  - Color-coded output with emojis for better UX
  - Pre-release checklist automation (5 automated validation checks)
  - Project status dashboard showing dependencies, build, tests, versions
  - CI workflow simulator (runs same checks as GitHub Actions)
  - Documented in README, DEV_GUIDE.md, and TESTING.md
  - Perfect for onboarding new developers and daily workflows
- **DEV_GUIDE.md**: Comprehensive developer guide (400+ lines)
  - Complete development workflows and processes
  - Step-by-step release process
  - Security practices and dependency management
  - Troubleshooting common issues
  - Tips & tricks for productivity
  - Quick reference cards for common tasks
- **Security Scripts**: Added npm audit commands for vulnerability scanning
  - `npm run audit` - Check production dependencies
  - `npm run audit:dev` - Check all dependencies
  - `npm run audit:fix` - Auto-fix vulnerabilities
  - `npm run outdated` - Check for package updates
- **UserButton component**: Composite component that renders User inside Button safely
  - Solves compatibility issues when using User in contexts with React.Children.map constraints
  - API: `userProps`, `buttonProps`, `className`, `endContent`
  - Use case: Dropdown triggers, navbar user menus, anywhere User needs to be clickable
- **COMPONENT_GUIDELINES.md**: Comprehensive documentation on component composition patterns
  - Best practices for component nesting and usage
  - Compatibility matrix showing which patterns work in different contexts
  - Migration guides and troubleshooting tips
- **UserButton Storybook story**: Interactive examples demonstrating usage patterns

### Changed
- **Button component**: Ripple effect now disabled by default to prevent layout calculation errors
  - Can be re-enabled per instance with `disableRipple={false}`
  - Improves stability during initial page hydration
- **README.md**: Added reference to COMPONENT_GUIDELINES.md for composition best practices

### Fixed
- Resolved Button ripple NaN errors caused by premature position calculations
- Improved component composition patterns to work reliably with NextUI's internal validation

## [1.0.0] - 2025-10-09

### Added
- Initial release of OpenCDx UI Library
- Core components: Button, Input, Textarea, Select, Checkbox, Radio, Switch
- Layout components: Card, Divider, Accordion, Tabs
- Navigation components: Breadcrumbs, Link, Pagination
- Overlay components: Modal, Dropdown, Tooltip
- Display components: Image, Snippet, User
- Icon exports from Material-UI
- Storybook integration with interactive component documentation
- Full TypeScript support with comprehensive type definitions
- Tailwind CSS integration with NextUI v2 theme system
- ESM and CommonJS dual build output
- Cypress component testing infrastructure
- Peer dependency model for React 18+ compatibility
