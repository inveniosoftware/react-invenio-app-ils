import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Label, List } from 'semantic-ui-react';

export const CardBucketAggregationValueElementOverrides = ({
  bucket,
  isSelected,
  onFilterClicked,
  getChildAggCmps,
  overridableId,
  valueLabel,
}) => {
  const childAggCmps = getChildAggCmps(bucket);
  const key = bucket.key_as_string ? bucket.key_as_string : bucket.key;
  return (
    <List.Item key={bucket.key}>
      <List.Content floated="right">
        <Label>{bucket.doc_count}</Label>
      </List.Content>
      <List.Content>
        <Checkbox
          label={valueLabel}
          value={key}
          onClick={() => onFilterClicked(key)}
          checked={isSelected}
        />
        {childAggCmps}
      </List.Content>
    </List.Item>
  );
};

CardBucketAggregationValueElementOverrides.propTypes = {
  bucket: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  onFilterClicked: PropTypes.func.isRequired,
  getChildAggCmps: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
  valueLabel: PropTypes.string,
};

CardBucketAggregationValueElementOverrides.defaultProps = {
  isSelected: false,
  overridableId: '',
  valueLabel: null,
};
