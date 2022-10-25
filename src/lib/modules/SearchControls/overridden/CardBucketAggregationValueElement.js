import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Label, List } from 'semantic-ui-react';

const generateLabel = (key) => {
  return (
    key.charAt(0).toUpperCase() +
    key.slice(1).replaceAll('_', ' ').toLowerCase()
  );
};

export const CardBucketAggregationValueElementOverrides = ({
  bucket,
  isSelected,
  onFilterClicked,
  childAggCmps,
  overridableId,
  valueLabel,
}) => {
  const key = bucket.key_as_string ? bucket.key_as_string : bucket.key;
  const label = generateLabel(key);

  return (
    <List.Item key={bucket.key}>
      <List.Content floated="right">
        <Label>{bucket.doc_count}</Label>
      </List.Content>
      <List.Content>
        <Checkbox
          label={label}
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
  childAggCmps: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
  valueLabel: PropTypes.string,
};

CardBucketAggregationValueElementOverrides.defaultProps = {
  isSelected: false,
  overridableId: '',
  valueLabel: null,
};
