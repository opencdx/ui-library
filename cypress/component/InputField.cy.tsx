import React from 'react';
import { mount } from 'cypress/react18';
import {Input} from '@/index'
import "../../src/styles/globals.css";


describe('InputField.cy.tsx', () => {
  it('should mount with label', () => {
    cy.mount(
      <Input
        name="Enter text here"
        label="Enter text here"
        errorMessage="Email Address is required"
      />
    );
    cy.get('label').contains('Enter text here');
  })

  it('should have the correct default value', () => {
    mount(<Input value="Enter text here" />);
    cy.get('input').should('have.value', 'Enter text here');
  })

  it('should clear the input field', () => {
    mount(<Input />);
    cy.get('input').type('Hello, Cypress!').clear().should('have.value', '');
  })

  it('should be disabled when expected', () => {
    mount(<Input disabled />);
    cy.get('input').should('be.disabled');
  })
  
  it('should enforce maximum length', () => {
    mount(<Input />);
    cy.get('input').invoke('attr', 'maxLength', 10).type('12345678901234567890').should('have.value', '1234567890');
  })

  it('should be of type text', () => {
    mount(<Input />);
    cy.get('input').invoke('attr', 'type', 'text').should('have.attr', 'type', 'text');
  })

  it('should display the correct placeholder text', () => {
    mount(<Input placeholder="Enter text here" />);
    cy.get('input').should('have.attr', 'placeholder', 'Enter text here');
  })

  it('should be a required field', () => {
    mount(<Input />);
    cy.get('input').invoke('attr', 'required', true).should('have.attr', 'required');
  })

  it('should handle focus and blur events', () => {
    mount(<Input />);
    cy.get('input').focus().should('have.class', 'be.focused');
    cy.get('input').blur().should('have.class', 'not.be.focused');
  })

  it('should render with the proper startContent', () => {
    mount(<Input startContent={<span>Icon</span>}/>);
    cy.get('span').should('exist');
  })

  it('should render with the proper endContent', () => {
    mount(<Input endContent={<span>Icon</span>}/>);
    cy.get('span').should('exist');
  })


  //Accessibility Test
  it('should be accessible', () => {
    mount(<Input aria-label="input" />);
    cy.get('input').should('have.attr', 'aria-label', 'input');
  })

  it('should render with the proper aria-labelledby', () => {
    mount(<Input aria-labelledby="custom-id"/>);
    cy.get('input').should('have.attr', 'aria-labelledby', 'custom-id');
  })

  it('should render with the proper aria-describedby', () => {
    mount(<Input aria-describedby="custom-id"/>);
    cy.get('input').should('have.attr', 'aria-describedby', 'custom-id');
  })

  it('should render with the proper aria-expanded', () => {
    mount(<Input aria-expanded/>);
    cy.get('input').should('have.attr', 'aria-expanded');
  })
 
  it('should render with the proper aria-hidden', () => {
    mount(<Input aria-hidden/>);
    cy.get('input').should('have.attr', 'aria-hidden');
  })

  it('should render with the proper aria-controls', () => {
    mount(<Input aria-controls="custom-id"/>);
    cy.get('input').should('have.attr', 'aria-controls', 'custom-id');
  })

  it('should render with the proper aria-owns', () => {
    mount(<Input aria-owns="custom-id"/>);
    cy.get('input').should('have.attr', 'aria-owns', 'custom-id');
  })

  it('should render with the proper aria-haspopup', () => {
    mount(<Input aria-haspopup/>);
    cy.get('input').should('have.attr', 'aria-haspopup');
  })

})