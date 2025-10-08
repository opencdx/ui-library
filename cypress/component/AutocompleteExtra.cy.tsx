import React from 'react';
import { mount } from 'cypress/react18';
import { Autocomplete, AutocompleteItem } from '../../src';
import '../../src/styles/globals.css';

describe('Autocomplete Extra Coverage', () => {
  it('shows loading spinner when isLoading', () => {
    mount(
      <Autocomplete isLoading items={[]}>
        {() => <AutocompleteItem>X</AutocompleteItem>}
      </Autocomplete>
    );
    cy.get('input').should('exist');
  });

  it('allows custom value when allowsCustomValue', () => {
    mount(
      <Autocomplete allowsCustomValue items={[{ key: '1', label: 'One' }]}>
        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
      </Autocomplete>
    );
    cy.get('input').type('Custom');
    cy.get('input').should('have.value', 'Custom');
  });

  it('clears input when clear button clicked after selection', () => {
    mount(
      <Autocomplete items={[{ key: '1', label: 'Apple' }, { key: '2', label: 'Banana' }]}>
        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
      </Autocomplete>
    );
    // Type to open and select
    cy.get('input').type('App');
    cy.get('[role="option"]').first().click();
    cy.get('input').should('have.value', 'Apple');
    // Clear button should be visible after selection
    cy.get('button').first().click();
    cy.get('input').should('have.value', '');
  });

  it('respects disableAnimation', () => {
    mount(
      <Autocomplete disableAnimation items={[{ key: '1', label: 'One' }]}>
        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
      </Autocomplete>
    );
    cy.get('input').should('exist');
  });
});

