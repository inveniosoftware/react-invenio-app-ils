import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { DocumentRequestStepPanels } from './DocumentRequestStepPanels';
import { DocumentRequestStepsHeader } from './DocumentRequestStepsHeader';
import { getCurrentStep } from './Steps';

export class DocumentRequestSteps extends Component {
  render() {
    const { docReq } = this.props;
    const {
      state: currentState,
      document_pid: documentPid,
      physical_item_provider: provider,
    } = docReq;
    const currentStep = getCurrentStep(
      currentState,
      documentPid,
      _get(provider, 'pid')
    );
    return (
      <>
        <DocumentRequestStepsHeader docReq={docReq} currentStep={currentStep} />
        <Segment placeholder>
          <DocumentRequestStepPanels
            docReq={docReq}
            currentStep={currentStep}
          />
        </Segment>
      </>
    );
  }
}

DocumentRequestSteps.propTypes = {
  docReq: PropTypes.object.isRequired,
};
