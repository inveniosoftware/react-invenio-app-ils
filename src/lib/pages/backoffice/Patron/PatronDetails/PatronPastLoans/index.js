/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import { fetchPatronPastLoans } from '@modules/Patron/PatronPastLoans/actions';
import PatronPastLoansComponent from './PatronPastLoans';

const mapStateToProps = (state) => ({
  data: state.patronPastLoans.data,
  error: state.patronPastLoans.error,
  isLoading: state.patronPastLoans.isLoading,
  hasError: state.patronPastLoans.hasError,
  patronDetails: state.patronDetails.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPatronPastLoans: (patronPid, optionalParams = {}) =>
    dispatch(fetchPatronPastLoans(patronPid, optionalParams)),
});

export const PatronPastLoans = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatronPastLoansComponent);
