import { connect } from 'react-redux';

import { fetchOrderDetails, clearOrderDetails } from './state/actions';
import OrderDetailsComponent from './OrderDetails';

const mapStateToProps = (state) => ({
  data: state.orderDetails.data,
  isLoading: state.orderDetails.isLoading,
  error: state.orderDetails.error,
  hasError: state.orderDetails.hasError,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrderDetails: (orderPid) => dispatch(fetchOrderDetails(orderPid)),
  clearOrderDetails: () => dispatch(clearOrderDetails()),
});

export const OrderDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailsComponent);
