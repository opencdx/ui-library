import { test, expect } from '../fixtures/coverage';
import { RadioGroup, Radio } from '../../src/index';

test.describe('RadioGroup', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(
      <RadioGroup label="Select option">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
        <Radio value="option3">Option 3</Radio>
      </RadioGroup>
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText('Select option');
    await expect(component).toContainText('Option 1');
    await expect(component).toContainText('Option 2');
  });

  test('should be selectable', async ({ mount }) => {
    const component = await mount(
      <RadioGroup>
        <Radio value="a">Choice A</Radio>
        <Radio value="b">Choice B</Radio>
      </RadioGroup>
    );
    const radioB = component.locator('input[value="b"]');
    await radioB.check({ force: true });
    await expect(radioB).toBeChecked();
  });

  test('should support defaultValue', async ({ mount }) => {
    const component = await mount(
      <RadioGroup defaultValue="selected">
        <Radio value="selected">Pre-selected</Radio>
        <Radio value="other">Other</Radio>
      </RadioGroup>
    );
    const radio = component.locator('input[value="selected"]');
    await expect(radio).toBeChecked();
  });
});

