import { RefDataResult, RefHit } from '@api/types';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import _isEmpty from 'lodash/isEmpty';
import _sortBy from 'lodash/sortBy';
import _sumBy from 'lodash/sumBy';
import React, { Component, ComponentType, ReactNode } from 'react';
import { Button, Header, Icon, List, Modal, Segment } from 'semantic-ui-react';
import { DeleteButton } from './DeleteButton';

export type { RefDataResult, RefHit };

interface RefData {
  [key: string]: any;
}

interface RefProp {
  refType: string;
  onRefClick: (id: string) => void;
  getRefData: () => RefData;
}

interface DeleteRecordModalProps {
  onDelete: () => void;
  deleteHeader: string;
  refProps?: RefProp[];
  data: RefDataResult[];
  fetchReferences: (refData: RefData[]) => void;
  isLoading?: boolean;
  error?: Record<string, any>;
  trigger?: ComponentType<{ onClick: () => void }> | null;
}

interface DeleteRecordModalState {
  isModalOpen: boolean;
}

export default class DeleteRecordModal extends Component<
  DeleteRecordModalProps,
  DeleteRecordModalState
> {
  static defaultProps = {
    refProps: [],
    trigger: null,
    error: {},
    isLoading: false,
  };

  constructor(props: DeleteRecordModalProps) {
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
      fetchReferences(refProps!.map((entry) => entry.getRefData()));
    }
  }

  renderDeleteHeader = (): ReactNode => {
    const { deleteHeader } = this.props;
    return (
      <Header
        key="deleteHeader"
        icon="trash alternate"
        content={deleteHeader}
      />
    );
  };

  renderHeader = (refEntry: RefProp): ReactNode => {
    return (
      <Header
        key={`${refEntry.refType}`}
        icon="exclamation"
        content={`You cannot delete the record, the following ${refEntry.refType} records use it!`}
      />
    );
  };

  renderContent = (refEntry: RefProp, refData: RefDataResult): ReactNode => {
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
    return null;
  };

  renderActions = (canDelete: boolean): ReactNode => {
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

  renderAll = (): ReactNode => {
    const { data, refProps } = this.props;
    const canDelete = _isEmpty(refProps) || _sumBy(data, 'total') === 0;

    if (canDelete) {
      return [this.renderDeleteHeader(), this.renderActions(canDelete)];
    }

    const modalContent: ReactNode[] = [];
    modalContent.push(
      refProps!.map((refEntry, idx) => {
        const refData = data[idx];
        if (refData.total > 0) {
          return [
            this.renderHeader(refEntry),
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
        <Loader isLoading={isLoading!}>
          <Error error={error!}>{this.renderAll()}</Error>
        </Loader>
      </Modal>
    );
  }
}
