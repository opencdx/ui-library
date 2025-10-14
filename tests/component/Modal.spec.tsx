import { test, expect } from '../fixtures/coverage';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '../../src/index';

test.describe('Modal', () => {
  test('should render when isOpen is true', async ({ mount, page }) => {
    await mount(
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
    // Modal renders in a portal, so check the page instead of component
    await expect(page.locator('text=Modal Title')).toBeVisible();
    await expect(page.locator('text=Modal Content')).toBeVisible();
  });

  test('should not render when isOpen is false', async ({ mount, page }) => {
    await mount(
      <Modal isOpen={false}>
        <ModalContent>
          <ModalBody>Hidden</ModalBody>
        </ModalContent>
      </Modal>
    );
    // Modal content should not be visible
    await expect(page.locator('text=Hidden')).not.toBeVisible();
  });
});

