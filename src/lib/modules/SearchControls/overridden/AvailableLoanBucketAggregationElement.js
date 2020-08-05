import React from 'react';
import PropTypes from 'prop-types';

export const AvailableLoanBucketAggregationElement = ({ containerCmp }) => {
  return <div>{containerCmp}</div>;
};

AvailableLoanBucketAggregationElement.propTypes = {
  containerCmp: PropTypes.node.isRequired,
};
