# OpenCDx UI Library - Component Composition Guidelines

> **📖 Quick Links:**  
> [README.md](./README.md) - Getting started | [DEV_GUIDE.md](./DEV_GUIDE.md) - Developer workflows | [TESTING.md](./TESTING.md) - Testing guide

## Overview

This document provides best practices for using ui-library components in OpenCDx applications, with specific guidance on component composition patterns and known compatibility constraints.

## Component Compatibility

### User Component

The `User` component is a display component that shows user information with an avatar, name, and optional description.

#### ✅ Safe Usage Patterns

**1. Standalone rendering:**
```tsx
import { User } from 'ui-library';

<User name="John Doe" description="Software Engineer" />
```

**2. In flex layouts:**
```tsx
<div className="flex items-center gap-2">
  <User name="John Doe" />
  <Button>Edit Profile</Button>
</div>
```

**3. In standard containers:**
```tsx
<Card>
  <CardHeader>
    <User name="John Doe" description="Admin" />
  </CardHeader>
</Card>
```

#### ❌ Problematic Patterns

**Direct nesting in Button inside Navbar:**
```tsx
// ❌ AVOID: Causes "Objects are not valid as React child" error
<Navbar>
  <NavbarItem>
    <Button>
      <User name="John Doe" />  {/* Fails due to React.Children.map in Navbar */}
    </Button>
  </NavbarItem>
</Navbar>
```

**Why it fails:**
- NextUI's `Navbar` component uses `React.Children.map` internally to filter/validate children
- `User` is a `forwardRef` component that returns a component reference
- When nested inside `Button` which is inside `Navbar`, the Navbar's child validation sees the component object, not the rendered output
- This causes React to throw "Objects are not valid as a React child"

### UserButton Component (Solution)

`UserButton` is a **composite component** specifically designed to solve the Navbar compatibility issue.

#### When to Use UserButton

Use `UserButton` when you need to:
- Display user information inside a clickable button
- Use the button inside constrained parent components (Navbar, custom wrappers)
- Create dropdown triggers with user information
- Avoid React.Children.map compatibility issues

#### Examples

**Basic usage:**
```tsx
import { UserButton } from 'ui-library';

<UserButton
  userProps={{ name: "John Doe", description: "Admin" }}
  buttonProps={{ variant: "light", color: "primary" }}
/>
```

**With dropdown (common pattern in Navbar):**
```tsx
import { UserButton, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from 'ui-library';

<Navbar>
  <NavbarItem>
    <Dropdown>
      <DropdownTrigger>
        <UserButton
          userProps={{ name: "John Doe" }}
          buttonProps={{ variant: "light", disableAnimation: true }}
          className="w-full p-0"
          endContent={<ChevronDownIcon />}
        />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="profile">Profile</DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem key="logout">Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </NavbarItem>
</Navbar>
```

**With custom icons:**
```tsx
<UserButton
  userProps={{ name: "Jane Smith", description: "Engineer" }}
  buttonProps={{ variant: "bordered", radius: "full" }}
  endContent={<SettingsIcon className="w-4 h-4" />}
/>
```

### Component Compatibility Matrix

| Parent Component | User (direct) | User in Button | UserButton | Plain text in Button |
|-----------------|---------------|----------------|------------|---------------------|
| `<div>`, `<Card>`, etc. | ✅ Works | ✅ Works | ✅ Works | ✅ Works |
| `<Button>` (standalone) | ❌ Invalid | ✅ Works | ✅ Works | ✅ Works |
| `<Button>` in `<Navbar>` | ❌ Invalid | ❌ Fails | ✅ Works | ✅ Works |
| `<Button>` in `<Dropdown>` | ❌ Invalid | ✅ Works | ✅ Works | ✅ Works |
| Custom components using `React.Children.map` | ✅ Works | ❌ May fail | ✅ Works | ✅ Works |

## General Composition Rules

### 1. Components as Button Children

When using components inside `Button`:
- ✅ **Do**: Use text, icons, or simple elements
- ✅ **Do**: Use composite components like `UserButton`
- ❌ **Avoid**: Nesting complex `forwardRef` components directly

```tsx
// ✅ Good
<Button startContent={<Icon />}>Save</Button>
<Button>John Doe</Button>
<UserButton userProps={{name: "John"}} />

// ❌ Problematic in Navbar context
<Button><User name="John" /></Button>
```

### 2. Navbar Children Constraints

NextUI `Navbar` expects specific child types:
- `NavbarBrand`
- `NavbarContent`
- `NavbarItem`
- `NavbarMenu`
- `NavbarMenuItem`

Any other components may fail validation. Always wrap custom components in `NavbarItem`:

```tsx
// ✅ Correct
<Navbar>
  <NavbarContent>
    <NavbarItem>
      <UserButton {...props} />
    </NavbarItem>
  </NavbarContent>
</Navbar>

// ❌ Wrong
<Navbar>
  <UserButton {...props} />  {/* Missing NavbarItem wrapper */}
</Navbar>
```

### 3. Dropdown Best Practices

When creating user menus with dropdowns:

```tsx
import { UserButton, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from 'ui-library';

function UserMenu() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <UserButton
          userProps={{ name: userName }}
          buttonProps={{ variant: "light" }}
          endContent={<ChevronDown />}
        />
      </DropdownTrigger>
      <DropdownMenu onAction={handleAction}>
        <DropdownItem key="profile">Profile</DropdownItem>
        <DropdownItem key="logout">Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
```

## Migration Guide

### From User in Button to UserButton

**Before:**
```tsx
<Button variant="light" className="p-0">
  <div className="flex items-center">
    <User name="John Doe" description="Admin" />
  </div>
</Button>
```

**After:**
```tsx
<UserButton
  userProps={{ name: "John Doe", description: "Admin" }}
  buttonProps={{ variant: "light" }}
  className="p-0"
/>
```

**Benefits:**
- Cleaner code
- Better type safety
- Guaranteed compatibility with Navbar and other constrained components
- Consistent API across the library

## Performance Considerations

- `UserButton` is a lightweight wrapper with minimal overhead
- It uses the same hooks and rendering as separate `User` + `Button` components
- No additional re-renders compared to manual composition

## Accessibility

Both `User` and `UserButton` maintain full accessibility:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatible
- Follows NextUI accessibility patterns

## Testing

When testing components using `UserButton`:

```tsx
import { render, screen } from '@testing-library/react';
import { UserButton } from 'ui-library';

test('renders user button with name', () => {
  render(<UserButton userProps={{ name: "John Doe" }} />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

## Future Compatibility

As we migrate from NextUI to HeroUI:
- `UserButton` API will remain stable
- Internal implementation may update to use HeroUI primitives
- Component behavior and props will stay backward compatible

## Questions or Issues?

If you encounter composition issues with other ui-library components:
1. Check if a composite component exists (like `UserButton`)
2. Review this guide for similar patterns
3. Consider creating a new composite component following the `UserButton` pattern
4. Open an issue in the ui-library repository with reproduction steps

