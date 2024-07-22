import React from 'react';
import { mount } from 'cypress/react18';
import {Button} from '@/index'
import "../../src/styles/globals.css";

describe('Button', () => {
  it('uses custom text for the button label', () => {
    mount(<Button>Click me!</Button>)
    cy.get('button').should('contains.text', 'Click me!')
  })
 it('should render correctly', () => {
    mount(<Button>Click me!</Button>)

    cy.get('button').should('exist')
  }
  )
  it('should render with the proper color', () => {
    mount(<Button color="primary">Button</Button>);

    cy.get('button').should('have.class', 'bg-primary');
  }
  )
  it('should render with the proper size', () => {
    mount(<Button size="lg">Button</Button>);

    cy.get('button').should('have.class', 'px-6');
  }
  )
  it('should render with the proper radius', () => {
    mount(<Button radius="full">Button</Button>);

    cy.get('button').should('have.class', 'rounded-full');
  }
  )
  it('should render with the proper variant', () => {
    mount(<Button variant="flat">Button</Button>);

    cy.get('button').should('have.class', 'rounded-medium');
  }
  )

  it('should render with the proper fullWidth', () => {
    mount(<Button fullWidth>Button</Button>);

    cy.get('button').should('have.class', 'w-full');
  }
  ) 
 
  it('should render with the proper startContent', () => {
    mount(<Button startContent={<span>Icon</span>}>Button</Button>);

    cy.get('span').should('exist');
  }
  )
  it('should render with the proper endContent', () => {
    mount(<Button endContent={<span>Icon</span>}>Button</Button>);

    cy.get('span').should('exist');
  }
  )
  it('should render with the proper type', () => {
    mount(<Button type="submit">Button</Button>);

    cy.get('button').should('have.attr', 'type', 'submit');
  }
  )
  it('should render with the proper onClick', () => {
    mount(<Button onClick={() => {}}>Button</Button>);

    cy.get('button').click();
  }
  )
 
  it('should render with the proper className', () => {
    mount(<Button className="custom-class">Button</Button>);

    cy.get('button').should('have.class', 'custom-class');
  }
  )
  it('should render with the proper id', () => {
    mount(<Button id="custom-id">Button</Button>);

    cy.get('button').should('have.id', 'custom-id');
  }
  )

  it('should render with the proper aria-label', () => {
    mount(<Button aria-label="custom-label">Button</Button>);

    cy.get('button').should('have.attr', 'aria-label', 'custom-label');
  }
  )
  it('should render with the proper aria-labelledby', () => {
    mount(<Button aria-labelledby="custom-id">Button</Button>);

    cy.get('button').should('have.attr', 'aria-labelledby', 'custom-id');
  }
  )
  it('should render with the proper aria-describedby', () => {
    mount(<Button aria-describedby="custom-id">Button</Button>);

    cy.get('button').should('have.attr', 'aria-describedby', 'custom-id');
  }
  )
  it('should render with the proper aria-expanded', () => {
    mount(<Button aria-expanded>Button</Button>);

    cy.get('button').should('have.attr', 'aria-expanded');
  }
  )
  it('should render with the proper aria-haspopup', () => {
    mount(<Button aria-haspopup>Button</Button>);

    cy.get('button').should('have.attr', 'aria-haspopup');
  }
  )
  it('should render with the proper aria-hidden', () => {
    mount(<Button aria-hidden>Button</Button>);

    cy.get('button').should('have.attr', 'aria-hidden');
  }
  )
  it('should render with the proper aria-controls', () => {
    mount(<Button aria-controls="custom-id">Button</Button>);

    cy.get('button').should('have.attr', 'aria-controls', 'custom-id');
  }
  )
  it('should render with the proper aria-owns', () => {
    mount(<Button aria-owns="custom-id">Button</Button>);

    cy.get('button').should('have.attr', 'aria-owns', 'custom-id');
  }
  )
  it('should render with the proper aria-haspopup', () => {
    mount(<Button aria-haspopup>Button</Button>);

    cy.get('button').should('have.attr', 'aria-haspopup');
  }
  )
});
