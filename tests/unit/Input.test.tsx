import { render, screen } from '@testing-library/react';
import { Input } from '../../src/index';

describe('Input (unit)', () => {
  it('renders with label and placeholder', () => {
    render(<Input label="Username" placeholder="Enter text" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });
});


