/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import SeriesDocumentsComponent from './SeriesDocuments';
import { fetchSeriesDocuments } from './state/actions';

const mapStateToProps = (state) => ({
  seriesDocuments: state.seriesDocuments.data,
  error: state.seriesDocuments.error,
  isLoading: state.seriesDocuments.isLoading,
  seriesDetails: state.seriesDetails.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSeriesDocuments: (seriesPid, moi) =>
    dispatch(fetchSeriesDocuments(seriesPid, moi)),
});

export const SeriesDocuments = connect(
  mapStateToProps,
  mapDispatchToProps
)(SeriesDocumentsComponent);
