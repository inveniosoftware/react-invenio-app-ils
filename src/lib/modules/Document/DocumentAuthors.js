import Overridable from 'react-overridable';
import { List } from 'semantic-ui-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DocumentAuthors extends Component {
  render() {
    const {
      metadata,
      prefix,
      otherAuthorsDisplay,
      delimiter,
      listItemAs,
    } = this.props;
    const otherAuthors = otherAuthorsDisplay ? otherAuthorsDisplay : 'et al.';
    return (
      <Overridable id="DocumentAuthors.layout" {...this.props}>
        <div className="document-authors-list-wrapper">
          {prefix ? prefix + ' ' : null}
          {metadata && metadata.authors ? (
            <List horizontal className="document-authors-list">
              {metadata.authors.map((author, index) => (
                <List.Item
                  as={listItemAs ? listItemAs : ''}
                  key={`Key${index}`}
                >
                  {author.full_name}
                  {index !== metadata.authors.length - 1 ? delimiter : null}
                </List.Item>
              ))}
              {metadata && metadata.other_authors ? otherAuthors : null}
            </List>
          ) : null}
        </div>
      </Overridable>
    );
  }
}

DocumentAuthors.propTypes = {
  metadata: PropTypes.object,
  prefix: PropTypes.string,
  otherAuthorsDisplay: PropTypes.string,
  listItemAs: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  delimiter: PropTypes.string,
};

DocumentAuthors.defaultProps = {
  delimiter: '; ',
  listItemAs: null,
  otherAuthorsDisplay: null,
  prefix: '',
  metadata: {},
};

export default Overridable.component('DocumentAuthors', DocumentAuthors);
