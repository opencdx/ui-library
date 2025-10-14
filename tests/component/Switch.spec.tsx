import { test, expect } from '../fixtures/coverage';
import { Switch } from '../../src/index';

test.describe('Switch', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Switch>Enable notifications</Switch>);
    await expect(component).toBeVisible();
    await expect(component).toContainText('Enable notifications');
  });

  test('should be toggleable', async ({ mount }) => {
    const component = await mount(<Switch>Toggle</Switch>);
    const input = component.locator('input[type="checkbox"]');
    await input.check({ force: true });
    await expect(input).toBeChecked();
  });

  test('should be disabled when isDisabled is true', async ({ mount }) => {
    const component = await mount(<Switch isDisabled>Disabled</Switch>);
    const input = component.locator('input[type="checkbox"]');
    await expect(input).toBeDisabled();
  });

  test('should support defaultSelected', async ({ mount }) => {
    const component = await mount(<Switch defaultSelected>On by default</Switch>);
    const input = component.locator('input[type="checkbox"]');
    await expect(input).toBeChecked();
  });
});

