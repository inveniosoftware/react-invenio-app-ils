import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { PatronIcon } from '@components/backoffice/icons';
import { CopyButton } from '@components/CopyButton';
import { EmailLink } from '@components/EmailLink';
import { invenioConfig } from '@config';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

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

    const emailBody = `${data.metadata.name}, ${invenioConfig.APP.EMAILS_PREFILL.footer}`;

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
