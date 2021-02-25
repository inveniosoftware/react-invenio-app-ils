import { dateFormatter, toShortDate } from '@api/date';
import { loanApi } from '@api/loans';
import { withCancel } from '@api/utils';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { invenioConfig } from '@config';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export class IdleLoansList extends Component {
  constructor(props) {
    super(props);

    this.query = loanApi
      .query()
      .withState(invenioConfig.CIRCULATION.loanRequestStates)
      .withUpdated({
        to: toShortDate(DateTime.local().minus({ days: 10 })),
      })
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
    const path = BackOfficeRoutes.loansListWithQuery(this.query);
    return <SeeAllButton to={path} />;
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
      {
        title: 'Request start date',
        field: 'metadata.request_start_date',
        formatter: dateFormatter,
      },
    ];
    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        title="Idle loan requests"
        subtitle="Loan requests pending since more than 10 days."
        name="idle loan requests"
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

IdleLoansList.propTypes = {
  showMaxEntries: PropTypes.number,
};

IdleLoansList.defaultProps = {
  showMaxEntries: 5,
};
