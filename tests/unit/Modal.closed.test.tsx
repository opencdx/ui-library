import { render, screen } from '@testing-library/react';
import { Modal, ModalContent, ModalBody } from '../../src/index';

describe('Modal closed (unit)', () => {
  it('does not render content when closed', () => {
    render(
      <Modal isOpen={false}>
        <ModalContent>
          <ModalBody>Hidden</ModalBody>
        </ModalContent>
      </Modal>
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });
});


