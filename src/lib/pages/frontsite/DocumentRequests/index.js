/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import DocumentRequestFormComponent from './DocumentRequestForm';
import { sendSuccessNotification } from '@components/Notifications';

const mapStateToProps = (state) => ({
  user: state.authenticationManagement.data,
});

const mapDispatchToProps = (dispatch) => ({
  sendSuccessNotification: (title, content) =>
    dispatch(sendSuccessNotification(title, content)),
});

export const DocumentRequestForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentRequestFormComponent);
