import { connect } from 'react-redux';
import { fetchDocumentsDetails } from './actions';
import DocumentDetailsComponent from './DocumentDetails';

const mapDispatchToProps = dispatch => ({
  fetchDocumentsDetails: documentPid =>
    dispatch(fetchDocumentsDetails(documentPid)),
});

const mapStateToProps = state => ({
  isLoading: state.documentDetailsFront.isLoading,
  documentDetails: state.documentDetailsFront.data,
  hasError: state.documentDetailsFront.hasError,
  error: state.documentDetailsFront.error,
});

export const DocumentDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentDetailsComponent);
