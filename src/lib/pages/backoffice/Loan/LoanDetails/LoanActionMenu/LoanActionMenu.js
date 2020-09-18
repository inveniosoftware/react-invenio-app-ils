import {
  ScrollingMenu,
  ScrollingMenuItem,
} from '@components/backoffice/buttons/ScrollingMenu';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Message } from 'semantic-ui-react';
import { LoanUpdateDates } from '@pages/backoffice/Loan/LoanDetails/LoanUpdateDates';

export default class LoanActionMenu extends Component {
  render() {
    const { loan, offset } = this.props;
    return (
      <div className="bo-action-menu">
        <LoanUpdateDates loan={loan} />

        <Message size="small">
          <Message.Header>Loan edit and delete</Message.Header>
          <p>
            Loans cannot be deleted. You can manage the loans by using the
            actions available in the Loan panel on the left. You can change the
            dates by clicking on the button above.
          </p>
        </Message>
        <Divider horizontal>Navigation</Divider>
        <ScrollingMenu offset={offset}>
          <ScrollingMenuItem label="Loan" elementId="loan-metadata" />
          <ScrollingMenuItem label="Physical copy" elementId="current-item" />
          <ScrollingMenuItem
            label="Available physical copies"
            elementId="available-items"
          />
        </ScrollingMenu>
      </div>
    );
  }
}

LoanActionMenu.propTypes = {
  loan: PropTypes.object.isRequired,
  offset: PropTypes.number.isRequired,
};
