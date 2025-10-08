import React from 'react';
import { mount } from 'cypress/react18';
import { User } from '../../src';
import '../../src/styles/globals.css';

describe('User Component', () => {
  it('renders name and description', () => {
    mount(<User name="Jane Doe" description="Developer" />);
    cy.contains('Jane Doe').should('be.visible');
    cy.contains('Developer').should('be.visible');
  });

  it('renders with avatar props', () => {
    mount(
      <User
        name="John"
        description="Admin"
        avatarProps={{ src: '/public/opencdx.png', alt: 'Avatar' }}
      />
    );
    cy.get('img[alt="Avatar"]').should('exist');
    cy.contains('John').should('be.visible');
  });

  it('respects isFocusable prop', () => {
    mount(<User name="Alice" isFocusable />);
    cy.contains('Alice').closest('[tabindex]').should('have.attr', 'tabindex', '0');
  });

  it('renders as button when as="button"', () => {
    mount(<User name="Bob" as="button" />);
    cy.get('button').contains('Bob').should('exist');
    cy.get('button').should('have.attr', 'tabindex', '0');
  });

  it('applies custom classNames', () => {
    mount(
      <User
        name="Charlie"
        classNames={{ base: 'custom-base', name: 'custom-name' }}
      />
    );
    cy.contains('Charlie').should('have.class', 'custom-name');
  });

  it('renders without description', () => {
    mount(<User name="Dana" />);
    cy.contains('Dana').should('be.visible');
  });
});

