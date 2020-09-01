import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Image, Item, Placeholder } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class LiteratureCover extends Component {
  getLabel = isRestricted => {
    return isRestricted
      ? {
          corner: 'left',
          color: 'red',
          icon: 'lock',
          title: 'Restricted',
        }
      : null;
  };

  render() {
    const {
      asItem,
      isRestricted,
      linkTo,
      size,
      url,
      isLoading,
      ...uiProps
    } = this.props;
    const Cmp = asItem ? Item.Image : Image;
    const link = linkTo ? { as: Link, to: linkTo } : {};
    return url ? (
      <Overridable id="LiteratureCover.layout" {...this.props}>
        {!isLoading && (
          <Cmp
            centered
            disabled={isRestricted}
            label={this.getLabel(isRestricted)}
            {...link}
            onError={e => (e.target.style.display = 'none')}
            src={url}
            size={size}
            {...uiProps}
          />
        )}
      </Overridable>
    ) : (
      <Overridable id="LiteratureCover.placeholder" {...this.props}>
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
      </Overridable>
    );
  }
}

LiteratureCover.propTypes = {
  asItem: PropTypes.bool,
  isRestricted: PropTypes.bool,
  linkTo: PropTypes.string,
  size: PropTypes.string,
  url: PropTypes.string,
  isLoading: PropTypes.bool,
};

LiteratureCover.defaultProps = {
  asItem: false,
  isRestricted: false,
  linkTo: null,
  size: 'large',
  url: null,
  isLoading: false,
};

export default Overridable.component('LiteratureCover', LiteratureCover);
