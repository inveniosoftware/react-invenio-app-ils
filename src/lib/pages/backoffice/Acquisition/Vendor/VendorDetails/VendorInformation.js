import { MetadataTable } from '@components/backoffice/MetadataTable';
import { CopyButton } from '@components/CopyButton';
import { EmailLink } from '@components/EmailLink';
import PropTypes from 'prop-types';
import React from 'react';
import { Grid } from 'semantic-ui-react';

export class VendorInformation extends React.Component {
  render() {
    const { vendor } = this.props;
    const leftTable = [
      { name: 'Name', value: vendor.name },
      {
        name: 'Email',
        value: (
          <span>
            <EmailLink email={vendor.email} />{' '}
            <CopyButton text={vendor.email} />
          </span>
        ),
      },
      { name: 'Notes', value: vendor.notes },
    ];
    const rightTable = [
      { name: 'Phone', value: vendor.phone },
      { name: 'Address', value: vendor.address },
    ];
    return (
      <Grid columns={2} id="vendor-info">
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

VendorInformation.propTypes = {
  vendor: PropTypes.object.isRequired,
};
