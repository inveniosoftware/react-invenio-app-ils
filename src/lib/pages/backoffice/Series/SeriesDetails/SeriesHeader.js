import { toShortDate } from '@api/date';
import { CopyButton } from '@components/CopyButton';
import { CreatedBy } from '@components/backoffice/ChangedBy';
import LiteratureCover from '@modules/Literature/LiteratureCover';
import { SeriesAuthors } from '@modules/Series/SeriesAuthors';
import DocumentTags from '@modules/Document/DocumentTags';
import DocumentTitle from '@modules/Document/DocumentTitle';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';

export class SeriesHeader extends Component {
  render() {
    const { data } = this.props;
    const recordInfo = (
      <>
        <label className="muted">Series</label> {data.metadata.pid}{' '}
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
        <Link to={FrontSiteRoutes.seriesDetailsFor(data.metadata.pid)}>
          public view <Icon name="linkify" />
        </Link>
      </>
    );
    return (
      <DetailsHeader
        title={
          <>
            <Header.Subheader>
              {data.metadata.mode_of_issuance}
            </Header.Subheader>
            <DocumentTitle metadata={data.metadata} />
          </>
        }
        subTitle={
          <SeriesAuthors authors={data.metadata.authors} prefix="by " />
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
SeriesHeader.propTypes = {
  data: PropTypes.object.isRequired,
};
