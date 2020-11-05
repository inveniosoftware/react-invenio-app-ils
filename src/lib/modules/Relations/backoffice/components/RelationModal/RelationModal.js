import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal, Popup } from 'semantic-ui-react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

export default class RelationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isLoading: false,
    };
  }

  onClose = () => {
    const { resetSelections } = this.props;
    resetSelections();
  };

  toggle = () => {
    const { visible } = this.state;
    if (visible) {
      this.onClose();
    }
    this.setState({ visible: !visible });
  };

  onSave = () => {
    const {
      relationType,
      selections,
      extraRelationField,
      referrerRecord,
      createRelations,
    } = this.props;

    this.setState({ isLoading: true });
    createRelations(
      referrerRecord,
      selections,
      relationType,
      extraRelationField.field
    );
    this.setState({ isLoading: false });
    this.toggle();
  };

  render() {
    const {
      children,
      disabled,
      triggerButtonContent,
      disabledContent,
      modalHeader,
      isLoading: externalLoading,
      selections,
      extraRelationField,
    } = this.props;
    const { visible, isLoading } = this.state;
    const hasSelectedRelations = !_isEmpty(selections);
    const extraFieldIsValid =
      _isEmpty(extraRelationField) ||
      _get(extraRelationField, 'options.isValid', true);
    const isSelectionValid = hasSelectedRelations && extraFieldIsValid;

    return (
      <Modal
        id="es-selector-modal"
        size="large"
        closeIcon
        trigger={
          <>
            <Button
              disabled={disabled}
              className="edit-related"
              icon
              labelPosition="left"
              positive
              onClick={this.toggle}
            >
              <Icon name="add" />
              {triggerButtonContent}
            </Button>
            {disabled && disabledContent && (
              <Popup
                content={disabledContent}
                trigger={<Icon size="large" name="info circle" color="grey" />}
              />
            )}
          </>
        }
        open={visible}
        centered
        onClose={this.toggle}
      >
        <Modal.Header>{modalHeader}</Modal.Header>

        {children}

        <Modal.Actions>
          <Button onClick={() => this.toggle()}>Cancel</Button>
          <Button
            positive
            loading={isLoading}
            disabled={!isSelectionValid || isLoading || externalLoading}
            icon="checkmark"
            labelPosition="left"
            content="Confirm and save"
            onClick={this.onSave}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

RelationModal.propTypes = {
  disabled: PropTypes.bool,
  triggerButtonContent: PropTypes.string.isRequired,
  disabledContent: PropTypes.string,
  modalHeader: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  isLoading: PropTypes.bool,
  referrerRecord: PropTypes.object.isRequired,
  relationType: PropTypes.string.isRequired,
  resetSelections: PropTypes.func.isRequired,
  extraRelationField: PropTypes.object,
  createRelations: PropTypes.func.isRequired,
  selections: PropTypes.array.isRequired,
  children: PropTypes.node,
};

RelationModal.defaultProps = {
  children: null,
  extraRelationField: {},
  disabled: false,
  isLoading: false,
  disabledContent: null,
};
