import { test, expect } from '../fixtures/coverage';
import { Autocomplete, AutocompleteItem } from '../../src/index';

test.describe('Autocomplete', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(
      <Autocomplete label="Search">
        <AutocompleteItem key="1">Item 1</AutocompleteItem>
        <AutocompleteItem key="2">Item 2</AutocompleteItem>
      </Autocomplete>
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText('Search');
  });

  test('should render with placeholder', async ({ mount }) => {
    const component = await mount(
      <Autocomplete placeholder="Type to search">
        <AutocompleteItem key="1">Result</AutocompleteItem>
      </Autocomplete>
    );
    const input = component.locator('input');
    await expect(input).toHaveAttribute('placeholder', 'Type to search');
  });

  test('should accept input', async ({ mount }) => {
    const component = await mount(
      <Autocomplete>
        <AutocompleteItem key="1">Apple</AutocompleteItem>
        <AutocompleteItem key="2">Banana</AutocompleteItem>
      </Autocomplete>
    );
    const input = component.locator('input');
    await input.fill('App');
    await expect(input).toHaveValue('App');
  });
});

