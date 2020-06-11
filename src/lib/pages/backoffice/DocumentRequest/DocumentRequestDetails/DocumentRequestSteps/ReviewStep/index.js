import { connect } from 'react-redux';
import { acceptRequest } from '@pages/backoffice/DocumentRequest/DocumentRequestDetails/state/actions';
import ReviewStepContentComponent from './ReviewStep';

const mapStateToProps = state => ({
  ...state.documentRequestDetails,
});

const mapDispatchToProps = dispatch => ({
  acceptRequest: documentRequestPid =>
    dispatch(acceptRequest(documentRequestPid)),
});

export const ReviewStepContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewStepContentComponent);
