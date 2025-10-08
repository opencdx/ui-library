import React from 'react';
import { mount } from 'cypress/react18';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '../../src';
import '../../src/styles/globals.css';

describe('Dropdown Component', () => {
  it('opens and selects an item', () => {
    mount(
      <Dropdown>
        <DropdownTrigger>
          <Button>Open</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Actions">
          <DropdownItem key="a">A</DropdownItem>
          <DropdownItem key="b">B</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    cy.contains('Open').click();
    cy.contains('A').click();
  });
});
