import { dateFormatter } from '@api/date';
import { loanApi } from '@api/loans';
import { recordToPidType } from '@api/utils';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { invenioConfig } from '@config';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Message, Segment } from 'semantic-ui-react';

export default class ItemPendingLoans extends Component {
  componentDidMount() {
    const {
      itemDetails: { metadata },
      fetchPendingLoans,
    } = this.props;
    fetchPendingLoans(metadata.document_pid);
  }

  seeAllButton = () => {
    const {
      itemDetails: { metadata },
    } = this.props;
    const path = BackOfficeRoutes.loansListWithQuery(
      loanApi
        .query()
        .withDocPid(metadata.document_pid)
        .withState(invenioConfig.CIRCULATION.loanRequestStates)
        .qs()
    );
    return <SeeAllButton to={path} />;
  };

  patronDetails = ({ row }) => {
    return (
      <Link to={BackOfficeRoutes.patronDetailsFor(row.metadata.patron_pid)}>
        {row.metadata.patron.name}
      </Link>
    );
  };

  renderNoPendingLoans = () => {
    return (
      <Message info icon data-test="no-results">
        <Message.Content>
          <Message.Header>No loan requests</Message.Header>
          There are no loan requests for this item.
        </Message.Content>
      </Message>
    );
  };

  checkoutItemButton = ({ row }) => {
    const {
      performCheckoutAction,
      itemDetails,
      isPendingLoansLoading,
    } = this.props;
    const itemPid = {
      type: recordToPidType(itemDetails),
      value: itemDetails.metadata.pid,
    };
    return (
      <Button
        size="mini"
        color="blue"
        loading={isPendingLoansLoading}
        disabled={
          invenioConfig.CIRCULATION.loanActiveStates.includes(
            itemDetails.metadata.circulation.state
          ) ||
          !invenioConfig.ITEMS.canCirculateStatuses.includes(
            itemDetails.metadata.status
          ) ||
          isPendingLoansLoading
        }
        onClick={() =>
          performCheckoutAction(
            row.availableActions.checkout,
            row.metadata.document_pid,
            row.metadata.patron_pid,
            itemPid,
            true
          )
        }
      >
        checkout
      </Button>
    );
  };

  renderTable() {
    const { data, showMaxPendingLoans } = this.props;
    const columns = [
      {
        title: 'Loan',
        formatter: ({ row }) => (
          <Link
            to={BackOfficeRoutes.loanDetailsFor(row.metadata.pid)}
            data-test={row.metadata.pid}
          >
            {row.metadata.pid}
          </Link>
        ),
      },
      {
        title: 'Patron',
        field: 'metadata.patron.name',
        formatter: this.patronDetails,
      },
      { title: 'State', field: 'metadata.state' },
      {
        title: 'Request start date',
        field: 'metadata.request_start_date',
        formatter: dateFormatter,
      },
      {
        title: 'Request end date',
        field: 'metadata.request_expire_date',
        formatter: dateFormatter,
      },
      {
        title: 'Actions',
        field: '',
        formatter: this.checkoutItemButton,
      },
    ];

    return (
      <>
        <Header as="h3" attached="top" id="loans-request">
          Loan requests
        </Header>
        <Segment attached="bottom" className="bo-metadata-segment no-padding">
          <ResultsTable
            data={data.hits}
            columns={columns}
            totalHitsCount={data.total}
            name="loans"
            seeAllComponent={this.seeAllButton()}
            showMaxRows={showMaxPendingLoans}
            renderEmptyResultsElement={this.renderNoPendingLoans}
          />
        </Segment>
      </>
    );
  }

  render() {
    const { isLoading, error } = this.props;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>{this.renderTable()}</Error>
      </Loader>
    );
  }
}

ItemPendingLoans.propTypes = {
  itemDetails: PropTypes.object.isRequired,
  fetchPendingLoans: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  showMaxPendingLoans: PropTypes.number,
  isLoading: PropTypes.bool,
  isPendingLoansLoading: PropTypes.bool,
  error: PropTypes.object,
  performCheckoutAction: PropTypes.func.isRequired,
};

ItemPendingLoans.defaultProps = {
  showMaxPendingLoans: 5,
  isLoading: false,
  isPendingLoansLoading: false,
  error: {},
};
