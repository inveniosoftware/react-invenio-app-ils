import { connect } from 'react-redux';
import DocumentRequestDetailsComponent from './DocumentRequestDetails';
import {
  fetchDocumentRequestDetails,
  clearDocumentRequestDetails,
} from './state/actions';

const mapStateToProps = (state) => ({
  data: state.documentRequestDetails.data,
  isLoading: state.documentRequestDetails.isLoading,
  error: state.documentRequestDetails.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDocumentRequestDetails: (documentRequestPid) =>
    dispatch(fetchDocumentRequestDetails(documentRequestPid)),
  clearDocumentRequestDetails: () => dispatch(clearDocumentRequestDetails()),
});

export const DocumentRequestDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentRequestDetailsComponent);
