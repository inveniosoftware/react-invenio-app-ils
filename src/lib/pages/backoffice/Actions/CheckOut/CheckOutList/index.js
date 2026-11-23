/*
 * SPDX-FileCopyrightText: 2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import CheckOutListComponent from './CheckOutList';
import { checkOutItems, removeFromCheckOutList } from '../state/actions';

const mapDispatchToProps = (dispatch) => ({
  removeFromCheckOutList: (itemPid) =>
    dispatch(removeFromCheckOutList(itemPid)),
  checkOutItems: (items, patronPid, patronName) =>
    dispatch(checkOutItems(items, patronPid, patronName)),
});

const mapStateToProps = (state) => ({
  items: state.checkOut.checkOutList,
  isLoading: state.checkOut.checkOutListIsLoading,
});

export const CheckOutList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckOutListComponent);
