import { invenioConfig } from '@config';
import _keys from 'lodash/keys';
import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Table } from 'semantic-ui-react';
import { prettyPrintBooleanValue } from '@components/utils';

export const DocumentMetadataExtensions = ({ extensions, showDivider }) => {
  const documentExtensions = invenioConfig.DOCUMENTS.extensions;
  return (
    <React.Fragment>
      {showDivider && <Divider horizontal>{documentExtensions.label}</Divider>}
      <Table definition>
        <Table.Body>
          {_keys(extensions).map((key) => (
            <Table.Row key={key}>
              <Table.Cell width={4}>
                {documentExtensions.fields[key].label}
              </Table.Cell>
              <Table.Cell>
                {documentExtensions.fields[key].type === 'boolean'
                  ? prettyPrintBooleanValue(extensions[key])
                  : extensions[key]}
              </Table.Cell>
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
