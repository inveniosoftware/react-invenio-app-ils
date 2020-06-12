import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const DefaultFallbackComponent = ({ error }) => (
  <Message
    error
    header="UI Error"
    content="Something went wrong when rendering the component."
  />
);

DefaultFallbackComponent.propTypes = {
  error: PropTypes.object,
};
