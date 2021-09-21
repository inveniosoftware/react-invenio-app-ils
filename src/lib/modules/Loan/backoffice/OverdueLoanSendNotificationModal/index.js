import { connect } from 'react-redux';
import { sendOverdueLoansNotificationReminder } from './state/actions';
import OverdueLoanSendNotificationModalComponent from '@modules/Loan/backoffice/OverdueLoanSendNotificationModal/OverdueLoanSendNotificationModal';

const mapStateToProps = (state) => ({
  isLoading: state.overdueLoanSendNotificationModal.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  sendOverdueLoansNotificationReminder: (loanPid) =>
    dispatch(sendOverdueLoansNotificationReminder(loanPid)),
});

export const OverdueLoanSenNotificationModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(OverdueLoanSendNotificationModalComponent);
