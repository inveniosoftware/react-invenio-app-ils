import { authenticationService } from '@authentication/services/AuthenticationService';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class LoginWithOauthButton extends Component {
  render() {
    const { nextUrl, url, ...restProps } = this.props;
    return (
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
    );
  }
}

LoginWithOauthButton.propTypes = {
  content: PropTypes.string,
  nextUrl: PropTypes.string,
  url: PropTypes.string.isRequired,
};

LoginWithOauthButton.defaultProps = {
  content: 'Login',
  nextUrl: null,
};
