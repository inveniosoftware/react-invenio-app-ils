import { connect } from 'react-redux';

import {
  fetchProviderDetails,
  deleteProvider,
  clearProviderDetails,
} from './state/actions';
import ProviderDetailsComponent from './ProviderDetails';

const mapStateToProps = (state) => ({
  data: state.providerDetails.data,
  isLoading: state.providerDetails.isLoading,
  error: state.providerDetails.error,
  hasError: state.providerDetails.hasError,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProviderDetails: (providerPid) =>
    dispatch(fetchProviderDetails(providerPid)),
  deleteProvider: (providerPid) => dispatch(deleteProvider(providerPid)),
  clearProviderDetails: () => dispatch(clearProviderDetails()),
});

export const ProviderDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProviderDetailsComponent);
