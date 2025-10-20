import { test, expect } from '../fixtures/coverage';
import { Accordion, AccordionItem } from '../../src/index';

test.describe('Accordion', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(
      <Accordion>
        <AccordionItem key="1" title="Section 1">
          Content 1
        </AccordionItem>
        <AccordionItem key="2" title="Section 2">
          Content 2
        </AccordionItem>
      </Accordion>
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText('Section 1');
    await expect(component).toContainText('Section 2');
  });

  test('should expand on click', async ({ mount }) => {
    const component = await mount(
      <Accordion>
        <AccordionItem key="1" title="Click me">
          Hidden content
        </AccordionItem>
      </Accordion>
    );
    await component.getByText('Click me').click();
    await expect(component).toContainText('Hidden content');
  });
});

