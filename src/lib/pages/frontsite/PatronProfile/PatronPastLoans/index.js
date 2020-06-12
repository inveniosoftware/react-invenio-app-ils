import { fetchPatronPastLoans } from '@modules/Patron/PatronPastLoans/actions';
import { connect } from 'react-redux';
import PatronPastLoansComponent from './PatronPastLoans';

const mapStateToProps = state => ({
  loans: state.patronPastLoans.data,
  isLoading: state.patronPastLoans.isLoading,
  error: state.patronPastLoans.error,
});

const mapDispatchToProps = dispatch => ({
  fetchPatronPastLoans: (patronPid, optionalParams = {}) =>
    dispatch(fetchPatronPastLoans(patronPid, optionalParams)),
});

export const PatronPastLoans = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatronPastLoansComponent);
