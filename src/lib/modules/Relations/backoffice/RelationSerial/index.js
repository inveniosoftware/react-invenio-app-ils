/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';

import RelationSerialComponent from './RelationSerial';

const mapStateToProps = (state) => ({
  error: state.recordRelations.error,
  isLoading: state.recordRelations.isLoading,
  relations: state.recordRelations.data,
});

export const RelationSerial = connect(
  mapStateToProps,
  null
)(RelationSerialComponent);
