
import React from 'react';
import { mount } from 'cypress/react18';
import {Switch} from '@/index'
import "../../src/styles/globals.css";


describe('Switch', () => {

  it('should render with the proper id', () => {
    mount(<Switch id="custom-id">Switch</Switch>);
    cy.get('[id="custom-id"]').should('have.id', 'custom-id');
  })

  it('should have the correct default state', () => {
    mount(<Switch />);
    cy.get('input[type="checkbox"]').should('not.be.checked');
  });

  it('should render with the proper startContent', () => {
    mount(<Switch startContent={<span>Icon</span>}>Switch</Switch>);
    cy.get('span').should('exist');
  })


  it('should render with the proper endContent', () => {
    mount(<Switch endContent={<span>Icon</span>}>ButSwitchton</Switch>);
    cy.get('span').should('exist');
  })

  it('should be disabled when expected', () => {
    mount(<Switch isDisabled={true} />);
    cy.get('input[type="checkbox"]').should('be.disabled');
  });

  it('should be disable animation when expected', () => {
    mount(<Switch disableAnimation={true} />);
    cy.get('input[type="checkbox"]').should('have.prop', 'disabled', false);
  });

  //Accessibility Test
  it('should be accessible', () => {
    mount(<Switch aria-label="switch-label">switch</Switch>);
    cy.get('[aria-label="switch-label"]').should('exist');
  })

  it('should render with the proper aria-labelledby', () => {
    mount(<Switch aria-labelledby="custom-id">switch</Switch>);
    cy.get('[aria-labelledby="custom-id"]').should('have.attr', 'aria-labelledby', 'custom-id');
  })

  it('should render with the proper aria-describedby', () => {
    mount(<Switch aria-describedby="custom-id">switch</Switch>);
    cy.get('[aria-describedby="custom-id"]').should('have.attr', 'aria-describedby', 'custom-id');
  })

  it('should render with the proper aria-owns', () => {
    mount(<Switch aria-owns="custom-id">switch</Switch>);
    cy.get('[aria-owns="custom-id"]').should('have.attr', 'aria-owns', 'custom-id');
  })
}
)


