import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import ESSelector from './ESSelector';

export default class ESSelectorModal extends Component {
  state = {
    selections: [],
    visible: false,
  };

  onSelectionsUpdate = selections => this.setState({ selections });

  toggle = () => this.setState({ visible: !this.state.visible });

  save = () => {
    const { onSave } = this.props;
    const { selections } = this.state;
    if (onSave) {
      onSave(selections);
    }
    this.toggle();
  };

  render() {
    const {
      title,
      content,
      selectorComponent,
      size,
      saveButtonContent,
      trigger,
    } = this.props;
    const { visible, selections } = this.state;
    const modalTrigger = React.cloneElement(trigger, {
      onClick: this.toggle,
    });
    const Selector = selectorComponent;

    return (
      <Modal
        id="es-selector-modal"
        open={visible}
        trigger={modalTrigger}
        size={size}
        centered={false}
        onClose={this.toggle}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <p>{content}</p>
          <Selector
            onSelectionsUpdate={this.onSelectionsUpdate}
            {...this.props}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={this.toggle}>
            Close
          </Button>
          <Button
            positive
            disabled={!selections || selections.length === 0}
            icon="checkmark"
            labelPosition="left"
            content={saveButtonContent}
            onClick={this.save}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

ESSelectorModal.propTypes = {
  trigger: PropTypes.node.isRequired,
  title: PropTypes.string,
  size: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  isSelectionRequired: PropTypes.bool,
  initialSelections: PropTypes.array,
  onSelectResult: PropTypes.func,
  onSave: PropTypes.func,
  selectorComponent: PropTypes.elementType,
  saveButtonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

ESSelectorModal.defaultProps = {
  size: 'tiny',
  saveButtonContent: 'Save',
  title: '',
  selectorComponent: ESSelector,
  content: null,
  isSelectionRequired: true,
  initialSelections: [],
  onSelectResult: null,
  onSave: null,
};
