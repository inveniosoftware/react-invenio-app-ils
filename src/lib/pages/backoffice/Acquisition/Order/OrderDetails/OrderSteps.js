import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, Segment, Step } from 'semantic-ui-react';
import { getDisplayVal } from '@config';
import { invenioConfig } from '@config';

class OrderStep extends Component {
  render() {
    const {
      status,
      currentStatus,
      disabled,
      iconName,
      description,
    } = this.props;
    return (
      <Step
        active={currentStatus === status}
        disabled={disabled || isBefore(currentStatus, status)}
      >
        {iconName && <Icon name={iconName} />}
        <Step.Content>
          <Step.Title className="uppercase">{toLabel(status)}</Step.Title>
          {description && <Step.Description>{description}</Step.Description>}
        </Step.Content>
      </Step>
    );
  }
}

OrderStep.propTypes = {
  status: PropTypes.string.isRequired,
  currentStatus: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  description: PropTypes.string,
  iconName: PropTypes.string,
};

OrderStep.defaultProps = {
  disabled: false,
  description: null,
  iconName: null,
};

const toLabel = (status) => {
  return getDisplayVal('ACQ_ORDERS.statuses', status);
};

const isBefore = (currentStatus, status) => {
  const orderedStatuses = invenioConfig.ACQ_ORDERS.orderedValidStatuses;
  return (
    orderedStatuses.indexOf(currentStatus) < orderedStatuses.indexOf(status)
  );
};

export class OrderSteps extends Component {
  render() {
    const {
      order: { status: currentStatus },
    } = this.props;
    const allDisabled = currentStatus === 'CANCELLED';
    return (
      <Segment>
        <Step.Group size="mini" fluid widths={4}>
          <OrderStep
            status="PENDING"
            currentStatus={currentStatus}
            disabled={allDisabled}
            iconName="hourglass half"
            description="New order created"
          />
          <OrderStep
            status="ORDERED"
            currentStatus={currentStatus}
            disabled={allDisabled}
            iconName="tasks"
            description="Order sent to the provider"
          />
          <OrderStep
            status="RECEIVED"
            currentStatus={currentStatus}
            disabled={allDisabled}
            iconName="check"
            description="Order received"
          />
        </Step.Group>
      </Segment>
    );
  }
}

OrderSteps.propTypes = {
  order: PropTypes.object.isRequired,
};
