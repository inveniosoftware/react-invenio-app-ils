import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

export default class RelationRemover extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
  }

  handleClose = () => this.setState({ modalOpen: false });
  handleOpen = () => this.setState({ modalOpen: true });

  handleDelete = () => {
    const { related, referrer, deleteRelation } = this.props;

    this.setState({ modalOpen: false });
    deleteRelation(referrer, related);
  };

  render() {
    const { trigger, buttonContent, relationType } = this.props;
    const { modalOpen } = this.state;
    const siblings = ['language', 'edition', 'other'];

    return (
      <Modal
        trigger={
          trigger || (
            <Button icon labelPosition="left">
              <Icon name="trash" />
              {buttonContent}
            </Button>
          )
        }
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        open={modalOpen}
        closeIcon
      >
        <Modal.Header>Confirm removal</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to remove this relation?</p>
          {siblings.includes(relationType) && (
            <p>
              Please note that all {relationType} relations to this literature
              will be removed.
            </p>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button negative onClick={this.handleDelete}>
            Yes, I am sure
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

RelationRemover.propTypes = {
  /* pid of the record calling this remover */
  referrer: PropTypes.object.isRequired,
  /* destination to be removed */
  related: PropTypes.object.isRequired,

  /* supplied by reducer */
  deleteRelation: PropTypes.func.isRequired,
  buttonContent: PropTypes.string.isRequired,

  trigger: PropTypes.node,

  relationType: PropTypes.string,
};

RelationRemover.defaultProps = {
  trigger: null,
};
