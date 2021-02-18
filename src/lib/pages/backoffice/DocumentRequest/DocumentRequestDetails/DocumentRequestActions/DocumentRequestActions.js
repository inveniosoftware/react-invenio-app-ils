import { EditButton } from '@components/backoffice/buttons/EditButton';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Divider, Message } from 'semantic-ui-react';
import { DeclineRequest } from './DeclineRequest';

export default class DocumentRequestActions extends Component {
  handleDeclineRequest = (data) => {
    const { declineRequest, docReq } = this.props;
    declineRequest(docReq.pid, data);
  };

  handleRemoveDocument = async () => {
    const { docReq, removeDocument } = this.props;
    removeDocument(docReq.pid, docReq.document_pid);
  };

  handleRemoveProvider = async () => {
    const { docReq, removeProvider } = this.props;
    removeProvider(docReq.pid, docReq.physical_item_provider.pid);
  };

  render() {
    const { docReq } = this.props;
    const isPending = docReq.state === 'PENDING';
    const hasDocument = !!docReq.document_pid;
    const hasProvider = _get(docReq, 'physical_item_provider.pid', false);
    return (
      <div className="bo-action-menu">
        <EditButton
          fluid
          to={BackOfficeRoutes.documentRequestEditFor(docReq.pid)}
          text="Edit request"
        />
        <Divider horizontal>ACTIONS</Divider>

        {!isPending && (
          <Message size="small">
            <Message.Header>Request completed</Message.Header>
            <p>
              The request has been completed. To change document or provider,
              edit the request.
            </p>
          </Message>
        )}

        <Button
          fluid
          size="small"
          icon="book"
          labelPosition="left"
          disabled={!isPending || !hasDocument}
          onClick={this.handleRemoveDocument}
          content="Remove document"
        />
        <Button
          fluid
          size="small"
          icon="truck"
          labelPosition="left"
          disabled={!isPending || !hasProvider}
          onClick={this.handleRemoveProvider}
          content="Remove provider"
        />
        <Divider hidden />
        <DeclineRequest
          pid={docReq.pid}
          disabled={!isPending}
          onDecline={this.handleDeclineRequest}
        />
      </div>
    );
  }
}

DocumentRequestActions.propTypes = {
  docReq: PropTypes.object.isRequired,
  declineRequest: PropTypes.func.isRequired,
  removeProvider: PropTypes.func.isRequired,
  removeDocument: PropTypes.func.isRequired,
};

DocumentRequestActions.defaultProps = {};
