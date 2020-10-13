import { CopyButton } from '@components/CopyButton';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { PatronIcon } from '@components/backoffice/icons';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EmailLink } from '@components/EmailLink';
import { Header } from 'semantic-ui-react';
import { invenioConfig } from '@config';

export default class PatronHeader extends Component {
  render() {
    const { data } = this.props;
    const recordInfo = (
      <>
        <label className="muted">Patron</label> {data.metadata.pid}{' '}
        <CopyButton text={data.metadata.id} />
        <br />
      </>
    );

    const emailBody = `${data.metadata.name}, \n\n\n${invenioConfig.APP.emailFooter}`;

    return (
      <DetailsHeader
        title={
          <>
            <Header.Subheader>
              <EmailLink email={data.metadata.email} body={emailBody} />{' '}
              <CopyButton text={data.metadata.email} />
            </Header.Subheader>
            {data.metadata.name}
          </>
        }
        subTitle=""
        pid={data.metadata.id}
        icon={<PatronIcon />}
        recordInfo={recordInfo}
      />
    );
  }
}

PatronHeader.propTypes = {
  data: PropTypes.object.isRequired,
};
