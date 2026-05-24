/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { logout } from '@authentication/state/actions';
import { addNotification } from '@components/Notifications';
import { connect } from 'react-redux';
import SidebarComponent from './Sidebar';

const mapStateToProps = (state) => ({
  user: state.authenticationManagement.data,
});

const mapDispatchToProps = (dispatch) => ({
  sendErrorNotification: (title, content) =>
    dispatch(addNotification(title, content, 'error')),
  logout: () => dispatch(logout()),
});

export const Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarComponent);
