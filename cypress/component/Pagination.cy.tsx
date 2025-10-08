import React from 'react';
import { mount } from 'cypress/react18';
import { Pagination } from '../../src';
import '../../src/styles/globals.css';

describe('Pagination Component', () => {
  it('navigates between pages with controls', () => {
    mount(<Pagination total={5} initialPage={2} showControls />);
    cy.get('[data-slot="base"]').should('have.attr', 'data-active-page', '2');
    cy.get('[data-slot="next"]').click();
    cy.get('[data-slot="base"]').should('have.attr', 'data-active-page', '3');
    cy.get('[data-slot="prev"]').click();
    cy.get('[data-slot="base"]').should('have.attr', 'data-active-page', '2');
  });

  it('dots jump moves by configured amount', () => {
    mount(
      <Pagination
        total={20}
        initialPage={10}
        dotsJump={5}
        renderItem={({ value, children, onPress, getAriaLabel, className, index }) => (
          <button
            key={`${value}-${index}`}
            data-testid={`pg-${value}-${index}`}
            aria-label={getAriaLabel?.(value)}
            className={className}
            onClick={() => onPress?.({} as any)}
          >
            {children}
          </button>
        )}
      />
    );
    cy.get('[data-testid^="pg-dots-"]').first().click();
    cy.get('[data-slot="base"]').invoke('attr', 'data-active-page').then(Number).should('be.lt', 10);
  });

  it('respects loop behavior', () => {
    mount(<Pagination total={3} initialPage={3} showControls loop />);
    cy.get('[data-slot="next"]').click();
    cy.get('[data-slot="base"]').should('have.attr', 'data-active-page', '1');
  });

  it('renders without cursor animation when disabled', () => {
    mount(<Pagination total={5} disableAnimation disableCursorAnimation />);
    cy.get('[data-slot="cursor"]').should('not.exist');
  });
});
