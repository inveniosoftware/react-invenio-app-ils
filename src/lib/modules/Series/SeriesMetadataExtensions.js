import { invenioConfig } from '@config';
import _keys from 'lodash/keys';
import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Table } from 'semantic-ui-react';

export const SeriesMetadataExtensions = ({ extensions, showDivider }) => {
  return (
    <React.Fragment>
      {showDivider && (
        <Divider horizontal>{invenioConfig.SERIES.extensions.label}</Divider>
      )}
      <Table definition>
        <Table.Body>
          {_keys(extensions).map((key) => {
            const fieldConfig = invenioConfig.SERIES.extensions.fields[key];
            const fieldType = fieldConfig.type;
            const value = extensions[key];
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

SeriesMetadataExtensions.propTypes = {
  extensions: PropTypes.object.isRequired,
  showDivider: PropTypes.bool,
};

SeriesMetadataExtensions.defaultProps = {
  showDivider: true,
};
