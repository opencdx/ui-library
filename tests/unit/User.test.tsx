import { render, screen } from '@testing-library/react';
import { User } from '../../src/index';

describe('User (unit)', () => {
  it('renders name and description', () => {
    render(<User name="Jane Doe" description="Engineer" />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });
});


