import { EditButton } from '@components/backoffice/buttons/EditButton';
import { DeleteRecordModal } from '@components/backoffice/DeleteRecordModal';
import { DeleteButton } from '@components/backoffice/DeleteRecordModal/DeleteButton';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { LocationIcon } from '@components/backoffice/icons';
import { CopyButton } from '@components/CopyButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Accordion,
  Container,
  Divider,
  Grid,
  Ref,
  Sticky,
} from 'semantic-ui-react';
import { LocationInformation } from './LocationInformation';
import { goTo } from '@history';
import { internalLocationApi } from '@api/locations';
import { LocationOpeningHours } from '@pages/frontsite/OpeningHours';

const DeleteLocationButton = props => {
  return (
    <DeleteButton
      fluid
      content="Delete location"
      labelPosition="left"
      {...props}
    />
  );
};

class ActionMenu extends React.Component {
  createRefProps(locationPid) {
    return [
      {
        refType: 'Internal Location',
        onRefClick: iLocPid => {
          goTo(BackOfficeRoutes.ilocationsEditFor(iLocPid));
        },
        getRefData: () =>
          internalLocationApi.list(`location_pid:${locationPid}`),
      },
    ];
  }

  render() {
    const {
      data: { metadata: location },
      deleteLocationHandler,
    } = this.props;

    return (
      <div className="bo-action-menu">
        <Sticky context={this.contextRef}>
          <EditButton
            fluid
            to={BackOfficeRoutes.locationsEditFor(location.pid)}
          />
          <DeleteRecordModal
            deleteHeader={`Are you sure you want to delete the Location
          record with ID ${location.pid}?`}
            onDelete={() => deleteLocationHandler(location.pid)}
            refProps={this.createRefProps(location.pid)}
            trigger={DeleteLocationButton}
          />
        </Sticky>
      </div>
    );
  }
}

ActionMenu.propTypes = {
  data: PropTypes.object.isRequired,
  deleteLocationHandler: PropTypes.func.isRequired,
};

class LocationHeader extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <DetailsHeader
        title={data.metadata.name}
        pid={data.metadata.pid}
        icon={<LocationIcon />}
        recordType="Location"
      >
        <label>Location</label> #{data.metadata.pid}
        <CopyButton text={data.metadata.pid} />
      </DetailsHeader>
    );
  }
}

LocationHeader.propTypes = {
  data: PropTypes.object.isRequired,
};

class LocationDetailsInner extends React.Component {
  constructor(props) {
    super(props);
    this.contextRef = React.createRef();
  }

  render() {
    const { data } = this.props;
    const panels = [
      {
        key: 'location-info',
        title: 'Location information',
        content: (
          <Accordion.Content>
            <div ref={this.locationInfoRef}>
              <LocationInformation location={data.metadata} />
            </div>
          </Accordion.Content>
        ),
      },
    ];

    return (
      <Accordion
        fluid
        styled
        className="highlighted"
        panels={panels}
        exclusive={false}
        defaultActiveIndex={[0]}
      />
    );
  }
}

LocationDetailsInner.propTypes = {
  data: PropTypes.object.isRequired,
};

export default class LocationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    const { fetchLocationDetails, match } = this.props;
    fetchLocationDetails(match.params.locationPid);
  }

  componentDidUpdate(prevProps) {
    const { fetchLocationDetails, match } = this.props;
    const locationPid = match.params.locationPid;
    const samePidFromRouter =
      prevProps.match.params.locationPid === locationPid;
    if (!samePidFromRouter) {
      fetchLocationDetails(locationPid);
    }
  }

  render() {
    const { data, isLoading, error, deleteLocation } = this.props;

    return (
      <div ref={this.headerRef}>
        <Container fluid>
          <Loader isLoading={isLoading}>
            <Error error={error}>
              <Sticky context={this.headerRef} className="solid-background">
                <Container fluid className="spaced">
                  <LocationHeader data={data} />
                </Container>
                <Divider />
              </Sticky>
              <Container fluid>
                <Ref innerRef={this.menuRef}>
                  <Grid columns={2}>
                    <Grid.Column width={13}>
                      <Container className="spaced">
                        <LocationDetailsInner data={data} />
                        <LocationOpeningHours location={data} />
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Sticky context={this.menuRef} offset={150}>
                        <ActionMenu
                          data={data}
                          deleteLocationHandler={deleteLocation}
                        />
                      </Sticky>
                    </Grid.Column>
                  </Grid>
                </Ref>
              </Container>
            </Error>
          </Loader>
        </Container>
      </div>
    );
  }
}

LocationDetails.propTypes = {
  data: PropTypes.object.isRequired,
  error: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  fetchLocationDetails: PropTypes.func.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      locationPid: PropTypes.string,
    }),
  }).isRequired,
};

LocationDetails.defaultProps = {
  error: null,
};
