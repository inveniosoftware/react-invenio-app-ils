/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import PatronMetadataComponent from './PatronMetadata';

const mapStateToProps = (state) => ({
  patronDetails: state.patronDetails,
});

export const PatronMetadata = connect(mapStateToProps)(PatronMetadataComponent);
