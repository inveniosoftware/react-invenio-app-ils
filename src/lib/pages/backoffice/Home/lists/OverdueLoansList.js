import { dateFormatter } from '@api/date';
import { loanApi } from '@api/loans';
import { withCancel } from '@api/utils';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { invenioConfig } from '@config';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export class OverdueLoansList extends Component {
  constructor(props) {
    super(props);

    this.query = loanApi
      .query()
      .overdue()
      .withState(invenioConfig.CIRCULATION.loanActiveStates)
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
    const path = BackOfficeRoutes.loansListWithQuery(
      loanApi
        .query()
        .overdue()
        .withState(invenioConfig.CIRCULATION.loanActiveStates)
        .qs()
    );
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
      { title: 'Loan', field: 'metadata.pid' },
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
      { title: 'Item Barcode', field: 'metadata.item.barcode' },
      {
        title: 'End date',
        field: 'metadata.end_date',
        formatter: dateFormatter,
      },
    ];

    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        title="Overdue loans"
        subtitle="Active loans that passed their end date."
        name="overdue loans"
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

OverdueLoansList.propTypes = {
  showMaxEntries: PropTypes.number,
};

OverdueLoansList.defaultProps = {
  showMaxEntries: 5,
};
