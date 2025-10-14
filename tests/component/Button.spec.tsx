import { test, expect } from '../fixtures/coverage';
import Button from '../../src/button/button';
import '../../src/styles/globals.css';

test.describe('Button', () => {
  test('uses custom text for the button label', async ({ mount }) => {
    const component = await mount(<Button>Click me!</Button>);
    await expect(component).toContainText('Click me!');
  });

  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Button>Click me!</Button>);
    await expect(component).toBeVisible();
  });

  test('should render with the proper color', async ({ mount }) => {
    const component = await mount(<Button color="primary">Button</Button>);
    await expect(component).toBeVisible();
    const classes = await component.getAttribute('class');
    expect(classes).toContain('bg-primary');
  });

  test('should render with the proper size', async ({ mount }) => {
    const component = await mount(<Button size="lg">Button</Button>);
    const classes = await component.getAttribute('class');
    expect(classes).toContain('px-6');
  });

  test('should render with the proper radius', async ({ mount }) => {
    const component = await mount(<Button radius="full">Button</Button>);
    const classes = await component.getAttribute('class');
    expect(classes).toContain('rounded-full');
  });

  test('should render with the proper variant', async ({ mount }) => {
    const component = await mount(<Button variant="flat">Button</Button>);
    const classes = await component.getAttribute('class');
    expect(classes).toContain('rounded-medium');
  });

  test('should render with fullWidth', async ({ mount }) => {
    const component = await mount(<Button fullWidth>Button</Button>);
    const classes = await component.getAttribute('class');
    expect(classes).toContain('w-full');
  });

  test('should render with startContent', async ({ mount }) => {
    const component = await mount(<Button startContent={<span>Icon</span>}>Button</Button>);
    await expect(component).toContainText('Icon');
    await expect(component).toContainText('Button');
  });

  test('should be disabled when isDisabled prop is true', async ({ mount }) => {
    const component = await mount(<Button isDisabled>Button</Button>);
    await expect(component).toBeDisabled();
  });

  test('should trigger onClick handler', async ({ mount }) => {
    let clicked = false;
    const component = await mount(<Button onPress={() => { clicked = true; }}>Click</Button>);
    await component.click();
    expect(clicked).toBe(true);
  });
});

