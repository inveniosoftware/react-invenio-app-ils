/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import { fetchPatronCurrentBorrowingRequests } from '@modules/Patron/PatronCurrentBorrowingRequests/actions';
import PatronCurrentBorrowingRequestsComponent from './PatronCurrentBorrowingRequests';

const mapStateToProps = (state) => ({
  patronDetails: state.patronDetails.data,
  ...state.patronCurrentBorrowingRequests,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPatronCurrentBorrowingRequests: (patronPid) =>
    dispatch(fetchPatronCurrentBorrowingRequests(patronPid)),
});

export const PatronCurrentBorrowingRequests = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatronCurrentBorrowingRequestsComponent);
