/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import CheckOutSearchComponent from './CheckOutSearch';
import { checkOutSearch } from '../state/actions';

const mapDispatchToProps = (dispatch) => ({
  checkOutSearch: (term) => dispatch(checkOutSearch(term)),
});

const mapStateToProps = (state) => ({
  item: state.checkOut.item,
  patron: state.checkOut.patron,
  isLoading: state.checkOut.isLoading,
  error: state.checkOut.error,
});

export const CheckOutSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckOutSearchComponent);
