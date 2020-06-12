import { toShortDate } from '@api/date';
import { DatePicker } from '@components/DatePicker';
import { invenioConfig } from '@config';
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
      ? this.deliveryMethods[1].value
      : null;
  }

  onSelectionsUpdate = selections => this.setState({ selections });

  toggle = () => this.setState({ visible: !this.state.visible });

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

  handleRequestEndDateChange = value => {
    this.setState({ requestEndDate: value });
  };

  handleDeliveryMethodChange = (_, { value }) => {
    this.setState({ deliveryMethod: value });
  };

  renderOptionalRequestExpirationDate = () => {
    const today = DateTime.local();
    const initialDate = new DateTime(today.plus({ days: 10 }));
    const max = new DateTime(
      today.plus({ days: invenioConfig.circulation.requestDuration })
    );
    return (
      <div>
        <Segment.Inline>
          <div>Optionally, select a limit date for your request</div>
          <DatePicker
            initialDate={toShortDate(initialDate)}
            minDate={toShortDate(today)}
            maxDate={toShortDate(max)}
            placeholder="Request limit date"
            handleDateChange={this.handleRequestEndDateChange}
          />
        </Segment.Inline>
      </div>
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
          defaultValue={this.deliveryMethods[1].value}
          selection
        />
      </Form.Field>
    ) : null;
  };

  render() {
    const { title, content, selectorComponent, size, trigger } = this.props;
    const { visible, missingPatron } = this.state;
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
            <Segment>
              <Modal.Actions>
                <Button color="black" onClick={this.toggle}>
                  Close
                </Button>
                <Button onClick={this.save}>Request</Button>
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
