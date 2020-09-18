import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Container, Grid, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import LocationOpeningHours from './LocationOpeningHours';
import { sessionManager } from '@authentication/services/SessionManager';
import _get from 'lodash/get';
import _sortBy from 'lodash/sortBy';
import { AuthenticationGuard } from '@authentication/components/AuthenticationGuard';
import { Link } from 'react-router-dom';
import { BackOfficeRoutes } from '@routes/backoffice/backofficeUrls';

class OpeningHours extends Component {
  constructor(props) {
    super(props);
    this.fetchAllLocations = props.fetchAllLocations;
  }

  componentDidMount() {
    this.fetchAllLocations();
  }

  renderItems = () => {
    const {
      data: { hits },
    } = this.props;
    const locationPid = _get(sessionManager, 'user.locationPid');
    return _sortBy(hits, h => [h.pid !== locationPid, h.pid]).map(location => (
      <Grid.Row key={location.pid}>
        <Grid.Column stretched>
          <Header as="h3">
            {location.metadata.name}{' '}
            <AuthenticationGuard
              silent
              authorizedComponent={() => (
                <Link to={BackOfficeRoutes.locationsEditFor(location.pid)}>
                  <Icon name="edit" fitted />
                </Link>
              )}
              roles={['admin', 'librarian']}
              loginComponent={() => null}
            />
          </Header>
          <LocationOpeningHours location={location} />
        </Grid.Column>
      </Grid.Row>
    ));
  };

  render() {
    const { error, isLoading } = this.props;
    return (
      <Container className="spaced">
        <Header as="h2">Opening hours</Header>
        <Loader isLoading={isLoading}>
          <Error error={error}>
            <Grid>{this.renderItems()}</Grid>
          </Error>
        </Loader>
      </Container>
    );
  }
}

OpeningHours.propTypes = {
  /* Redux */
  data: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchAllLocations: PropTypes.func.isRequired,
};

export default Overridable.component('OpeningHours', OpeningHours);
