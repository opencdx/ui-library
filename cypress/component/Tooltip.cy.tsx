import React from 'react';
import { mount } from 'cypress/react18';
import { Tooltip, Button } from '../../src';
import '../../src/styles/globals.css';

describe('Tooltip Component', () => {
  it('renders content when forced open', () => {
    mount(
      <Tooltip content="Tip" isOpen disableAnimation>
        <button>Hover me</button>
      </Tooltip>
    );
    cy.contains('Tip').should('be.visible');
  });

  it('renders without animation when disableAnimation=true', () => {
    mount(
      <Tooltip content="Instant" disableAnimation isOpen>
        <button>Btn</button>
      </Tooltip>
    );
    cy.contains('Instant').should('be.visible');
  });

  it('warns and recovers when multiple children', () => {
    mount(
      <Tooltip content="X">
        <>
          <button>One</button>
          <span>Two</span>
        </>
      </Tooltip>
    );
    // Should not throw, but fallback renders nothing visible
    cy.contains('X').should('not.exist');
  });
});
