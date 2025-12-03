import { connect } from 'react-redux';

import {
  clearBorrowingRequestDetails,
  fetchBorrowingRequestDetails,
} from './state/actions';
import BorrowingRequestDetailsComponent from './BorrowingRequestDetails';

const mapStateToProps = (state) => ({
  data: state.borrowingRequestDetails.data,
  isLoading: state.borrowingRequestDetails.isLoading,
  error: state.borrowingRequestDetails.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBorrowingRequestDetails: (brwReqPid) =>
    dispatch(fetchBorrowingRequestDetails(brwReqPid)),
  clearBorrowingRequestDetails: () => dispatch(clearBorrowingRequestDetails()),
});

export const BorrowingRequestDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(BorrowingRequestDetailsComponent);
