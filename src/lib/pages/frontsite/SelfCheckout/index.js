import { connect } from 'react-redux';

import SelfCheckoutComponent from './SelfCheckout';
import { selfCheckOutSearch, notifyResultMessage } from './state/actions';

const mapDispatchToProps = (dispatch) => ({
  selfCheckOutSearch: (term) => dispatch(selfCheckOutSearch(term)),
  notifyResultMessage: (message) => dispatch(notifyResultMessage(message)),
});

const mapStateToProps = (state) => ({
  item: state.selfCheckOut.item,
});

export const SelfCheckout = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelfCheckoutComponent);
