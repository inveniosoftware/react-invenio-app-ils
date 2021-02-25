import { dateFormatter } from '@api/date';
import { borrowingRequestApi } from '@api/ill';
import { withCancel } from '@api/utils';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { invenioConfig } from '@config';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { ILLRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export class PendingILLPatronLoanExtensions extends Component {
  constructor(props) {
    super(props);

    this.query = borrowingRequestApi
      .query()
      .withState(invenioConfig.ILL_BORROWING_REQUESTS.activeStatuses)
      .withPatronLoanExtensionStatus(
        invenioConfig.ILL_BORROWING_REQUESTS.extensionPendingStatuses
      )
      .qs();

    this.state = {
      data: { hits: [], total: 0 },
      isLoading: true,
      error: {},
    };
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    this.cancellableFetch && this.cancellableFetch.cancel();
  }

  fetch = async () => {
    this.cancellableFetch = withCancel(borrowingRequestApi.list(this.query));
    this.setState({ isLoading: true });
    try {
      const response = await this.cancellableFetch.promise;
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ isLoading: false, error: error });
      }
    }
  };

  seeAllButton = () => {
    const path = ILLRoutes.borrowingRequestListWithQuery(this.query);
    return <SeeAllButton to={path} />;
  };

  viewDetails = ({ row }) => {
    return (
      <Button
        as={Link}
        to={ILLRoutes.borrowingRequestDetailsFor(row.metadata.pid)}
        compact
        icon="info"
        data-test={row.metadata.pid}
      />
    );
  };

  renderTable(data) {
    const { showMaxEntries } = this.props;
    const columns = [
      { title: '', field: '', formatter: this.viewDetails },
      { title: 'ID', field: 'metadata.pid' },
      { title: 'Patron', field: 'metadata.patron.name' },
      {
        title: 'Title',
        field: '',
        formatter: ({ row }) => (
          <LiteratureTitle
            title={row.metadata.document.title}
            edition={row.metadata.document.edition}
            publicationYear={row.metadata.document.publication_year}
          />
        ),
      },
      {
        title: 'Requested on',
        field: 'metadata.patron_loan.extension.request_date',
        formatter: dateFormatter,
      },
    ];
    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        title="ILL - Pending patron loan extension requests"
        subtitle="ILLs with a pending extension request from a patron."
        name="pending ILL patron loan extension requests"
        seeAllComponent={this.seeAllButton()}
        showMaxRows={showMaxEntries}
      />
    );
  }

  render() {
    const { data, isLoading, error } = this.state;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>{this.renderTable(data)}</Error>
      </Loader>
    );
  }
}

PendingILLPatronLoanExtensions.propTypes = {
  showMaxEntries: PropTypes.number,
};

PendingILLPatronLoanExtensions.defaultProps = {
  showMaxEntries: 5,
};
