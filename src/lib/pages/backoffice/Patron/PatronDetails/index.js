import { connect } from 'react-redux';
import PatronDetailsComponent from './PatronDetails';
import { fetchPatronDetails } from './state/actions';

const mapStateToProps = state => ({
  isLoading: state.patronDetails.isLoading,
  error: state.patronDetails.error,
  hasError: state.patronDetails.hasError,
  data: state.patronDetails.data,
});

const mapDispatchToProps = dispatch => ({
  fetchPatronDetails: patronPid => dispatch(fetchPatronDetails(patronPid)),
});

export const PatronDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatronDetailsComponent);

export { ItemsCheckout } from './ItemsCheckout';
export { ItemsSearch } from './ItemsSearch';
export { PatronCurrentLoans } from './PatronCurrentLoans';
export { PatronDocumentRequests } from './PatronDocumentRequests';
export { PatronMetadata } from './PatronMetadata';
export { PatronPendingLoans } from './PatronPendingLoans';
export { PatronPastLoans } from './PatronPastLoans';
export { PatronHeader } from './PatronHeader';
export { PatronActionMenu } from './PatronActionMenu';
export { PatronCurrentBorrowingRequests } from './PatronCurrentBorrowingRequests';
export { PatronPastBorrowingRequests } from './PatronPastBorrowingRequests';
