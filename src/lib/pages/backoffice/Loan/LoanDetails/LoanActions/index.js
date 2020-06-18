import { connect } from 'react-redux';
import { performLoanAction } from '@modules/Loan/actions';
import LoanActionsComponent from './LoanActions';

const mapStateToProps = state => ({
  error: state.loanDetails.error,
  loanDetails: state.loanDetails.data,
  isLoading: state.loanActions.isLoading,
});

const mapDispatchToProps = dispatch => ({
  performLoanAction: (actionURL, documentPid, patronPid, optionalParams = {}) =>
    dispatch(
      performLoanAction(actionURL, documentPid, patronPid, optionalParams)
    ),
});

export const LoanActions = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoanActionsComponent);
