import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Header, Icon, Message, Step } from 'semantic-ui-react';
import { STEPS } from '../Steps';

export const ReviewStep = ({ step }) => (
  <Step active={step === STEPS.review} disabled={step !== STEPS.review}>
    <Icon name="check" />
    <Step.Content>
      <Step.Title>Review</Step.Title>
      <Step.Description>
        Review and accept the new literature request
      </Step.Description>
    </Step.Content>
  </Step>
);

ReviewStep.propTypes = {
  step: PropTypes.string.isRequired,
};

export default class ReviewStepContent extends Component {
  onAcceptClick = () => {
    const { acceptRequest, data } = this.props;
    acceptRequest(data.metadata.pid);
  };

  render() {
    const {
      step,
      data: { metadata },
    } = this.props;
    return step === STEPS.review && metadata.state !== 'ACCEPTED' ? (
      <>
        <Message info>
          <Message.Header>
            Review and accept the new literature request
          </Message.Header>
        </Message>
        <Header textAlign="center">
          <Button size="large" primary onClick={this.onAcceptClick}>
            Accept
          </Button>
        </Header>
      </>
    ) : null;
  }
}

ReviewStepContent.propTypes = {
  acceptRequest: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  step: PropTypes.string.isRequired,
};
