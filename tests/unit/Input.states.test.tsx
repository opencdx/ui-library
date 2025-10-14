import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, Textarea } from '../../src/index';

describe('Input/Textarea states (unit)', () => {
  it('Input allows typing and disabled state', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type" />);
    const input = screen.getByPlaceholderText('Type');
    await user.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });

  it('Textarea disabled state', () => {
    render(<Textarea placeholder="disabled" isDisabled />);
    expect(screen.getByPlaceholderText('disabled')).toBeDisabled();
  });
});


