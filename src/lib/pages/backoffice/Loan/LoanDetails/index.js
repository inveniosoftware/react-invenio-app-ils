import { connect } from 'react-redux';

import { fetchLoanDetails } from '@modules/Loan/actions';
import LoanDetailsComponent from './LoanDetails';

const mapStateToProps = state => ({
  isLoading: state.loanDetails.isLoading,
  error: state.loanDetails.error,
  firstLoanRequested: state.loanDetails.firstLoanRequested,
  data: state.loanDetails.data,
});

const mapDispatchToProps = dispatch => ({
  fetchLoanDetails: (loanPid, withFetchOtherPendingLoans) =>
    dispatch(fetchLoanDetails(loanPid, withFetchOtherPendingLoans)),
});

export const LoanDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoanDetailsComponent);
