import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
  Step,
} from 'semantic-ui-react';
import { ESSelector } from '@modules/ESSelector';
import { serializeDocument } from '@modules/ESSelector/serializer';
import { documentApi } from '@api/documents';
import { documentRequestApi } from '@api/documentRequests';
import { DocumentIcon } from '@components/backoffice/icons';
import { BackOfficeRoutes } from '@routes/urls';
import { goTo } from '@history';
import _isEmpty from 'lodash/isEmpty';
import { STEPS } from '../Steps';

export const DocumentStep = ({ step }) => (
  <Step active={step === STEPS.document}>
    <DocumentIcon />
    <Step.Content>
      <Step.Title>Select Document</Step.Title>
      <Step.Description>Select a document for your request</Step.Description>
    </Step.Content>
  </Step>
);

DocumentStep.propTypes = {
  step: PropTypes.string.isRequired,
};

export default class DocumentStepContent extends Component {
  onSelectResult = async data => {
    const {
      fetchDocumentRequestDetails,
      data: { pid },
    } = this.props;
    const resp = await documentRequestApi.addDocument(pid, {
      document_pid: data.key,
    });
    if (resp.status === 202) {
      fetchDocumentRequestDetails(pid);
    }
  };

  createDocumentButton = () => {
    const { data } = this.props;
    return (
      <Button
        name="create-doc-from-doc-request"
        labelPosition="left"
        positive
        icon
        onClick={() => goTo(BackOfficeRoutes.documentCreate, data)}
        disabled={
          !(
            _isEmpty(data.metadata.document) &&
            data.metadata.state === 'PENDING'
          )
        }
      >
        <Icon name="plus" />
        Create new document
      </Button>
    );
  };

  render() {
    const { step } = this.props;
    return step === STEPS.document ? (
      <Segment>
        <Grid columns={2}>
          <Grid.Column>
            <Header as="h3">Search and select document</Header>
            <ESSelector
              onSelectResult={this.onSelectResult}
              query={documentApi.list}
              serializer={serializeDocument}
            />
          </Grid.Column>
          <Grid.Column textAlign="center" verticalAlign="middle">
            {this.createDocumentButton()}
          </Grid.Column>
        </Grid>
        <Divider vertical>Or</Divider>
      </Segment>
    ) : null;
  }
}

DocumentStepContent.propTypes = {
  data: PropTypes.object.isRequired,
  fetchDocumentRequestDetails: PropTypes.func.isRequired,
  step: PropTypes.string.isRequired,
};
