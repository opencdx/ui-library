import React from 'react';
import { mount } from 'cypress/react18';
import { Snippet } from '../../src';
import '../../src/styles/globals.css';

describe('Snippet Component', () => {
  it('renders content and copy button', () => {
    mount(<Snippet>console.log('x')</Snippet>);
    cy.contains("console.log('x')").should('be.visible');
  });
});
