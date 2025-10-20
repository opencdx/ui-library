import { render, screen } from '@testing-library/react';
import { Textarea } from '../../src/index';

describe('Textarea (unit)', () => {
  it('renders with placeholder', () => {
    render(<Textarea placeholder="Type here" />);
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });
});


