import { InfoMessage } from '@components/backoffice/InfoMessage';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Header, Message, Segment } from 'semantic-ui-react';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { itemApi } from '@api/items';
import { invenioConfig } from '@config';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { BackOfficeRoutes } from '@routes/urls';
import { recordToPidType } from '@api/utils';

export default class AvailableItems extends Component {
  constructor(props) {
    super(props);
    this.fetchAvailableItems = props.fetchAvailableItems;
    this.assignItemToLoan = props.assignItemToLoan;
    this.performCheckoutAction = props.performCheckoutAction;
    this.seeAllUrl = BackOfficeRoutes.itemsListWithQuery;
  }

  componentDidMount() {
    const { fetchAvailableItems, loan } = this.props;
    fetchAvailableItems(loan.metadata.document_pid);
  }

  seeAllButton = () => {
    const {
      loan: {
        metadata: { document_pid },
      },
    } = this.props;
    const path = this.seeAllUrl(
      itemApi
        .query()
        .withDocPid(document_pid)
        .qs()
    );
    return <SeeAllButton to={path} />;
  };

  assignItemButton(item) {
    const {
      loan: { pid },
      assignItemToLoan,
    } = this.props;
    return (
      <Button
        size="mini"
        onClick={() => {
          const itemPid = {
            type: recordToPidType(item),
            value: item.metadata.pid,
          };
          assignItemToLoan(itemPid, pid);
        }}
      >
        replace current physical copy
      </Button>
    );
  }

  checkoutItemButton(item, loan) {
    const { performCheckoutAction } = this.props;
    return (
      <Button
        size="mini"
        color="teal"
        onClick={() => {
          const checkoutUrl = loan.availableActions.checkout;
          const patronPid = loan.metadata.patron_pid;
          const documentPid = item.metadata.document.pid;
          const itemPid = {
            type: recordToPidType(item),
            value: item.metadata.pid,
          };
          performCheckoutAction(checkoutUrl, documentPid, patronPid, itemPid);
        }}
      >
        checkout
      </Button>
    );
  }

  renderTable() {
    const { data } = this.props;
    const columns = [
      { title: 'PID', field: 'metadata.pid' },
      {
        title: 'Barcode',
        field: 'metadata.barcode',
        formatter: ({ row }) => (
          <Link to={BackOfficeRoutes.itemDetailsFor(row.metadata.pid)}>
            {row.metadata.barcode}
          </Link>
        ),
      },
      { title: 'Status', field: 'metadata.status' },
      { title: 'Medium', field: 'metadata.medium' },
      { title: 'Location', field: 'metadata.internal_location.name' },
      { title: 'Shelf', field: 'metadata.shelf' },
      {
        title: 'Actions',
        field: '',
        formatter: this.rowActionButton,
      },
    ];

    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        name="available physical copies"
        seeAllComponent={this.seeAllButton()}
        renderEmptyResultsElement={this.renderEmptyResults}
      />
    );
  }

  renderEmptyResults = () => {
    return (
      <div className="pt-default pb-default">
        <InfoMessage
          header="No physical copies available."
          content="Currently document has no eligible physical copies to fulfil this loan."
        />
      </div>
    );
  };

  rowActionButton = ({ row }) => {
    const { loan } = this.props;
    const isRequested = invenioConfig.circulation.loanRequestStates.includes(
      loan.metadata.state
    );
    const isCompleted = invenioConfig.circulation.loanCompletedStates.includes(
      loan.metadata.state
    );

    if (isRequested) {
      return this.checkoutItemButton(row, loan);
    } else if (isCompleted) {
      return (
        <Message compact info size="tiny">
          You can't change the physical copy <br /> once the loan is completed
        </Message>
      );
    } else {
      return this.assignItemButton(row);
    }
  };

  render() {
    const { isLoading, error } = this.props;
    return (
      <>
        <Header as="h3" attached="top">
          Available physical copies
        </Header>
        <Segment
          attached
          className="bo-metadata-segment no-padding"
          id="available-items"
        >
          <Loader isLoading={isLoading}>
            <Error error={error}>{this.renderTable()}</Error>
          </Loader>
        </Segment>
      </>
    );
  }
}

AvailableItems.propTypes = {
  assignItemToLoan: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  loan: PropTypes.object.isRequired,
  fetchAvailableItems: PropTypes.func.isRequired,
  performCheckoutAction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

AvailableItems.defaultProps = {
  isLoading: false,
  error: {},
};
