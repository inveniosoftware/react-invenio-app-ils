import { LoginWithOauthButton } from '@authentication/components';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { OAUTH_PROVIDERS } from '@config';
import { FrontSiteRoutes } from '@routes/urls';
import { goTo } from '@history';
import Overridable from 'react-overridable';
import { Container } from 'semantic-ui-react';
import { parseParams } from '@authentication/utils';

export class LoginWithOauthProviders extends Component {
  checkIfOauthLoginResponse = params => {
    const isOauthResponse = 'code' in params;
    const { clearNotifications, sendErrorNotification } = this.props;
    if (!isOauthResponse) return;
    if (params.code === 200) {
      clearNotifications();
      goTo(params.next_url);
    } else {
      sendErrorNotification('Login failed.', params.message);
    }
  };

  render() {
    const params = parseParams(window.location.search);
    this.checkIfOauthLoginResponse(params);
    const { label, name, ...restProps } = OAUTH_PROVIDERS['github'];
    return (
      <Overridable id="LoginWithOauth.layout" {...this.props}>
        <Container fluid>
          <LoginWithOauthButton
            key={name}
            content={label}
            name={name}
            nextUrl={params.next || FrontSiteRoutes.home}
            color="black"
            {...restProps}
          />
        </Container>
      </Overridable>
    );
  }
}

LoginWithOauthProviders.propTypes = {
  /* Redux */
  sendErrorNotification: PropTypes.func.isRequired,
  clearNotifications: PropTypes.func.isRequired,
};

export default Overridable.component('LoginWithOauth', LoginWithOauthProviders);
