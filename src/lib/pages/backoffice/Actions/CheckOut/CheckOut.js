/*
 * SPDX-FileCopyrightText: 2020-2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import React, { Component } from 'react';
import { CheckOutSearch } from './CheckOutSearch';
import { CheckOutResults } from './CheckOutResults';
import { CheckOutList } from './CheckOutList';
import { Header } from 'semantic-ui-react';

export class CheckOut extends Component {
  render() {
    return (
      <>
        <Header as="h2">Check-out physical copies</Header>
        <CheckOutSearch />
        <CheckOutList />
        <CheckOutResults />
      </>
    );
  }
}
