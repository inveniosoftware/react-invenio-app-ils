import { connect } from 'react-redux';
import { sendOverdueLoansMailReminder } from './state/actions';
import OverdueLoanSendMailModalComponent from './OverdueLoanSendMailModal';

const mapStateToProps = (state) => ({
  isLoading: state.overdueLoanSendMailModal.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  sendOverdueLoansMailReminder: (loanPid) =>
    dispatch(sendOverdueLoansMailReminder(loanPid)),
});

export const OverdueLoanSendMailModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(OverdueLoanSendMailModalComponent);
