import { toShortDate } from '@api/date';
import { CreatedBy } from '@components/backoffice/ChangedBy';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { RestrictedAccessLabel } from '@components/backoffice/RestrictedAccessLabel';
import { CopyButton } from '@components/CopyButton';
import { invenioConfig } from '@config';
import DocumentAuthors from '@modules/Document/DocumentAuthors';
import LiteratureCover from '@modules/Literature/LiteratureCover';
import LiteratureTags from '@modules/Literature/LiteratureTags';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Label } from 'semantic-ui-react';

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
        <label className="muted">Created on</label>{' '}
        {toShortDate(DateTime.fromISO(data.created))}
        <br />
        <RestrictedAccessLabel isRestricted={data.metadata.restricted} />
        <Label
          as={Link}
          to={FrontSiteRoutes.documentDetailsFor(data.metadata.pid)}
          color="grey"
        >
          <Icon name="linkify" />
          View in Frontsite
        </Label>
      </>
    );
    return (
      <DetailsHeader
        title={
          <>
            <Header.Subheader>{data.metadata.document_type}</Header.Subheader>
            <LiteratureTitle
              title={data.metadata.title}
              edition={data.metadata.edition}
              publicationYear={data.metadata.publication_year}
              truncate={false}
            />
          </>
        }
        subTitle={
          <DocumentAuthors
            authors={data.metadata.authors}
            hasOtherAuthors={data.metadata.other_authors}
            prefix="by "
            limit={invenioConfig.LITERATURE.authors.maxDisplay}
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
        <LiteratureTags tags={data.metadata.tags} />
      </DetailsHeader>
    );
  }
}

DocumentHeader.propTypes = {
  data: PropTypes.object.isRequired,
};
