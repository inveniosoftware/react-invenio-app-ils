/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';

import ItemCirculationComponent from './ItemCirculation';

const mapStateToProps = (state) => ({
  isLoading: state.itemDetails.isLoading,
  error: state.itemDetails.error,
  data: state.itemDetails.data,
});

export const ItemCirculation = connect(
  mapStateToProps,
  null
)(ItemCirculationComponent);
