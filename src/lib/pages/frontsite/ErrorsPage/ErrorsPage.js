/*
 * SPDX-FileCopyrightText: 2020-2025 CERN.
 * SPDX-License-Identifier: MIT
 */

import React, { Component } from 'react';
import {
  InternalServerError,
  NotFound,
  HttpErrorComponent,
  TooManyRequests,
  Unauthorized,
} from '@components/HttpErrors';
import { Helmet } from 'react-helmet-async';

export class ErrorsPage extends Component {
  render() {
    const params = window.history.state ? window.history.state.state : null;

    if (params) {
      if (params.errorCode >= 500) {
        if (params.errorId) {
          return (
            <>
              <Helmet>
                <title>Internal Server Error</title>
              </Helmet>
              <InternalServerError errorId={params.errorId} />
            </>
          );
        }
        return (
          <>
            <Helmet>
              <title>Internal Server Error</title>
            </Helmet>
            <InternalServerError />
          </>
        );
      } else if (params.errorCode === 404) {
        return (
          <>
            <Helmet>
              <title>Page Not Found</title>
            </Helmet>
            <NotFound />
          </>
        );
      } else if (params.errorCode === 410) {
        return (
          <>
            <Helmet>
              <title>Resource No Longer Available</title>
            </Helmet>
            <HttpErrorComponent
              title="Resource No Longer Available"
              message="The requested content has been removed."
              icon="compass outline"
            />
          </>
        );
      } else if (params.errorCode === 403) {
        return (
          <>
            <Helmet>
              <title>Unauthorized</title>
            </Helmet>
            <Unauthorized />
          </>
        );
      } else if (params.errorCode === 429) {
        return (
          <>
            <Helmet>
              <title>Too Many Requests</title>
            </Helmet>
            <TooManyRequests />
          </>
        );
      }
    }
    return null;
  }
}
