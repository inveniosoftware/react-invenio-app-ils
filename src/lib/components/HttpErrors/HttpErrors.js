import Overridable from 'react-overridable';
import React from 'react';
import HttpError from './HttpError';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  icon: PropTypes.string,
  isBackOffice: PropTypes.bool,
  errorId: PropTypes.string,
};

const defaultProps = {
  title: undefined,
  message: undefined,
  icon: undefined,
  isBackOffice: false,
  errorId: undefined,
};

function UnauthorizedComponent(props) {
  const {
    title = 'Unauthorized',
    message = 'You are not authorized to access this resource.',
    icon = 'ban',
  } = props;
  const newProps = { ...props, ...{ title, message, icon } };
  return (
    <Overridable id="Unauthorized.layout" {...newProps}>
      <HttpError {...newProps} />
    </Overridable>
  );
}

UnauthorizedComponent.propTypes = propTypes;
UnauthorizedComponent.defaultProps = defaultProps;

export const Unauthorized = Overridable.component(
  'Unauthorized',
  UnauthorizedComponent
);

function ForbiddenComponent(props) {
  const {
    title = 'Access Forbidden',
    message = 'You do not have the sufficient privileges to access this resource.',
    icon = 'ban',
  } = props;
  const newProps = { ...props, ...{ title, message, icon } };
  return (
    <Overridable id="Forbidden.layout" {...newProps}>
      <HttpError {...newProps} />
    </Overridable>
  );
}

ForbiddenComponent.propTypes = propTypes;
ForbiddenComponent.defaultProps = defaultProps;

export const Forbidden = Overridable.component('Forbidden', ForbiddenComponent);

export class HttpErrorComponent extends React.Component {
  render() {
    return (
      <Overridable id="HttpErrorComponent.layout" {...this.props}>
        <HttpError {...this.props} />
      </Overridable>
    );
  }
}

HttpErrorComponent.propTypes = propTypes;
HttpErrorComponent.defaultProps = defaultProps;

function NotFoundComponent(props) {
  return (
    <HttpErrorComponent
      title="Page Not Found"
      message="The requested page could not be found."
      icon="compass outline"
    />
  );
}

export const NotFound = Overridable.component('NotFound', NotFoundComponent);

function TooManyRequestsComponent(props) {
  const {
    title = 'Internal Server Error',
    message = 'Something went wrong and the server was not able to complete the request. The administrators were notified of the problem. Please try again later',
    icon = 'exclamation circle',
  } = props;
  const newProps = { ...props, ...{ title, message, icon } };
  return (
    <Overridable id="TooManyRequests.layout" {...newProps}>
      <HttpError {...newProps} />
    </Overridable>
  );
}

TooManyRequestsComponent.propTypes = propTypes;
TooManyRequestsComponent.defaultProps = defaultProps;

export const TooManyRequests = Overridable.component(
  'TooManyRequests',
  TooManyRequestsComponent
);

function InternalServerErrorComponent(props) {
  const {
    title = 'Internal Server Error',
    message = 'Something went wrong and the server was not able to complete the request. The administrators were notified of the problem.',
    icon = 'exclamation circle',
  } = props;
  const newProps = { ...props, ...{ title, message, icon } };
  return (
    <Overridable id="InternalServerError.layout" {...newProps}>
      <HttpError {...newProps} />
    </Overridable>
  );
}

InternalServerErrorComponent.propTypes = propTypes;
InternalServerErrorComponent.defaultProps = defaultProps;

export const InternalServerError = Overridable.component(
  'InternalServerError',
  InternalServerErrorComponent
);
