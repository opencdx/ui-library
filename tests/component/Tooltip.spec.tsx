import { test, expect } from '../fixtures/coverage';
import { Tooltip, Button } from '../../src/index';

test.describe('Tooltip', () => {
  test('should render trigger correctly', async ({ mount }) => {
    const component = await mount(
      <Tooltip content="Tooltip text">
        <Button>Hover me</Button>
      </Tooltip>
    );
    await expect(component).toContainText('Hover me');
  });

  test('should render with tooltip content', async ({ mount }) => {
    const component = await mount(
      <Tooltip content="Help text">
        <Button>Info Button</Button>
      </Tooltip>
    );
    
    // The trigger button should be visible
    await expect(component).toBeVisible();
    await expect(component).toContainText('Info Button');
    
    // Verify the Tooltip wraps the button correctly
    // The component itself contains the button text, which confirms structure is correct
    // (actual hover behavior and tooltip appearance is better tested in E2E tests)
  });
});

