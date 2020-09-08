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
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  checkIfOauthLoginResponse = params => {
    const isOauthResponse = 'code' in params;
    const { hasError } = this.state;
    if (!isOauthResponse) return;
    if (params.code === 200) {
      if (hasError) {
        this.setState({
          hasError: false,
          errorMessage: '',
        });
      }
      goTo(params.next_url);
    } else {
      if (!hasError) {
        this.setState({
          hasError: true,
          errorMessage: params.message,
        });
      }
    }
  };

  render() {
    const { providerName } = this.props;
    const { hasError, errorMessage } = this.state;
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
              hasError={hasError}
              errorMessage={errorMessage}
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
  clearNotifications: PropTypes.func.isRequired,
  providerName: PropTypes.string.isRequired,
};

export default Overridable.component('LoginWithOauth', LoginWithOauthProviders);
