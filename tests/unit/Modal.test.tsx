import { render, screen } from '@testing-library/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '../../src/index';

describe('Modal (unit)', () => {
  it('renders title and body when open', () => {
    render(
      <Modal isOpen>
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>Modal Content</ModalBody>
          <ModalFooter>
            <Button>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });
});


