import { addDocument } from '@pages/backoffice/DocumentRequest/DocumentRequestDetails/state/actions';
import { connect } from 'react-redux';
import ChooseDocumentStepPanelComponent from './ChooseDocumentStepPanel';

const mapDispatchToProps = (dispatch) => ({
  addDocument: (pid, key) => dispatch(addDocument(pid, key)),
});

export const ChooseDocumentStepPanel = connect(
  null,
  mapDispatchToProps
)(ChooseDocumentStepPanelComponent);
