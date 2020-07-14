import DocumentAuthors from '@modules/Document/DocumentAuthors';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, Popup } from 'semantic-ui-react';

export default class DocumentSelectListEntry extends Component {
  render() {
    const { document, disabled, description } = this.props;
    return (
      <div
        key={document.metadata.pid}
        className={disabled ? 'select-disabled' : ''}
      >
        <div className="price">PID #{document.metadata.pid}</div>
        <div className="title">
          {disabled && (
            <Popup
              content="This document was already selected."
              trigger={<Icon name="info circle" />}
            />
          )}
          <LiteratureTitle
            title={document.metadata.title}
            edition={document.metadata.edition}
            publicationYear={document.metadata.publication_year}
          />
        </div>
        <div className="description">
          {description ? (
            description
          ) : (
            <DocumentAuthors
              authors={document.metadata.authors}
              hasOtherAuthors={document.metadata.other_authors}
            />
          )}
        </div>
      </div>
    );
  }
}

DocumentSelectListEntry.propTypes = {
  disabled: PropTypes.bool,
  document: PropTypes.object.isRequired,
  description: PropTypes.node,
};

DocumentSelectListEntry.defaultProps = {
  disabled: false,
  description: null,
};
