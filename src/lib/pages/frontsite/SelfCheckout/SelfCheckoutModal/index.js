import { connect } from 'react-redux';

import SelfCheckoutModalComponent from './SelfCheckoutModal';
import { selfCheckOut } from '../state/actions';

const mapDispatchToProps = (dispatch) => ({
  checkoutItem: (documentPid, itemPid, patronPid) =>
    dispatch(selfCheckOut(documentPid, itemPid, patronPid)),
});

const mapStateToProps = (state) => ({
  user: state.authenticationManagement.data,
  isLoading: state.selfCheckOut.isLoading,
  item: state.selfCheckOut.item,
});

export const SelfCheckoutModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelfCheckoutModalComponent);
