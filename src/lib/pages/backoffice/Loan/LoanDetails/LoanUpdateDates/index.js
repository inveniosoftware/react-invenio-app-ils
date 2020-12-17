import { connect } from 'react-redux';
import LoanUpdateDatesComponent from './LoanUpdateDates';
import { loanUpdateDates, clearError } from './state/actions';

const mapDispatchToProps = (dispatch) => ({
  loanUpdateDates: (loanPid, data) => dispatch(loanUpdateDates(loanPid, data)),
  clearError: () => dispatch(clearError()),
});

const mapStateToProps = (state) => ({
  isLoading: state.loanUpdateDates.isLoading,
  data: state.loanUpdateDates.data,
  error: state.loanUpdateDates.error,
  hasError: state.loanUpdateDates.hasError,
});

export const LoanUpdateDates = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoanUpdateDatesComponent);
