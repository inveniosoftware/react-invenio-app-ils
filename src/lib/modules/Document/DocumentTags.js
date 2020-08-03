import { BackOfficeRoutes, FrontSiteRoutes } from '@routes/urls';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Label } from 'semantic-ui-react';

class DocumentTags extends Component {
  render() {
    const { metadata, isBackOffice, ...uiProps } = this.props;

    if (_isEmpty(metadata.tags)) return null;

    return (
      <Overridable id="DocumentTags.layout" {...this.props}>
        <>
          {metadata.tags.map(tag => (
            <Label className="highlighted" key={tag} {...uiProps}>
              <Link
                to={
                  isBackOffice
                    ? BackOfficeRoutes.documentsListWithQuery(
                        `&sort=mostrecent&order=desc&f=tag%3A${tag}`
                      )
                    : FrontSiteRoutes.documentsListWithQuery(
                        `&sort=mostrecent&order=desc&f=tag%3A${tag}`
                      )
                }
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
  isBackOffice: PropTypes.bool.isRequired,
};

export default Overridable.component('DocumentTags', DocumentTags);
