import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, SelectItem } from '../../src/index';

describe('Select interactions (unit)', () => {
  it('opens and selects an option', async () => {
    const user = userEvent.setup();
    render(
      <Select label="Choose">
        <SelectItem key="1">Option 1</SelectItem>
        <SelectItem key="2">Option 2</SelectItem>
      </Select>
    );
    const trigger = screen.getByRole('button', { name: /Choose/i });
    await user.click(trigger);
    const opt = await screen.findByRole('option', { name: /Option 2/i });
    await user.click(opt);
    // Selected value is rendered inside the trigger, not necessarily part of its accessible name
    const value = within(trigger).getByText('Option 2');
    expect(value).toBeInTheDocument();
  });
});


