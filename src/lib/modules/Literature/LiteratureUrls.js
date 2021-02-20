import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Overridable from 'react-overridable';
import { Icon } from 'semantic-ui-react';

class LiteratureUrls extends Component {
  render() {
    const { urlArray, separator } = this.props;
    return (
      <Overridable id="LiteratureUrls.layout">
        <>
          {urlArray.map((url, index) => {
            const separatorCmp = index < urlArray.length - 1 ? separator : null;
            return (
              <>
                <Icon name="linkify" />
                <a href={url.value} key={url.value}>
                  {url.description ? url.description : url.value}
                </a>
                {separatorCmp}
              </>
            );
          })}
        </>
      </Overridable>
    );
  }
}

LiteratureUrls.propTypes = {
  urlArray: PropTypes.array.isRequired,
  separator: PropTypes.string,
};

LiteratureUrls.defaultProps = {
  separator: ', ',
};

export default Overridable.component('LiteratureUrls', LiteratureUrls);
