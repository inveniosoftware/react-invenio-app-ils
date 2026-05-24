/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';

import DocumentSummaryComponent from './DocumentSummary';

const mapStateToProps = (state) => ({
  document: state.documentDetails.data,
  error: state.documentDetails.error,
  loading: state.documentDetails.isLoading,
});

export const DocumentSummary = connect(
  mapStateToProps,
  null
)(DocumentSummaryComponent);
