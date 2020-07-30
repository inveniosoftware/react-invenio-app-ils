import { itemApi } from '@api/items';
import { recordToPidType } from '@api/utils';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { InfoMessage } from '@components/backoffice/InfoMessage';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { SearchBar } from '@components/SearchBar';
import { invenioConfig } from '@config';
import { BackOfficeRoutes } from '@routes/urls';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Message, Segment } from 'semantic-ui-react';

export default class AvailableItems extends Component {
  constructor(props) {
    super(props);
    this.fetchAvailableItems = props.fetchAvailableItems;
    this.assignItemToLoan = props.assignItemToLoan;
    this.performCheckoutAction = props.performCheckoutAction;
    this.seeAllUrl = BackOfficeRoutes.itemsListWithQuery;
    this.state = { query: '', filteredData: null };
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
        color="blue"
        onClick={() => {
          const itemPid = {
            type: recordToPidType(item),
            value: item.metadata.pid,
          };
          assignItemToLoan(itemPid, pid);
        }}
      >
        replace
      </Button>
    );
  }

  checkoutItemButton(item, loan) {
    const { performCheckoutAction, isActionLoading } = this.props;
    return (
      <Button
        size="mini"
        color="blue"
        loading={isActionLoading}
        disabled={isActionLoading}
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
    const { filteredData } = this.state;
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
        data={filteredData === null ? data.hits : filteredData}
        columns={columns}
        totalHitsCount={data.total}
        name="available physical copies"
        seeAllComponent={this.seeAllButton()}
        renderEmptyResultsElement={this.renderEmptyResults}
      />
    );
  }

  renderEmptyResults = () => {
    const { query } = this.state;
    return (
      <div className="pt-default pb-default">
        {_isEmpty(query) ? (
          <InfoMessage
            header="No physical copies available."
            content="Currently document has no eligible physical copies to fulfil this loan."
          />
        ) : (
          <InfoMessage
            header="No physical copies found."
            content="Currently document has no eligible physical copies matching the barcode."
          />
        )}
      </div>
    );
  };

  rowActionButton = ({ row }) => {
    const { loan } = this.props;
    const isRequested = invenioConfig.CIRCULATION.loanRequestStates.includes(
      loan.metadata.state
    );
    const isCompleted = invenioConfig.CIRCULATION.loanCompletedStates.includes(
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

  updateSearchQuery = (e, elem) => {
    const { data } = this.props;
    this.setState({
      query: elem.target.value,
      filteredData: data.hits.filter(hit =>
        hit.metadata.barcode.includes(elem.target.value)
      ),
    });
  };

  onSearchExecute = () => {
    const { query } = this.state;
    const { data } = this.props;
    this.setState({
      filteredData: data.hits.filter(hit =>
        hit.metadata.barcode.includes(query)
      ),
    });
  };

  renderSearchBar() {
    const { query } = this.state;
    return (
      <SearchBar
        currentQueryString={query}
        onInputChange={this.updateSearchQuery}
        executeSearch={this.onSearchExecute}
        placeholder="Insert barcode..."
      />
    );
  }

  render() {
    const { isLoading, error, loan, data } = this.props;
    const statesThatRenderSearchBar = invenioConfig.CIRCULATION.loanActiveStates.concat(
      invenioConfig.CIRCULATION.loanRequestStates
    );
    return (
      <>
        <Header as="h3" attached="top">
          Available physical copies
        </Header>
        {statesThatRenderSearchBar.includes(loan.metadata.state) &&
        !_isEmpty(data.hits) ? (
          <Segment attached>{this.renderSearchBar()}</Segment>
        ) : null}
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
  isActionLoading: PropTypes.bool,
  error: PropTypes.object,
};

AvailableItems.defaultProps = {
  isLoading: false,
  isActionLoading: false,
  error: {},
};
