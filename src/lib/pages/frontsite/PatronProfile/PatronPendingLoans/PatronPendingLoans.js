import { Error, InfoMessage, Loader, Pagination } from '@components';
import { ILSItemPlaceholder } from '@components/ILSPlaceholder/ILSPlaceholder';
import { uiConfig } from '@config';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Header, Item } from 'semantic-ui-react';
import PatronCancelModal from '../PatronCancelModal';
import LoanRequestListEntry from './LoanRequestListEntry';

const PAGE_SIZE = 5;

export default class PatronPendingLoans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      cancelModal: { isOpen: false, btnClasses: undefined, data: undefined },
    };
  }

  componentDidMount() {
    const { fetchPatronPendingLoans, patronPid } = this.props;
    const { activePage } = this.state;
    fetchPatronPendingLoans(patronPid, {
      page: activePage,
      size: PAGE_SIZE,
    });
  }

  onPageChange = activePage => {
    const { fetchPatronPendingLoans, patronPid } = this.props;
    fetchPatronPendingLoans(patronPid, {
      page: activePage,
      size: PAGE_SIZE,
    });
    this.setState({ activePage: activePage });
  };

  renderList() {
    const { isLoading, data } = this.props;
    const { activePage } = this.state;

    if (!_isEmpty(data.hits)) {
      return (
        <>
          <Item.Group divided>
            {data.hits.map(entry => (
              <LoanRequestListEntry
                key={entry.metadata.pid}
                loan={entry}
                onCancelButton={this.onShowCancelModal}
              />
            ))}
          </Item.Group>
          <Container textAlign="center">
            <Pagination
              currentPage={activePage}
              currentSize={PAGE_SIZE}
              loading={isLoading}
              onPageChange={this.onPageChange}
              totalResults={data.total}
            />
          </Container>
        </>
      );
    }
    return (
      <InfoMessage
        title="No loan requests"
        message="You do not currently have any loan request."
      />
    );
  }

  renderLoader = props => {
    return (
      <>
        <Item.Group>
          <ILSItemPlaceholder fluid {...props} />
          <ILSItemPlaceholder fluid {...props} />
        </Item.Group>
      </>
    );
  };

  onShowCancelModal = (e, loan) => {
    this.setState({
      cancelModal: { isOpen: true, btnClasses: e.target.classList, data: loan },
    });
  };

  onCloseCancelModal = () => {
    this.setState({
      cancelModal: { isOpen: false, data: undefined },
    });
  };

  onCancelRequestClick = () => {
    const {
      cancelModal: { data: loan, btnClasses },
      activePage,
    } = this.state;
    const {
      fetchPatronPendingLoans,
      patronPid,
      performLoanAction,
    } = this.props;
    btnClasses.add('disabled');
    btnClasses.add('loading');
    this.onCloseCancelModal();
    performLoanAction(
      _get(loan, 'availableActions.cancel'),
      _get(loan, 'metadata.document_pid'),
      patronPid,
      {
        item_pid: _get(loan, 'metadata.item_pid'),
        cancelReason: 'USER_CANCEL',
      }
    );
    setTimeout(() => {
      fetchPatronPendingLoans(patronPid, activePage, PAGE_SIZE).then(res => {
        if (!_has(btnClasses, 'remove')) return;
        btnClasses.remove('disabled');
        btnClasses.remove('loading');
      });
    }, uiConfig.ES_DELAY);
  };

  render() {
    const { isLoading, error } = this.props;
    const { cancelModal } = this.state;
    return (
      <Container className="spaced">
        <Header
          as="h2"
          content="Your loan requests"
          className="highlight"
          textAlign="center"
        />
        <Loader isLoading={isLoading} renderElement={this.renderLoader}>
          <Error error={error}>
            {this.renderList()}
            <PatronCancelModal
              data={cancelModal.data}
              open={cancelModal.isOpen}
              headerContent="Are you sure you want to cancel your loan request?"
              documentTitle={_get(cancelModal.data, 'metadata.document.title')}
              onCloseModal={this.onCloseCancelModal}
              onCancelAction={this.onCancelRequestClick}
            />
          </Error>
        </Loader>
      </Container>
    );
  }
}

PatronPendingLoans.propTypes = {
  patronPid: PropTypes.string.isRequired,
  fetchPatronPendingLoans: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  performLoanAction: PropTypes.func.isRequired,
};
