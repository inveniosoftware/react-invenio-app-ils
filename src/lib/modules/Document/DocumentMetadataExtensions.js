import { invenioConfig } from '@config';
import _keys from 'lodash/keys';
import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Table } from 'semantic-ui-react';

export const DocumentMetadataExtensions = ({ extensions, showDivider }) => {
  return (
    <React.Fragment>
      {showDivider && (
        <Divider horizontal>{invenioConfig.DOCUMENTS.extensions.label}</Divider>
      )}
      <Table definition>
        <Table.Body>
          {_keys(extensions).map((key) => (
            <Table.Row key={key}>
              <Table.Cell width={4}>
                {invenioConfig.DOCUMENTS.extensions.fields[key].label}
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
