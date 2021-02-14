import { EditButton } from '@components/backoffice/buttons/EditButton';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import { DeclineAction } from './DeclineAction';

export default class DocumentRequestActions extends Component {
  onDecline = (data) => {
    const { declineRequest, data: docRequest } = this.props;
    declineRequest(docRequest.pid, data);
  };

  render() {
    const {
      data: { metadata },
    } = this.props;
    return (
      <div className="bo-action-menu">
        <EditButton
          fluid
          to={BackOfficeRoutes.documentRequestEditFor(metadata.pid)}
          text="Edit request"
        />
        <Divider horizontal>ACTIONS</Divider>
        <DeclineAction
          pid={metadata.pid}
          onDecline={this.onDecline}
          disabled={metadata.state !== 'PENDING'}
        />
      </div>
    );
  }
}

DocumentRequestActions.propTypes = {
  data: PropTypes.object.isRequired,
  declineRequest: PropTypes.func.isRequired,
};

DocumentRequestActions.defaultProps = {};
