import { connect } from 'react-redux';
import { fetchDocumentRequestDetails } from './state/actions';
import DocumentRequestDetailsComponent from './DocumentRequestDetails';

const mapStateToProps = state => ({
  isLoading: state.documentRequestDetails.isLoading,
  error: state.documentRequestDetails.error,
});

const mapDispatchToProps = dispatch => ({
  fetchDocumentRequestDetails: documentRequestPid =>
    dispatch(fetchDocumentRequestDetails(documentRequestPid)),
});

export const DocumentRequestDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentRequestDetailsComponent);

export { DocumentRequestActions } from './DocumentRequestActions';
export { DocumentRequestHeader } from './DocumentRequestHeader';
export { DocumentRequestMetadata } from './DocumentRequestMetadata';
export { DocumentRequestSteps } from './DocumentRequestSteps';
