import { BackOfficeRoutes, FrontSiteRoutes } from '@routes/urls';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Label } from 'semantic-ui-react';

class LiteratureTags extends Component {
  render() {
    const { tags, isBackOffice, ...uiProps } = this.props;

    if (_isEmpty(tags)) return null;

    return (
      <Overridable id="LiteratureTags.layout" {...this.props}>
        <>
          {tags.map(tag => (
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

LiteratureTags.propTypes = {
  tags: PropTypes.array,
  isBackOffice: PropTypes.bool.isRequired,
};

LiteratureTags.defaultProps = {
  tags: [],
};

export default Overridable.component('LiteratureTags', LiteratureTags);
