import { render, screen } from '@testing-library/react';
import { Accordion, AccordionItem } from '../../src/index';

describe('Accordion (unit)', () => {
  it('renders items and titles', () => {
    render(
      <Accordion>
        <AccordionItem key="1" title="Section 1">Content 1</AccordionItem>
        <AccordionItem key="2" title="Section 2">Content 2</AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });
});


