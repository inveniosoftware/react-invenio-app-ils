import { addProvider } from '@pages/backoffice/DocumentRequest/DocumentRequestDetails/state/actions';
import { connect } from 'react-redux';
import ChooseProviderStepPanelComponent from './ChooseProviderStepPanel';

const mapDispatchToProps = (dispatch) => ({
  addProvider: (provDataPid, pid, pidType) =>
    dispatch(addProvider(provDataPid, pid, pidType)),
});

export const ChooseProviderStepPanel = connect(
  null,
  mapDispatchToProps
)(ChooseProviderStepPanelComponent);
