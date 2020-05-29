import { connect } from 'react-redux';
import { fetchPatronPastBorrowingRequests } from '@modules/Patron/PatronPastBorrowingRequests/actions';
import PatronPastBorrowingRequestsComponent from './PatronPastBorrowingRequests';

const mapStateToProps = state => ({
  patronDetails: state.patronDetails.data,
  ...state.patronPastBorrowingRequests,
});

const mapDispatchToProps = dispatch => ({
  fetchPatronPastBorrowingRequests: patronPid =>
    dispatch(fetchPatronPastBorrowingRequests(patronPid)),
});

export const PatronPastBorrowingRequests = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatronPastBorrowingRequestsComponent);
