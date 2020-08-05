import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'semantic-ui-react';

export const AvailableLoanBucketAggregationValues = ({
  bucket,
  isSelected,
  onFilterClicked,
  getChildAggCmps,
  overridableId,
  valueLabel,
}) => {
  const key = bucket.key_as_string ? bucket.key_as_string : bucket.key;
  return (
    <Checkbox
      label="Available now"
      value={key}
      onClick={() => onFilterClicked(key)}
      checked={isSelected}
      fitted
      toggle
    />
  );
};

AvailableLoanBucketAggregationValues.propTypes = {
  bucket: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  onFilterClicked: PropTypes.func.isRequired,
  getChildAggCmps: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
  valueLabel: PropTypes.string,
};

AvailableLoanBucketAggregationValues.defaultProps = {
  isSelected: false,
  overridableId: '',
  valueLabel: null,
};
