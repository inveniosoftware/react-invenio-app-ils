import { LoginWithOauthButton } from '@authentication/components/LoginWithOauthButton';
import { parseParams } from '@authentication/utils';
import { invenioConfig } from '@config';
import { goTo } from '@history';
import { FrontSiteRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Container } from 'semantic-ui-react';

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
    const { providerName } = this.props;
    const params = parseParams(window.location.search);
    this.checkIfOauthLoginResponse(params);
    const {
      enabled,
      label,
      name,
      className,
      semanticUiColor,
      ...restProps
    } = invenioConfig.APP.OAUTH_PROVIDERS[providerName];
    return (
      <Overridable id="LoginWithOauth.layout" {...this.props}>
        <Container fluid>
          <div className="pb-default">
            <LoginWithOauthButton
              key={name}
              content={label}
              name={name}
              nextUrl={params.next || FrontSiteRoutes.home}
              color={semanticUiColor}
              className={className}
              {...restProps}
            />
          </div>
        </Container>
      </Overridable>
    );
  }
}

LoginWithOauthProviders.propTypes = {
  /* Redux */
  sendErrorNotification: PropTypes.func.isRequired,
  clearNotifications: PropTypes.func.isRequired,
  providerName: PropTypes.string.isRequired,
};

export default Overridable.component('LoginWithOauth', LoginWithOauthProviders);
