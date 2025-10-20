import { render, screen } from '@testing-library/react';
import { Switch } from '../../src/index';

describe('Switch (unit)', () => {
  it('renders with label', () => {
    render(<Switch>Enable</Switch>);
    expect(screen.getByText('Enable')).toBeInTheDocument();
  });
});


