import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Message } from 'semantic-ui-react';

export const InfoMessage = ({ children, message, show, title }) => {
  return show ? (
    children
  ) : (
    <Message info icon data-test="no-results">
      <Icon name="info circle" />
      <Message.Content>
        {title && <Message.Header>{title}</Message.Header>}
        {message}
      </Message.Content>
    </Message>
  );
};

InfoMessage.propTypes = {
  message: PropTypes.node.isRequired,
  show: PropTypes.bool,
  title: PropTypes.node,
};

InfoMessage.defaultProps = {
  title: null,
  show: false,
};
