import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { getCurrentStep, STEPS } from '../Steps';
import { AcceptStepPanel } from './AcceptStepPanel';
import { ChooseDocumentStepPanel } from './ChooseDocumentStepPanel';
import { ChooseProviderStepPanel } from './ChooseProviderStepPanel';

export class DocumentRequestStepPanels extends Component {
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

    let cmp = null;
    if (currentStep === STEPS.CHOOSE_DOCUMENT) {
      cmp = <ChooseDocumentStepPanel docReq={docReq} />;
    } else if (currentStep === STEPS.CHOOSE_PROVIDER) {
      cmp = <ChooseProviderStepPanel docReq={docReq} />;
    } else if (currentStep === STEPS.ACCEPT) {
      cmp = <AcceptStepPanel docReq={docReq} />;
    } else if (currentStep === STEPS.COMPLETED) {
      const label =
        docReq.state === 'ACCEPTED'
          ? 'accepted'
          : docReq.state === 'DECLINED'
            ? 'declined'
            : '';
      cmp = (
        <Header icon>
          <Icon name="check" />
          The request has been {label}.
        </Header>
      );
    }
    return cmp;
  }
}

DocumentRequestStepPanels.propTypes = {
  docReq: PropTypes.object.isRequired,
};
