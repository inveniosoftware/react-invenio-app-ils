import { fetchPatronCurrentLoans } from '@modules/Patron/PatronCurrentLoans/actions';
import { connect } from 'react-redux';
import PatronCurrentLoansComponent from './PatronCurrentLoans';

const mapStateToProps = state => ({
  loans: state.patronCurrentLoans.data,
  isLoading: state.patronCurrentLoans.isLoading,
  error: state.patronCurrentLoans.error,
});

const mapDispatchToProps = dispatch => ({
  fetchPatronCurrentLoans: (patronPid, optionalParams = {}) =>
    dispatch(fetchPatronCurrentLoans(patronPid, optionalParams)),
});

export const PatronCurrentLoans = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatronCurrentLoansComponent);
