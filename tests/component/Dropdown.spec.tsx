import { test, expect } from '../fixtures/coverage';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '../../src/index';

test.describe('Dropdown', () => {
  test('should render trigger correctly', async ({ mount }) => {
    const component = await mount(
      <Dropdown>
        <DropdownTrigger>
          <Button>Open Menu</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="1">Action 1</DropdownItem>
          <DropdownItem key="2">Action 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    await expect(component).toContainText('Open Menu');
  });

  test('should open menu on click', async ({ mount, page }) => {
    const component = await mount(
      <Dropdown>
        <DropdownTrigger>
          <Button>Menu</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="1">Option 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    await component.getByText('Menu').click();
    await page.waitForTimeout(100);
    await expect(page.locator('text=Option 1')).toBeVisible();
  });
});

