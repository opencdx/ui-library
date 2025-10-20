import { test, expect } from '../fixtures/coverage';
import { Checkbox } from '../../src/index';

test.describe('Checkbox', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Checkbox>Accept terms</Checkbox>);
    await expect(component).toBeVisible();
    await expect(component).toContainText('Accept terms');
  });

  test('should be checkable', async ({ mount }) => {
    const component = await mount(<Checkbox>Check me</Checkbox>);
    const checkbox = component.locator('input[type="checkbox"]');
    await checkbox.check({ force: true });
    await expect(checkbox).toBeChecked();
  });

  test('should be disabled when isDisabled is true', async ({ mount }) => {
    const component = await mount(<Checkbox isDisabled>Disabled</Checkbox>);
    const checkbox = component.locator('input[type="checkbox"]');
    await expect(checkbox).toBeDisabled();
  });

  test('should support defaultSelected', async ({ mount }) => {
    const component = await mount(<Checkbox defaultSelected>Pre-checked</Checkbox>);
    const checkbox = component.locator('input[type="checkbox"]');
    await expect(checkbox).toBeChecked();
  });
});

