import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardBody, CardFooter } from '../../src/index';

describe('Card (unit)', () => {
  it('renders header, body, and footer', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});


