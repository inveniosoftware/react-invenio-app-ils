/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import LoanRequestFormComponent from './LoanRequestForm';
import { requestLoanForDocument, initializeState } from './actions';

const mapStateToProps = (state) => ({
  isLoading: state.loanRequestForm.isLoading,
  error: state.loanRequestForm.error,
  hasError: state.loanRequestForm.hasError,
  isSuccessful: state.loanRequestForm.isSuccessful,
});

const mapDispatchToProps = (dispatch) => ({
  requestLoanForDocument: (documentPid, optionalParams = {}) =>
    dispatch(requestLoanForDocument(documentPid, optionalParams)),
  initializeState: () => dispatch(initializeState()),
});

export const LoanRequestForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoanRequestFormComponent);
