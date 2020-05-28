import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

export default class ScrollingMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: props.children[0].elementId };
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
};

ScrollingMenuItem.defaultProps = {
  offset: 0,
};
