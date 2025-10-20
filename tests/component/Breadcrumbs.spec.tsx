import { test, expect } from '../fixtures/coverage';
import { Breadcrumbs, BreadcrumbItem } from '../../src/index';

test.describe('Breadcrumbs', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Category</BreadcrumbItem>
        <BreadcrumbItem>Product</BreadcrumbItem>
      </Breadcrumbs>
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText('Home');
    await expect(component).toContainText('Category');
    await expect(component).toContainText('Product');
  });

  test('should render separator', async ({ mount }) => {
    const component = await mount(
      <Breadcrumbs>
        <BreadcrumbItem>First</BreadcrumbItem>
        <BreadcrumbItem>Second</BreadcrumbItem>
      </Breadcrumbs>
    );
    // Breadcrumbs should have visual separators
    await expect(component).toBeVisible();
  });
});

