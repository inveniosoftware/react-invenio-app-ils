import { fetchPatronPendingLoans } from '@modules/Patron/PatronPendingLoans/actions';
import { connect } from 'react-redux';
import PatronPendingLoansComponent from './PatronPendingLoans';

const mapStateToProps = (state) => ({
  loans: state.patronPendingLoans.data,
  isLoading: state.patronPendingLoans.isLoading,
  error: state.patronPendingLoans.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPatronPendingLoans: (patronPid, optionalParams = {}) =>
    dispatch(fetchPatronPendingLoans(patronPid, optionalParams)),
});

export const PatronPendingLoans = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatronPendingLoansComponent);
