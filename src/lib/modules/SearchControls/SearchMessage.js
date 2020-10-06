import { Header, Icon, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

export const SearchMessage = ({ title, icon, subtitle, children }) => (
  <Segment placeholder textAlign="center">
    <Header icon>
      {icon && <Icon name={icon} />}
      {title}
    </Header>
    {subtitle && <Header.Subheader>{subtitle}</Header.Subheader>}
    {children}
  </Segment>
);

SearchMessage.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  subtitle: PropTypes.node,
  title: PropTypes.string.isRequired,
};

SearchMessage.defaultProps = {
  children: null,
  icon: null,
  subtitle: null,
};
