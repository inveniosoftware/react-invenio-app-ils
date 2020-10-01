import { Header, Icon, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

export const SearchMessage = ({ title, icon, children }) => (
  <Segment placeholder textAlign="center">
    <Header icon>
      {icon && <Icon name={icon} />}
      {title}
    </Header>
    {children && <Header.Subheader>{children}</Header.Subheader>}
  </Segment>
);

SearchMessage.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  icon: PropTypes.string,
};

SearchMessage.defaultProps = {
  icon: null,
  children: null,
};
