import { render, screen } from '@testing-library/react';
import { Snippet } from '../../src/index';

describe('Snippet (unit)', () => {
  it('renders code content', () => {
    render(<Snippet>npm install</Snippet>);
    expect(screen.getByText('npm install')).toBeInTheDocument();
  });
});


