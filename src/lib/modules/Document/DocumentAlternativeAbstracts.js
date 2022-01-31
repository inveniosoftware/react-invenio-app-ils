import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { List } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import { ShowMoreContent } from '@components/ShowMoreContent';

class DocumentAlternativeAbstracts extends Component {
  render() {
    const {
      metadata: { alternative_abstracts: alternativeAbstracts },
    } = this.props;
    if (_isEmpty(alternativeAbstracts))
      return 'There are no alternative abstracts';
    return (
      <Overridable id="DocumentAlternativeAbstracts.layout" {...this.props}>
        <List ordered>
          {alternativeAbstracts.map((entry) => (
            <List.Item key={entry}>
              <ShowMoreContent content={entry} lines={10} />
            </List.Item>
          ))}
        </List>
      </Overridable>
    );
  }
}

DocumentAlternativeAbstracts.propTypes = {
  metadata: PropTypes.object.isRequired,
};

export default Overridable.component(
  'DocumentAlternativeAbstracts',
  DocumentAlternativeAbstracts
);
