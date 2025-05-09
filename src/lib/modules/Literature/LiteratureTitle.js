import { Truncate } from '@components/Truncate';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import LiteratureEdition from './LiteratureEdition';
import { MathJax } from 'better-react-mathjax';

class EditionYearVolume extends Component {
  render() {
    const { edition, publicationYear, volume } = this.props;
    let displayedElements = [];
    if (publicationYear) {
      displayedElements.push(publicationYear);
    }
    if (volume) {
      displayedElements.push('vol. ' + volume);
    }
    displayedElements = displayedElements.join(' - ');

    return edition && displayedElements ? (
      <>
        (<LiteratureEdition edition={edition} /> - {publicationYear})
      </>
    ) : edition ? (
      <>
        (<LiteratureEdition edition={edition} />)
      </>
    ) : displayedElements ? (
      `(${displayedElements})`
    ) : null;
  }
}

EditionYearVolume.propTypes = {
  edition: PropTypes.string,
  publicationYear: PropTypes.string,
  volume: PropTypes.string,
};

EditionYearVolume.defaultProps = {
  edition: null,
  publicationYear: null,
  volume: null,
};

class LiteratureTitle extends Component {
  render() {
    const {
      title,
      edition,
      publicationYear,
      volume,
      truncate,
      truncateLines,
      truncateWidth,
    } = this.props;
    const cmp = (
      <MathJax>
        {title}{' '}
        {(edition || publicationYear || volume) && (
          <EditionYearVolume
            edition={edition}
            publicationYear={publicationYear}
            volume={volume}
          />
        )}
      </MathJax>
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
  volume: PropTypes.string,
  truncate: PropTypes.bool,
  truncateLines: PropTypes.number,
  truncateWidth: PropTypes.string,
};

LiteratureTitle.defaultProps = {
  edition: null,
  publicationYear: null,
  truncate: true,
  volume: null,
  truncateLines: 2,
  truncateWidth: null,
};

export default Overridable.component('LiteratureTitle', LiteratureTitle);
