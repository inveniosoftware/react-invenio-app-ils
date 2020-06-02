import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Checkbox, Form, Message } from 'semantic-ui-react';
import { DatePicker } from '@components/DatePicker';
import PropTypes from 'prop-types';
import { invenioConfig } from '@config';
import { DateTime } from 'luxon';
import { toShortDate } from '@api/date';
import _isEmpty from 'lodash/isEmpty';

class LoanRequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestEndDate: '',
      deliveryMethod: '',
    };

    // init delivery method
    this.withDeliveryMethod = !_isEmpty(
      invenioConfig.circulation.deliveryMethods
    );
    this.deliveryMethods = this.withDeliveryMethod
      ? Object.keys(invenioConfig.circulation.deliveryMethods).map(key => ({
          key: key,
          value: key,
          text: invenioConfig.circulation.deliveryMethods[key],
        }))
      : [];
    this.state['deliveryMethod'] = this.withDeliveryMethod
      ? this.deliveryMethods[0].value
      : null;
  }

  componentDidMount() {
    const { initializeState } = this.props;
    initializeState();
  }

  handleRequestEndDateChange = value => {
    this.setState({ requestEndDate: value });
  };

  handleDeliveryMethodChange = (_, { value }) => {
    this.setState({ deliveryMethod: value });
  };

  handleSubmit = () => {
    const {
      requestLoanForDocument,
      document: {
        metadata: { pid: documentPid },
      },
    } = this.props;
    const { requestEndDate, deliveryMethod } = this.state;
    const optionalParams = {};
    if (!_isEmpty(requestEndDate)) {
      optionalParams.requestEndDate = requestEndDate;
    }
    if (!_isEmpty(deliveryMethod)) {
      optionalParams.deliveryMethod = deliveryMethod;
    }
    requestLoanForDocument(documentPid, optionalParams);
  };

  renderDeliveryRadioButtons = () => {
    const { deliveryMethod } = this.state;
    return this.deliveryMethods.map(method => (
      <Checkbox
        radio
        label={method.text}
        name="deliveryMethodRadioGroup"
        value={method.value}
        checked={deliveryMethod === method.value}
        onChange={this.handleDeliveryMethodChange}
        key={method.value}
      />
    ));
  };

  renderDeliveryMethodSelector = () => {
    return this.withDeliveryMethod ? (
      <>
        <Form.Field required>
          <label>I would like to</label>
        </Form.Field>
        <Form.Field>{this.renderDeliveryRadioButtons()}</Form.Field>
      </>
    ) : null;
  };

  renderOptionalRequestExpirationDate = () => {
    const today = DateTime.local();
    const initialDate = new DateTime(today.plus({ days: 10 }));
    const max = new DateTime(
      today.plus({ days: invenioConfig.circulation.requestDuration })
    );
    return (
      <Form.Field>
        <label>Do you require it before a certain date? (optional)</label>
        <DatePicker
          initialDate={toShortDate(initialDate)}
          minDate={toShortDate(today)}
          maxDate={toShortDate(max)}
          placeholder="Pick the date"
          handleDateChange={this.handleRequestEndDateChange}
        />
      </Form.Field>
    );
  };

  render() {
    const { error, hasError, isSuccessful } = this.props;
    return (
      <Form>
        {this.renderDeliveryMethodSelector()}
        {this.renderOptionalRequestExpirationDate()}
        {hasError && (
          <Message
            negative
            header="Error"
            content={error.response.data.message}
          />
        )}
        {isSuccessful && (
          <Message
            positive
            header="Success"
            content="You have requested to loan this book."
          />
        )}
        <Form.Button type="button" primary fluid onClick={this.handleSubmit}>
          Request
        </Form.Button>
      </Form>
    );
  }
}

LoanRequestForm.propTypes = {
  requestLoanForDocument: PropTypes.func.isRequired,
  initializeState: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  /* redux */
  error: PropTypes.object.isRequired,
  hasError: PropTypes.bool.isRequired,
  isSuccessful: PropTypes.bool.isRequired,
};

export default Overridable.component('LoanRequestForm', LoanRequestForm);
