import { toShortDate } from '@api/date';
import { LoanIcon } from '@components/backoffice/icons';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import { invenioConfig } from '@config';
import { getDisplayVal } from '@config';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Divider,
  Form,
  Grid,
  Icon,
  Label,
  Message,
  Modal,
} from 'semantic-ui-react';
import { BorrowingRequestLoanExtension } from './BorrowingRequestLoanExtension';
import { LocationDatePicker } from '@modules/Location';

class CreateLoanButton extends React.Component {
  render() {
    const { brwReq, isLoading, onNewLoanClicked } = this.props;
    const isCompleted = invenioConfig.ILL_BORROWING_REQUESTS.completedStatuses.includes(
      brwReq.status
    );
    if (isCompleted) {
      return null;
    }

    const hasRequestedStatus = brwReq.status === 'REQUESTED';
    const hasLoan = _get(brwReq, 'patron_loan.pid', false);

    let description =
      'Create a new loan for the patron when you have received the requested item.';
    let isEnabled = !isLoading;
    if (!hasRequestedStatus && !hasLoan) {
      description = `To create a new loan, change the borrowing request status to REQUESTED.`;
      isEnabled = false;
    } else if (!hasRequestedStatus && hasLoan) {
      description =
        'The borrowing request has already a loan. To create a new one, edit the request and remove the loan PID.';
      isEnabled = false;
    }

    return (
      <Message>
        <Message.Content>
          <Grid columns={2} verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={10}>{description}</Grid.Column>
              <Grid.Column width={6} textAlign="center">
                <Button
                  icon
                  loading={isLoading}
                  positive
                  size="small"
                  labelPosition="left"
                  onClick={onNewLoanClicked}
                  disabled={!isEnabled}
                >
                  <Icon name="plus" />
                  New loan
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Message.Content>
      </Message>
    );
  }
}

CreateLoanButton.propTypes = {
  brwReq: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onNewLoanClicked: PropTypes.func.isRequired,
};

class CreateLoan extends React.Component {
  constructor(props) {
    super(props);
    this.today = toShortDate(DateTime.local());
    this.state = this.initialState();
  }

  initialState = () => {
    return {
      modalOpen: false,
      startDate: this.today,
      endDate: '',
    };
  };

  handleStartDateChange = value => {
    this.setState({ startDate: value });
  };

  handleEndDateChange = value => {
    this.setState({ endDate: value });
  };

  handleOpenModal = () => {
    this.setState({ modalOpen: true });
  };

  handleCloseModal = () => {
    this.setState(this.initialState());
  };

  isSelectionValid = () => {
    const { startDate, endDate } = this.state;
    return (
      startDate &&
      endDate &&
      DateTime.fromISO(startDate) < DateTime.fromISO(endDate)
    );
  };

  handleCreateLoan = () => {
    const { startDate, endDate } = this.state;
    const { borrowingRequestPatronLoanCreate, brwReq } = this.props;
    borrowingRequestPatronLoanCreate(brwReq.pid, startDate, endDate);
    this.handleCloseModal();
  };

  transformError = error => {
    return error.response.data.message;
  };

  render() {
    const { brwReq, isLoading, hasError, error } = this.props;
    const { modalOpen } = this.state;
    const today = DateTime.local();
    const max = new DateTime(
      today.plus({ days: invenioConfig.CIRCULATION.requestDuration })
    );
    return (
      <>
        <CreateLoanButton
          brwReq={brwReq}
          isLoading={isLoading}
          onNewLoanClicked={this.handleOpenModal}
        />

        {hasError && (
          <Message
            error
            header="Something went wrong"
            content={this.transformError(error)}
          />
        )}

        <Modal open={modalOpen}>
          <Modal.Header>Create a new loan</Modal.Header>
          <Modal.Content>
            Checkout the borrowed item for the patron {brwReq.patron.name}.
            Select the start and the end dates:
            <Divider hidden />
            <Form>
              <Form.Group>
                <Form.Field inline required>
                  <label>Start date</label>
                  <LocationDatePicker
                    locationPid={brwReq.patron.location_pid}
                    defaultValue={this.today}
                    minDate={this.today}
                    maxDate={toShortDate(max)}
                    placeholder="Start date"
                    handleDateChange={value =>
                      this.handleStartDateChange(value)
                    }
                  />
                </Form.Field>
                <Form.Field inline required>
                  <label>End date</label>
                  <LocationDatePicker
                    locationPid={brwReq.patron.location_pid}
                    minDate={this.today}
                    maxDate={toShortDate(max)}
                    placeholder="End date"
                    handleDateChange={value => this.handleEndDateChange(value)}
                  />
                </Form.Field>
              </Form.Group>
              <Divider hidden />
              <i>
                The loan start date should not be after the borrowing request
                end date.
              </i>
            </Form>
          </Modal.Content>
          <Modal.Actions key="modalActions">
            <Button onClick={this.handleCloseModal}>Cancel</Button>
            <Button
              positive
              disabled={!this.isSelectionValid()}
              icon="checkmark"
              labelPosition="left"
              content="Create"
              onClick={this.handleCreateLoan}
            />
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

CreateLoan.propTypes = {
  brwReq: PropTypes.object.isRequired,
  /* REDUX */
  error: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  borrowingRequestPatronLoanCreate: PropTypes.func.isRequired,
};

CreateLoan.defaultProps = {
  error: null,
};

export default class BorrowingRequestPatronLoan extends React.Component {
  renderLoanLink(loanPid) {
    return loanPid ? (
      <Link to={BackOfficeRoutes.loanDetailsFor(loanPid)}>
        <LoanIcon /> {loanPid}
      </Link>
    ) : (
      '-'
    );
  }

  render() {
    const { brwReq } = this.props;
    const loanPid = _get(brwReq, 'patron_loan.pid');
    const loanStartDate = _get(brwReq, 'patron_loan.loan.start_date');
    const loanEndDate = _get(brwReq, 'patron_loan.loan.end_date');
    const loanStatus = _get(brwReq, 'patron_loan.loan.state');

    const leftTable = [
      {
        name: 'Loan',
        value: this.renderLoanLink(loanPid),
      },
      {
        name: 'Status',
        value: loanStatus ? (
          <Label basic color="blue" size="tiny">
            {getDisplayVal('CIRCULATION.statuses', loanStatus)}
          </Label>
        ) : (
          '-'
        ),
      },
    ];
    const rightTable = [
      {
        name: 'Start date',
        value: loanStartDate ? loanStartDate : '-',
      },
      {
        name: 'End date',
        value: loanEndDate ? loanEndDate : '-',
      },
    ];
    return (
      <>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <MetadataTable labelWidth={8} rows={leftTable} />
            </Grid.Column>
            <Grid.Column>
              <MetadataTable labelWidth={8} rows={rightTable} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <CreateLoan {...this.props} />

        {!_isEmpty(brwReq.patron_loan) && (
          <BorrowingRequestLoanExtension
            patronLoan={brwReq.patron_loan}
            brwReqPid={brwReq.pid}
          />
        )}
      </>
    );
  }
}

BorrowingRequestPatronLoan.propTypes = {
  brwReq: PropTypes.object.isRequired,
  /* REDUX */
  error: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  borrowingRequestPatronLoanCreate: PropTypes.func.isRequired,
};

BorrowingRequestPatronLoan.defaultProps = {
  error: null,
};
