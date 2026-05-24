/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import { fetchUserProfile } from '@authentication/state/actions';
import LoginWithLocalAccountComponent from './LoginWithLocalAccount';

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: () => dispatch(fetchUserProfile()),
});

export const LoginWithLocalAccount = connect(
  null,
  mapDispatchToProps
)(LoginWithLocalAccountComponent);
