import _keys from 'lodash/keys';
import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Table } from 'semantic-ui-react';

export const LiteratureMetadataExtensions = ({
  metadataExtensions,
  configuredExtensions,
  showDivider,
}) => {
  return (
    <React.Fragment>
      {showDivider && (
        <Divider horizontal>{configuredExtensions.label}</Divider>
      )}
      <Table definition>
        <Table.Body>
          {_keys(metadataExtensions).map((key) => {
            const fieldConfig = configuredExtensions.fields[key];
            const fieldType = fieldConfig.type;
            const value = metadataExtensions[key];
            // make sure bool (toString()) and array are displayed correctly
            const displayValue =
              fieldType === 'array'
                ? value.map((v) => v.toString()).join(', ')
                : value.toString();
            return (
              <Table.Row key={key}>
                <Table.Cell width={4}>{fieldConfig.label}</Table.Cell>
                <Table.Cell>{displayValue}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

LiteratureMetadataExtensions.propTypes = {
  metadataExtensions: PropTypes.object.isRequired,
  configuredExtensions: PropTypes.object.isRequired,
  showDivider: PropTypes.bool,
};

LiteratureMetadataExtensions.defaultProps = {
  showDivider: true,
};
