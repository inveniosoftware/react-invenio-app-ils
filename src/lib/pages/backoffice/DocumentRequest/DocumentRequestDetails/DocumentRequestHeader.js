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

export class DocumentRequestHeader extends Component {
  renderStatus(status) {
    switch (status) {
      case 'DECLINED':
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
    const { created, docReq } = this.props;
    return (
      <>
        <Label className="muted">Request</Label> {docReq.pid}
        <CopyButton text={docReq.pid} />
        <br />
        <Label className="muted">Created on</Label>{' '}
        {toShortDate(DateTime.fromISO(created))}
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
    const { docReq } = this.props;
    return (
      <DetailsHeader
        title={
          <>Request for new literature {this.renderStatus(docReq.state)}</>
        }
        subTitle={this.patronLink(docReq.patron)}
        pid={docReq.pid}
        icon={<DocumentRequestIcon />}
        recordInfo={this.recordInfo()}
      />
    );
  }
}

DocumentRequestHeader.propTypes = {
  created: PropTypes.string.isRequired,
  docReq: PropTypes.object.isRequired,
};
