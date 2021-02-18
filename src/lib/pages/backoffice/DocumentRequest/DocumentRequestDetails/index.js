import { connect } from 'react-redux';
import DocumentRequestDetailsComponent from './DocumentRequestDetails';
import { fetchDocumentRequestDetails } from './state/actions';

const mapStateToProps = (state) => ({
  data: state.documentRequestDetails.data,
  isLoading: state.documentRequestDetails.isLoading,
  error: state.documentRequestDetails.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDocumentRequestDetails: (documentRequestPid) =>
    dispatch(fetchDocumentRequestDetails(documentRequestPid)),
});

export const DocumentRequestDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentRequestDetailsComponent);
