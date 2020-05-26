import { LiteratureSearch } from '@pages/frontsite/Literature';
import { DocumentDetails } from '@pages/frontsite/Documents';
import { SeriesDetails } from '@pages/frontsite/Series';
import { DocumentRequestForm } from '@pages/frontsite/DocumentRequests';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ILSMenu, ILSFooter, NotFound } from '@components';
import { FrontSiteRoutes } from '@routes/frontsite/frontsiteUrls';
import { Home } from '@pages/frontsite';
import { Container } from 'semantic-ui-react';

export default class FrontSite extends Component {
  render() {
    return (
      <div className="frontsite">
        <ILSMenu />
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

FrontSite.propTypes = {};
