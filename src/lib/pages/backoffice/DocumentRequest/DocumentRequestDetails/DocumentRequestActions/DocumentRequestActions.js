import { EditButton } from '@components/backoffice/buttons/EditButton';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { RejectAction } from './RejectAction';

export default class DocumentRequestActions extends Component {
  onReject = (data) => {
    const { rejectRequest, data: docRequest } = this.props;
    rejectRequest(docRequest.pid, data);
  };

  render() {
    const {
      data: { metadata },
    } = this.props;
    return (
      <Container fluid textAlign="right">
        <EditButton
          to={BackOfficeRoutes.documentRequestEditFor(metadata.pid)}
          text="Edit request"
        />
        <RejectAction
          pid={metadata.pid}
          onReject={this.onReject}
          disabled={metadata.state !== 'PENDING'}
        />
      </Container>
    );
  }
}

DocumentRequestActions.propTypes = {
  data: PropTypes.object.isRequired,
  rejectRequest: PropTypes.func.isRequired,
};
