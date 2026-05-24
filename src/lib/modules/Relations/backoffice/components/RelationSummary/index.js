/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import RelationSummaryComponent from './RelationSummary';

const mapStateToProps = (state) => ({
  selections: state.recordRelationsSelections.selections,
});

export const RelationSummary = connect(mapStateToProps)(
  RelationSummaryComponent
);
