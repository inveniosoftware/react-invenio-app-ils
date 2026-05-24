/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';

import { deleteDocument } from '../state/actions';
import DocumentDeleteModalComponent from './DocumentDeleteModal';

const mapDispatchToProps = (dispatch) => ({
  deleteDocument: (documentPid) => dispatch(deleteDocument(documentPid)),
});

export const DocumentDeleteModal = connect(
  null,
  mapDispatchToProps
)(DocumentDeleteModalComponent);
