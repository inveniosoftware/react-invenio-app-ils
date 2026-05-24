/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { deleteRelation } from '../../state/actions';
import RelationRemoverComponent from './RelationRemover';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  deleteRelation: (referrer, related) =>
    dispatch(deleteRelation(referrer, related)),
});

export const RelationRemover = connect(
  null,
  mapDispatchToProps
)(RelationRemoverComponent);
