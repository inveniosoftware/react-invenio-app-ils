import { connect } from 'react-redux';
import PendingILLPatronLoanExtensionsComponent from './PendingILLPatronLoanExtensions';
import { fetchPendingILLPatronLoanExtensions } from './state/actions';

const mapStateToProps = (state) => ({
  data: state.pendingILLPatronLoanExtensions.data,
  error: state.pendingILLPatronLoanExtensions.error,
  isLoading: state.pendingILLPatronLoanExtensions.isLoading,
  hasError: state.pendingILLPatronLoanExtensions.hasError,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPendingILLPatronLoanExtensions: () =>
    dispatch(fetchPendingILLPatronLoanExtensions()),
});

export const PendingILLPatronLoanExtensions = connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingILLPatronLoanExtensionsComponent);
