import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import Truncate from 'react-truncate';
import LiteratureEdition from './LiteratureEdition';

class EditionYear extends Component {
  render() {
    const { edition, publicationYear } = this.props;

    /* render both edition and year, or only edition, or only year or nothing
     * title (edition - year)
     * title (edition)
     * title (year)
     * title
     */
    return edition && publicationYear ? (
      <>
        (<LiteratureEdition edition={edition} /> - {publicationYear})
      </>
    ) : edition ? (
      <>
        (<LiteratureEdition edition={edition} />)
      </>
    ) : publicationYear ? (
      `(${publicationYear})`
    ) : null;
  }
}

EditionYear.propTypes = {
  edition: PropTypes.string,
  publicationYear: PropTypes.string,
};

EditionYear.defaultProps = {
  edition: null,
  publicationYear: null,
};

class LiteratureTitle extends Component {
  render() {
    const {
      title,
      edition,
      publicationYear,
      showOnlyTitle,
      truncate,
      extraCSS,
    } = this.props;
    const cmp = (
      <div className={`document-title ${extraCSS}`}>
        {title}{' '}
        {!showOnlyTitle && (
          <EditionYear edition={edition} publicationYear={publicationYear} />
        )}
      </div>
    );

    return truncate ? (
      <Truncate lines={2} ellipsis="... ">
        {cmp}
      </Truncate>
    ) : (
      cmp
    );
  }
}

LiteratureTitle.propTypes = {
  title: PropTypes.string.isRequired,
  edition: PropTypes.string,
  publicationYear: PropTypes.string,
  showOnlyTitle: PropTypes.bool,
  truncate: PropTypes.bool,
  extraCSS: PropTypes.string,
};

LiteratureTitle.defaultProps = {
  edition: null,
  publicationYear: null,
  showOnlyTitle: false,
  truncate: false,
  extraCSS: '',
};

export default Overridable.component('LiteratureTitle', LiteratureTitle);
