import React from 'react';
import { mount } from 'cypress/react18';
import { Input } from '../../src';
import '../../src/styles/globals.css';

describe('Input Extra Coverage', () => {
  it('renders with startContent and endContent', () => {
    mount(
      <Input
        startContent={<span data-testid="start">@</span>}
        endContent={<span data-testid="end">.com</span>}
      />
    );
    cy.get('[data-testid="start"]').should('exist');
    cy.get('[data-testid="end"]').should('exist');
  });

  it('shows clear button when onClear provided and has value', () => {
    mount(<Input onClear={() => {}} />);
    cy.get('input').type('test');
    cy.get('[data-slot="clear-button"]').should('exist');
    cy.get('[data-slot="clear-button"]').click();
    cy.get('input').should('have.value', '');
  });

  it('calls onClear when clear button clicked', () => {
    const onClear = cy.stub();
    mount(<Input onClear={onClear} />);
    cy.get('input').type('test');
    cy.get('[data-slot="clear-button"]').click().then(() => {
      expect(onClear).to.have.been.called;
    });
  });

  it('shows error message when isInvalid', () => {
    mount(<Input isInvalid errorMessage="Required field" />);
    cy.contains('Required field').should('be.visible');
  });

  it('supports different sizes', () => {
    mount(<Input size="sm" />);
    cy.get('input').should('exist');
  });

  it('respects isReadOnly', () => {
    mount(<Input isReadOnly defaultValue="readonly" />);
    cy.get('input').should('have.attr', 'readonly');
  });

  it('respects isDisabled', () => {
    mount(<Input isDisabled />);
    cy.get('input').should('be.disabled');
  });
});

