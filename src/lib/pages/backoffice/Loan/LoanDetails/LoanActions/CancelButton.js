import React from 'react';
import PropTypes from 'prop-types';
import { CancelModal } from '@components/CancelModal';

export const CancelLoanModal = ({ pid, isLoading, cancelAction }) => {
  return (
    <CancelModal
      header={`Cancel Loan #${pid}`}
      content={`You are about to cancel loan #${pid}.
    Please enter a reason for cancelling this loan.`}
      cancelText="Cancel Loan"
      buttonText="Cancel"
      action={cancelAction}
      isLoading={isLoading}
    />
  );
};

CancelLoanModal.propTypes = {
  pid: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  cancelAction: PropTypes.func.isRequired,
};
