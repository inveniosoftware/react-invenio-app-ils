import { connect } from 'react-redux';

import SelfCheckoutModalComponent from './SelfCheckoutModal';
import { checkoutItem } from '../state/actions';

const mapDispatchToProps = (dispatch) => ({
  checkoutItem: (documentPid, itemPid, patronPid, force = false) =>
    dispatch(checkoutItem(documentPid, itemPid, patronPid, force)),
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
