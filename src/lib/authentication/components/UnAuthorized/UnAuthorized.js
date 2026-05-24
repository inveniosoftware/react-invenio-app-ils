/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FrontSiteRoutes } from '@routes/urls';

export class UnAuthorized extends Component {
  render() {
    return <Redirect to={FrontSiteRoutes.home} data-test="unauthorized" />;
  }
}
