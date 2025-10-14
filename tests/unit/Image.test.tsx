import { render } from '@testing-library/react';
import { Image } from '../../src/index';

describe('Image (unit)', () => {
  it('renders basic img', () => {
    const { container } = render(<Image alt="logo" src="/logo.png" />);
    expect(container.querySelector('img')).toBeInTheDocument();
  });
});


