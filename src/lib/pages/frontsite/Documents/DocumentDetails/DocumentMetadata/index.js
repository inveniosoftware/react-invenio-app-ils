import { connect } from 'react-redux';
import DocumentMetadataComponent from './DocumentMetadata';
import { fetchDocumentsDetails } from '../actions';

const mapStateToProps = state => ({
  documentDetails: state.documentDetailsFront.data,
  activeTab: state.documentDetailsFront.activeTab,
  hasError: state.documentDetailsFront.hasError,
  isLoading: state.documentDetailsFront.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchDocumentsDetails: itemPid => dispatch(fetchDocumentsDetails(itemPid)),
});

export const DocumentMetadata = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentMetadataComponent);
