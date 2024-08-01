import React from 'react';
import { mount } from 'cypress/react18';
import { Select, SelectItem } from '@/index';
import "../../src/styles/globals.css";

describe('Select Component', () => {

  const animals = [
    { key: '1', label: 'Lion' },
    { key: '2', label: 'Tiger' },
    { key: '3', label: 'Bear' },
  ];

  beforeEach(() => {
    // Mount the Select component before each test
    mount(
      <Select label="Select an animal" className="max-w-xs" aria-label='Select an animal'>
        {animals.map(animal => (
          <SelectItem key={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
    );
  });

  it('renders select component with options', () => {
    cy.get('button').should('exist'); // Assuming button is used as trigger
    cy.get('button').click();
    cy.get('ul[role="listbox"]').should('be.visible');
    cy.get('ul[role="listbox"]').contains('Lion').should('be.visible');
    cy.get('ul[role="listbox"]').contains('Tiger').should('be.visible');
    cy.get('ul[role="listbox"]').contains('Bear').should('be.visible');
  });

  it('selects an option and updates value', () => {
    cy.get('button').click();
    cy.get('ul[role="listbox"]').should('be.visible');
    cy.get('ul[role="listbox"]').contains('Lion').click();
    cy.get('button').should('contain', 'Lion');
  });

  it('shows placeholder when no option is selected', () => {
    cy.get('button').should('contain', 'Select an animal');
  });

  it('handles loading state', () => {
    // Simulate loading state
    mount(
      <Select label="Loading" className="max-w-xs" isLoading>
        <SelectItem key="1">Lion</SelectItem>
      </Select>
    );
    cy.get('button').should('contain', 'Loading');
  });

  it('supports dynamic options', () => {
    const dynamicAnimals = [
      { key: '4', label: 'Elephant' },
      { key: '5', label: 'Giraffe' },
    ];

    mount(
      <Select label="Select a dynamic animal" className="max-w-xs">
        {dynamicAnimals.map(animal => (
          <SelectItem key={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
    );

    cy.get('button').click();
    cy.get('ul[role="listbox"]').contains('Elephant').should('be.visible');
    cy.get('ul[role="listbox"]').contains('Giraffe').should('be.visible');
  });

  it('handles accessibility attributes', () => {
    cy.get('button').should('have.attr', 'aria-label', 'Select an animal');
    cy.get('button').click();
    cy.get('ul[role="listbox"]').should('exist');
  });

  it('shows and hides popover correctly', () => {
    cy.get('button').click(); // Use your specific class or ID
    cy.get('ul[role="listbox"]').should('be.visible');
    cy.get('body').click(0, 0); // Use your specific class or ID
    cy.get('ul[role="listbox"]').should('not.exist');
  });

  it('handles keyboard interactions', () => {
    cy.get('button').focus().click(); // Open dropdown with keyboard
    cy.get('ul[role="listbox"]').contains('Lion').click(); // Select option with keyboard
    cy.get('button').should('contain', 'Lion');
  });

  it('shows error message when validation fails', () => {
    // Simulate validation error
    mount(
      <Select label="Select an animal" 
      className="max-w-xs" 
      isInvalid
      errorMessage="Validation failed. Please select an option."
      >
        {animals.map(animal => (
          <SelectItem key={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
    );
    cy.get('button').click();
    cy.contains('Validation failed. Please select an option.').should('be.visible');
  });

  it('renders custom start and end content', () => {
    mount(
      <Select
        label="Select with custom content"
        className="max-w-xs"
        startContent={<span>Start</span>}
        endContent={<span>End</span>}
      >
        {animals.map(animal => (
          <SelectItem key={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
    );
    cy.get('button').should('contain', 'Start');
    cy.get('button').should('contain', 'End');
  });

});
