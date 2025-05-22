import { invenioConfig } from '@config/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Icon, List, Modal } from 'semantic-ui-react';

export default class PatronBulkExtendLoans extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleSubmitExtend = () => {
    const { bulkLoanExtension, patronPid } = this.props;

    bulkLoanExtension(patronPid);
    this.close();
  };

  render() {
    const { patronPid, bulkLoanExtension, isLoading, disabled, ...uiProps } =
      this.props;
    const { open } = this.state;
    return (
      <Modal
        open={open}
        onClose={this.close}
        onOpen={this.open}
        trigger={
          <Button
            labelPosition="left"
            fluid
            icon
            primary
            loading={isLoading}
            disabled={disabled}
            {...uiProps}
          >
            <Icon name="refresh" />
            Extend all loans
          </Button>
        }
      >
        <Modal.Header>Confirm extension action</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            The loan duration will be extended for:{' '}
            <List bulleted>
              <List.Item>
                loans that will have to be returned in next{' '}
                <b>{invenioConfig.CIRCULATION.loanWillExpireDays} days,</b>
              </List.Item>
              <List.Item>
                loans that do not involve third party libraries (Interlibrary
                Loans),
              </List.Item>
              <List.Item>
                loans for <b>literature not in high demand by other users.</b>
              </List.Item>
            </List>
            Do you want to continue?
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.close}>Cancel</Button>
          <Button onClick={this.handleSubmitExtend} primary>
            Extend the loans
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

PatronBulkExtendLoans.propTypes = {
  patronPid: PropTypes.string.isRequired,
  bulkLoanExtension: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

PatronBulkExtendLoans.defaultProps = {
  isLoading: false,
  disabled: true,
};
