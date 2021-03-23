import { loanApi } from '@api/loans';
import { searchReady, withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { ILSItemPlaceholder } from '@components/ILSPlaceholder/ILSPlaceholder';
import { InfoMessage } from '@components/InfoMessage';
import _has from 'lodash/has';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { invenioConfig } from '@config';
import {
  Button,
  Container,
  Grid,
  Header,
  Label,
  Message,
  Popup,
  Icon,
} from 'semantic-ui-react';
import LoansList from '../LoansList';
import LoansListItem from '../LoansListEntry';
import PatronCancelModal from '../PatronCancelModal';
import { DateTime } from 'luxon';

class ButtonCancelRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cancelModalIsOpened: false,
      cancelModalData: {},
      errorMsgOpened: false,
      errorMsg: '',
    };
  }

  componentWillUnmount() {
    this.cancellableCancelRequest && this.cancellableCancelRequest.cancel();
  }

  openModal = (cancelUrl, patronPid, documentPid, documentTitle) => {
    this.setState({
      isLoading: true,
      cancelModalIsOpened: true,
      cancelModalData: {
        cancelUrl: cancelUrl,
        patronPid: patronPid,
        documentPid: documentPid,
        documentTitle: documentTitle,
      },
    });
  };

  closeCancelModal = () => {
    this.setState({
      isLoading: false,
      cancelModalIsOpened: false,
      cancelModalData: {},
    });
  };

  async cancelRequest(cancelUrl, patronPid, documentPid) {
    const response = await loanApi.doAction(cancelUrl, documentPid, patronPid, {
      cancelReason: 'USER_CANCEL',
    });
    await searchReady();
    return response;
  }

  triggerCancelRequest = async ({
    cancelUrl,
    patronPid,
    documentPid,
    documentTitle,
  }) => {
    const { onSuccess } = this.props;
    this.setState({
      isLoading: true,
      cancelModalIsOpened: false,
      cancelModalData: {},
    });

    try {
      this.cancellableCancelRequest = withCancel(
        this.cancelRequest(cancelUrl, patronPid, documentPid)
      );
      await this.cancellableCancelRequest.promise;
      this.setState({ isLoading: false });
      onSuccess(`Your loan request for ${documentTitle} has been cancelled.`);
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ isLoading: false });
        this.showError(error.response.data.message);
      }
    }
  };

  showError = (msg) => {
    this.setState({
      errorMsgOpened: true,
      errorMsg: (
        <Message negative>
          <Message.Header>Request failed!</Message.Header>
          {msg}
        </Message>
      ),
    });
  };

  hideError = () => {
    this.setState({
      errorMsgOpened: false,
      errorMsg: '',
    });
  };

  render() {
    const { cancelUrl, patronPid, documentPid, documentTitle } = this.props;
    const {
      isLoading,
      cancelModalIsOpened,
      cancelModalData,
      errorMsgOpened,
      errorMsg,
    } = this.state;
    return (
      <>
        <Popup
          trigger={
            <Button
              size="small"
              content="Cancel request"
              loading={isLoading}
              disabled={isLoading}
              onClick={() =>
                this.openModal(cancelUrl, patronPid, documentPid, documentTitle)
              }
            />
          }
          content={errorMsg}
          position="top center"
          open={errorMsgOpened}
          wide
          onClick={this.hideError}
        />
        <PatronCancelModal
          isOpened={cancelModalIsOpened}
          data={cancelModalData}
          headerContent="Are you sure you want to cancel your loan request?"
          documentTitle={cancelModalData.documentTitle || ''}
          onClose={this.closeCancelModal}
          onConfirm={this.triggerCancelRequest}
        />
      </>
    );
  }
}

ButtonCancelRequest.propTypes = {
  cancelUrl: PropTypes.string.isRequired,
  patronPid: PropTypes.string.isRequired,
  documentPid: PropTypes.string.isRequired,
  documentTitle: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

class LoansListEntry extends Component {
  renderRequestDetails = (startDate, endDate, delivery) => {
    const deliveryMethod =
      delivery && invenioConfig.CIRCULATION.deliveryMethods[delivery];
    return (
      <div className="pt-default">
        <Label basic>
          Requested on
          <Label.Detail>
            {DateTime.fromISO(startDate).toLocaleString()}
          </Label.Detail>
        </Label>
        <Label basic>
          Valid until
          <Label.Detail>
            {DateTime.fromISO(endDate).toLocaleString()}
          </Label.Detail>
        </Label>
        {delivery && (
          <Label basic>
            {deliveryMethod.iconClass && (
              <Icon className={deliveryMethod.iconClass} />
            )}
            <Label.Detail>{deliveryMethod.text}</Label.Detail>
          </Label>
        )}
      </div>
    );
  };

  render() {
    const { loan, onSuccess } = this.props;
    return (
      <LoansListItem
        loan={loan}
        extraItemProps={{
          itemMetaCmp: this.renderRequestDetails(
            loan.metadata.request_start_date,
            loan.metadata.request_expire_date,
            _get(loan.metadata.delivery, 'method')
          ),
          itemExtraCmp: _has(loan, 'availableActions.cancel') && (
            <ButtonCancelRequest
              cancelUrl={loan.availableActions.cancel}
              patronPid={loan.metadata.patron_pid}
              documentPid={loan.metadata.document_pid}
              documentTitle={loan.metadata.document.title}
              onSuccess={onSuccess}
            />
          ),
        }}
      />
    );
  }
}

LoansListEntry.propTypes = {
  loan: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default class PatronPendingLoans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: props.initialPage,
      isSuccessMessageVisible: false,
      successMessage: '',
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

  showSuccessMessage = (msg) => {
    this.setState({ isSuccessMessageVisible: true, successMessage: msg });
  };

  hideSuccessMessage = () => {
    this.setState({ isSuccessMessageVisible: false, successMessage: '' });
  };

  render() {
    const { error, isLoading, loans, rowsPerPage } = this.props;
    const { activePage, isSuccessMessageVisible, successMessage } = this.state;
    return (
      <Container className="spaced">
        <Header
          as="h2"
          content="Your loan requests"
          className="highlight"
          textAlign="center"
        />
        {isSuccessMessageVisible && (
          <Grid columns="3">
            <Grid.Column width="4" />
            <Grid.Column width="8">
              <Message
                positive
                icon="check"
                header="Success"
                content={successMessage}
                onDismiss={this.hideSuccessMessage}
              />
            </Grid.Column>
            <Grid.Column width="4" />
          </Grid>
        )}
        <ILSItemPlaceholder fluid isLoading={isLoading}>
          <Error error={error}>
            <LoansList
              activePage={activePage}
              isLoading={isLoading}
              loans={loans}
              onPageChange={(newPage) => {
                this.setState(
                  { activePage: newPage },
                  this.fetchPatronPendingLoans
                );
              }}
              rowsPerPage={rowsPerPage}
              renderListEntry={(loan) => (
                <LoansListEntry
                  loan={loan}
                  onSuccess={(msg) => {
                    this.fetchPatronPendingLoans();
                    this.showSuccessMessage(msg);
                  }}
                />
              )}
              noLoansCmp={
                <InfoMessage
                  title="No loan requests"
                  message="You do not currently have any loan request."
                />
              }
            />
          </Error>
        </ILSItemPlaceholder>
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
};

PatronPendingLoans.defaultProps = {
  initialPage: 1,
  rowsPerPage: 5,
};
