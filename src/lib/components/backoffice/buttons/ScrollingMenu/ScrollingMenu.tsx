import React, { Component, ReactElement } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Menu } from 'semantic-ui-react';

interface ScrollingMenuItemProps {
  elementId?: string;
}

interface ScrollingMenuProps {
  offset?: number;
  children?: ReactElement<ScrollingMenuItemProps>[] | null;
}

interface ScrollingMenuState {
  activeItem: string | undefined;
}

export default class ScrollingMenu extends Component<
  ScrollingMenuProps,
  ScrollingMenuState
> {
  static defaultProps = {
    children: null,
    offset: 0,
  };

  constructor(props: ScrollingMenuProps) {
    super(props);
    const children = props.children || [];
    this.state = {
      activeItem: children
        .map((child) => child.props.elementId)
        .find((id) => !_isEmpty(id)),
    };
  }

  setActiveLink = (elementId: string) => {
    this.setState({ activeItem: elementId });
  };

  render() {
    const { children, offset } = this.props;
    const { activeItem } = this.state;
    const childrenWithProps = React.Children.map(children, (child) =>
      child
        ? React.cloneElement(child as ReactElement<any>, {
            setActiveLink: this.setActiveLink,
            activeItem: activeItem,
            offset: offset,
          })
        : null
    );

    return (
      <Menu pointing secondary vertical fluid className="left">
        {childrenWithProps}
      </Menu>
    );
  }
}
