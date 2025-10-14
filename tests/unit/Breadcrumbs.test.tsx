import { render, screen } from '@testing-library/react';
import { Breadcrumbs, BreadcrumbItem } from '../../src/index';

describe('Breadcrumbs (unit)', () => {
  it('renders breadcrumb items', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Library</BreadcrumbItem>
        <BreadcrumbItem>Data</BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Library')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
  });
});


