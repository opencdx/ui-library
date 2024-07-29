import React from 'react';
import { mount } from 'cypress/react18';
import { RadioGroup } from '@/index';
import "../../src/styles/globals.css";

describe('RadioGroup', () => {
  it('should render correctly', () => {
    mount(
      <RadioGroup>
        <input type="radio" value="option1" />
        <input type="radio" value="option2" />
      </RadioGroup>
    );
    cy.get('div').should('exist');
  });

  it('should render with the proper label', () => {
    mount(
      <RadioGroup label="Choose an option">
        <input type="radio" value="option1" />
        <input type="radio" value="option2" />
      </RadioGroup>
    );
    cy.get('span').contains('Choose an option').should('exist');
  });

  it('should render with the proper description', () => {
    mount(
      <RadioGroup description="Please select one option">
        <input type="radio" value="option1" />
        <input type="radio" value="option2" />
      </RadioGroup>
    );
    cy.get('div').contains('Please select one option').should('exist');
  });

  it('should render with the proper error message when isInvalid is true', () => {
    mount(
      <RadioGroup isInvalid errorMessage="Selection is required">
        <input type="radio" value="option1" />
        <input type="radio" value="option2" />
      </RadioGroup>
    );
    cy.get('div').contains('Selection is required').should('exist');
  });

  it('should render without error message when isInvalid is false', () => {
    mount(
      <RadioGroup>
        <input type="radio" value="option1" />
        <input type="radio" value="option2" />
      </RadioGroup>
    );
    cy.get('div').should('not.contain.text', 'Selection is required');
  });

  it('should render with the proper aria-label', () => {
    mount(
      <RadioGroup aria-label="radio-group">
        <input type="radio" value="option1" />
        <input type="radio" value="option2" />
      </RadioGroup>
    );
    cy.get('[aria-label="radio-group"]').should('exist');
  });

  it('should render with the proper aria-describedby', () => {
    mount(
      <RadioGroup aria-describedby="description-id" description="Group description">
        <input type="radio" value="option1" />
        <input type="radio" value="option2" />
      </RadioGroup>
    );
    cy.get('[aria-describedby="description-id"]').should('exist');
  });

  it('should render with the proper aria-labelledby', () => {
    mount(
      <RadioGroup aria-labelledby="label-id" label="Group label">
        <input type="radio" value="option1" />
        <input type="radio" value="option2" />
      </RadioGroup>
    );
    cy.get('[aria-labelledby="label-id"]').should('exist');
  });

  it('should render with the proper role', () => {
    mount(
      <RadioGroup role="radiogroup">
        <input type="radio" value="option1" />
        <input type="radio" value="option2" />
      </RadioGroup>
    );
    cy.get('[role="radiogroup"]').should('exist');
  });
});
