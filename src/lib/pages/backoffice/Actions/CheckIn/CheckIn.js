/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { ItemsSearch } from './ItemsSearch';
import { CheckedInItems } from './CheckedInItems';
import { Helmet } from 'react-helmet-async';

export default class CheckIn extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Check-in</title>
        </Helmet>
        <Header as="h2">Check-in physical copies</Header>
        <ItemsSearch />
        <CheckedInItems />
      </>
    );
  }
}
