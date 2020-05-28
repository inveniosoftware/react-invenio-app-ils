import {
  ScrollingMenu,
  ScrollingMenuItem,
} from '@components/backoffice/buttons/ScrollingMenu';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Message } from 'semantic-ui-react';

export default class LoanActionMenu extends Component {
  render() {
    const { offset } = this.props;
    return (
      <div className="bo-action-menu">
        <Message size="small">
          <Message.Header>Loan edit and delete</Message.Header>
          <p>
            Loans cannot be deleted or edited. You can manage the loans by using
            the actions available in the Loan panel on the left.
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
  offset: PropTypes.number.isRequired,
};
