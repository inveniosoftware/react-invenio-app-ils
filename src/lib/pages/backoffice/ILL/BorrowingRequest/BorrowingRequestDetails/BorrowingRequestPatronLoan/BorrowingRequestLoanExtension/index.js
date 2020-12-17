import { connect } from 'react-redux';

import {
  borrowingRequestLoanExtensionAccept,
  borrowingRequestLoanExtensionDecline,
} from './actions';
import BorrowingRequestLoanExtensionComponent from './BorrowingRequestLoanExtension';

const mapStateToProps = (state) => ({
  isLoading: state.borrowingRequestLoanExtension.isLoading,
  error: state.borrowingRequestLoanExtension.error,
  hasError: state.borrowingRequestLoanExtension.hasError,
});

const mapDispatchToProps = (dispatch) => ({
  borrowingRequestLoanExtensionAccept: (brwReqPid, loanEndDate) =>
    dispatch(borrowingRequestLoanExtensionAccept(brwReqPid, loanEndDate)),
  borrowingRequestLoanExtensionDecline: (brwReqPid) =>
    dispatch(borrowingRequestLoanExtensionDecline(brwReqPid)),
});

export const BorrowingRequestLoanExtension = connect(
  mapStateToProps,
  mapDispatchToProps
)(BorrowingRequestLoanExtensionComponent);
