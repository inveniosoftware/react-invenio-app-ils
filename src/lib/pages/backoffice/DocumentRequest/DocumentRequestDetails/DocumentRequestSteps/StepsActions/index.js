import { connect } from 'react-redux';
import { removeProvider } from '@pages/backoffice/DocumentRequest/DocumentRequestDetails/state/actions';
import { removeDocument } from '@pages/backoffice/DocumentRequest/DocumentRequestDetails/state/actions';
import StepsActionsComponent from './StepsActions';

const mapStateToProps = state => ({
  ...state.documentRequestDetails,
});

const mapDispatchToProps = dispatch => ({
  removeProvider: (pid, provPid) => dispatch(removeProvider(pid, provPid)),
  removeDocument: (pid, documentPid) =>
    dispatch(removeDocument(pid, documentPid)),
});

export const StepsActions = connect(
  mapStateToProps,
  mapDispatchToProps
)(StepsActionsComponent);
