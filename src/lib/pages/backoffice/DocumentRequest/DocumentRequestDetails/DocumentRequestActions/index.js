import {
  removeDocument,
  removeProvider,
} from '@pages/backoffice/DocumentRequest/DocumentRequestDetails/state/actions';
import { connect } from 'react-redux';
import { declineRequest } from '../state/actions';
import DocumentRequestActionsComponent from './DocumentRequestActions';

const mapDispatchToProps = (dispatch) => ({
  declineRequest: (pid, data) => dispatch(declineRequest(pid, data)),
  removeProvider: (pid, provPid) => dispatch(removeProvider(pid, provPid)),
  removeDocument: (pid, documentPid) =>
    dispatch(removeDocument(pid, documentPid)),
});

export const DocumentRequestActions = connect(
  null,
  mapDispatchToProps
)(DocumentRequestActionsComponent);
