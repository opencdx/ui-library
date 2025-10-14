import { render, screen } from '@testing-library/react';
import { Link } from '../../src/index';

describe('Link (unit)', () => {
  it('renders anchor with text', () => {
    render(<Link href="/docs">Docs</Link>);
    const a = screen.getByRole('link', { name: /Docs/i });
    expect(a).toHaveAttribute('href', '/docs');
  });
});


