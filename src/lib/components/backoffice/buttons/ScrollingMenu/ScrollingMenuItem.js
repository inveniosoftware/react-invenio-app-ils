import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { Link as ScrollLink } from 'react-scroll';

export default class ScrollingMenuItem extends Component {
  render() {
    const { elementId, label, activeItem, setActiveLink, offset } = this.props;
    return (
      <Menu.Item
        name={elementId}
        active={activeItem === elementId}
        activeClass="active"
        as={ScrollLink}
        to={elementId}
        spy
        onSetActive={() => setActiveLink(elementId)}
        offset={offset}
      >
        {label}
      </Menu.Item>
    );
  }
}

ScrollingMenuItem.propTypes = {
  elementId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setActiveLink: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
};
