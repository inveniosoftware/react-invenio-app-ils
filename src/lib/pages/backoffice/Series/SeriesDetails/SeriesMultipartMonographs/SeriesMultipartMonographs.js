import { seriesApi } from '@api/series/series';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { SeriesDetailsLink } from '@components/backoffice/buttons/ViewDetailsButtons/SeriesDetailsLink';
import { InfoMessage } from '@components/backoffice/InfoMessage';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class SeriesMultipartMonographs extends Component {
  componentDidMount() {
    const { fetchSeriesMultipartMonographs, seriesDetails } = this.props;
    const seriesPid = seriesDetails.metadata.pid;
    fetchSeriesMultipartMonographs(seriesPid);
  }

  seeAllButton = seriesPid => {
    const path = BackOfficeRoutes.seriesListWithQuery(
      seriesApi
        .query()
        .withSerialPid(seriesPid)
        .qs()
    );
    return <SeeAllButton to={path} />;
  };

  viewDetails = ({ row }) => {
    const recordMetadata = row.metadata;
    const titleCmp = (
      <LiteratureTitle
        title={recordMetadata.title}
        edition={recordMetadata.edition}
        publicationYear={recordMetadata.publication_year}
      />
    );
    return (
      <SeriesDetailsLink pidValue={recordMetadata.pid}>
        {titleCmp}
      </SeriesDetailsLink>
    );
  };

  volumeFormatter = ({ row }) => {
    const { seriesDetails } = this.props;
    const seriesPid = seriesDetails.metadata.pid;
    const seriesType = seriesDetails.metadata.mode_of_issuance;
    // Find the series volume for the parent series
    const relation = _get(
      row,
      `metadata.relations.${seriesType.toLowerCase()}`,
      []
    ).find(
      relation =>
        relation.pid_value === seriesPid && relation.pid_type === 'serid'
    );
    return relation ? relation.volume : '-';
  };

  render() {
    const {
      multipartMonographs,
      isLoading,
      showMaxSeries,
      error,
      seriesDetails,
    } = this.props;
    const seriesPid = seriesDetails.metadata.pid;
    const columns = [
      { title: 'PID', field: 'metadata.pid' },
      { title: 'Title', field: '', formatter: this.viewDetails },
      { title: 'Volume', formatter: this.volumeFormatter },
    ];
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <ResultsTable
            data={multipartMonographs.hits}
            columns={columns}
            totalHitsCount={multipartMonographs.total}
            name="multipart monographs"
            seeAllComponent={this.seeAllButton(seriesPid)}
            showMaxRows={showMaxSeries}
            renderEmptyResultsElement={() => (
              <InfoMessage
                header="No multipart monographs in this series"
                content="Start from the multipart monograph details to attach it to this series"
                data-test="no-results"
              />
            )}
          />
        </Error>
      </Loader>
    );
  }
}

SeriesMultipartMonographs.propTypes = {
  showMaxSeries: PropTypes.number,
  multipartMonographs: PropTypes.object.isRequired,
  seriesDetails: PropTypes.object.isRequired,
  fetchSeriesMultipartMonographs: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

SeriesMultipartMonographs.defaultProps = {
  showMaxSeries: 5,
  isLoading: false,
  error: null,
};
