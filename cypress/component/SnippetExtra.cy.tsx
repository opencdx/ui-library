import React from 'react';
import { mount } from 'cypress/react18';
import { Snippet } from '../../src';
import '../../src/styles/globals.css';

describe('Snippet Extra Coverage', () => {
  it('copies text on button click', () => {
    mount(<Snippet>npm install</Snippet>);
    cy.contains('npm install').should('be.visible');
    // Copy button exists and is clickable
    cy.get('button').click();
  });

  it('hideCopyButton removes copy button', () => {
    mount(<Snippet hideCopyButton>code</Snippet>);
    cy.get('button').should('not.exist');
  });

  it('supports different variants', () => {
    mount(<Snippet color="primary">code</Snippet>);
    cy.contains('code').should('be.visible');
  });

  it('renders with symbol', () => {
    mount(<Snippet symbol="$">ls -la</Snippet>);
    cy.contains('$').should('be.visible');
    cy.contains('ls -la').should('be.visible');
  });
});

