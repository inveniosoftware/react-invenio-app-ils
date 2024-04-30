import { connect } from 'react-redux';

import SelfCheckoutComponent from './SelfCheckout';
import { selfCheckOutSearch } from './state/actions';

const mapDispatchToProps = (dispatch) => ({
  selfCheckOutSearch: (term) => dispatch(selfCheckOutSearch(term)),
});

const mapStateToProps = (state) => ({
  // user: state.authenticationManagement.data,
  item: state.selfCheckOut.item,
  // isAnonymous: state.authenticationManagement.isAnonymous,
});

export const SelfCheckout = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelfCheckoutComponent);
