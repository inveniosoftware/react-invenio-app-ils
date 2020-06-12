import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Table } from 'semantic-ui-react';
import _forOwn from 'lodash/forOwn';

export const DocumentMetadataExtensions = ({ extensions }) => {
  return _forOwn(extensions, (groupProperties, groupName) => {
    return (
      <React.Fragment key={groupName}>
        <Divider horizontal>{groupName}</Divider>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Chris</Table.Cell>
            </Table.Row>
            {_forOwn(groupProperties, (value, key) => (
              <Table.Row key={key}>
                <Table.Cell width={4}>{key}</Table.Cell>
                <Table.Cell>{value}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  });
};

DocumentMetadataExtensions.propTypes = {
  extensions: PropTypes.object.isRequired,
};
