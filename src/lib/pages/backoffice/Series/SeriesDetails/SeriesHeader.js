import { toShortDate } from '@api/date';
import { CreatedBy } from '@components/backoffice/ChangedBy';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { CopyButton } from '@components/CopyButton';
import LiteratureTags from '@modules/Literature/LiteratureTags';
import LiteratureCover from '@modules/Literature/LiteratureCover';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { SeriesAuthors } from '@modules/Series/SeriesAuthors';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
            <LiteratureTitle
              title={data.metadata.title}
              edition={data.metadata.edition}
              publicationYear={data.metadata.publication_year}
            />
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
        <LiteratureTags tags={data.metadata.tags} />
      </DetailsHeader>
    );
  }
}
SeriesHeader.propTypes = {
  data: PropTypes.object.isRequired,
};
