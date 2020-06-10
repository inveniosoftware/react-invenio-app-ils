import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Table } from 'semantic-ui-react';
import _merge from 'lodash/merge';
import _keys from 'lodash/keys';

export const DocumentMetadataExtensions = ({ extensions }) => {
  let result = {};

  _keys(extensions).map(key => {
    const [objName, objProp] = key.split(':');
    result[objName] = _merge({}, result[objName]);
    result[objName][objProp] = extensions[key];
    return result;
  });

  return _keys(result).map(property => (
    <React.Fragment key={property}>
      <Divider horizontal>{property}</Divider>
      <Table definition>
        <Table.Body>
          {_keys(result[property]).map(key => (
            <Table.Row key={key}>
              <Table.Cell width={4}>{key}</Table.Cell>
              <Table.Cell>{result[property][key]}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  ));
};

DocumentMetadataExtensions.propTypes = {
  extensions: PropTypes.object.isRequired,
};
