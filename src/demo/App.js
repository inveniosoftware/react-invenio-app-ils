import { fetchUserProfile } from '@authentication/state/actions';
import { Login } from '@authentication/pages/Login';
import { AuthenticationRoutes } from '@routes/authentication/urls';
import { NotFound } from '@components';
import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { FrontSite } from '@routes';
import { connect } from 'react-redux';
import history from '@history';
import PropTypes from 'prop-types';
import { OverridableContext } from 'react-overridable';
import { Image, Item } from 'semantic-ui-react';

const CustomHome = ({ ...props }) => {
  return <>And this is custom home</>;
};

const CustomCover = ({ size, url, isRestricted, asItem, linkTo }) => {
  const Cmp = asItem ? Item.Image : Image;
  const link = linkTo ? { as: Link, to: linkTo } : {};
  return (
    <Cmp
      centered
      disabled={isRestricted}
      {...link}
      onError={e => (e.target.style.display = 'none')}
      src={url}
      size="tiny"
    />
  );
};

const map = {
  // "Home.render": CustomHome
  // 'LiteratureCover.layout': CustomCover,
};

class SetUserInfoComponent extends Component {
  componentDidMount() {
    this.props.fetchUserProfile();
  }

  render() {
    return this.props.children;
  }
}

SetUserInfoComponent.propTypes = {
  /* REDUX */
  fetchUserProfile: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchUserProfile: () => dispatch(fetchUserProfile()),
});

const SetUserInfo = connect(null, mapDispatchToProps)(SetUserInfoComponent);

export default class App extends Component {
  render() {
    return (
      <SetUserInfo>
        <OverridableContext.Provider value={map}>
          <Router history={history}>
            <Switch>
              <Route exact path={AuthenticationRoutes.login}>
                <Login />
              </Route>
              <FrontSite {...this.props} />
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </OverridableContext.Provider>
      </SetUserInfo>
    );
  }
}

App.propTypes = {};
