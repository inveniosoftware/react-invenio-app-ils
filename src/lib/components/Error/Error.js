import get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Message } from 'semantic-ui-react';
import { DefaultFallbackComponent } from './DefaultFallbackComponent';

const isAPIError = error => {
  return get(error, 'response.data.message') !== undefined;
};

export const shouldShowErrorPage = error => {
  if (!isAPIError(error)) {
    return true;
  }

  return error.response.status !== 400;
};

export class Error extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      info: null,
    };

    if (props.boundary) {
      // NOTE: componentDidCatch is React internal and if it finds it it makes
      // it an error boundary.
      this.componentDidCatch = this.customComponentDidCatch;
    }
  }

  customComponentDidCatch(error, info) {
    const { onUIError } = this.props;

    if (typeof onUIError === 'function') {
      onUIError.call(this, error, info);
    }

    this.setState({ error, info });
  }

  renderErrorMessage(error) {
    let message = get(error, 'response.data.message');
    if (!message) {
      message = get(error, 'message');
      if (!message) {
        message = 'Unknown error';
      }
    }

    return (
      <Container>
        <Message negative header="Something went wrong" content={message} />
      </Container>
    );
  }

  render() {
    const { boundary, children, error, FallbackComponent } = this.props;

    const { error: stateError } = this.state;
    if (boundary && stateError) {
      return <FallbackComponent {...this.state} />;
    } else if (!_isEmpty(error) && shouldShowErrorPage(error)) {
      return this.renderErrorMessage(error);
    } else {
      return children ? children : null;
    }
  }
}

Error.propTypes = {
  error: PropTypes.object,
  onUIError: PropTypes.func,
  boundary: PropTypes.bool,
  children: PropTypes.node,
  FallbackComponent: PropTypes.elementType,
};

Error.defaultProps = {
  error: null,
  boundary: false,
  children: null,
  FallbackComponent: DefaultFallbackComponent,
  onUIError: null,
};
