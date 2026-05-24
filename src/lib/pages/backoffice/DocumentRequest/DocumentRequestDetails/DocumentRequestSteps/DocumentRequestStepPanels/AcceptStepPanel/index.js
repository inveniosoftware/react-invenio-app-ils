/*
 * SPDX-FileCopyrightText: 2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { acceptRequest } from '@pages/backoffice/DocumentRequest/DocumentRequestDetails/state/actions';
import { connect } from 'react-redux';
import AcceptStepPanelComponent from './AcceptStepPanel';

const mapDispatchToProps = (dispatch) => ({
  acceptRequest: (documentRequestPid) =>
    dispatch(acceptRequest(documentRequestPid)),
});

export const AcceptStepPanel = connect(
  null,
  mapDispatchToProps
)(AcceptStepPanelComponent);
