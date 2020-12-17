import { connect } from 'react-redux';
import { addDocument } from '@pages/backoffice/DocumentRequest/DocumentRequestDetails/state/actions';
import DocumentStepContentComponent from './DocumentStep';

const mapStateToProps = (state) => ({
  ...state.documentRequestDetails,
});

const mapDispatchToProps = (dispatch) => ({
  addDocument: (pid, key) => dispatch(addDocument(pid, key)),
});

export const DocumentStepContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentStepContentComponent);
