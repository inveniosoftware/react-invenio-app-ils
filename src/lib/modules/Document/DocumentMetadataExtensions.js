import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Table } from 'semantic-ui-react';
import _keys from 'lodash/keys';
import { extensionsConfig } from '@config';

export const DocumentMetadataExtensions = ({ extensions, showDivider }) => {
  return (
    <React.Fragment>
      {showDivider && (
        <Divider horizontal>{extensionsConfig.document.label}</Divider>
      )}
      <Table definition>
        <Table.Body>
          {_keys(extensions).map(key => (
            <Table.Row key={key}>
              <Table.Cell width={4}>
                {extensionsConfig.document.fields[key].label}
              </Table.Cell>
              <Table.Cell>{extensions[key]}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

DocumentMetadataExtensions.propTypes = {
  extensions: PropTypes.object.isRequired,
  showDivider: PropTypes.bool,
};

DocumentMetadataExtensions.defaultProps = {
  showDivider: true,
};
