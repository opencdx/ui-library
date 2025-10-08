import React from 'react';
import { mount } from 'cypress/react18';
import { Breadcrumbs, BreadcrumbItem } from '../../src';
import '../../src/styles/globals.css';

describe('Breadcrumbs Extra Coverage', () => {
  it('renders custom separator', () => {
    mount(
      <Breadcrumbs separator=">">
        <BreadcrumbItem href="#home">Home</BreadcrumbItem>
        <BreadcrumbItem href="#lib">Library</BreadcrumbItem>
      </Breadcrumbs>
    );
    cy.contains('>').should('exist');
  });

  it('collapses items when maxItems is exceeded', () => {
    mount(
      <Breadcrumbs maxItems={3}>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Docs</BreadcrumbItem>
        <BreadcrumbItem>Guide</BreadcrumbItem>
        <BreadcrumbItem>Components</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumbs</BreadcrumbItem>
      </Breadcrumbs>
    );
    // Should show ellipsis
    cy.get('svg').should('exist'); // EllipsisIcon
  });

  it('disables non-current items when isDisabled', () => {
    mount(
      <Breadcrumbs isDisabled>
        <BreadcrumbItem href="#home">Home</BreadcrumbItem>
        <BreadcrumbItem href="#lib">Library</BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumbs>
    );
    // Last item should NOT be disabled
    cy.contains('Current').should('not.have.attr', 'data-disabled', 'true');
  });

  it('calls onAction when item is clicked', () => {
    const onAction = cy.stub();
    mount(
      <Breadcrumbs onAction={onAction}>
        <BreadcrumbItem key="home">Home</BreadcrumbItem>
        <BreadcrumbItem key="lib">Library</BreadcrumbItem>
      </Breadcrumbs>
    );
    cy.contains('Home').click().then(() => {
      expect(onAction).to.have.been.calledWith('home');
    });
  });

  it('respects itemsBeforeCollapse and itemsAfterCollapse', () => {
    mount(
      <Breadcrumbs maxItems={4} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
        <BreadcrumbItem>A</BreadcrumbItem>
        <BreadcrumbItem>B</BreadcrumbItem>
        <BreadcrumbItem>C</BreadcrumbItem>
        <BreadcrumbItem>D</BreadcrumbItem>
        <BreadcrumbItem>E</BreadcrumbItem>
      </Breadcrumbs>
    );
    cy.contains('A').should('exist');
    cy.contains('E').should('exist');
    // Middle items collapsed
    cy.get('svg').should('exist');
  });
});

