import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Autocomplete, AutocompleteItem } from '../../src/index';

describe('Autocomplete (unit)', () => {
  it('renders label and shows items when opened', async () => {
    const user = userEvent.setup();
    render(
      <Autocomplete label="Search">
        <AutocompleteItem key="1">Item 1</AutocompleteItem>
        <AutocompleteItem key="2">Item 2</AutocompleteItem>
      </Autocomplete>
    );
    expect(screen.getByText('Search')).toBeInTheDocument();
    const input = screen.getByRole('combobox', { name: /Search/i });
    await user.click(input);
    await user.type(input, 'I');
    expect(await screen.findByRole('option', { name: /Item 1/i })).toBeInTheDocument();
  });
});


