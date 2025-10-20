import { test, expect } from '../fixtures/coverage';
import { Snippet } from '../../src/index';

test.describe('Snippet', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Snippet>npm install package</Snippet>);
    await expect(component).toBeVisible();
    await expect(component).toContainText('npm install package');
  });

  test('should have copy button', async ({ mount }) => {
    const component = await mount(<Snippet>code to copy</Snippet>);
    const copyButton = component.locator('button');
    await expect(copyButton).toBeVisible();
  });

  test('should render multiline snippet', async ({ mount }) => {
    const component = await mount(
      <Snippet>
        {`Line 1
Line 2
Line 3`}
      </Snippet>
    );
    await expect(component).toContainText('Line 1');
    await expect(component).toContainText('Line 2');
  });
});

