import { Header, Icon, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

export const SearchMessage = ({ title, icon, children }) => (
  <Segment placeholder textAlign="center">
    <Header icon>
      {icon && <Icon name={icon} />}
      {title}
    </Header>
    {children}
  </Segment>
);

SearchMessage.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
};

SearchMessage.defaultProps = {
  children: null,
  icon: null,
};
