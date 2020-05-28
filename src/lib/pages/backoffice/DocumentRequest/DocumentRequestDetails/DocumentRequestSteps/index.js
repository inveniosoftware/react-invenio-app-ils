import { connect } from 'react-redux';
import { fetchDocumentRequestDetails } from '@pages/backoffice/DocumentRequest/DocumentRequestDetails/state/actions';
import DocumentRequestStepsComponent from './DocumentRequestSteps';

const mapStateToProps = state => ({
  ...state.documentRequestDetails,
});

const mapDispatchToProps = dispatch => ({
  fetchDocumentRequestDetails: documentRequestPid =>
    dispatch(fetchDocumentRequestDetails(documentRequestPid)),
});

export const DocumentRequestSteps = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentRequestStepsComponent);

export { DocumentStep, DocumentStepContent } from './DocumentStep';
export { ProviderStep, ProviderStepContent } from './ProviderStep';
export { ReviewStep, ReviewStepContent } from './ReviewStep';
export { StepsActions } from './StepsActions';
