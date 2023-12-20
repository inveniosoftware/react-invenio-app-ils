import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Checkbox, Form, Message, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { invenioConfig } from '@config';
import { DateTime } from 'luxon';
import { toShortDate } from '@api/date';
import _isEmpty from 'lodash/isEmpty';
import { LoanInformationBullets } from '../DocumentCirculation/LoanInformationBullets';
import { LocationDatePicker } from '@modules/Location';
import { sessionManager } from '@authentication/services/SessionManager';

class LoanRequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestEndDate: '',
      deliveryMethod: '',
      activeDeliveryDate: false,
    };

    // init delivery method
    this.withDeliveryMethod = !_isEmpty(
      invenioConfig.CIRCULATION.deliveryMethods
    );
    this.deliveryMethods = this.withDeliveryMethod
      ? Object.keys(invenioConfig.CIRCULATION.deliveryMethods).map((key) => ({
          key: key,
          value: key,
          text: invenioConfig.CIRCULATION.deliveryMethods[key].text,
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

  handleRequestEndDateChange = (value) => {
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
    return this.deliveryMethods.map((method) => {
      return (
        <Checkbox
          radio
          label={
            <label>
              {method.text}{' '}
              <Icon
                className={
                  invenioConfig.CIRCULATION.deliveryMethods[method.key]
                    .iconClass
                }
              />
            </label>
          }
          name="deliveryMethodRadioGroup"
          value={method.value}
          checked={deliveryMethod === method.value}
          onChange={this.handleDeliveryMethodChange}
          key={method.value}
        />
      );
    });
  };

  renderDeliveryMethodSelector = () => {
    return this.withDeliveryMethod ? (
      <>
        <Header as="h4">Delivery</Header>
        <Form.Field required>
          <label>I would like to</label>
        </Form.Field>
        <Form.Field>{this.renderDeliveryRadioButtons()}</Form.Field>
      </>
    ) : null;
  };

  renderOptionalRequestExpirationDate = () => {
    const today = DateTime.local();
    const min = new DateTime(
      today.plus({ days: invenioConfig.CIRCULATION.requestStartOffset })
    );
    const max = new DateTime(
      min.plus({ days: invenioConfig.CIRCULATION.requestDuration })
    );
    const initialDate = new DateTime(min.plus({ days: 10 }));
    const { activeDeliveryDate } = this.state;
    return (
      <Form.Field>
        <Checkbox
          className="loan-request-delivery-date"
          label="I require it before a certain date."
          onClick={() => {
            this.setState({ activeDeliveryDate: !activeDeliveryDate });
          }}
          checked={activeDeliveryDate}
          fitted
        />
        {activeDeliveryDate && (
          <LocationDatePicker
            locationPid={sessionManager.user.locationPid}
            initialDate={toShortDate(initialDate)}
            minDate={toShortDate(min)}
            maxDate={toShortDate(max)}
            placeholder="Choose the date"
            handleDateChange={this.handleRequestEndDateChange}
          />
        )}
      </Form.Field>
    );
  };

  render() {
    const { document, lastLoan, error, hasError, isSuccessful } = this.props;
    return (
      <Form>
        {isSuccessful && (
          <Message
            positive
            icon="check"
            header="Request created"
            content="Your request to loan this literature was created."
          />
        )}
        {!isSuccessful && (
          <>
            <LoanInformationBullets
              circulation={document.metadata.circulation}
              lastLoan={lastLoan}
            />
            {this.renderDeliveryMethodSelector()}
            {this.renderOptionalRequestExpirationDate()}
            {hasError && (
              <Message
                negative
                header="Error"
                content={error.response.data.message}
              />
            )}
            <Form.Button
              type="button"
              primary
              fluid
              onClick={this.handleSubmit}
            >
              Request
            </Form.Button>
          </>
        )}
      </Form>
    );
  }
}

LoanRequestForm.propTypes = {
  requestLoanForDocument: PropTypes.func.isRequired,
  initializeState: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  lastLoan: PropTypes.string,
  /* redux */
  error: PropTypes.object.isRequired,
  hasError: PropTypes.bool.isRequired,
  isSuccessful: PropTypes.bool.isRequired,
};

LoanRequestForm.defaultProps = {
  lastLoan: null,
};

export default Overridable.component('LoanRequestForm', LoanRequestForm);
