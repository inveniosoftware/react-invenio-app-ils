/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import {
  fetchInternalLocations,
  deleteInternalLocation,
} from './state/actions';
import InternalLocationListComponent from './InternalLocationList';

const mapStateToProps = (state) => ({
  data: state.internalLocations.data,
  error: state.internalLocations.error,
  isLoading: state.internalLocations.isLoading,
  hasError: state.internalLocations.hasError,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInternalLocations: () => dispatch(fetchInternalLocations()),
  deleteInternalLocation: (ilocPid) =>
    dispatch(deleteInternalLocation(ilocPid)),
});

export const InternalLocationList = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalLocationListComponent);
