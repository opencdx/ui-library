import React from 'react';
import { mount } from 'cypress/react18';
import { Card, CardHeader, CardBody, CardFooter, Link, Button } from '../../src';
import '../../src/styles/globals.css';

describe('Card Component', () => {
  it('renders header, body, and footer', () => {
    mount(
      <Card>
        <CardHeader>Head</CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>
          <Link href="#">Link</Link>
          <Button>Ok</Button>
        </CardFooter>
      </Card>
    );
    cy.contains('Head').should('be.visible');
    cy.contains('Body').should('be.visible');
    cy.contains('Ok').should('be.visible');
  });
});
