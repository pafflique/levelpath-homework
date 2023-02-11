import React from 'react';
import {Modal, ModalClose, ModalDialog, Typography} from '@mui/joy';

interface ErrorModalProps {
  error: string | null;
  isOpen: boolean;
  close: () => void;
}

function ErrorModal({error, isOpen, close}: ErrorModalProps) {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={isOpen}
      onClose={close}
    >
      <ModalDialog>
        <ModalClose variant="plain"/>
        <Typography
          component="h2"
          id="modal-title"
        >
          Error occurred
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary">
          Details: {error}
        </Typography>
      </ModalDialog>
    </Modal>
  );
}

export default ErrorModal;
