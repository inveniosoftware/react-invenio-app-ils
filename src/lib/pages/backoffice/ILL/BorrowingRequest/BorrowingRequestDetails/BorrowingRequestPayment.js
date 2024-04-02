import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Header, Message, Segment } from 'semantic-ui-react';
import { PaymentInformation } from '@components/backoffice/PaymentInformation';
import Overridable from 'react-overridable';

export class BorrowingRequestPayment extends React.Component {
  render() {
    const { brwReq } = this.props;
    const paymentInfo =
      _get(brwReq, 'payment') !== undefined && !_isEmpty(brwReq.payment);
    return (
      <>
        <Header as="h3" attached="top">
          Payment information
        </Header>
        <Segment attached className="bo-metadata-segment" id="payment-info">
          {paymentInfo && (
            <Overridable id="Backoffice.PaymentInformation">
              <PaymentInformation order={brwReq} type="borrowing-request" />
            </Overridable>
          )}
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
