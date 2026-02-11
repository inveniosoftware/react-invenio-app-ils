import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

const OverbookedConfirmModal = ({
  open,
  onClose,
  onConfirm,
  overbookedDocuments,
}) => {
  const isMultiple = overbookedDocuments.length > 1;

  return (
    <Modal size="small" open={open} onClose={onClose}>
      <Modal.Header>Item in high demand!</Modal.Header>

      <Modal.Content>
        {overbookedDocuments.map((doc, index) => (
          <p key={doc.loanRequestId || doc.title || index}>
            There is another patron waiting for "<strong>{doc.title}</strong>"{' '}
            {doc.loanRequestId && (
              <>
                (
                <a href={`/backoffice/loans/${doc.loanRequestId}`}>
                  See loan request
                </a>
                )
              </>
            )}
            .
          </p>
        ))}

        <p>
          <strong>
            Do you still want to extend your {isMultiple ? 'loans' : 'loan'}?
          </strong>
        </p>
      </Modal.Content>

      <Modal.Actions>
        <Button secondary onClick={onClose}>
          Cancel
        </Button>
        <Button primary onClick={onConfirm}>
          Extend
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

OverbookedConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  overbookedDocuments: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      loanRequestId: PropTypes.string,
    })
  ).isRequired,
};

export default OverbookedConfirmModal;
