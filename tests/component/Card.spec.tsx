import { test, expect } from '@playwright/experimental-ct-react';
import { Card, CardBody, CardHeader, CardFooter } from '../../src/index';

test.describe('Card', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Card><CardBody>Content</CardBody></Card>);
    await expect(component).toBeVisible();
    await expect(component).toContainText('Content');
  });

  test('should render with header', async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>Body</CardBody>
      </Card>
    );
    await expect(component).toContainText('Header');
    await expect(component).toContainText('Body');
  });

  test('should render with footer', async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    await expect(component).toContainText('Body');
    await expect(component).toContainText('Footer');
  });

  test('should render complete card', async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardHeader>Title</CardHeader>
        <CardBody>Content</CardBody>
        <CardFooter>Actions</CardFooter>
      </Card>
    );
    await expect(component).toContainText('Title');
    await expect(component).toContainText('Content');
    await expect(component).toContainText('Actions');
  });
});

