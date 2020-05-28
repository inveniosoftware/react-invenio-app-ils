import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RejectAction } from './RejectAction';
import { Container } from 'semantic-ui-react';

export default class DocumentRequestActions extends Component {
  onReject = data => {
    const { rejectRequest, data: docRequest } = this.props;
    rejectRequest(docRequest.pid, data);
  };

  render() {
    const {
      data: { metadata },
    } = this.props;
    return (
      <Container fluid textAlign="right">
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
