import { toShortDate } from '@api/date';
import { loanApi } from '@api/loans';
import { withCancel } from '@api/utils';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export class RenewedLoansList extends Component {
  constructor(props) {
    super(props);

    this.query = loanApi
      .query()
      .withUpdated({
        from: toShortDate(DateTime.local().minus({ days: 7 })),
      })
      .withRenewedCount('>=3')
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
    this.cancellableFetch = withCancel(loanApi.list(this.query));
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
    return (
      <SeeAllButton to={BackOfficeRoutes.loansListWithQuery(this.query)} />
    );
  };

  viewDetails = ({ row }) => {
    return (
      <Button
        as={Link}
        to={BackOfficeRoutes.loanDetailsFor(row.metadata.pid)}
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
      { title: 'Renewals', field: 'metadata.extension_count' },
    ];
    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        title="Frequently renewed loans"
        subtitle="Loans renewed more than 3 times - last 7 days."
        name="frequently renewed loans"
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

RenewedLoansList.propTypes = {
  showMaxEntries: PropTypes.number,
};

RenewedLoansList.defaultProps = {
  showMaxEntries: 5,
};
