import { test, expect } from '@playwright/experimental-ct-react';
import { Divider } from '../../src/index';

test.describe('Divider', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Divider />);
    await expect(component).toBeVisible();
  });

  test('should render horizontal divider by default', async ({ mount }) => {
    const component = await mount(<Divider />);
    const classes = await component.getAttribute('class');
    expect(classes).not.toContain('vertical');
  });

  test('should render vertical divider', async ({ mount }) => {
    const component = await mount(<Divider orientation="vertical" />);
    const classes = await component.getAttribute('class');
    // Vertical divider uses h-full (full height) instead of w-full (full width)
    expect(classes).toContain('h-full');
  });
});

