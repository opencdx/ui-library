import React from 'react';
import { mount } from 'cypress/react18';
import { Image } from '../../src';
import '../../src/styles/globals.css';

describe('Image Component', () => {
  it('renders and sets alt attribute', () => {
    mount(<Image src="/public/opencdx.png" alt="Logo" />);
    cy.get('img[alt="Logo"]').should('exist');
  });
});
