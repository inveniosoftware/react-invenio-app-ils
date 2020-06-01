import React from 'react';
import PropTypes from 'prop-types';
import { SeparatedList } from '@components/SeparatedList';

export const SeriesAuthors = ({ authors, ...props }) => {
  return (
    authors && (
      <div className="document-authors-list-wrapper">
        <SeparatedList
          items={authors}
          separator="; "
          className="document-authors-list"
          {...props}
        />
      </div>
    )
  );
};

SeriesAuthors.propTypes = {
  authors: PropTypes.array,
};

SeriesAuthors.defaultProps = {
  authors: [],
};
