/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import React, { Component } from 'react';
import { CheckOutSearch } from './CheckOutSearch';
import { CheckOutResults } from './CheckOutResults';
import { Header } from 'semantic-ui-react';
import { Helmet } from 'react-helmet-async';

export class CheckOut extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Check-out</title>
        </Helmet>
        <Header as="h2">Check-out physical copies</Header>
        <CheckOutSearch />
        <CheckOutResults />
      </>
    );
  }
}
