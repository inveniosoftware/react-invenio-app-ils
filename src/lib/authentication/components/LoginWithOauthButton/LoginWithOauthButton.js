import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { authenticationService } from '@authentication/services/AuthenticationService';

export default class LoginWithOauthButton extends Component {
  render() {
    const { nextUrl, baseUrl, ...restProps } = this.props;
    return (
      <Button
        fluid
        icon
        labelPosition="left"
        {...restProps}
        onClick={() =>
          authenticationService.loginWithOauthProvider(
            nextUrl || window.location.pathname,
            baseUrl
          )
        }
      />
    );
  }
}

LoginWithOauthButton.propTypes = {
  content: PropTypes.string,
  nextUrl: PropTypes.string,
  baseUrl: PropTypes.string.isRequired,
};

LoginWithOauthButton.defaultProps = {
  content: 'Login',
  nextUrl: null,
};
