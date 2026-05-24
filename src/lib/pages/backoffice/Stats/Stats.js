/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import React, { Component } from 'react';
import { MostLoanedDocumentsList } from './MostLoanedDocumentsList';

export default class Stats extends Component {
  render() {
    return <MostLoanedDocumentsList />;
  }
}
