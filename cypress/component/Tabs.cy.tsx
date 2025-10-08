import React from 'react';
import { mount } from 'cypress/react18';
import { Tabs, Tab } from '../../src';
import '../../src/styles/globals.css';

describe('Tabs Component', () => {
  it('renders and switches tabs', () => {
    mount(
      <Tabs>
        <Tab key="a" title="A">A Content</Tab>
        <Tab key="b" title="B">B Content</Tab>
      </Tabs>
    );
    cy.contains('A Content').should('be.visible');
    cy.contains('B').click();
    cy.contains('B Content').should('be.visible');
    cy.contains('A Content').should('not.exist');
  });

  it('respects disableAnimation', () => {
    mount(
      <Tabs disableAnimation>
        <Tab key="a" title="A">A Content</Tab>
        <Tab key="b" title="B">B Content</Tab>
      </Tabs>
    );
    cy.contains('A Content').should('be.visible');
  });

  it('renders wrapper when vertical placement', () => {
    mount(
      <Tabs isVertical>
        <Tab key="a" title="A">A Content</Tab>
        <Tab key="b" title="B">B Content</Tab>
      </Tabs>
    );
    cy.contains('A Content').should('be.visible');
  });
});
