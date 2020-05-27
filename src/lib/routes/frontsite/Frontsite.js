import { LiteratureSearch } from '@pages/frontsite/Literature';
import { DocumentDetails } from '@pages/frontsite/Documents';
import { SeriesDetails } from '@pages/frontsite/Series';
import { DocumentRequestForm } from '@pages/frontsite/DocumentRequests';
import { PatronProfile } from '@pages/frontsite/PatronProfile';
import { Notifications } from '@components/Notifications';
import { StaticPage } from '@pages/frontsite/StaticPage';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ILSMenu, ILSFooter, NotFound } from '@components';
import { FrontSiteRoutes } from '@routes/frontsite/frontsiteUrls';
import { Home } from '@pages/frontsite';
import { Container } from 'semantic-ui-react';
import { getStaticPagesRoutes } from '@config/uiConfig';

export default class FrontSite extends Component {
  renderCustomStaticPages = () => {
    const { customStaticPages } = this.props;
    customStaticPages();
  };

  render() {
    const staticPagesRoutes = getStaticPagesRoutes();
    return (
      <div className="frontsite">
        <ILSMenu />
        <Notifications className="compact" />
        <Container fluid className="fs-content">
          <Switch>
            <Route
              exact
              path={FrontSiteRoutes.home}
              render={props => <Home {...props} {...this.props} />}
            />
            <Route
              exact
              path={FrontSiteRoutes.documentsList}
              component={LiteratureSearch}
            />
            <Route
              exact
              path={FrontSiteRoutes.documentDetails}
              component={DocumentDetails}
            />
            <Route
              exact
              path={FrontSiteRoutes.seriesDetails}
              component={SeriesDetails}
            />
            <Route
              exact
              path={FrontSiteRoutes.documentRequestForm}
              component={DocumentRequestForm}
            />
            <Route
              exact
              path={FrontSiteRoutes.patronProfile}
              component={PatronProfile}
            />
            {staticPagesRoutes.map(route => (
              <Route key={route} exact path={route} component={StaticPage} />
            ))}
            {this.renderCustomStaticPages()}
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Container>
        <ILSFooter />
      </div>
    );
  }
}

FrontSite.propTypes = {
  customStaticPages: PropTypes.func,
};

FrontSite.defaultProps = {
  customStaticPages: () => {},
};
