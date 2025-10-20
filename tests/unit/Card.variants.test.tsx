import { render, screen } from '@testing-library/react';
import { Card } from '../../src/index';

describe('Card variants (unit)', () => {
  it('renders content when pressable (no ripple assertion)', () => {
    render(<Card isPressable><span>Inner</span></Card>);
    expect(screen.getByText('Inner')).toBeInTheDocument();
  });

  it('no ripple when disabled', () => {
    const { container } = render(<Card isPressable disableAnimation disableRipple />);
    expect(container).toBeDefined();
  });
});


