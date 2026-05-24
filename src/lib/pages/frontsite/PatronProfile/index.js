/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import PatronProfileComponent from './PatronProfile';

const mapStateToProps = (state) => ({
  user: state.authenticationManagement.data,
});

export const PatronProfile = connect(mapStateToProps)(PatronProfileComponent);
