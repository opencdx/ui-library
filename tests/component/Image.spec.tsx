import { test, expect } from '../fixtures/coverage';
import { Image } from '../../src/index';

test.describe('Image', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Image src="/test.jpg" alt="Test image" />);
    const img = component.locator('img');
    await expect(img).toBeVisible();
  });

  test('should have alt attribute', async ({ mount }) => {
    const component = await mount(<Image src="/test.jpg" alt="Description" />);
    const img = component.locator('img');
    await expect(img).toHaveAttribute('alt', 'Description');
  });

  test('should have src attribute', async ({ mount }) => {
    const component = await mount(<Image src="/image.png" alt="test" />);
    const img = component.locator('img');
    const src = await img.getAttribute('src');
    expect(src).toContain('image.png');
  });
});

