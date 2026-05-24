/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import CheckOutResultsComponent from './CheckOutResults';
import { clearResults } from '../state/actions';

const mapDispatchToProps = (dispatch) => ({
  clearResults: () => dispatch(clearResults()),
});

const mapStateToProps = (state) => ({
  itemList: state.checkOut.itemList,
  patronList: state.checkOut.patronList,
  isLoading: state.checkOut.isLoading,
  resultMessage: state.checkOut.resultMessage,
});

export const CheckOutResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckOutResultsComponent);
