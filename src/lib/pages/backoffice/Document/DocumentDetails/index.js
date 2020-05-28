import { connect } from 'react-redux';

import { fetchDocumentDetails } from './state/actions';
import DocumentDetailsComponent from './DocumentDetails';

const mapStateToProps = state => ({
  isLoading: state.documentDetails.isLoading,
  error: state.documentDetails.error,
  data: state.documentDetails.data,
  hasError: state.documentDetails.hasError,
});

const mapDispatchToProps = dispatch => ({
  fetchDocumentDetails: documentPid =>
    dispatch(fetchDocumentDetails(documentPid)),
});

export const DocumentDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentDetailsComponent);

export { DocumentMetadata } from './DocumentMetadata';
export { DocumentPendingLoans } from './DocumentPendingLoans';
export { DocumentStats } from './DocumentStats';
export { DocumentItems } from './DocumentItems';
export { DocumentEItems } from './DocumentEItems';
export { DocumentActionMenu } from './DocumentActionMenu';
export { DocumentSummary } from './DocumentSummary';
export { DocumentDeleteModal } from './DocumentDeleteModal';
