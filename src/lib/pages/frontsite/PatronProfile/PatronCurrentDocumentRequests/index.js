import { connect } from 'react-redux';
import PatronCurrentDocumentRequestsComponent from './PatronCurrentDocumentRequests';
import { fetchPatronDocumentRequests } from './state/actions';

const mapStateToProps = state => ({
  documentRequests: state.patronCurrentDocumentRequests.data,
  isLoading: state.patronCurrentDocumentRequests.isLoading,
  error: state.patronCurrentDocumentRequests.error,
});

const mapDispatchToProps = dispatch => ({
  fetchPatronDocumentRequests: (patronPid, optionalParams = {}) =>
    dispatch(fetchPatronDocumentRequests(patronPid, optionalParams)),
});

export const PatronCurrentDocumentRequests = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatronCurrentDocumentRequestsComponent);
