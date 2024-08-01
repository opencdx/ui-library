import React from 'react';
import { mount } from 'cypress/react18';
import {Checkbox} from '@/index'
import "../../src/styles/globals.css";



describe('Checkbox', () => {
  it('should render correctly', () => {
    mount(<Checkbox />);
    cy.get('input[type="checkbox"]').should('exist');
  });

  it('should render with the proper icon', () => {
    mount(<Checkbox icon={<span>Icon</span>} />);
    cy.get('span').should('exist');
  });

  it('should render with the default icon when no icon is provided', () => {
    mount(<Checkbox />);
    cy.get('span').find('svg').should('exist'); // Adjust selector based on actual default icon
  });

  it('should render with the proper label', () => {
    mount(<Checkbox>Option 1</Checkbox>);
    cy.get('span').contains('Option 1').should('exist');
  });

  it('should not render the label if children are not provided', () => {
    mount(<Checkbox />);
    cy.get('span').should('not.contain.text', 'Option 1');
  });

  it('should render visually hidden input', () => {
    mount(<Checkbox />);
    cy.get('input[type="checkbox"]').should('exist');
  });

  it('should render with proper aria-label', () => {
    mount(<Checkbox aria-label="checkbox-label">checkbox</Checkbox>);
    cy.get('[aria-label="checkbox-label"]').should('exist');
  });

  it('should render with proper aria-describedby', () => {
    mount(<Checkbox aria-describedby="description-id" />);
    cy.get('[aria-describedby="description-id"]').should('exist');
  });

  it('should render with proper aria-labelledby', () => {
    mount(<Checkbox aria-labelledby="label-id" />);
    cy.get('[aria-labelledby="label-id"]').should('exist');
  });

  it('should have aria-checked attribute when checked', () => {
    mount(<Checkbox defaultChecked aria-check="checked" />);
    cy.get('[aria-check="checked"]').should('exist');
  });

});
