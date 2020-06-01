import React from 'react';
import PropTypes from 'prop-types';
import { SeparatedList } from '@components/SeparatedList';

export const SeriesLanguages = ({ languages, ...props }) => {
  return <SeparatedList items={languages} {...props} />;
};

SeriesLanguages.propTypes = {
  languages: PropTypes.array,
};

SeriesLanguages.defaultProps = {
  languages: [],
};
