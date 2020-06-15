import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

export class DeleteActionButton extends React.Component {
  render() {
    const { onClick, icon, size } = this.props;
    return (
      <Button icon basic onClick={onClick} type="button">
        <Icon name={icon} size={size} />
      </Button>
    );
  }
}

DeleteActionButton.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string,
};

DeleteActionButton.defaultProps = {
  icon: 'delete',
  size: 'large',
};
