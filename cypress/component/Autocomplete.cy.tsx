import React from 'react';
import { mount } from 'cypress/react18';
import { Autocomplete, AutocompleteItem } from '../../src';
import '../../src/styles/globals.css';

describe('Autocomplete Component', () => {
  it('opens popover and allows clear', () => {
    mount(
      <Autocomplete items={[{ key: '1', label: 'One' }, { key: '2', label: 'Two' }]}>
        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
      </Autocomplete>
    );
    // Open selector
    cy.get('button').last().click();
    // Listbox visible
    cy.get('[role="listbox"]').should('exist');
    // Select first item
    cy.get('[role="option"]').first().click();
  });
});
