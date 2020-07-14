import { fromISO } from '@api/date';
import { DatePicker } from '@components/DatePicker';
import { InfoMessage } from '@components/InfoMessage';
import { invenioConfig } from '@config';
import _isEmpty from 'lodash/isEmpty';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Label,
  Modal,
  Table,
} from 'semantic-ui-react';

export default class BorrowingRequestLoanExtension extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }
  declineHandler = (e, elem) => {
    const { borrowingRequestLoanExtensionDecline, brwReqPid } = this.props;
    borrowingRequestLoanExtensionDecline(brwReqPid);
  };

  acceptHandler = async (e, elem) => {
    const { brwReqPid, borrowingRequestLoanExtensionAccept } = this.props;
    const { acceptEndDate } = this.state;
    const endDate = fromISO(acceptEndDate);
    borrowingRequestLoanExtensionAccept(brwReqPid, endDate);
    this.handleCloseModal();
  };

  handleEndDateChange = value => {
    this.setState({ acceptEndDate: value });
  };

  handleOpenModal = () => {
    this.setState({ modalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const {
      isLoading,
      patronLoan,
      patronLoan: { extension },
    } = this.props;
    const { modalOpen } = this.state;
    return (
      <Container>
        <Divider horizontal>Loan extension</Divider>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Extensions</Table.Cell>
              <Table.Cell>{patronLoan.loan.extension_count || 0}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        {!_isEmpty(extension) && extension.status && (
          <>
            The patron requested an extension for this loan on{' '}
            <Label basic>{extension.request_date.toLocaleString()}</Label>
            <Divider hidden />
            {invenioConfig.ILL_BORROWING_REQUESTS.extensionPendingStatuses.includes(
              extension.status
            ) && (
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8} textAlign="left">
                    <Modal
                      open={modalOpen}
                      trigger={
                        <Button
                          positive
                          onClick={this.handleOpenModal}
                          loading={isLoading}
                          disabled={isLoading}
                        >
                          Accept extension
                        </Button>
                      }
                    >
                      <Modal.Header>Accept extension</Modal.Header>
                      <Modal.Content>
                        Current loan end date:{' '}
                        <Label basic size="large">
                          {patronLoan.loan.end_date.toLocaleString()}
                        </Label>
                        <Divider hidden />
                        <Form>
                          <Form.Group>
                            <Form.Field inline required>
                              <label>Extension end date</label>
                              <DatePicker
                                minDate={this.today}
                                defaultValue={this.endDate}
                                placeholder="End date"
                                handleDateChange={value =>
                                  this.handleEndDateChange(value)
                                }
                              />
                            </Form.Field>
                          </Form.Group>
                        </Form>
                        <Divider hidden />
                        <i>
                          The extension end date should not be before the
                          borrowing request start date and not before current
                          loan end date.
                        </i>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button onClick={this.handleCloseModal}>Close</Button>
                        <Button positive onClick={this.acceptHandler}>
                          Accept extension
                        </Button>
                      </Modal.Actions>
                    </Modal>
                  </Grid.Column>
                  <Grid.Column width={8} textAlign="right">
                    <Button
                      negative
                      onClick={this.declineHandler}
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      Decline extension
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            )}
            {invenioConfig.ILL_BORROWING_REQUESTS.extensionDeclinedStatuses.includes(
              extension.status
            ) && (
              <InfoMessage
                title="Extension declined"
                message="The extension is already declined."
              />
            )}
          </>
        )}
      </Container>
    );
  }
}

BorrowingRequestLoanExtension.propTypes = {
  patronLoan: PropTypes.object.isRequired,
  brwReqPid: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  borrowingRequestLoanExtensionAccept: PropTypes.func.isRequired,
  borrowingRequestLoanExtensionDecline: PropTypes.func.isRequired,
};

BorrowingRequestLoanExtension.defaultProps = {
  isLoading: false,
};
