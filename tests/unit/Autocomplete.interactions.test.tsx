import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Autocomplete, AutocompleteItem } from '../../src/index';

describe('Autocomplete interactions (unit)', () => {
  it('filters and selects option', async () => {
    const user = userEvent.setup();
    render(
      <Autocomplete label="Search">
        <AutocompleteItem key="apple">Apple</AutocompleteItem>
        <AutocompleteItem key="banana">Banana</AutocompleteItem>
      </Autocomplete>
    );
    const input = screen.getByRole('combobox', { name: /Search/i });
    await user.click(input);
    await user.type(input, 'Ban');
    const opt = await screen.findByRole('option', { name: /Banana/i });
    await user.click(opt);
    expect(screen.getByRole('combobox', { name: /Search/i })).toHaveValue('Banana');
  });
});


