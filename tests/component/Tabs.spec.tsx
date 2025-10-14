import { test, expect } from '@playwright/experimental-ct-react';
import { Tabs, Tab } from '../../src/index';

test.describe('Tabs', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(
      <Tabs>
        <Tab key="tab1" title="Tab 1">
          Content 1
        </Tab>
        <Tab key="tab2" title="Tab 2">
          Content 2
        </Tab>
      </Tabs>
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText('Tab 1');
    await expect(component).toContainText('Tab 2');
  });

  test('should show first tab content by default', async ({ mount }) => {
    const component = await mount(
      <Tabs>
        <Tab key="tab1" title="First">
          First content
        </Tab>
        <Tab key="tab2" title="Second">
          Second content
        </Tab>
      </Tabs>
    );
    await expect(component).toContainText('First content');
  });

  test('should switch tabs on click', async ({ mount }) => {
    const component = await mount(
      <Tabs>
        <Tab key="tab1" title="Tab One">
          Content One
        </Tab>
        <Tab key="tab2" title="Tab Two">
          Content Two
        </Tab>
      </Tabs>
    );
    await component.getByText('Tab Two').click();
    await expect(component).toContainText('Content Two');
  });
});

