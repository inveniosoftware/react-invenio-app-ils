import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Header,
  Icon,
  Input,
  Modal,
  Popup,
  Form,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

export default class CancelModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showPopup: false,
      value: props.value,
    };
  }

  hide = () => this.setState({ open: false, showPopup: false, value: '' });
  show = () => this.setState({ open: true, showPopup: false, value: '' });

  updateInputRef = element => {
    this.inputRef = element
      ? ReactDOM.findDOMNode(element).querySelector('input')
      : null;
  };

  cancel = () => {
    const { value } = this.state;
    const { action } = this.props;
    if (_isEmpty(value)) {
      this.setState({ showPopup: true });
    } else {
      action(value);
      this.hide();
    }
  };

  handleOnChange = (event, { value }) => {
    const { showPopup } = this.state;
    const newState = { value };
    if (showPopup && !_isEmpty(value)) {
      newState.showPopup = false;
    }
    this.setState(newState);
  };

  render() {
    const { buttonText, cancelText, content, header } = this.props;
    const { open, value, showPopup } = this.state;
    return (
      <Modal
        basic
        size="small"
        trigger={<Button primary content={buttonText} onClick={this.show} />}
        open={open}
        onClose={this.hide}
      >
        <Header content={header} />
        <Modal.Content>
          <p>{content}</p>
          <Form onSubmit={this.cancel}>
            <Input
              focus
              fluid
              placeholder="Enter a reason..."
              onChange={this.handleOnChange}
              ref={this.updateInputRef}
              value={value}
            />
          </Form>
          <Popup
            context={this.inputRef}
            content="Please specify a reason."
            position="bottom left"
            open={showPopup}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="black" inverted onClick={this.hide}>
            Back
          </Button>
          <Button color="red" inverted onClick={this.cancel}>
            <Icon name="remove" /> {cancelText}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

CancelModal.propTypes = {
  action: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  value: PropTypes.string,
};

CancelModal.defaultProps = {
  value: '',
};
