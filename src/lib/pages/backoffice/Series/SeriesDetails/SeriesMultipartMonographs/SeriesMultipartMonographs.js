import { InfoMessage } from '@components/backoffice/InfoMessage';
import { SeriesDetailsLink } from '@components/backoffice/SeriesDetailsLink';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DocumentTitle } from '@modules/Document/DocumentTitle';
import { Link } from 'react-router-dom';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { seriesApi } from '@api';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';

export default class SeriesMultipartMonographs extends Component {
  componentDidMount() {
    const { fetchSeriesMultipartMonographs, seriesPid } = this.props;
    fetchSeriesMultipartMonographs(seriesPid);
  }

  seeAllButton = () => {
    const { seriesPid } = this.props;
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
    const titleCmp = <DocumentTitle metadata={recordMetadata} />;
    return (
      <SeriesDetailsLink pidValue={recordMetadata.pid}>
        {titleCmp}
      </SeriesDetailsLink>
    );
  };

  volumeFormatter = ({ row }) => {
    const { seriesPid, seriesType } = this.props;
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
    const { multipartMonographs, isLoading, showMaxSeries, error } = this.props;
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
            seeAllComponent={this.seeAllButton()}
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
  seriesPid: PropTypes.string.isRequired,
  seriesType: PropTypes.string.isRequired,
  fetchSeriesMultipartMonographs: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

SeriesMultipartMonographs.defaultProps = {
  showMaxSeries: 5,
  isLoading: false,
  error: null,
};
