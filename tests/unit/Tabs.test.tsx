import { render, screen } from '@testing-library/react';
import { Tabs, Tab } from '../../src/index';

describe('Tabs (unit)', () => {
  it('renders tabs and first content by default', () => {
    render(
      <Tabs>
        <Tab key="tab1" title="Tab 1">Content 1</Tab>
        <Tab key="tab2" title="Tab 2">Content 2</Tab>
      </Tabs>
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });
});


