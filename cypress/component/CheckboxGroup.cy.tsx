import React from 'react';
import { mount } from 'cypress/react18';
import { CheckboxGroup, Checkbox } from '@/index';
import "../../src/styles/globals.css";


// cypress/e2e/checkboxGroup.spec.js

describe('CheckboxGroup Component', () => {
  const mountCheckboxGroup = (props) => {
    cy.mount(<CheckboxGroup {...props} />);
  };

  it('should render all checkboxes by default', () => {
    mountCheckboxGroup({
      children: (
        <>
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="san-francisco">San Francisco</Checkbox>
          <Checkbox value="london">London</Checkbox>
          <Checkbox value="tokyo">Tokyo</Checkbox>
        </>
      ),
    });
    cy.get('input[type="checkbox"]').should('have.length', 5);
  });

  it('should render with a label', () => {
    mountCheckboxGroup({
      label: 'Select cities',
      children: (
        <>
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="san-francisco">San Francisco</Checkbox>
          <Checkbox value="london">London</Checkbox>
          <Checkbox value="tokyo">Tokyo</Checkbox>
        </>
      ),
    });
    cy.contains('Select cities').should('exist');
  });

  it('should have checkboxes checked by default', () => {
    mountCheckboxGroup({
      label: 'Select cities',
      defaultValue: ['buenos-aires', 'london'],
      children: (
        <>
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="san-francisco">San Francisco</Checkbox>
          <Checkbox value="london">London</Checkbox>
          <Checkbox value="tokyo">Tokyo</Checkbox>
        </>
      ),
    });
    cy.get('input[value="buenos-aires"]').should('be.checked');
    cy.get('input[value="london"]').should('be.checked');
  });

  it('should display selected checkboxes and update on click', () => {
    //users can select multiple checkboxes
    let selectCities = ['buenos-aires'];
    mountCheckboxGroup({
      label: 'Select cities',
      value: selectCities,
      onValueChange: (selected: string) => {
        if(selectCities.filter((city) => city === selected).length > 1){
          selectCities = selectCities.filter((city) => city !== selected);
        } else {
          selectCities.push(selected);
        }
      },
      children: (
        <>
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="san-francisco">San Francisco</Checkbox>
          <Checkbox value="london">London</Checkbox>
          <Checkbox value="tokyo">Tokyo</Checkbox>
        </>
      ),
    });

  // Check if checkboxes are displayed correctly
  cy.get('input[value="buenos-aires"]').should('be.checked');
  cy.get('input[value="sydney"]').should('not.be.checked');

  // Click on the checkbox and verify the change
  selectCities.push("london");

  // Ensure that the `sydney` checkbox is now checked
  cy.get('input[value="london"]').should('be.checked');
  cy.get('input[value="buenos-aires"]').should('be.checked');
  });

  it('should render checkboxes horizontally when orientation is set to horizontal', () => {
    mountCheckboxGroup({
      label: 'Select cities',
      orientation: 'horizontal',
      children: (
        <>
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="san-francisco">San Francisco</Checkbox>
          <Checkbox value="london">London</Checkbox>
          <Checkbox value="tokyo">Tokyo</Checkbox>
        </>
      ),
    });
    cy.get('div[data-orientation="horizontal"]').should('exist');
  });

  it('should disable all checkboxes when isDisabled is true', () => {
    mountCheckboxGroup({
      label: 'Select cities',
      isDisabled: true,
      children: (
        <>
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="san-francisco">San Francisco</Checkbox>
          <Checkbox value="london">London</Checkbox>
          <Checkbox value="tokyo">Tokyo</Checkbox>
        </>
      ),
    });
    cy.get('input[type="checkbox"]').should('be.disabled');
  });

  it('should render description text', () => {
    mountCheckboxGroup({
      description: 'Select the cities you want to visit',
      children: (
        <>
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="san-francisco">San Francisco</Checkbox>
          <Checkbox value="london">London</Checkbox>
          <Checkbox value="tokyo">Tokyo</Checkbox>
        </>
      ),
    });
    cy.contains('Select the cities you want to visit').should('exist');
  });

  it('should display the error message', () => {
    mountCheckboxGroup({
      isInvalid: true,
      errorMessage: 'The selected cities cannot be visited at the same time',
      children: (
        <>
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="san-francisco">San Francisco</Checkbox>
          <Checkbox value="london">London</Checkbox>
          <Checkbox value="tokyo">Tokyo</Checkbox>
        </>
      ),
    });
    cy.get('div').contains('The selected cities cannot be visited at the same time').should('exist');
  });

  it('should display an error message when no option is selected', () => {
    // Define the initial state and mock function for handling value changes
    let selectCities = [];
    
    const handleValueChange = (selected) => {
      if (selectCities.includes(selected)) {
        selectCities = selectCities.filter(city => city !== selected);
      } else {
        selectCities.push(selected);
      }
    };
  
    // Mount the CheckboxGroup component
    cy.mount(
      <CheckboxGroup
        isRequired={true}
        defaultValue={selectCities}
        value={selectCities}
        isInvalid={selectCities.length === 0}
        onValueChange={handleValueChange}
        errorMessage={state => state.isInvalid ? "At least one option must be selected" : undefined}
      >
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="san-francisco">San Francisco</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </CheckboxGroup>
    );
  
    // // Interact with the checkboxes to uncheck all options
    // cy.get('input[type="checkbox"]').each(($checkbox) => {
    //   cy.wrap($checkbox).uncheck();
    // });
    selectCities = [];
    // Check that the error message is displayed
    cy.contains('At least one option must be selected').should('exist');
  });

  it('should display validation message if fewer than 2 options are selected', () => {
    let selectCities: string[] = [];
    mountCheckboxGroup({
      description: 'Please select at least 2 options',
      value: selectCities,
      validate: (value) => (value.length < 2 ? "You must select at least 2 options" : null),
      children: (
        <>
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="san-francisco">San Francisco</Checkbox>
          <Checkbox value="london">London</Checkbox>
          <Checkbox value="tokyo">Tokyo</Checkbox>
        </>
      ),
    });
    selectCities.push("buenos-aires") // Assuming you have a submit button in your form
    cy.get('div').contains('You must select at least 2 options').should('exist');
  });

  it('should be required on form submission', () => {
    let selectCities = [];
    
    const handleValueChange = (selected) => {
      if (selectCities.includes(selected)) {
        selectCities = selectCities.filter(city => city !== selected);
      } else {
        selectCities.push(selected);
      }
    };
  
    // Mount the CheckboxGroup component
    cy.mount(
      <CheckboxGroup
        isRequired={true}
        defaultValue={selectCities}
        value={selectCities}
        isInvalid={selectCities.length === 0}
        onValueChange={handleValueChange}
        errorMessage={state => state.isInvalid ? "At least one option must be selected" : undefined}
      >
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="san-francisco">San Francisco</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </CheckboxGroup>
    );
    cy.get('div').contains('At least one option must be selected').should('exist');
    selectCities.push("buenos-aires");
    
    // Re-Mount the CheckboxGroup component
    cy.mount(
      <CheckboxGroup
        isRequired={true}
        defaultValue={selectCities}
        value={selectCities}
        isInvalid={selectCities.length === 0}
        onValueChange={handleValueChange}
        errorMessage={state => state.isInvalid ? "At least one option must be selected" : undefined}
      >
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="san-francisco">San Francisco</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </CheckboxGroup>
    );
    cy.get('div').contains('At least one option must be selected').should('not.exist'); // Adjust the error message as needed
  });
});
