import { connect } from 'react-redux';
import { fetchDocumentsDetails } from './actions';
import DocumentDetailsComponent from './DocumentDetails';

const mapDispatchToProps = dispatch => ({
  fetchDocumentsDetails: documentPid =>
    dispatch(fetchDocumentsDetails(documentPid, { fetchLoansInfo: true })),
});

const mapStateToProps = state => ({
  isLoading: state.documentDetailsFront.isLoading,
  documentDetails: state.documentDetailsFront.data,
  loansInfo: state.documentDetailsFront.loansData,
  hasError: state.documentDetailsFront.hasError,
  error: state.documentDetailsFront.error,
});

export const DocumentDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentDetailsComponent);
