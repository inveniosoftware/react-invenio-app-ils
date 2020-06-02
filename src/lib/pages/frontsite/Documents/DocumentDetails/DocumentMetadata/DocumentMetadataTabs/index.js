import { showTab } from '../../actions';
import { connect } from 'react-redux';
import DocumentMetadataTabsComponent from './DocumentMetadataTabs';

const mapStateToProps = state => ({
  documentDetails: state.documentDetailsFront.data,
  activeTab: state.documentDetailsFront.activeTab,
  hasError: state.documentDetailsFront.hasError,
  isLoading: state.documentDetailsFront.isLoading,
});

const mapShowTabToProps = dispatch => ({
  showTab: activeIndex => dispatch(showTab(activeIndex)),
});

export const DocumentMetadataTabs = connect(
  mapStateToProps,
  mapShowTabToProps
)(DocumentMetadataTabsComponent);
