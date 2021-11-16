import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class ConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  hide = () => this.setState({ open: false });
  show = () => this.setState({ open: true });

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { content, header, isLoading, action, buttonLabel, actionLabel } =
      this.props;
    const { open } = this.state;
    return (
      <div>
        <Button
          primary
          fluid
          content={buttonLabel}
          onClick={this.show}
          loading={isLoading}
          disabled={isLoading}
        />
        <Confirm
          open={open}
          header={header}
          content={content}
          onCancel={this.hide}
          onConfirm={action}
          cancelButton="Cancel"
          confirmButton={actionLabel}
        />
      </div>
    );
  }
}

ConfirmModal.propTypes = {
  action: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  actionLabel: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

ConfirmModal.defaultProps = {
  isLoading: false,
};
