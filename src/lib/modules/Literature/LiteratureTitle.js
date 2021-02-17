import { Truncate } from '@components/Truncate';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
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
      truncate,
      truncateLines,
      truncateWidth,
    } = this.props;
    const cmp = (
      <>
        {title}{' '}
        {(edition || publicationYear) && (
          <EditionYear edition={edition} publicationYear={publicationYear} />
        )}
      </>
    );

    return truncate ? (
      <Truncate lines={truncateLines} width={truncateWidth}>
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
  truncate: PropTypes.bool,
  truncateLines: PropTypes.number,
  truncateWidth: PropTypes.string,
};

LiteratureTitle.defaultProps = {
  edition: null,
  publicationYear: null,
  truncate: true,
  truncateLines: 2,
  truncateWidth: null,
};

export default Overridable.component('LiteratureTitle', LiteratureTitle);
