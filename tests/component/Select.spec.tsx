import { test, expect } from '@playwright/experimental-ct-react';
import { Select, SelectItem } from '../../src/index';

test.describe('Select', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(
      <Select label="Choose option">
        <SelectItem key="1">Option 1</SelectItem>
        <SelectItem key="2">Option 2</SelectItem>
      </Select>
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText('Choose option');
  });

  test('should render with placeholder', async ({ mount }) => {
    const component = await mount(
      <Select placeholder="Select an option">
        <SelectItem key="1">Option 1</SelectItem>
      </Select>
    );
    await expect(component).toContainText('Select an option');
  });

  test('should be disabled when isDisabled is true', async ({ mount }) => {
    const component = await mount(
      <Select isDisabled>
        <SelectItem key="1">Option 1</SelectItem>
      </Select>
    );
    const button = component.locator('button');
    // Check for data-disabled attribute instead of actual disabled state
    await expect(button).toHaveAttribute('data-disabled', 'true');
  });
});

