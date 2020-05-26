import { showTab } from '../actions';
import { connect } from 'react-redux';
import DocumentMetadataComponent from './DocumentMetadata';
import DocumentMetadataTabsComponent from './DocumentMetadataTabs';
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

const mapShowTabToProps = dispatch => ({
  showTab: activeIndex => dispatch(showTab(activeIndex)),
});

export const DocumentMetadata = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentMetadataComponent);

export const DocumentMetadataTabs = connect(
  mapStateToProps,
  mapShowTabToProps
)(DocumentMetadataTabsComponent);
