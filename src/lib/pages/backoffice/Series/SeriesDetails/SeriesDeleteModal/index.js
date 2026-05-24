/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import { deleteSeries } from '../state/actions';

import SeriesDeleteModalComponent from './SeriesDeleteModal';

const mapDeleteDispatch = (dispatch) => ({
  deleteSeries: (seriesPid) => dispatch(deleteSeries(seriesPid)),
});

export const SeriesDeleteModal = connect(
  null,
  mapDeleteDispatch
)(SeriesDeleteModalComponent);
