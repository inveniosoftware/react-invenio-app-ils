import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Message } from 'semantic-ui-react';
import { AcquisitionRoutes, BackOfficeRoutes, ILLRoutes } from '@routes/urls';
import { documentRequestApi } from '@api';
import _get from 'lodash/get';
import { DocumentIcon } from '@components/backoffice/icons';
import { STEPS } from '../DocumentRequestSteps';
import { invenioConfig } from '@config';
import PropTypes from 'prop-types';

const PROVIDERS = invenioConfig.documentRequests.physicalItemProviders;

export default class StepsActions extends Component {
  render() {
    const { data, step, fetchDocumentRequestDetails } = this.props;
    return (
      <>
        <DocumentSelection
          data={data}
          fetchDocumentRequestDetails={fetchDocumentRequestDetails}
        />
        {step !== STEPS.document ? (
          <ProviderSelection
            data={data}
            fetchDocumentRequestDetails={fetchDocumentRequestDetails}
          />
        ) : null}
      </>
    );
  }
}

StepsActions.propTypes = {
  data: PropTypes.object.isRequired,
  step: PropTypes.string.isRequired,
  fetchDocumentRequestDetails: PropTypes.func.isRequired,
};

const ProviderLink = ({ provider }) => {
  if (provider.pid_type === PROVIDERS.acq.pid_type) {
    return (
      <Link to={AcquisitionRoutes.orderDetailsFor(provider.pid)}>
        {provider.pid}
      </Link>
    );
  }
  if (provider.pid_type === PROVIDERS.ill.pid_type) {
    return (
      <Link to={ILLRoutes.borrowingRequestDetailsFor(provider.pid)}>
        {provider.pid}
      </Link>
    );
  }
  return null;
};

ProviderLink.propTypes = {
  provider: PropTypes.object.isRequired,
};

const ProviderHeader = ({ provider }) => {
  let header = '';
  if (provider.pid_type === PROVIDERS.acq.pid_type)
    header = 'Acquisition Order';
  if (provider.pid_type === PROVIDERS.ill.pid_type)
    header = 'ILL Borrow Request';

  return (
    <Header>
      {header} <ProviderLink provider={provider} />
    </Header>
  );
};

ProviderHeader.propTypes = {
  provider: PropTypes.object.isRequired,
};

class ProviderSelection extends Component {
  onRemoveProvider = async () => {
    const {
      data: { pid, metadata },
      fetchDocumentRequestDetails,
    } = this.props;
    const resp = await documentRequestApi.removeProvider(pid, {
      physical_item_provider_pid: metadata.physical_item_provider.pid,
    });
    if (resp.status === 202) {
      fetchDocumentRequestDetails(pid);
    }
  };

  render() {
    const {
      data,
      data: {
        metadata: { state },
      },
    } = this.props;
    const provider = _get(data, 'metadata.physical_item_provider');
    return provider ? (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={12}>
            <ProviderHeader provider={provider} />
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              fluid
              disabled={state !== 'PENDING'}
              onClick={this.onRemoveProvider}
              content="Remove provider"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ) : (
      <Message warning>
        <Message.Header>
          <DocumentIcon />A provider is required!
        </Message.Header>
        <p>
          You can search and attach one of the existing Acquisition Orders or
          Interlibrary borrow requests, or create a new one.
        </p>
      </Message>
    );
  }
}

ProviderSelection.propTypes = {
  data: PropTypes.object.isRequired,
  fetchDocumentRequestDetails: PropTypes.func.isRequired,
};

class DocumentSelection extends Component {
  onRemoveDocument = async () => {
    const {
      data: { pid, metadata },
      fetchDocumentRequestDetails,
    } = this.props;
    const resp = await documentRequestApi.removeDocument(pid, {
      document_pid: metadata.document_pid,
    });
    if (resp.status === 202) {
      fetchDocumentRequestDetails(pid);
    }
  };

  render() {
    const {
      data,
      data: {
        metadata: { document_pid: docPid, state },
      },
    } = this.props;
    const title = _get(data, 'metadata.document.title');
    return docPid ? (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={12}>
            <Header>
              Document{' '}
              <Link to={BackOfficeRoutes.documentDetailsFor(docPid)}>
                {title}
              </Link>
            </Header>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              fluid
              disabled={state !== 'PENDING'}
              onClick={this.onRemoveDocument}
              content="Remove document"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ) : (
      <Message warning>
        <Message.Header>
          <DocumentIcon />A document is required!
        </Message.Header>
        <p>
          You can search and attach one of the existing documents, or create a
          new one.
        </p>
      </Message>
    );
  }
}

DocumentSelection.propTypes = {
  data: PropTypes.object.isRequired,
  fetchDocumentRequestDetails: PropTypes.func.isRequired,
};
