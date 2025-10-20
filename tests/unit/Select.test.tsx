import { render, screen } from '@testing-library/react';
import { Select, SelectItem } from '../../src/index';

describe('Select (unit)', () => {
  it('renders label and placeholder', () => {
    render(
      <Select label="Choose option" placeholder="Select an option">
        <SelectItem key="1">Option 1</SelectItem>
        <SelectItem key="2">Option 2</SelectItem>
      </Select>
    );
    expect(screen.getByRole('button', { name: /Choose option/i })).toBeInTheDocument();
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });
});


