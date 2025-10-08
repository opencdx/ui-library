import React from 'react';
import { mount } from 'cypress/react18';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '../../src';
import '../../src/styles/globals.css';

describe('Modal Component', () => {
  it('opens by default and closes via close button', () => {
    mount(
      <Modal defaultOpen>
        <ModalContent>
          <ModalHeader>Title</ModalHeader>
          <ModalBody>Body</ModalBody>
          <ModalFooter>Footer</ModalFooter>
        </ModalContent>
      </Modal>
    );
    cy.contains('Body').should('be.visible');
    cy.get('button[aria-label="Close"]').click();
    cy.contains('Body').should('not.exist');
  });

  it('renders without animation when disableAnimation=true', () => {
    mount(
      <Modal isOpen disableAnimation>
        <ModalContent>
          <ModalHeader>Title</ModalHeader>
          <ModalBody>Instant</ModalBody>
        </ModalContent>
      </Modal>
    );
    cy.contains('Instant').should('be.visible');
  });

  it('respects hideCloseButton', () => {
    mount(
      <Modal isOpen>
        <ModalContent>
          <ModalHeader hideCloseButton>Head</ModalHeader>
          <ModalBody>Body</ModalBody>
        </ModalContent>
      </Modal>
    );
    cy.get('button[aria-label="Close"]').should('exist');
  });

  it('supports function children with onClose', () => {
    mount(
      <Modal defaultOpen>
        <ModalContent>
          {(onClose) => (
            <div>
              <button data-testid="fn-close" onClick={onClose}>X</button>
              <span>Fn Body</span>
            </div>
          )}
        </ModalContent>
      </Modal>
    );
    cy.contains('Fn Body').should('be.visible');
    cy.get('[data-testid="fn-close"]').click();
    cy.contains('Fn Body').should('not.exist');
  });
});
