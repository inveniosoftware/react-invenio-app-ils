import { AuthenticationGuard } from '@authentication/components/AuthenticationGuard';
import { UnAuthorized } from '@authentication/components/UnAuthorized';
import { ConfirmEmail } from '@authentication/pages';
import { Login } from '@authentication/pages/Login';
import { fetchUserProfile } from '@authentication/state/actions';
import { NotFound } from '@components/HttpErrors';
import { invenioConfig } from '@config';
import { AuthenticationRoutes } from '@routes/authentication/urls';
import { BackOffice } from '@routes/backoffice';
import { BackOfficeRoutes } from '@routes/backoffice/backofficeUrls';
import { FrontSite } from '@routes/frontsite';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { configureStore } from './store';
import { MediaContextProvider } from '@components/Media';
import { MathJaxContext } from 'better-react-mathjax';

export const ILSStore = configureStore();

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

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: () => dispatch(fetchUserProfile()),
});

const FetchUser = connect(null, mapDispatchToProps)(FetchUserComponent);

const mathJaxConfig = {
  tex: {
    inlineMath: [['$', '$']],
    displayMath: [['$$', '$$']],
  },
};

export default class App extends Component {
  constructor(props) {
    super(props);
    invenioConfig.merge(props.config);
  }

  render() {
    return (
      <MathJaxContext config={mathJaxConfig}>
        <MediaContextProvider>
          <Provider store={ILSStore}>
            <FetchUser>
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
                <FrontSite />
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </FetchUser>
          </Provider>
        </MediaContextProvider>
      </MathJaxContext>
    );
  }
}

App.propTypes = {
  config: PropTypes.object,
};

App.defaultProps = {
  config: {},
};
