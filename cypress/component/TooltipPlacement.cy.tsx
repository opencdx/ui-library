import React from 'react';
import { mount } from 'cypress/react18';
import { Tooltip } from '../../src';
import '../../src/styles/globals.css';

describe('Tooltip placement and motion', () => {
  it('supports different placements', () => {
    mount(
      <Tooltip content="Tip" isOpen disableAnimation placement="top">
        <button>Btn</button>
      </Tooltip>
    );
    cy.contains('Tip').should('be.visible');
  });

  it('accepts custom motionProps', () => {
    mount(
      <Tooltip content="Tip2" isOpen motionProps={{ role: 'tooltip' }}>
        <button>Btn2</button>
      </Tooltip>
    );
    cy.contains('Tip2').should('be.visible');
  });
});
