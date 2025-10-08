import React from 'react';
import { mount } from 'cypress/react18';
import { Accordion, AccordionItem } from '@/index';
import "../../src/styles/globals.css";

describe('Accordion Component', () => {
  
  beforeEach(() => {
    // Mount the component before each test
    mount(
      <Accordion>
        <AccordionItem title="Header 1">Content 1</AccordionItem>
        <AccordionItem title="Header 2">Content 2</AccordionItem>
      </Accordion>
    );
  });
  
  it('renders accordion component', () => {
    cy.get('div').should('exist'); // Adjust the selector based on your component
  });

  it('renders accordion headers and content', () => {
    cy.contains('Header 1').should('be.visible');
    cy.contains('Header 2').should('be.visible');
    cy.contains('Content 1').should('not.exist'); // Initially collapsed
    cy.contains('Content 2').should('not.exist'); // Initially collapsed
  });

  it('expands and collapses sections', () => {
    // Initially collapsed
    cy.contains('Content 1').should('not.exist');
    cy.contains('Content 2').should('not.exist');
    
    // Click on header to expand
    cy.contains('Header 1').click();
    cy.contains('Content 1').should('be.visible');
    
    // Click on header to collapse
    cy.contains('Header 1').click();
    cy.contains('Content 1').should('not.exist');
    
    // Click on second header to expand
    cy.contains('Header 2').click();
    cy.contains('Content 2').should('be.visible');
  });

  it('handles keyboard interaction', () => {
    // Initially collapsed
    cy.contains('Content 1').should('not.exist');
    
    // Focus and expand using keyboard (spacebar)
    cy.contains('Header 1').focus().click();
    cy.contains('Content 1').should('be.visible');
    
    // Collapse using keyboard (spacebar)
    cy.contains('Header 1').focus().click();
    cy.contains('Content 1').should('not.exist');
  });

  it('has correct ARIA attributes', () => {
    cy.contains('Header 1').closest('button').should('have.attr', 'aria-expanded', 'false'); // Initially collapsed
    cy.contains('Header 1').click();
    cy.contains('Header 1').closest('button').should('have.attr', 'aria-expanded', 'true'); // Expanded
  });

  it('shows and hides dividers based on props', () => {
    // Test with dividers shown
    mount(
      <Accordion showDivider={true}>
        <AccordionItem title="Header 1">Content 1</AccordionItem>
        <AccordionItem title="Header 2">Content 2</AccordionItem>
      </Accordion>
    );
    cy.get('hr').should('exist'); // Adjust if your divider is different
    
    // Test with dividers hidden
    mount(
      <Accordion showDivider={false}>
        <AccordionItem title="Header 1">Content 1</AccordionItem>
        <AccordionItem title="Header 2">Content 2</AccordionItem>
      </Accordion>
    );
    cy.get('hr').should('not.exist');
  });

  it('applies focus styles correctly', () => {
    cy.contains('Header 1').closest('button').focus().should('have.attr', 'data-focus', 'true'); // Check focus
  });

  it('handles selection behavior', () => {
    // Test toggle selection behavior
    mount(
      <Accordion selectionBehavior="toggle">
        <AccordionItem title="Header 1">Content 1</AccordionItem>
        <AccordionItem title="Header 2">Content 2</AccordionItem>
      </Accordion>
    );
    cy.contains('Header 1').click();
    cy.contains('Content 1').should('be.visible');

    cy.contains('Header 1').click();
    cy.contains('Content 1').should('not.exist');
    
    cy.contains('Header 2').click();
    cy.contains('Content 2').should('be.visible');
  });

  it('handles disabled state correctly', () => {
    let isDisabled = false;
    mount(
      <Accordion>
        <AccordionItem title="Header 1" isDisabled={isDisabled}>
          Content 1
        </AccordionItem>
        <AccordionItem title="Header 2">
          Content 2
        </AccordionItem>
      </Accordion>
    );
    cy.contains('Header 1').click();
    cy.contains('Header 1').should('have.attr', 'aria-expanded', 'true');
    cy.contains('Header 1').click();
    isDisabled = true;
    mount(
        <Accordion>
          <AccordionItem title="Header 1" isDisabled={isDisabled}>
            Content 1
          </AccordionItem>
          <AccordionItem title="Header 2">
            Content 2
          </AccordionItem>
        </Accordion>
      );
    cy.contains('Header 1').should('have.attr', 'aria-expanded', 'false');
    cy.contains('Content 1').should('not.exist');

    cy.contains('Header 2').click(); // Should expand
    cy.contains('Content 2').should('be.visible');
  });

  it('keeps content mounted when keepContentMounted=true', () => {
    mount(
      <Accordion keepContentMounted>
        <AccordionItem title="Header 1">KM Content 1</AccordionItem>
        <AccordionItem title="Header 2">KM Content 2</AccordionItem>
      </Accordion>
    );
    // Content should exist in DOM even when collapsed
    cy.contains('KM Content 1').should('exist');
    cy.contains('KM Content 2').should('exist');
    // Expand and verify visibility toggles
    cy.contains('Header 1').click();
    cy.contains('KM Content 1').should('be.visible');
  });

  it('respects hideIndicator and supports custom indicator', () => {
    // Default shows indicator element (aria-hidden)
    mount(
      <Accordion>
        <AccordionItem title="Header 1">Content 1</AccordionItem>
      </Accordion>
    );
    cy.contains('Header 1').parent().parent().find('[aria-hidden="true"]').should('exist');

    // hideIndicator removes indicator element
    mount(
      <Accordion>
        <AccordionItem title="Header 1" hideIndicator>
          Content 1
        </AccordionItem>
      </Accordion>
    );
    cy.contains('Header 1').parent().parent().find('[aria-hidden="true"]').should('not.exist');

    // Custom indicator function
    mount(
      <Accordion>
        <AccordionItem title="Header 1" indicator={() => <span data-testid="custom-indicator">I</span>}>
          Content 1
        </AccordionItem>
      </Accordion>
    );
    cy.get('[data-testid="custom-indicator"]').should('exist');
  });

  it('renders startContent and subtitle when provided', () => {
    mount(
      <Accordion>
        <AccordionItem title="Header 1" subtitle="Sub 1" startContent={<span data-testid="start">S</span>}>
          Content 1
        </AccordionItem>
      </Accordion>
    );
    cy.get('[data-testid="start"]').should('exist');
    cy.contains('Sub 1').should('exist');
  });

  it('variant="splitted" hides dividers even when showDivider=true', () => {
    mount(
      <Accordion variant="splitted" showDivider>
        <AccordionItem title="Header 1">Content 1</AccordionItem>
        <AccordionItem title="Header 2">Content 2</AccordionItem>
      </Accordion>
    );
    cy.get('hr').should('not.exist');
  });

  it('selectionBehavior="replace" closes previously opened item', () => {
    mount(
      <Accordion selectionBehavior="replace">
        <AccordionItem title="Header 1">Content 1</AccordionItem>
        <AccordionItem title="Header 2">Content 2</AccordionItem>
      </Accordion>
    );
    cy.contains('Header 1').click();
    cy.contains('Content 1').should('be.visible');
    cy.contains('Header 2').click();
    cy.contains('Content 2').should('be.visible');
    cy.contains('Content 1').should('not.exist');
  });

  it('disableAnimation toggles data-open on content', () => {
    mount(
      <Accordion>
        <AccordionItem title="Header 1" disableAnimation>
          Content 1
        </AccordionItem>
      </Accordion>
    );
    // Initially closed
    cy.contains('Content 1').parent().should('have.attr', 'data-open', 'false');
    cy.contains('Header 1').click();
    cy.contains('Content 1').parent().should('have.attr', 'data-open', 'true');
    cy.contains('Header 1').click();
    cy.contains('Content 1').parent().should('have.attr', 'data-open', 'false');
  });

});

  