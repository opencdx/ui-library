import { render, screen } from '@testing-library/react';
import { Switch } from '../../src/index';

describe('Switch states (unit)', () => {
  it('renders defaultSelected', () => {
    render(<Switch defaultSelected>On</Switch>);
    expect(screen.getByText('On')).toBeInTheDocument();
  });

  it('renders disabled', () => {
    render(<Switch isDisabled>Off</Switch>);
    expect(screen.getByText('Off')).toBeInTheDocument();
  });
});


