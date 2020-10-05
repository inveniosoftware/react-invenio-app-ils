import React, { Component } from 'react';
import {
  InternalServerError,
  NotFound,
  TooManyRequests,
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
      } else if (params.errorCode === 429) {
        return <TooManyRequests />;
      }
    }
    return null;
  }
}
