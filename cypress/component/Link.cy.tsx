import React from 'react';
import { mount } from 'cypress/react18';
import { Link } from '../../src';
import '../../src/styles/globals.css';

describe('Link Component', () => {
  it('renders with href and target', () => {
    mount(<Link href="https://example.com" target="_blank">Go</Link>);
    cy.contains('Go').should('have.attr', 'href', 'https://example.com');
  });
});
