import { render, screen } from '@testing-library/react';
import { User } from '../../src/index';

describe('User variants (unit)', () => {
  it('renders with avatar props', () => {
    render(<User name="John" description="Dev" avatarProps={{ src: '/avatar.png', alt: 'A' }} />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Dev')).toBeInTheDocument();
  });
});


