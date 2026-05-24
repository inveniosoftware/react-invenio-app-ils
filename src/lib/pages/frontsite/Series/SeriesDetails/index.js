/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import { fetchSeriesDetails } from './state/actions';
import SeriesDetailsContainerComponent from './SeriesDetails';

const mapDispatchToProps = (dispatch) => ({
  fetchSeriesDetails: (pid) => dispatch(fetchSeriesDetails(pid)),
});

const mapStateToProps = (state) => ({
  isLoading: state.seriesDetailsFront.isLoading,
  series: state.seriesDetailsFront.data,
  hasError: state.seriesDetailsFront.hasError,
  error: state.seriesDetailsFront.error,
});

export const SeriesDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(SeriesDetailsContainerComponent);
