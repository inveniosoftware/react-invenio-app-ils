import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FrontSiteRoutes } from '@routes/urls';
import _isEmpty from 'lodash/isEmpty';

class DocumentTags extends Component {
  render() {
    const { metadata, ...uiProps } = this.props;

    if (_isEmpty(metadata.tags)) return null;

    return (
      <Overridable id="DocumentTags.layout" {...this.props}>
        <>
          {metadata.tags.map(tag => (
            <Label className="highlighted" key={tag} {...uiProps}>
              <Link
                to={FrontSiteRoutes.documentsListWithQuery(
                  `&sort=mostrecent&order=desc&f=tag%3A${tag}`
                )}
              >
                {tag}
              </Link>
            </Label>
          ))}
        </>
      </Overridable>
    );
  }
}

DocumentTags.propTypes = {
  metadata: PropTypes.object.isRequired,
};

export default Overridable.component('DocumentTags', DocumentTags);
