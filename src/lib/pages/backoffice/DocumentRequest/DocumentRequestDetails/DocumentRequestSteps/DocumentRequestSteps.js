import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Message, Segment, Step } from 'semantic-ui-react';
import { DocumentStepContent } from './DocumentStep';
import { DocumentStep } from './DocumentStep/DocumentStep';
import { ProviderStepContent } from './ProviderStep/';
import { ProviderStep } from './ProviderStep/ProviderStep';
import { ReviewStepContent } from './ReviewStep';
import { ReviewStep } from './ReviewStep/ReviewStep';
import { STEPS } from './Steps';
import { StepsActions } from './StepsActions';

export default class DocumentRequestSteps extends Component {
  calculateStep = (docPid = undefined, providerPid = undefined) => {
    const hasDocument = !!docPid;
    const hasProvider = !!providerPid;

    let step = STEPS.document;
    if (hasDocument && !hasProvider) step = STEPS.provider;
    if (hasDocument && hasProvider) step = STEPS.review;
    return step;
  };

  render() {
    const {
      data,
      data: {
        metadata: { document_pid: docPid, state },
      },
    } = this.props;
    const providerPid = _get(data, 'metadata.physical_item_provider.pid');
    const step = this.calculateStep(docPid, providerPid);
    return state !== 'DECLINED' ? (
      <>
        <Segment>
          <Step.Group size="small" fluid widths={3}>
            <DocumentStep step={step} />
            <ProviderStep step={step} />
            <ReviewStep step={step} />
          </Step.Group>
        </Segment>
        <StepsActions step={step} />
        <Divider />

        <DocumentStepContent step={step} />
        <ProviderStepContent step={step} />
        <ReviewStepContent step={step} />
      </>
    ) : (
      <Message info>
        <Message.Header>Declined request</Message.Header>
        <p>
          Change the state of the request to modify document or provider
          information.
        </p>
      </Message>
    );
  }
}

DocumentRequestSteps.propTypes = {
  data: PropTypes.object.isRequired,
};
