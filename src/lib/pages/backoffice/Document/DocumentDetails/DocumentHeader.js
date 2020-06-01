import { toShortDate } from '@api/date';
import { CopyButton } from '@components/CopyButton';
import { CreatedBy } from '@components/backoffice';
import { DocumentTags } from '@modules/Document/DocumentTags';
import { DocumentTitle } from '@modules/Document/DocumentTitle';
import { DocumentAuthors } from '@modules/Document/DocumentAuthors';
import { LiteratureCover } from '@modules/Literature/LiteratureCover';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { RestrictedAccessLabel } from '@components/backoffice/RestrictedAccessLabel';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';

export class DocumentHeader extends Component {
  render() {
    const { data } = this.props;
    const recordInfo = (
      <>
        <label className="muted">Document</label> {data.metadata.pid}{' '}
        <CopyButton text={data.metadata.pid} />
        {data.metadata.created_by && (
          <>
            <br />
            <label className="muted">Created by</label>{' '}
            <CreatedBy metadata={data.metadata} />
          </>
        )}
        <br />
        <label className="muted">Created on</label> {toShortDate(data.created)}
        <br />
        <RestrictedAccessLabel isRestricted={data.metadata.restricted} />
        <Link to={FrontSiteRoutes.documentDetailsFor(data.metadata.pid)}>
          public view <Icon name="linkify" />
        </Link>
      </>
    );
    return (
      <DetailsHeader
        title={
          <>
            <Header.Subheader>{data.metadata.document_type}</Header.Subheader>
            <DocumentTitle metadata={data.metadata} />
          </>
        }
        subTitle={
          <DocumentAuthors
            metadata={data.metadata}
            prefix="by "
            authorsLimit={10}
          />
        }
        pid={data.metadata.pid}
        image={
          <LiteratureCover
            size="tiny"
            url={_get(data, 'metadata.cover_metadata.urls.medium')}
          />
        }
        recordInfo={recordInfo}
      >
        <DocumentTags metadata={data.metadata} />
      </DetailsHeader>
    );
  }
}

DocumentHeader.propTypes = {
  data: PropTypes.object.isRequired,
};
