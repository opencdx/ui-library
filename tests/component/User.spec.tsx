import { test, expect } from '@playwright/experimental-ct-react';
import { User } from '../../src/index';

test.describe('User', () => {
  test('should render with name', async ({ mount }) => {
    const component = await mount(<User name="John Doe" />);
    await expect(component).toBeVisible();
    await expect(component).toContainText('John Doe');
  });

  test('should render with description', async ({ mount }) => {
    const component = await mount(<User name="Jane Smith" description="Software Engineer" />);
    await expect(component).toContainText('Jane Smith');
    await expect(component).toContainText('Software Engineer');
  });

  test('should render with avatar', async ({ mount }) => {
    const component = await mount(<User name="Test" />);
    // Avatar should be rendered (svg icon by default)
    const avatar = component.locator('[role="img"]');
    await expect(avatar).toBeVisible();
  });
});

