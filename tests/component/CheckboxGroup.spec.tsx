import { test, expect } from '@playwright/experimental-ct-react';
import { CheckboxGroup, Checkbox } from '../../src/index';

test.describe('CheckboxGroup', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(
      <CheckboxGroup label="Select items">
        <Checkbox value="item1">Item 1</Checkbox>
        <Checkbox value="item2">Item 2</Checkbox>
        <Checkbox value="item3">Item 3</Checkbox>
      </CheckboxGroup>
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText('Select items');
    await expect(component).toContainText('Item 1');
    await expect(component).toContainText('Item 2');
  });

  test('should support multiple selections', async ({ mount }) => {
    const component = await mount(
      <CheckboxGroup>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </CheckboxGroup>
    );
    const checkboxA = component.locator('input[value="a"]');
    const checkboxB = component.locator('input[value="b"]');
    await checkboxA.check({ force: true });
    await checkboxB.check({ force: true });
    await expect(checkboxA).toBeChecked();
    await expect(checkboxB).toBeChecked();
  });
});

