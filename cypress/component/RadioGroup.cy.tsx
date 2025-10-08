import React from 'react';
import { mount } from 'cypress/react18';
import { RadioGroup, Radio } from '../../src';
import "../../src/styles/globals.css";

describe('RadioGroup Component', () => {
  it('renders with label and description', () => {
    mount(
      <RadioGroup label="Choose an option" description="Select one">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </RadioGroup>
    );
    cy.contains('Choose an option').should('be.visible');
    cy.contains('Select one').should('be.visible');
  });

  it('allows selection and updates state', () => {
    mount(
      <RadioGroup>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>
    );
    cy.contains('A').click();
    cy.contains('A').closest('label').find('input').should('be.checked');
    cy.contains('B').click();
    cy.contains('B').closest('label').find('input').should('be.checked');
    cy.contains('A').closest('label').find('input').should('not.be.checked');
  });

  it('respects defaultValue', () => {
    mount(
      <RadioGroup defaultValue="2">
        <Radio value="1">One</Radio>
        <Radio value="2">Two</Radio>
      </RadioGroup>
    );
    cy.contains('Two').closest('label').find('input').should('be.checked');
  });

  it('shows error message when isInvalid', () => {
    mount(
      <RadioGroup isInvalid errorMessage="Selection required">
        <Radio value="1">One</Radio>
      </RadioGroup>
    );
    cy.contains('Selection required').should('be.visible');
  });

  it('disables all radios when isDisabled on group', () => {
    mount(
      <RadioGroup isDisabled>
        <Radio value="1">One</Radio>
        <Radio value="2">Two</Radio>
      </RadioGroup>
    );
    cy.contains('One').closest('label').find('input').should('be.disabled');
    cy.contains('Two').closest('label').find('input').should('be.disabled');
  });

  it('disables individual radio when isDisabled on Radio', () => {
    mount(
      <RadioGroup>
        <Radio value="1" isDisabled>One</Radio>
        <Radio value="2">Two</Radio>
      </RadioGroup>
    );
    cy.contains('One').closest('label').find('input').should('be.disabled');
    cy.contains('Two').closest('label').find('input').should('not.be.disabled');
  });

  it('respects horizontal orientation', () => {
    mount(
      <RadioGroup orientation="horizontal">
        <Radio value="1">One</Radio>
        <Radio value="2">Two</Radio>
      </RadioGroup>
    );
    cy.get('[role="radiogroup"]').should('exist');
  });

  it('respects isRequired', () => {
    mount(
      <RadioGroup isRequired>
        <Radio value="1">One</Radio>
      </RadioGroup>
    );
    cy.get('[role="radiogroup"]').should('exist');
  });

  it('respects isReadOnly', () => {
    mount(
      <RadioGroup isReadOnly defaultValue="1">
        <Radio value="1">One</Radio>
        <Radio value="2">Two</Radio>
      </RadioGroup>
    );
    cy.contains('One').closest('label').find('input').should('be.checked');
    // Attempting to select Two should not work
    cy.contains('Two').click({ force: true });
    cy.contains('Two').closest('label').find('input').should('not.be.checked');
  });

  it('sets proper ARIA attributes', () => {
    mount(
      <RadioGroup aria-label="My group">
        <Radio value="1">One</Radio>
      </RadioGroup>
    );
    cy.get('[aria-label="My group"]').should('exist');
  });
});
