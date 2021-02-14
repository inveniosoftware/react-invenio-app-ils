import { connect } from 'react-redux';
import { declineRequest } from '../state/actions';
import DocumentRequestActionsComponent from './DocumentRequestActions';

const mapStateToProps = (state) => ({
  ...state.documentRequestDetails,
});

const mapDispatchToProps = (dispatch) => ({
  declineRequest: (pid, data) => dispatch(declineRequest(pid, data)),
});

export const DocumentRequestActions = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentRequestActionsComponent);
