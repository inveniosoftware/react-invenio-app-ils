import { loanApi } from '@api/loans';
import { invenioConfig } from '@config/index';
import { OverbookedConfirmModal } from '@components/OverbookedConfirmModal';
import { isDocumentOverbooked, isPrivilegedUser } from '@components/utils';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Icon, List, Modal } from 'semantic-ui-react';
import _get from 'lodash/get';

export default class PatronBulkExtendLoans extends Component {
  state = {
    open: false,
    showOverbookedConfirm: false,
    overbookedDocuments: [],
    isChecking: false,
  };

  open = async () => {
    this.setState({ open: true });

    if (!isPrivilegedUser()) return;

    this.setState({ isChecking: true });

    try {
      const { patronPid } = this.props;
      // Get all active loans for the patron
      const query = loanApi
        .query()
        .withPatronPid(patronPid)
        .withState(invenioConfig.CIRCULATION.loanActiveStates)
        .withSize(invenioConfig.APP.PATRON_PROFILE_MAX_RESULTS_SIZE)
        .sortByNewest()
        .qs();

      const response = await loanApi.list(query);
      const loans = response.data.hits;

      const checks = loans.map(async (loan) => {
        const documentPid = _get(loan, 'metadata.document.pid');
        const isOverbooked = await isDocumentOverbooked(documentPid);

        if (isOverbooked) {
          return {
            title: loan.metadata.document.title,
            loanRequestId: loan.id,
          };
        }
        return null;
      });

      const results = await Promise.all(checks);
      const overbookedDocuments = results.filter(Boolean);

      this.setState({
        overbookedDocuments,
        isChecking: false,
      });
    } catch (error) {
      console.error('Failed to fetch overbooked documents', error);
      this.setState({ isChecking: false });
    }
  };

  close = () => {
    this.setState({
      open: false,
      showOverbookedConfirm: false,
      overbookedDocuments: [],
    });
  };

  handleSubmitExtend = () => {
    const { bulkLoanExtension, patronPid } = this.props;
    const { overbookedDocuments } = this.state;

    // If the user is privileged and there are overbooked docs
    if (isPrivilegedUser() && overbookedDocuments.length > 0) {
      this.setState({ showOverbookedConfirm: true });
      return;
    }
    // Otherwise extend directly
    bulkLoanExtension(patronPid);
    this.close();
  };

  confirmBulkExtension = () => {
    const { bulkLoanExtension, patronPid } = this.props;

    bulkLoanExtension(patronPid);
    this.close();
  };

  render() {
    const { isLoading, disabled, patronPid, bulkLoanExtension, ...uiProps } =
      this.props;
    const { open, showOverbookedConfirm, overbookedDocuments, isChecking } =
      this.state;

    return (
      <>
        <OverbookedConfirmModal
          open={showOverbookedConfirm}
          onClose={() => this.setState({ showOverbookedConfirm: false })}
          onConfirm={this.confirmBulkExtension}
          overbookedDocuments={overbookedDocuments}
        />

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
            <Button
              onClick={this.handleSubmitExtend}
              primary
              loading={isChecking}
            >
              Extend the loans
            </Button>
          </Modal.Actions>
        </Modal>
      </>
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
