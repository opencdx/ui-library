import { render, screen } from '@testing-library/react';
import { Tooltip, Button } from '../../src/index';

describe('Tooltip (unit)', () => {
  it('renders trigger content', () => {
    render(
      <Tooltip content="Tooltip text">
        <Button>Hover me</Button>
      </Tooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });
});


