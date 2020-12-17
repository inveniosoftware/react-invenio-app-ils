import { connect } from 'react-redux';
import { fetchOngoingILLRequests } from './state/actions';
import ILLCardComponent from './ILLCard';

const mapStateToProps = (state) => ({
  data: state.illCard.data,
  error: state.illCard.error,
  isLoading: state.illCard.isLoading,
  hasError: state.illCard.hasError,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOngoingILLRequests: () => dispatch(fetchOngoingILLRequests()),
});

export const ILLCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ILLCardComponent);
