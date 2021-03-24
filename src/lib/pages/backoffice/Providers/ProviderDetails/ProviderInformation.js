import { MetadataTable } from '@components/backoffice/MetadataTable';
import { CopyButton } from '@components/CopyButton';
import { EmailLink } from '@components/EmailLink';
import { invenioConfig } from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import { Grid } from 'semantic-ui-react';

export class ProviderInformation extends React.Component {
  render() {
    const { provider } = this.props;

    const emailBody = `${provider.name},${invenioConfig.APP.EMAILS_PREFILL.footer}`;

    const leftTable = [
      { name: 'Name', value: provider.name },
      {
        name: 'Email',
        value: (
          <span>
            <EmailLink email={provider.email} body={emailBody} />{' '}
            <CopyButton text={provider.email} />
          </span>
        ),
      },
      { name: 'Type', value: provider.type },
    ];
    const rightTable = [
      { name: 'Phone', value: provider.phone },
      { name: 'Address', value: provider.address },
      { name: 'Notes', value: provider.notes },
    ];

    provider.legacy_ids &&
      rightTable.push({
        name: 'Legacy IDs',
        value: provider.legacy_ids.join(', '),
      });

    return (
      <Grid columns={2} id="provider-info">
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

ProviderInformation.propTypes = {
  provider: PropTypes.object.isRequired,
};
