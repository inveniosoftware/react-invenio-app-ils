import { toShortDate } from '@api/date';
import { CreatedBy } from '@components/backoffice/ChangedBy';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { CopyButton } from '@components/CopyButton';
import LiteratureCover from '@modules/Literature/LiteratureCover';
import LiteratureTags from '@modules/Literature/LiteratureTags';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { SeriesAuthors } from '@modules/Series/SeriesAuthors';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Label } from 'semantic-ui-react';

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
        <label className="muted">Created on</label>{' '}
        {toShortDate(DateTime.fromISO(data.created))}
        <br />
        <Label
          as={Link}
          to={FrontSiteRoutes.seriesDetailsFor(data.metadata.pid)}
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
            <Header.Subheader>
              {data.metadata.mode_of_issuance}
            </Header.Subheader>
            <LiteratureTitle
              title={data.metadata.title}
              edition={data.metadata.edition}
              publicationYear={data.metadata.publication_year}
              truncate={false}
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
