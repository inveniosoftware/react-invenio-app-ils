import { toShortDate } from '@api/date';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { DocumentIcon, EItemIcon } from '@components/backoffice/icons';
import { OpenAccessLabel } from '@components/backoffice/OpenAccessLabel';
import { CopyButton } from '@components/CopyButton';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

export class EItemHeader extends Component {
  render() {
    const { data } = this.props;
    const recordInfo = (
      <>
        <label className="muted">E-item</label> {data.metadata.pid}{' '}
        <CopyButton text={data.metadata.pid} />
        <br />
        <label className="muted">Created on</label>{' '}
        {toShortDate(DateTime.fromISO(data.created))}
        <br />
        <Link
          to={BackOfficeRoutes.documentDetailsFor(data.metadata.document_pid)}
        >
          see document <DocumentIcon />
        </Link>
        <br />
        <OpenAccessLabel openAccess={data.metadata.open_access} />
      </>
    );
    return (
      <DetailsHeader
        title={
          <>
            <Header.Subheader>{data.metadata.eitem_type}</Header.Subheader>
            <LiteratureTitle title={data.metadata.document.title} />
          </>
        }
        subTitle={`by ${data.metadata.document.authors}`}
        pid={data.metadata.pid}
        icon={<EItemIcon />}
        recordInfo={recordInfo}
      />
    );
  }
}

EItemHeader.propTypes = {
  data: PropTypes.object.isRequired,
};
