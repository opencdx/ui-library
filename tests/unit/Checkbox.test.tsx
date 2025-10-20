import { render, screen } from '@testing-library/react';
import { Checkbox } from '../../src/index';

describe('Checkbox (unit)', () => {
  it('renders with label', () => {
    render(<Checkbox>Accept</Checkbox>);
    expect(screen.getByText('Accept')).toBeInTheDocument();
  });
});


