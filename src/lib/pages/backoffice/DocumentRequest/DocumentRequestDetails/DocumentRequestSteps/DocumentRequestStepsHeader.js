import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, Segment, Step } from 'semantic-ui-react';
import { getCurrentStep } from './Steps';

class DocumentRequestStep extends Component {
  render() {
    const { step, currentStep, iconName, title, description } = this.props;
    return (
      <Step active={currentStep === step} disabled={step < currentStep}>
        {iconName && <Icon name={iconName} />}
        <Step.Content>
          <Step.Title className="uppercase">{title}</Step.Title>
          <Step.Description>{description}</Step.Description>
        </Step.Content>
      </Step>
    );
  }
}

DocumentRequestStep.propTypes = {
  step: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
};

export class DocumentRequestStepsHeader extends Component {
  render() {
    const {
      docReq: {
        state: currentState,
        document_pid: documentPid,
        physical_item_provider: provider,
      },
    } = this.props;
    const currentStep = getCurrentStep(
      currentState,
      documentPid,
      _get(provider, 'pid')
    );
    return (
      <Segment>
        <Step.Group size="mini" fluid widths={4}>
          <DocumentRequestStep
            step={0}
            currentStep={currentStep}
            iconName="book"
            title="Select document"
            description="Select a document for this request"
          />
          <DocumentRequestStep
            step={1}
            currentStep={currentStep}
            iconName="truck"
            title="Select provider"
            description="Purchase or borrow from another library"
          />
          <DocumentRequestStep
            step={2}
            currentStep={currentStep}
            iconName="handshake outline"
            title="accept"
            description="Accept the request"
          />
          <DocumentRequestStep
            step={3}
            currentStep={currentStep}
            iconName="check"
            title="completed"
            description="Request accepted or declined"
          />
        </Step.Group>
      </Segment>
    );
  }
}

DocumentRequestStepsHeader.propTypes = {
  docReq: PropTypes.object.isRequired,
};
