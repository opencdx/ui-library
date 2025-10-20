import { test, expect } from '../fixtures/coverage';
import { Pagination } from '../../src/index';

test.describe('Pagination', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Pagination total={10} />);
    await expect(component).toBeVisible();
  });

  test('should render page numbers', async ({ mount }) => {
    const component = await mount(<Pagination total={5} />);
    await expect(component).toContainText('1');
  });

  test('should render with multiple pages', async ({ mount }) => {
    const component = await mount(<Pagination total={10} initialPage={2} />);
    await expect(component).toBeVisible();
    
    // Pagination should show multiple page numbers
    await expect(component).toContainText('1');
    await expect(component).toContainText('2');
    
    // Verify we have clickable page elements
    const pageElements = component.locator('[data-slot="item"]');
    const count = await pageElements.count();
    expect(count).toBeGreaterThan(0);
  });
});

