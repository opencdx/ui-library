import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../src/index';

describe('Button (unit)', () => {
  it('renders custom label', () => {
    render(<Button>Click me!</Button>);
    expect(screen.getByText('Click me!')).toBeInTheDocument();
  });

  it('fires onPress when clicked', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(<Button onPress={handler}>Press</Button>);
    await user.click(screen.getByText('Press'));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});


