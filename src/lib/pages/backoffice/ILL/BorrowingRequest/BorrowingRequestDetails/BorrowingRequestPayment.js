import _isEmpty from 'lodash/isEmpty';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Header, Message, Segment } from 'semantic-ui-react';
import { PaymentInformation } from '@components/backoffice/PaymentInformation';
import Overridable from 'react-overridable';

export class BorrowingRequestPayment extends React.Component {
  render() {
    const { brwReq } = this.props;
    const paymentInfo = !_isEmpty(brwReq.payment);
    return (
      <>
        <Header as="h3" attached="top">
          Payment information
        </Header>
        <Segment attached className="bo-metadata-segment" id="payment-info">
          <Overridable id="Backoffice.PaymentInformation">
            {paymentInfo && (
              <PaymentInformation order={brwReq} type="borrowing-request" />
            )}
          </Overridable>
          {!paymentInfo && (
            <Message>
              <Message.Content>No payment information</Message.Content>
            </Message>
          )}
        </Segment>
      </>
    );
  }
}

BorrowingRequestPayment.propTypes = {
  brwReq: PropTypes.object.isRequired,
};
