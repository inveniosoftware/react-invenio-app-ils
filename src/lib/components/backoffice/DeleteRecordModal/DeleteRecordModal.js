import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import _isEmpty from 'lodash/isEmpty';
import _sortBy from 'lodash/sortBy';
import _sumBy from 'lodash/sumBy';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Header, Icon, List, Modal, Segment } from 'semantic-ui-react';
import { DeleteButton } from './DeleteButton';

export default class DeleteRecordModal extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
  }

  toggleModal = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  };

  handleDeleteClick() {
    const { onDelete } = this.props;
    onDelete();
    this.toggleModal();
  }

  handleOpen() {
    const { refProps, fetchReferences } = this.props;
    if (!_isEmpty(refProps)) {
      fetchReferences(refProps.map((entry) => entry.getRefData()));
    }
  }

  renderDeleteHeader = () => {
    const { deleteHeader } = this.props;
    return (
      <Header
        key="deleteHeader"
        icon="trash alternate"
        content={deleteHeader}
      />
    );
  };

  renderHeader = (refEntry) => {
    return (
      <Header
        key={`${refEntry}`}
        icon="exclamation"
        content={`You cannot delete the record, the following ${refEntry.refType} records use it!`}
      />
    );
  };

  renderContent = (refEntry, refData) => {
    const { refType, onRefClick } = refEntry;
    const references = _sortBy(refData.hits, 'id').map((hit) => (
      <List.Item
        key={hit.id}
        as="a"
        onClick={() => onRefClick(hit.id)}
        target="_blank"
      >
        <List.Content>
          {hit.record && <List.Header>{hit.record.title}</List.Header>}
          {refType} - #{hit.id} <Icon name="edit" />
        </List.Content>
      </List.Item>
    ));
    if (references.length > 0) {
      return (
        <Modal.Content key={`${refType}_content`}>
          <Segment>
            <List ordered celled>
              {references}
            </List>
          </Segment>
        </Modal.Content>
      );
    }
  };

  renderActions = (canDelete) => {
    return (
      <Modal.Actions key="modalActions">
        <Button onClick={this.toggleModal}>
          <Icon name="remove" /> Cancel
        </Button>
        {canDelete ? (
          <Button color="red" onClick={() => this.handleDeleteClick()} inverted>
            <Icon name="trash alternate" />
            Delete
          </Button>
        ) : null}
      </Modal.Actions>
    );
  };

  renderAll = () => {
    const { data, refProps } = this.props;
    const canDelete = _isEmpty(refProps) || _sumBy(data, 'total') === 0;

    if (canDelete) {
      return [this.renderDeleteHeader(), this.renderActions(canDelete)];
    }

    const modalContent = [];
    modalContent.push(
      refProps.map((refEntry, idx) => {
        const refData = data[idx];
        if (refData.total > 0) {
          return [
            this.renderHeader(refEntry, canDelete),
            this.renderContent(refEntry, refData),
          ];
        }
        return null;
      })
    );
    modalContent.push(this.renderActions(canDelete));
    return modalContent;
  };

  render() {
    const { isLoading, error, trigger } = this.props;
    const { isModalOpen } = this.state;
    const TriggerButton = trigger || DeleteButton;
    return (
      <Modal
        trigger={<TriggerButton onClick={this.toggleModal} />}
        open={isModalOpen}
        onOpen={() => this.handleOpen()}
        onClose={this.toggleModal}
      >
        <Loader isLoading={isLoading}>
          <Error error={error}>
            <this.renderAll />
          </Error>
        </Loader>
      </Modal>
    );
  }
}

DeleteRecordModal.propTypes = {
  onDelete: PropTypes.func.isRequired,
  deleteHeader: PropTypes.string.isRequired,
  refProps: PropTypes.arrayOf(
    PropTypes.shape({
      refType: PropTypes.string.isRequired,
      onRefClick: PropTypes.func.isRequired,
      getRefData: PropTypes.func.isRequired,
    })
  ),
  data: PropTypes.array.isRequired,
  fetchReferences: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  trigger: PropTypes.func,
};

DeleteRecordModal.defaultProps = {
  refProps: [],
  trigger: null,
  error: {},
  isLoading: false,
};
