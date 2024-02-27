import { dateFormatter } from '@api/date';
import { documentRequestApi } from '@api/documentRequests/documentRequest';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { Truncate } from '@components/Truncate';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PatronDocumentRequests extends Component {
  componentDidMount() {
    const { patronDetails, fetchPatronDocumentRequests } = this.props;
    const patronPid = patronDetails.user_pid ? patronDetails.user_pid : null;
    fetchPatronDocumentRequests(patronPid);
  }

  seeAllButton = () => {
    const { patronDetails } = this.props;

    const patronPid = patronDetails.user_pid;
    const path = BackOfficeRoutes.documentRequestsListWithQuery(
      documentRequestApi.query().withPatronPid(patronPid).sortByNewest().qs()
    );
    return <SeeAllButton to={path} />;
  };

  viewDetails = ({ row }) => {
    return (
      <Link
        to={BackOfficeRoutes.documentRequestDetailsFor(row.metadata.pid)}
        data-test={row.metadata.pid}
      >
        {row.metadata.pid}
      </Link>
    );
  };

  truncateTitle = ({ row }) => {
    return <Truncate> {row.metadata.title} </Truncate>;
  };

  render() {
    const { data, isLoading, error, showMaxDocumentRequests } = this.props;
    const columns = [
      { title: 'Request', formatter: this.viewDetails },
      { title: 'Document', field: 'metadata.document_pid' },
      {
        title: 'Title',
        formatter: this.truncateTitle,
      },
      { title: 'State', field: 'metadata.state' },
      { title: 'Created on ', field: 'created', formatter: dateFormatter },
    ];
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <ResultsTable
            data={data.hits}
            columns={columns}
            totalHitsCount={data.total}
            name="new book requests"
            seeAllComponent={this.seeAllButton()}
            showMaxRows={showMaxDocumentRequests}
          />
        </Error>
      </Loader>
    );
  }
}

PatronDocumentRequests.propTypes = {
  patronDetails: PropTypes.object.isRequired,
  fetchPatronDocumentRequests: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  showMaxDocumentRequests: PropTypes.number,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

PatronDocumentRequests.defaultProps = {
  showMaxDocumentRequests: 5,
  error: null,
  isLoading: false,
};
