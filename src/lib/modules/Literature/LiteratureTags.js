import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Label } from 'semantic-ui-react';

class LiteratureTags extends Component {
  render() {
    const { tags, ...uiProps } = this.props;

    if (_isEmpty(tags)) return null;

    return (
      <Overridable id="LiteratureTags.layout" {...this.props}>
        <>
          {tags.map((tag) => (
            <Label className="highlighted" key={tag} {...uiProps}>
              {tag}
            </Label>
          ))}
        </>
      </Overridable>
    );
  }
}

LiteratureTags.propTypes = {
  tags: PropTypes.array,
};

LiteratureTags.defaultProps = {
  tags: [],
};

export default Overridable.component('LiteratureTags', LiteratureTags);
