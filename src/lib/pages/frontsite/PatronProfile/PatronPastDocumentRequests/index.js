import { connect } from 'react-redux';
import PatronPastDocumentRequestsComponent from './PatronPastDocumentRequests';
import { fetchPatronPastDocumentRequests } from './state/actions';

const mapStateToProps = state => ({
  documentRequests: state.patronPastDocumentRequests.data,
  isLoading: state.patronPastDocumentRequests.isLoading,
  error: state.patronPastDocumentRequests.error,
});

const mapDispatchToProps = dispatch => ({
  fetchPatronPastDocumentRequests: (patronPid, optionalParams = {}) =>
    dispatch(fetchPatronPastDocumentRequests(patronPid, optionalParams)),
});

export const PatronPastDocumentRequests = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatronPastDocumentRequestsComponent);
