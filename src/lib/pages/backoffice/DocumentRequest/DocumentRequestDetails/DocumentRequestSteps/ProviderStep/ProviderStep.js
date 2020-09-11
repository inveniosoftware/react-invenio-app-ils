import { orderApi } from '@api/acquisition';
import { borrowingRequestApi } from '@api/ill';
import { invenioConfig } from '@config';
import { goTo } from '@history';
import { ESSelector } from '@modules/ESSelector';
import {
  serializeAcqOrder,
  serializeBorrowingRequest,
} from '@modules/ESSelector/serializer';
import { AcquisitionRoutes, ILLRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Divider,
  Grid,
  Icon,
  Label,
  Segment,
  Step,
} from 'semantic-ui-react';
import { STEPS } from '../Steps';
import {
  AcquisitionOrderIcon,
  ILLBorrowingRequestIcon,
} from '@components/backoffice/icons';

export const ProviderStep = ({ step }) => (
  <Step active={step === STEPS.provider} disabled={step === STEPS.document}>
    <Icon name="truck" />
    <Step.Content>
      <Step.Title>Select Provider</Step.Title>
      <Step.Description>
        Purchase or borrow from another Library
      </Step.Description>
    </Step.Content>
  </Step>
);

ProviderStep.propTypes = {
  step: PropTypes.string.isRequired,
};

export default class ProviderStepContent extends Component {
  render() {
    const { step, data, addProvider } = this.props;
    return step === STEPS.provider ? (
      <>
        <AcqProvider data={data} addProvider={addProvider} />
        <IllProvider data={data} addProvider={addProvider} />
      </>
    ) : null;
  }
}

ProviderStepContent.propTypes = {
  step: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  addProvider: PropTypes.func.isRequired,
};

class AcqProvider extends Component {
  onSelectResult = provData => {
    const {
      data: { metadata },
      addProvider,
    } = this.props;
    const { acq } = invenioConfig.DOCUMENT_REQUESTS.physicalItemProviders;
    addProvider(provData.pid, metadata.pid, acq.pid_type);
  };

  render() {
    const { data } = this.props;
    return (
      <Segment raised>
        <Label color="brown" ribbon>
          Acquisition
        </Label>
        <span>Search and select an existing Acquisition order</span>
        <Grid columns={2} padded>
          <Grid.Column>
            <ESSelector
              icon={<AcquisitionOrderIcon />}
              onSelectResult={this.onSelectResult}
              query={() =>
                orderApi.list(
                  orderApi
                    .query()
                    .withState('PENDING')
                    .qs()
                )
              }
              serializer={serializeAcqOrder}
            />
          </Grid.Column>
          <Grid.Column textAlign="center" verticalAlign="middle">
            <Button
              positive
              name="create-acq"
              onClick={() => goTo(AcquisitionRoutes.orderCreate, data)}
              icon="plus"
              content="Create new Acquisition Order"
            />
          </Grid.Column>
        </Grid>
        <Divider vertical>Or</Divider>
      </Segment>
    );
  }
}

AcqProvider.propTypes = {
  data: PropTypes.object.isRequired,
  addProvider: PropTypes.func.isRequired,
};

class IllProvider extends Component {
  onSelectResult = provData => {
    const {
      data: { metadata },
      addProvider,
    } = this.props;
    const { ill } = invenioConfig.DOCUMENT_REQUESTS.physicalItemProviders;
    addProvider(provData.pid, metadata.pid, ill.pid_type);
  };

  render() {
    const { data } = this.props;
    return (
      <Segment raised>
        <Label color="purple" ribbon>
          Interlibrary
        </Label>
        <span>Search and select an existing Inter Library loan</span>
        <Grid columns={2} padded>
          <Grid.Column>
            <ESSelector
              icon={<ILLBorrowingRequestIcon />}
              onSelectResult={this.onSelectResult}
              query={() =>
                borrowingRequestApi.list(
                  borrowingRequestApi
                    .query()
                    .withState('PENDING')
                    .qs()
                )
              }
              serializer={serializeBorrowingRequest}
            />
          </Grid.Column>
          <Grid.Column textAlign="center" verticalAlign="middle">
            <Button
              positive
              name="create-ill"
              onClick={() => goTo(ILLRoutes.borrowingRequestCreate, data)}
              icon="plus"
              content="Create new Interlibrary Loan"
            />
          </Grid.Column>
        </Grid>
        <Divider vertical>Or</Divider>
      </Segment>
    );
  }
}

IllProvider.propTypes = {
  data: PropTypes.object.isRequired,
  addProvider: PropTypes.func.isRequired,
};
