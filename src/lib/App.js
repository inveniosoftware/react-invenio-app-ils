import { AuthenticationGuard } from '@authentication/components/AuthenticationGuard';
import { UnAuthorized } from '@authentication/components/UnAuthorized';
import { ConfirmEmail } from '@authentication/pages';
import { Login } from '@authentication/pages/Login';
import { fetchUserProfile } from '@authentication/state/actions';
import { NotFound } from '@components/NotFound';
import history from '@history';
import { FrontSite } from '@routes/frontsite';
import { AuthenticationRoutes } from '@routes/authentication/urls';
import { BackOffice } from '@routes/backoffice';
import { BackOfficeRoutes } from '@routes/backoffice/backofficeUrls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';

class FetchUserComponent extends Component {
  componentDidMount() {
    const { fetchUserProfile } = this.props;
    fetchUserProfile();
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

FetchUserComponent.propTypes = {
  children: PropTypes.node.isRequired,
  /* REDUX */
  fetchUserProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchUserProfile: () => dispatch(fetchUserProfile()),
});

const FetchUser = connect(null, mapDispatchToProps)(FetchUserComponent);

export default class App extends Component {
  render() {
    return (
      <FetchUser>
        <Router history={history}>
          <Switch>
            <Route exact path={AuthenticationRoutes.login}>
              <Login />
            </Route>
            <AuthenticationGuard
              path={AuthenticationRoutes.confirmEmail}
              authorizedComponent={ConfirmEmail}
            />
            <AuthenticationGuard
              path={BackOfficeRoutes.home}
              authorizedComponent={BackOffice}
              unAuthorizedComponent={UnAuthorized}
              roles={['admin', 'librarian']}
            />
            <FrontSite {...this.props} />
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </FetchUser>
    );
  }
}

App.propTypes = {};
