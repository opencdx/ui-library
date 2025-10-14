# Changelog

All notable changes to the OpenCDx UI Library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2025-10-11

### Added
- **Playwright testing**: Complete migration from Cypress to Playwright for component and E2E tests
  - ✅ Migrated 18 component test suites (70 total tests)
  - ✅ **100% pass rate** with fast execution (~10-11 seconds)
  - ✅ Multi-browser support (Chromium, Firefox, WebKit)
  - ✅ Interactive debugging with UI mode and time-travel
  - ✅ Comprehensive test coverage for all core components
  - Created `TESTING.md` guide with best practices and examples
  - Enhanced README with detailed testing documentation
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
