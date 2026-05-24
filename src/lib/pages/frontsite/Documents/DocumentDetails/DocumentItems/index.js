/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import DocumentItemsComponent from './DocumentItems';

const mapStateToProps = (state) => ({
  documentDetails: state.documentDetailsFront.data,
});

export const DocumentItems = connect(
  mapStateToProps,
  null
)(DocumentItemsComponent);
