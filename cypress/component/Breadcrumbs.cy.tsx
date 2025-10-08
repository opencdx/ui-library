import React from 'react';
import { mount } from 'cypress/react18';
import { Breadcrumbs, BreadcrumbItem } from '../../src';
import '../../src/styles/globals.css';

describe('Breadcrumbs Component', () => {
  it('renders items and separators', () => {
    mount(
      <Breadcrumbs>
        <BreadcrumbItem href="#home">Home</BreadcrumbItem>
        <BreadcrumbItem href="#lib">Library</BreadcrumbItem>
        <BreadcrumbItem href="#data">Data</BreadcrumbItem>
      </Breadcrumbs>
    );
    cy.contains('Home').should('be.visible');
    cy.contains('Library').should('be.visible');
    cy.contains('Data').should('be.visible');
  });
});
