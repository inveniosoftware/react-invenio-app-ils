/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { LoanMetadata } from '../LoanMetadata';

export default class Loan extends Component {
  render() {
    return (
      <>
        <Header as="h3" attached="top">
          Loan
        </Header>
        <Segment attached className="bo-metadata-segment" id="loan-metadata">
          <LoanMetadata />
        </Segment>
      </>
    );
  }
}
