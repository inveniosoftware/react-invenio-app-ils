import { orderApi } from '@api/acquisition';
import { documentRequestApi } from '@api/documentRequests';
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
    const { step, data, fetchDocumentRequestDetails } = this.props;
    return step === STEPS.provider ? (
      <>
        <AcqProvider
          data={data}
          fetchDocumentRequestDetails={fetchDocumentRequestDetails}
        />
        <IllProvider />
      </>
    ) : null;
  }
}

ProviderStepContent.propTypes = {
  step: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  fetchDocumentRequestDetails: PropTypes.func.isRequired,
};

class AcqProvider extends Component {
  onCreateClick() {
    return goTo(AcquisitionRoutes.orderCreate);
  }

  onSelectResult = async orderData => {
    const {
      data: { pid },
      fetchDocumentRequestDetails,
    } = this.props;
    const { acq } = invenioConfig.documentRequests.physicalItemProviders;
    const resp = await documentRequestApi.addProvider(pid, {
      physical_item_provider: {
        pid: orderData.pid,
        pid_type: acq.pid_type,
      },
    });
    if (resp.status === 202) {
      fetchDocumentRequestDetails(pid);
    }
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
              onSelectResult={this.onSelectResult}
              query={orderApi.list}
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
  fetchDocumentRequestDetails: PropTypes.func.isRequired,
};

class IllProvider extends Component {
  onCreateClick() {
    return goTo(ILLRoutes.borrowingRequestCreate);
  }

  onSelectResult = async data => {
    // NOTE: do the same things as AcqProvider.onSelectResult()
  };

  render() {
    return (
      <Segment raised disabled>
        <Label color="purple" ribbon>
          Interlibrary
        </Label>
        <span>Search and select an existing Inter Library loan</span>
        <Grid columns={2} padded>
          <Grid.Column>
            <ESSelector
              disabled
              onSelectResult={this.onSelectResult}
              query={borrowingRequestApi.list}
              serializer={serializeBorrowingRequest}
            />
          </Grid.Column>
          <Grid.Column textAlign="center" verticalAlign="middle">
            <Button
              positive
              disabled
              name="create-ill"
              onClick={this.onCreateClick}
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
