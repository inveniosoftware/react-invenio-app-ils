/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import ItemsSearchComponent from './ItemsSearch';
import { checkin } from './state/actions';

const mapDispatchToProps = (dispatch) => ({
  checkin: (barcode, onSuccess) => dispatch(checkin(barcode, onSuccess)),
});

const mapStateToProps = (state) => ({
  loans: state.itemsCheckIn.data,
});

export const ItemsSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsSearchComponent);
