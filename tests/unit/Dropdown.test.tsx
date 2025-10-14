import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '../../src/index';

describe('Dropdown (unit)', () => {
  it('renders trigger and menu structure', async () => {
    const user = userEvent.setup();
    render(
      <Dropdown>
        <DropdownTrigger>
          <Button>Open</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="new">New</DropdownItem>
          <DropdownItem key="copy">Copy</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    const trigger = screen.getByRole('button', { name: /Open/i });
    expect(trigger).toBeInTheDocument();
    await user.click(trigger);
    // Items appear in popover; query by role 'menuitem' or fall back to text
    expect(await screen.findByRole('menuitem', { name: /New/i })).toBeInTheDocument();
    expect(await screen.findByRole('menuitem', { name: /Copy/i })).toBeInTheDocument();
  });
});


