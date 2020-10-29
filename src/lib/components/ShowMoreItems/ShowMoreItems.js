import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

export class ShowMoreItems extends Component {
  state = {
    expanded: false,
  };

  handleOnClick = e => {
    e.preventDefault();
    this.setState(state => {
      return {
        expanded: !state.expanded,
      };
    });
  };

  renderButton = () => {
    const { expanded } = this.state;
    const text = expanded ? 'Show less' : 'Show more';
    return (
      // See https://github.com/Semantic-Org/Semantic-UI/pull/6260
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a
        href="#"
        className="ui link button-show-more"
        onClick={this.handleOnClick}
      >
        {text}
      </a>
    );
  };

  render() {
    const { children, lines, ...otherProps } = this.props;
    const { expanded } = this.state;
    const elements = children.length;
    const hasMore = elements > lines;
    const linesShown = expanded ? elements : hasMore ? lines : elements;
    return (
      <List {...otherProps}>
        {children.slice(0, linesShown)}
        {hasMore && <List.Item>{hasMore && this.renderButton()}</List.Item>}
      </List>
    );
  }
}

ShowMoreItems.propTypes = {
  lines: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};
