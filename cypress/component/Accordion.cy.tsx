import React from 'react';
import { mount } from 'cypress/react18';
import { Accordion, AccordionItem } from '../../src';
import "../../src/styles/globals.css";

describe('Accordion Component', () => {
  
  it('renders accordion headers', () => {
    mount(
      <Accordion disableAnimation>
        <AccordionItem title="Header 1" data-testid="item-1">Content 1</AccordionItem>
        <AccordionItem title="Header 2" data-testid="item-2">Content 2</AccordionItem>
      </Accordion>
    );
    cy.contains('Header 1').should('be.visible');
    cy.contains('Header 2').should('be.visible');
  });

  it('expands and collapses sections', () => {
    mount(
      <Accordion disableAnimation>
        <AccordionItem title="Header 1">Content 1</AccordionItem>
        <AccordionItem title="Header 2">Content 2</AccordionItem>
      </Accordion>
    );
    
    // Initially collapsed - use aria-expanded
    cy.contains('Header 1').closest('button').should('have.attr', 'aria-expanded', 'false');
    
    // Click to expand
    cy.contains('Header 1').click();
    cy.contains('Header 1').closest('button').should('have.attr', 'aria-expanded', 'true');
    cy.contains('Content 1').should('be.visible');
    
    // Click to collapse
    cy.contains('Header 1').click();
    cy.contains('Header 1').closest('button').should('have.attr', 'aria-expanded', 'false');
    cy.contains('Content 1').should('not.be.visible');
  });

  it('has correct ARIA attributes', () => {
    mount(
      <Accordion disableAnimation>
        <AccordionItem title="Header 1">Content 1</AccordionItem>
      </Accordion>
    );
    cy.contains('Header 1').closest('button').should('have.attr', 'aria-expanded', 'false');
    cy.contains('Header 1').click();
    cy.contains('Header 1').closest('button').should('have.attr', 'aria-expanded', 'true');
  });

  it('shows and hides dividers based on props', () => {
    mount(
      <Accordion showDivider={true} disableAnimation>
        <AccordionItem title="Header 1">Content 1</AccordionItem>
        <AccordionItem title="Header 2">Content 2</AccordionItem>
      </Accordion>
    );
    cy.get('hr').should('exist');
    
    mount(
      <Accordion showDivider={false} disableAnimation>
        <AccordionItem title="Header 1">Content 1</AccordionItem>
        <AccordionItem title="Header 2">Content 2</AccordionItem>
      </Accordion>
    );
    cy.get('hr').should('not.exist');
  });

  it('handles selection behavior toggle', () => {
    mount(
      <Accordion selectionBehavior="toggle" disableAnimation>
        <AccordionItem title="Header 1">Content 1</AccordionItem>
        <AccordionItem title="Header 2">Content 2</AccordionItem>
      </Accordion>
    );
    cy.contains('Header 1').click();
    cy.contains('Content 1').should('be.visible');

    cy.contains('Header 1').click();
    cy.contains('Content 1').should('not.be.visible');
    
    cy.contains('Header 2').click();
    cy.contains('Content 2').should('be.visible');
  });

  it('handles disabled state correctly', () => {
    mount(
      <Accordion disableAnimation>
        <AccordionItem title="Header 1" isDisabled={false}>
          Content 1
        </AccordionItem>
        <AccordionItem title="Header 2">
          Content 2
        </AccordionItem>
      </Accordion>
    );
    cy.contains('Header 1').click();
    cy.contains('Header 1').closest('button').should('have.attr', 'aria-expanded', 'true');
    cy.contains('Header 1').click();
    
    mount(
      <Accordion disableAnimation>
        <AccordionItem title="Header 1" isDisabled={true}>
          Content 1
        </AccordionItem>
        <AccordionItem title="Header 2">
          Content 2
        </AccordionItem>
      </Accordion>
    );
    cy.contains('Header 1').closest('button').should('have.attr', 'data-disabled', 'true');
    cy.contains('Content 1').should('not.be.visible');

    cy.contains('Header 2').click();
    cy.contains('Content 2').should('be.visible');
  });

  it('keeps content mounted when keepContentMounted=true', () => {
    mount(
      <Accordion keepContentMounted disableAnimation>
        <AccordionItem title="Header 1">KM Content 1</AccordionItem>
        <AccordionItem title="Header 2">KM Content 2</AccordionItem>
      </Accordion>
    );
    // Content exists in DOM even when collapsed
    cy.contains('KM Content 1').should('exist');
    cy.contains('KM Content 2').should('exist');
    // Expand and verify
    cy.contains('Header 1').click();
    cy.contains('KM Content 1').should('be.visible');
  });

  it('respects hideIndicator and supports custom indicator', () => {
    mount(
      <Accordion disableAnimation>
        <AccordionItem title="Header 1">Content 1</AccordionItem>
      </Accordion>
    );
    cy.contains('Header 1').closest('button').find('[aria-hidden="true"]').should('exist');

    mount(
      <Accordion disableAnimation>
        <AccordionItem title="Header 1" hideIndicator>
          Content 1
        </AccordionItem>
      </Accordion>
    );
    cy.contains('Header 1').closest('button').find('[aria-hidden="true"]').should('not.exist');

    mount(
      <Accordion disableAnimation>
        <AccordionItem title="Header 1" indicator={() => <span data-testid="custom-indicator">I</span>}>
          Content 1
        </AccordionItem>
      </Accordion>
    );
    cy.get('[data-testid="custom-indicator"]').should('exist');
  });

  it('renders startContent and subtitle when provided', () => {
    mount(
      <Accordion disableAnimation>
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
      <Accordion variant="splitted" showDivider disableAnimation>
        <AccordionItem title="Header 1">Content 1</AccordionItem>
        <AccordionItem title="Header 2">Content 2</AccordionItem>
      </Accordion>
    );
    cy.get('hr').should('not.exist');
  });

  it('selectionBehavior="replace" closes previously opened item', () => {
    mount(
      <Accordion selectionBehavior="replace" disableAnimation>
        <AccordionItem title="Header 1">Content 1</AccordionItem>
        <AccordionItem title="Header 2">Content 2</AccordionItem>
      </Accordion>
    );
    cy.contains('Header 1').click();
    cy.contains('Content 1').should('be.visible');
    cy.contains('Header 2').click();
    cy.contains('Content 2').should('be.visible');
    cy.contains('Content 1').should('not.be.visible');
  });

  it.skip('disableAnimation toggles data-open on content', () => {
    mount(
      <Accordion disableAnimation>
        <AccordionItem title="Header 1">
          Content 1
        </AccordionItem>
      </Accordion>
    );
    // Content wrapper has data-open attribute
    cy.contains('Content 1').parent().should('have.attr', 'data-open', 'false');
    cy.contains('Header 1').click();
    cy.contains('Content 1').parent().should('have.attr', 'data-open', 'true');
  });

  it('respects disabledKeys list to prevent opening disabled items', () => {
    mount(
      <Accordion disabledKeys={["1"]} disableAnimation>
        <AccordionItem key="1" title="Header 1">Content 1</AccordionItem>
        <AccordionItem key="2" title="Header 2">Content 2</AccordionItem>
      </Accordion>
    );
    cy.get('[data-disabled="true"]')
      .find('button')
      .should('be.disabled')
      .and('have.attr', 'aria-expanded', 'false');
  });

  it('disallowEmptySelection keeps one item open when toggling', () => {
    mount(
      <Accordion disallowEmptySelection defaultExpandedKeys={["1"]} disableAnimation>
        <AccordionItem key="1" title="Header 1">Content 1</AccordionItem>
        <AccordionItem key="2" title="Header 2">Content 2</AccordionItem>
      </Accordion>
    );
    // Initially item 1 open
    cy.contains('Content 1').should('be.visible');
    // Clicking open item should not close it when disallowEmptySelection is true
    cy.contains('Header 1').click();
    cy.contains('Header 1').closest('button').should('have.attr', 'aria-expanded', 'true');
    // Opening item 2 should still close item 1 (single selection default)
    cy.contains('Header 2').click();
    cy.contains('Content 2').should('be.visible');
    cy.contains('Content 1').should('not.be.visible');
  });

  it('applies compact and indicator animation props', () => {
    mount(
      <Accordion disableAnimation>
        <AccordionItem title="Header 1" isCompact disableIndicatorAnimation={false}>
          Content 1
        </AccordionItem>
      </Accordion>
    );
    // Ensure indicator is present and clickable
    cy.contains('Header 1').closest('button').find('[aria-hidden="true"]').should('exist');
    cy.contains('Header 1').click();
    cy.contains('Content 1').should('be.visible');
  });

});
