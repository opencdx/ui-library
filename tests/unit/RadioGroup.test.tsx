import { render, screen } from '@testing-library/react';
import { RadioGroup, Radio } from '../../src/index';

describe('RadioGroup (unit)', () => {
  it('renders options and default selection', () => {
    render(
      <RadioGroup defaultValue="selected">
        <Radio value="selected">Pre-selected</Radio>
        <Radio value="other">Other</Radio>
      </RadioGroup>
    );
    expect(screen.getByDisplayValue('selected')).toBeChecked();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });
});


