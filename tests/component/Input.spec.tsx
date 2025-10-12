import { test, expect } from '@playwright/experimental-ct-react';
import { Input } from '../../src/index';

test.describe('Input', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Input />);
    await expect(component).toBeVisible();
  });

  test('should render with label', async ({ mount }) => {
    const component = await mount(<Input label="Username" />);
    await expect(component).toContainText('Username');
  });

  test('should render with placeholder', async ({ mount }) => {
    const component = await mount(<Input placeholder="Enter text" />);
    const input = component.locator('input');
    await expect(input).toHaveAttribute('placeholder', 'Enter text');
  });

  test('should be disabled when isDisabled is true', async ({ mount }) => {
    const component = await mount(<Input isDisabled />);
    const input = component.locator('input');
    await expect(input).toBeDisabled();
  });

  test('should accept input value', async ({ mount }) => {
    const component = await mount(<Input />);
    const input = component.locator('input');
    await input.fill('test value');
    await expect(input).toHaveValue('test value');
  });
});

