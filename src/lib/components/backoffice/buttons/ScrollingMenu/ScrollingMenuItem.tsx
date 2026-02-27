import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link as ScrollLink } from 'react-scroll';

interface ScrollingMenuItemProps {
  elementId: string;
  label: string;
  setActiveLink?: (elementId: string) => void;
  activeItem?: string;
  offset?: number;
}

export default class ScrollingMenuItem extends Component<ScrollingMenuItemProps> {
  static defaultProps = {
    setActiveLink: () => {},
    activeItem: '',
    offset: 0,
  };

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
        onSetActive={() => setActiveLink?.(elementId)}
        offset={offset}
      >
        {label}
      </Menu.Item>
    );
  }
}
