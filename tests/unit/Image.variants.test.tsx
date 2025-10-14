import { render } from '@testing-library/react';
import { Image } from '../../src/index';

describe('Image variants (unit)', () => {
  it('renders zoomed wrapper when isZoomed', () => {
    const { container } = render(<Image alt="z" src="/z.png" isZoomed />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders blurred wrapper when isBlurred', () => {
    const { container } = render(<Image alt="b" src="/b.png" isBlurred />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('returns bare img when removeWrapper', () => {
    const { container } = render(<Image alt="r" src="/r.png" removeWrapper />);
    expect(container.querySelector('img')).toBeInTheDocument();
  });

  it('wraps when fallbackSrc provided', () => {
    const { container } = render(<Image alt="f" src="/f.png" fallbackSrc="/fallback.png" />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});


