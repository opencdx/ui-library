import React from 'react';
import { mount } from 'cypress/react18';
import Divider from '../../src/divider/divider';
import '../../src/styles/globals.css';

describe('Divider Component', () => {
  it('renders hr for horizontal divider', () => {
    mount(<Divider />);
    cy.get('hr').should('exist');
  });

  it('renders div for vertical divider', () => {
    mount(<Divider orientation="vertical" />);
    cy.get('div[role="separator"]').should('exist');
  });
});
