import React from 'react';
import { mount } from 'cypress/react18';
import { Modal, ModalContent, ModalBody } from '../../src';
import '../../src/styles/globals.css';

describe('Modal Extra Coverage', () => {
  it('backdrop opaque renders backdrop and closes on click', () => {
    mount(
      <Modal defaultOpen>
        <ModalContent>
          <ModalBody>Inside</ModalBody>
        </ModalContent>
      </Modal>
    );
    cy.contains('Inside').should('be.visible');
    cy.get('[data-slot="wrapper"]').prev().click({ force: true });
    cy.contains('Inside').should('not.exist');
  });
});
