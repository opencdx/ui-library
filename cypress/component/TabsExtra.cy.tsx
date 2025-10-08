import React from 'react';
import { mount } from 'cypress/react18';
import { Tabs, Tab } from '../../src';
import '../../src/styles/globals.css';

describe('Tabs Extra Coverage', () => {
  it('destroyInactiveTabPanel removes content of inactive tabs', () => {
    mount(
      <Tabs destroyInactiveTabPanel>
        <Tab key="a" title="A">A Content</Tab>
        <Tab key="b" title="B">B Content</Tab>
      </Tabs>
    );
    cy.contains('B').click();
    cy.contains('A Content').should('not.exist');
  });

  it('disableCursorAnimation prevents cursor rendering', () => {
    mount(
      <Tabs disableCursorAnimation>
        <Tab key="a" title="A">A</Tab>
        <Tab key="b" title="B">B</Tab>
      </Tabs>
    );
    cy.get('[data-slot="cursor"]').should('not.exist');
  });
});
