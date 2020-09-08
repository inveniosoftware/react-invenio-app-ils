import { authenticationService } from '@authentication/services/AuthenticationService';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Message } from 'semantic-ui-react';

export default class LoginWithOauthButton extends Component {
  render() {
    const { nextUrl, url, hasError, errorMessage, ...restProps } = this.props;
    return (
      <>
        <Button
          fluid
          {...restProps}
          onClick={() =>
            authenticationService.loginWithOauthProvider(
              nextUrl || window.location.pathname,
              url
            )
          }
        />
        {hasError && (
          <Message negative header="Login failed." content={errorMessage} />
        )}
      </>
    );
  }
}

LoginWithOauthButton.propTypes = {
  content: PropTypes.string,
  nextUrl: PropTypes.string,
  url: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

LoginWithOauthButton.defaultProps = {
  content: 'Login',
  nextUrl: null,
  hasError: false,
  errorMessage: '',
};
