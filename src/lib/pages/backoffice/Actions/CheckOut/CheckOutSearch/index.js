/*
 * SPDX-FileCopyrightText: 2020-2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import CheckOutSearchComponent from './CheckOutSearch';
import { checkOutSearch } from '../state/actions';

const mapDispatchToProps = (dispatch) => ({
  checkOutSearch: (term, onSuccess) =>
    dispatch(checkOutSearch(term, onSuccess)),
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
