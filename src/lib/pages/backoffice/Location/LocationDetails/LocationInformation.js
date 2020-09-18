import { MetadataTable } from '@components/backoffice/MetadataTable';
import { CopyButton } from '@components/CopyButton';
import { EmailLink } from '@components/EmailLink';
import PropTypes from 'prop-types';
import React from 'react';
import { Grid } from 'semantic-ui-react';

export class LocationInformation extends React.Component {
  render() {
    const { location } = this.props;
    const leftTable = [
      { name: 'Name', value: location.name },
      {
        name: 'Email',
        value: (
          <span>
            <EmailLink email={location.email} />{' '}
            <CopyButton text={location.email} />
          </span>
        ),
      },
      { name: 'Notes', value: location.notes },
    ];
    const rightTable = [
      { name: 'Phone', value: location.phone },
      { name: 'Address', value: location.address },
    ];
    return (
      <Grid columns={2} id="location-info">
        <Grid.Row>
          <Grid.Column>
            <MetadataTable labelWidth={5} rows={leftTable} />
          </Grid.Column>
          <Grid.Column>
            <MetadataTable labelWidth={5} rows={rightTable} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

LocationInformation.propTypes = {
  location: PropTypes.object.isRequired,
};
