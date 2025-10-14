import { test, expect } from '@playwright/experimental-ct-react';
import { Link } from '../../src/index';

test.describe('Link', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Link href="#">Click here</Link>);
    await expect(component).toBeVisible();
    await expect(component).toContainText('Click here');
  });

  test('should have href attribute', async ({ mount }) => {
    const component = await mount(<Link href="/test">Link</Link>);
    await expect(component).toHaveAttribute('href', '/test');
  });

  test('should render as external link', async ({ mount }) => {
    const component = await mount(<Link isExternal href="https://example.com">External</Link>);
    await expect(component).toHaveAttribute('target', '_blank');
  });

  test('should be disabled when isDisabled is true', async ({ mount }) => {
    const component = await mount(<Link isDisabled href="#">Disabled</Link>);
    const classes = await component.getAttribute('class');
    expect(classes).toContain('disabled');
  });
});

