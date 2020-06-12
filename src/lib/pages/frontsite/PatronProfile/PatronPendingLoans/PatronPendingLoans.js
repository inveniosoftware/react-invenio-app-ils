import { toShortDate } from '@api/date';
import { Error } from '@components/Error';
import { InfoMessage } from '@components/InfoMessage';
import { Loader } from '@components/Loader';
import { uiConfig } from '@config';
import _get from 'lodash/get';
import _has from 'lodash/has';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Container, Header, Label } from 'semantic-ui-react';
import LoansList from '../LoansList';
import LoansListItem from '../LoansListEntry';
import PatronCancelModal from '../PatronCancelModal';

class LoansListEntry extends Component {
  renderRequestDetails = (startDate, endDate) => (
    <div className="pt-default">
      <Label basic>
        Requested on
        <Label.Detail>{toShortDate(startDate)}</Label.Detail>
      </Label>
      <Label basic>
        Valid until
        <Label.Detail>{toShortDate(endDate)}</Label.Detail>
      </Label>
    </div>
  );

  render() {
    const { loan, onCancelClick } = this.props;
    return (
      <LoansListItem
        loan={loan}
        extraItemProps={{
          itemMetaCmp: this.renderRequestDetails(
            loan.metadata.request_start_date,
            loan.metadata.request_expire_date
          ),
          itemExtraCmp: _has(loan, 'availableActions.cancel') && (
            <Button size="small" onClick={e => onCancelClick(e, loan)}>
              Cancel request
            </Button>
          ),
        }}
      />
    );
  }
}

LoansListEntry.propTypes = {
  loan: PropTypes.object.isRequired,
  onCancelClick: PropTypes.func.isRequired,
};

export default class PatronPendingLoans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: props.initialPage,
      cancelModal: { isOpen: false, btnClasses: undefined, data: undefined },
    };
  }

  componentDidMount() {
    this.fetchPatronPendingLoans();
  }

  fetchPatronPendingLoans() {
    const { activePage } = this.state;
    const { patronPid, fetchPatronPendingLoans, rowsPerPage } = this.props;
    fetchPatronPendingLoans(patronPid, {
      page: activePage,
      size: rowsPerPage,
    });
  }

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
    } = this.state;
    const { initialPage, patronPid, performLoanAction } = this.props;
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
      this.fetchPatronPendingLoans(initialPage).then(res => {
        if (!_has(btnClasses, 'remove')) return;
        btnClasses.remove('disabled');
        btnClasses.remove('loading');
      });
    }, uiConfig.ES_DELAY);
  };

  render() {
    const { error, isLoading, loans, rowsPerPage } = this.props;
    const { activePage, cancelModal } = this.state;
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
            <LoansList
              activePage={activePage}
              isLoading={isLoading}
              loans={loans}
              onPageChange={newPage => {
                this.setState(
                  { activePage: newPage },
                  this.fetchPatronPendingLoans
                );
              }}
              rowsPerPage={rowsPerPage}
              renderListEntry={loan => (
                <LoansListEntry
                  loan={loan}
                  onCancelClick={this.onShowCancelModal}
                />
              )}
              noLoansCmp={
                <InfoMessage
                  title="No loan requests"
                  message="You do not currently have any loan request."
                />
              }
            />
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
  initialPage: PropTypes.number,
  rowsPerPage: PropTypes.number,
  /* REDUX */
  loans: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  fetchPatronPendingLoans: PropTypes.func.isRequired,
  performLoanAction: PropTypes.func.isRequired,
};

PatronPendingLoans.defaultProps = {
  initialPage: 1,
  rowsPerPage: 5,
};
