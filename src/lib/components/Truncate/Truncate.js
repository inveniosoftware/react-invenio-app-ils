import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * Applying an ellipsis to multiline text
 * https://stackoverflow.com/questions/33058004/applying-an-ellipsis-to-multiline-text
 */
export class Truncate extends Component {
  render() {
    const { lines, width, children } = this.props;
    const multilineEllipsisStyle = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: lines,
      whiteSpace: 'normal',
      WebkitBoxOrient: 'vertical',
    };
    if (width) {
      multilineEllipsisStyle['maxWidth'] = width;
    }
    return <span style={multilineEllipsisStyle}>{children}</span>;
  }
}

Truncate.propTypes = {
  lines: PropTypes.oneOf([1, 2, 3, 4, 5]),
  width: PropTypes.string,
  children: PropTypes.node,
};

Truncate.defaultProps = {
  lines: 1,
  width: null,
  children: null,
};
