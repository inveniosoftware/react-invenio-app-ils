import { connect } from 'react-redux';
import { fetchOngoingAcqRequests } from './state/actions';
import ACQRequestsCardComponent from './ACQRequestsCard';

const mapStateToProps = (state) => ({
  data: state.acquisitionCard.data,
  error: state.acquisitionCard.error,
  isLoading: state.acquisitionCard.isLoading,
  hasError: state.acquisitionCard.hasError,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOngoingAcqRequests: () => dispatch(fetchOngoingAcqRequests()),
});

export const ACQRequestsCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ACQRequestsCardComponent);
