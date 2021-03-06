import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

/**
 * Overrides the default TitleField to set as default:
 * - change from `h4` to `h3`
 * - add `dividing` prop
 */
export class RJSFTitleField extends Component {
  render() {
    const { options, title } = this.props;
    const { semantic } = options;
    return title ? (
      <Header {...semantic} dividing as="h3">
        {title}
      </Header>
    ) : null;
  }
}

RJSFTitleField.propTypes = {
  options: PropTypes.object,
  title: PropTypes.string,
};

RJSFTitleField.defaultProps = {
  options: {
    semantic: {
      inverted: false,
      dividing: true,
    },
  },
  title: null,
};
