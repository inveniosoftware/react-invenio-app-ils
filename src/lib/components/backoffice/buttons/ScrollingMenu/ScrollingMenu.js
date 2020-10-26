import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

export default class ScrollingMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: props.children
        .map(child => child.props.elementId)
        .find(id => !_isEmpty(id)),
    };
  }

  setActiveLink = elementId => {
    this.setState({ activeItem: elementId });
  };

  render() {
    const { children, offset } = this.props;
    const { activeItem } = this.state;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        setActiveLink: this.setActiveLink,
        activeItem: activeItem,
        offset: offset,
      })
    );

    return (
      <Menu pointing secondary vertical fluid className="left">
        {childrenWithProps}
      </Menu>
    );
  }
}

ScrollingMenuItem.propTypes = {
  offset: PropTypes.number,
  children: PropTypes.node,
};

ScrollingMenuItem.defaultProps = {
  children: null,
  offset: 0,
};
