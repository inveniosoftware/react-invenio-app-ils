import { connect } from 'react-redux';

import SelfCheckoutComponent from './SelfCheckout';
import {
  selfCheckOut,
  selfCheckOutSearch,
  notifyResultMessage,
} from './state/actions';

const mapDispatchToProps = (dispatch) => ({
  selfCheckOutSearch: (term) => dispatch(selfCheckOutSearch(term)),
  selfCheckOut: (term) => dispatch(selfCheckOut(term)),
  notifyResultMessage: (message) => dispatch(notifyResultMessage(message)),
});

const mapStateToProps = (state) => ({
  item: state.selfCheckOut.item,
  user: state.authenticationManagement.data,
});

export const SelfCheckout = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelfCheckoutComponent);
