import { authenticationService } from '@authentication/services/AuthenticationService';
import { parseParams } from '@authentication/utils';
import { BaseForm } from '@forms/core/BaseForm';
import { StringField } from '@forms/core/StringField';
import { goTo } from '@history';
import { FrontSiteRoutes } from '@routes/urls';
import { getIn } from 'formik';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Container, Message } from 'semantic-ui-react';

const LoginWithLocalAccountLayout = ({
  errorHeader,
  errorMessage,
  hasError,
  data,
  buttons,
  onSubmit,
}) => {
  return (
    <Overridable
      id="LoginWithLocalAccount.layout"
      data={data}
      buttons={buttons}
      onSubmit={onSubmit}
    >
      <Container
        fluid
        id="login-with-local-account-form"
        className="bottom-spaced"
      >
        <BaseForm initialValues={data} buttons={buttons} onSubmit={onSubmit}>
          <StringField
            fieldPath="email"
            placeholder="Email Address"
            type="email"
            icon="user"
            iconPosition="left"
            required
          />
          <StringField
            fieldPath="password"
            placeholder="Password"
            type="password"
            icon="lock"
            iconPosition="left"
            required
          />
          {hasError && (
            <Message negative header={errorHeader} content={errorMessage} />
          )}
        </BaseForm>
      </Container>
    </Overridable>
  );
};

class LoginWithLocalAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        password: '',
      },
    };
  }

  get buttons() {
    return [
      {
        name: 'login',
        content: 'Sign in',
        primary: true,
        type: 'submit',
        fluid: true,
      },
    ];
  }

  onSubmit = async (values, actions) => {
    try {
      actions.setSubmitting(true);
      const response = await authenticationService.loginWithLocalAccount(
        values
      );
      this.onSuccess(response);
    } catch (error) {
      const errors = getIn(error, 'response.data.errors', []);

      if (_isEmpty(errors)) {
        const message = getIn(error, 'response.data.message', null);
        if (message) {
          actions.setSubmitting(false);
          actions.setErrors({ message });
        }
      } else {
        const errorData = error.response.data;
        const payload = {};
        for (const fieldError of errorData.errors) {
          payload[fieldError.field] = fieldError.message;
        }
        actions.setErrors(payload);
        actions.setSubmitting(false);
      }
    }
  };

  onSuccess = () => {
    const { fetchUserProfile } = this.props;
    const params = parseParams(window.location.search);
    fetchUserProfile();
    goTo(params.next || FrontSiteRoutes.home);
  };

  render() {
    const { hasError, errorHeader, errorMessage } = this.props;
    const { data } = this.state;
    return (
      <LoginWithLocalAccountLayout
        {...this.props}
        data={data}
        buttons={this.buttons}
        onSubmit={this.onSubmit}
        errorHeader={errorHeader}
        errorMessage={errorMessage}
        hasError={hasError}
      />
    );
  }
}

LoginWithLocalAccount.propTypes = {
  /* Redux */
  fetchUserProfile: PropTypes.func.isRequired,
  clearNotifications: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorHeader: PropTypes.string,
};

LoginWithLocalAccount.defaultProps = {
  hasError: false,
  errorHeader: '',
  errorMessage: '',
};

LoginWithLocalAccountLayout.propTypes = {
  data: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttons: PropTypes.array.isRequired,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorHeader: PropTypes.string,
};

LoginWithLocalAccountLayout.defaultProps = {
  hasError: false,
  errorHeader: '',
  errorMessage: '',
};

export default Overridable.component(
  'LoginWithLocalAccount',
  LoginWithLocalAccount
);
