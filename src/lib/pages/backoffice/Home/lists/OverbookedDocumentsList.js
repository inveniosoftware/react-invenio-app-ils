import { documentApi } from '@api/documents';
import { withCancel } from '@api/utils';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export class OverbookedDocumentsList extends Component {
  constructor(props) {
    super(props);

    this.queryFetch = documentApi
      .query()
      .overbooked()
      .sortBy('-loan_requests')
      .qs();
    this.queryLink = documentApi
      .query()
      .overbooked()
      .sortBy('loan_requests')
      .sortOrder('desc')
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
    this.cancellableFetch = withCancel(documentApi.list(this.queryFetch));
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
    const path = BackOfficeRoutes.documentsListWithQuery(this.queryLink);
    return <SeeAllButton to={path} />;
  };

  viewDetails = ({ row }) => {
    return (
      <Button
        as={Link}
        to={BackOfficeRoutes.documentDetailsFor(row.metadata.pid)}
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
      {
        title: 'Title',
        field: '',
        formatter: ({ row }) => (
          <LiteratureTitle
            title={row.metadata.title}
            edition={row.metadata.edition}
            publicationYear={row.metadata.publication_year}
          />
        ),
      },
      {
        title: 'Pending Requests',
        field: 'metadata.circulation.pending_loans_count',
      },
    ];
    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        title="Overbooked documents"
        subtitle="Documents with more requests than the number of available items for loan."
        name="overbooked documents"
        seeAllComponent={this.seeAllButton()}
        showMaxRows={showMaxEntries}
        singleLine
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

OverbookedDocumentsList.propTypes = {
  showMaxEntries: PropTypes.number,
};

OverbookedDocumentsList.defaultProps = {
  showMaxEntries: 5,
};
