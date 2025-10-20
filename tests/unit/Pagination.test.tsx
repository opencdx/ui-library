import { render, screen } from '@testing-library/react';
import { Pagination } from '../../src/index';

describe('Pagination (unit)', () => {
  it('renders page items for total', () => {
    render(<Pagination total={5} />);
    expect(screen.getByRole('button', { name: /pagination item 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pagination item 5/i })).toBeInTheDocument();
  });
});


