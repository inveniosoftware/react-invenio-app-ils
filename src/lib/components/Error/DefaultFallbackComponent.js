import PropTypes from 'prop-types';
import React from 'react';
import { Message } from 'semantic-ui-react';

export const DefaultFallbackComponent = ({ error }) => (
  <Message
    error
    header="UI Error"
    content="Something went wrong when displaying the data. Please contact technical support."
  />
);

DefaultFallbackComponent.propTypes = {
  error: PropTypes.object,
};

DefaultFallbackComponent.defaultProps = {
  error: null,
};
