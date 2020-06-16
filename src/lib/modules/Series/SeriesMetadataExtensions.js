import { uiConfig } from '@config';
import _keys from 'lodash/keys';
import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Table } from 'semantic-ui-react';

export const SeriesMetadataExtensions = ({ extensions, showDivider }) => {
  return (
    <React.Fragment>
      {showDivider && (
        <Divider horizontal>{uiConfig.extensions.series.label}</Divider>
      )}
      <Table definition>
        <Table.Body>
          {_keys(extensions).map(key => (
            <Table.Row key={key}>
              <Table.Cell width={4}>
                {uiConfig.extensions.series.fields[key].label}
              </Table.Cell>
              <Table.Cell>{extensions[key]}</Table.Cell>
            </Table.Row>
          ))}
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
