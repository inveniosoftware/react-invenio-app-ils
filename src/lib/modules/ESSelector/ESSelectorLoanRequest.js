import { toShortDate } from '@api/date';
import { invenioConfig } from '@config';
import { LocationDatePicker } from '@modules/Location';
import _isEmpty from 'lodash/isEmpty';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Form, Header, Modal, Segment } from 'semantic-ui-react';
import ESSelector from './ESSelector';

export const PatronSearchInputContext = React.createContext({
  patronSelectionError: 'false',
});

export default class ESSelectorLoanRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      missingPatron: 'false',
      requestEndDate: '',
      deliveryMethod: '',
      selections: [],
    };
    this.selectorRef = null;

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

    this.defaultDeliveryMethod = null;
    if (this.withDeliveryMethod) {
      this.defaultDeliveryMethod = this.deliveryMethods.some(
        (method) => method.value === 'NOT-SPECIFIED'
      )
        ? 'NOT-SPECIFIED'
        : this.deliveryMethods[0].value;
    }

    this.state['deliveryMethod'] = this.defaultDeliveryMethod;
  }

  onSelectionsUpdate = (selections) => this.setState({ selections });

  toggle = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible, selections: [] });
  };

  save = () => {
    const { onSave } = this.props;
    const { selections, requestEndDate, deliveryMethod } = this.state;
    if (_isEmpty(selections)) {
      this.setState({ missingPatron: 'true' });
    } else {
      if (onSave) {
        const patronPid = selections[0].metadata.id.toString();
        const optionalParams = {};
        if (!_isEmpty(requestEndDate)) {
          optionalParams.requestEndDate = requestEndDate;
        }
        if (!_isEmpty(deliveryMethod)) {
          optionalParams.deliveryMethod = deliveryMethod;
        }
        onSave(patronPid, optionalParams);
      }
      this.toggle();
    }
  };

  handleRequestEndDateChange = (value) => {
    this.setState({ requestEndDate: value });
  };

  handleDeliveryMethodChange = (_, { value }) => {
    this.setState({ deliveryMethod: value });
  };

  renderOptionalRequestExpirationDate = () => {
    const { selections } = this.state;
    // eslint-disable-next-line no-unused-vars
    const locationPid = selections.length
      ? selections[0].metadata.location_pid
      : null;
    const today = DateTime.local();
    const max = new DateTime(
      today.plus({ days: invenioConfig.CIRCULATION.requestDuration })
    );
    const disabled = _isEmpty(selections);
    return (
      <Form.Field>
        <label>Optionally, select a limit date for your request</label>
        <LocationDatePicker
          locationPid={locationPid}
          disabledInput={disabled}
          minDate={toShortDate(today)}
          maxDate={toShortDate(max)}
          placeholder="Request limit date"
          handleDateChange={this.handleRequestEndDateChange}
        />
      </Form.Field>
    );
  };

  renderDeliveryMethodSelector = () => {
    return this.withDeliveryMethod ? (
      <Form.Field>
        <label>Choose the book delivery method</label>
        <Form.Dropdown
          placeholder="Select delivery method"
          options={this.deliveryMethods}
          onChange={this.handleDeliveryMethodChange}
          defaultValue={this.defaultDeliveryMethod}
          selection
        />
      </Form.Field>
    ) : null;
  };

  render() {
    const { title, content, selectorComponent, size, trigger } = this.props;
    const { visible, missingPatron, selections } = this.state;
    const modalTrigger = React.cloneElement(trigger, {
      onClick: this.toggle,
    });

    const Selector = selectorComponent;

    return (
      <Modal
        id="es-selector-modal"
        open={visible}
        trigger={modalTrigger}
        size={size}
        centered={false}
        onClose={this.toggle}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <p>{content}</p>
          <PatronSearchInputContext.Provider
            value={{ patronSelectionError: missingPatron }}
          >
            <Selector
              onSelectionsUpdate={this.onSelectionsUpdate}
              {...this.props}
              focus
            />
          </PatronSearchInputContext.Provider>
        </Modal.Content>
        <Form>
          <Segment.Group>
            <Segment>
              <Header as="h3" content="Request loan" />
            </Segment>
            <Segment>
              {this.renderDeliveryMethodSelector()}
              {this.renderOptionalRequestExpirationDate()}
            </Segment>
            <Segment textAlign="right">
              <Modal.Actions>
                <Button onClick={this.toggle}>Cancel</Button>
                <Button
                  positive
                  icon="check"
                  labelPosition="left"
                  content="Request"
                  onClick={this.save}
                  disabled={_isEmpty(selections)}
                />
              </Modal.Actions>
            </Segment>
          </Segment.Group>
        </Form>
      </Modal>
    );
  }
}

ESSelectorLoanRequest.propTypes = {
  trigger: PropTypes.node.isRequired,
  title: PropTypes.string,
  size: PropTypes.string,
  initialSelections: PropTypes.array,
  onSelectResult: PropTypes.func,
  onSave: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  selectorComponent: PropTypes.elementType,
};

ESSelectorLoanRequest.defaultProps = {
  size: 'tiny',
  selectorComponent: ESSelector,
  onSave: null,
  initialSelections: [],
  onSelectResult: null,
  content: null,
  title: '',
};
