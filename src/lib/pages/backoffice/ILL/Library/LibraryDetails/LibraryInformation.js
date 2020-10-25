import { MetadataTable } from '@components/backoffice/MetadataTable';
import { CopyButton } from '@components/CopyButton';
import { EmailLink } from '@components/EmailLink';
import { invenioConfig } from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import { Grid } from 'semantic-ui-react';

export class LibraryInformation extends React.Component {
  render() {
    const { library } = this.props;

    const emailBody = `${library.name}, ${invenioConfig.APP.EMAILS_PREFILL.footer}`;

    const leftTable = [
      { name: 'Name', value: library.name },
      {
        name: 'Email',
        value: (
          <span>
            <EmailLink email={library.email} body={emailBody} />{' '}
            <CopyButton text={library.email} />
          </span>
        ),
      },
      { name: 'Notes', value: library.notes },
    ];
    const rightTable = [
      { name: 'Phone', value: library.phone },
      { name: 'Address', value: library.address },
    ];
    return (
      <Grid columns={2} id="library-info">
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

LibraryInformation.propTypes = {
  library: PropTypes.object.isRequired,
};
