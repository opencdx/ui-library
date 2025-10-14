import { render, screen } from '@testing-library/react';
import { Link } from '../../src/index';

describe('Link variants (unit)', () => {
  it('renders with anchor icon when enabled', () => {
    render(<Link href="#" showAnchorIcon>Anchor</Link>);
    expect(screen.getByRole('link', { name: /Anchor/i })).toBeInTheDocument();
  });
});


