import React, { Component } from 'react';
import {
  InternalServerError,
  NotFound,
  HttpErrorComponent,
  TooManyRequests,
  Unauthorized,
} from '@components/HttpErrors';

export class ErrorsPage extends Component {
  render() {
    const params = window.history.state ? window.history.state.state : null;

    if (params) {
      if (params.errorCode >= 500) {
        if (params.errorId) {
          return <InternalServerError errorId={params.errorId} />;
        }
        return <InternalServerError />;
      } else if (params.errorCode === 404) {
        return <NotFound />;
      } else if (params.errorCode === 410) {
        return (
          <HttpErrorComponent
            title="Resource No Longer Available"
            message="The requested content has been removed."
            icon="compass outline"
          />
        );
      } else if (params.errorCode === 403) {
        return <Unauthorized />;
      } else if (params.errorCode === 429) {
        return <TooManyRequests />;
      }
    }
    return null;
  }
}
