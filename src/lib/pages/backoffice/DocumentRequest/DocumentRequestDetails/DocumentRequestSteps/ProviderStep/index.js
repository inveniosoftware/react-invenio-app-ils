import { addProvider } from '@pages/backoffice/DocumentRequest/DocumentRequestDetails/state/actions';
import { connect } from 'react-redux';
import ProviderStepContentComponent from './ProviderStep';

const mapStateToProps = (state) => ({
  ...state.documentRequestDetails,
});

const mapDispatchToProps = (dispatch) => ({
  addProvider: (provDataPid, pid, pidType) =>
    dispatch(addProvider(provDataPid, pid, pidType)),
});

export const ProviderStepContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProviderStepContentComponent);
