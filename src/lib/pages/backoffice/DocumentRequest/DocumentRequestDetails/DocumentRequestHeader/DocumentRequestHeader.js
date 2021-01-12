import { toShortDate } from '@api/date';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { DocumentRequestIcon } from '@components/backoffice/icons';
import { CopyButton } from '@components/CopyButton';
import { BackOfficeRoutes } from '@routes/urls';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Label } from 'semantic-ui-react';

export default class DocumentRequestHeader extends Component {
  renderStatus(status) {
    switch (status) {
      case 'REJECTED':
        return <Label color="grey">Declined</Label>;
      case 'PENDING':
        return <Label color="yellow">Pending</Label>;
      case 'ACCEPTED':
        return <Label color="green">Accepted</Label>;
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  }

  recordInfo = () => {
    const { data } = this.props;
    return (
      <>
        <Label className="muted">Request</Label> {data.metadata.pid}
        <CopyButton text={data.metadata.pid} />
        <br />
        <Label className="muted">Created on</Label>{' '}
        {toShortDate(DateTime.fromISO(data.created))}
      </>
    );
  };

  patronLink(patron) {
    return (
      <>
        by{' '}
        <Link to={BackOfficeRoutes.patronDetailsFor(patron.id)}>
          {patron.name}
        </Link>
      </>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <DetailsHeader
        title={
          <>
            Request for new literature {this.renderStatus(data.metadata.state)}
          </>
        }
        subTitle={this.patronLink(data.metadata.patron)}
        pid={data.metadata.pid}
        icon={<DocumentRequestIcon />}
        recordInfo={this.recordInfo()}
      />
    );
  }
}

DocumentRequestHeader.propTypes = {
  data: PropTypes.object.isRequired,
};
