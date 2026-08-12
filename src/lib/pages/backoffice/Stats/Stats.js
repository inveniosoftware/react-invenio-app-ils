/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import React, { Component } from 'react';
import { MostLoanedDocumentsList } from './MostLoanedDocumentsList';
import { Helmet } from 'react-helmet-async';

export default class Stats extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Most loaned</title>
        </Helmet>
        <MostLoanedDocumentsList />
      </>
    );
  }
}
