import React from 'react';
import { mount } from 'cypress/react18';
import { Pagination } from '../../src';
import '../../src/styles/globals.css';

describe('Pagination ARIA and edge behavior', () => {
  it('sets aria-labels for prev/next buttons', () => {
    mount(<Pagination total={7} initialPage={3} showControls />);
    cy.get('[data-slot="prev"]').should('have.attr', 'aria-label', 'previous page button');
    cy.get('[data-slot="next"]').should('have.attr', 'aria-label', 'next page button');
  });

  it('prev is disabled on first page when loop=false', () => {
    mount(<Pagination total={5} initialPage={1} showControls loop={false} />);
    cy.get('[data-slot="prev"]').should('have.attr', 'data-disabled', 'true');
  });
});
