import PropTypes from 'prop-types';
import React from 'react';
import 'react-app-polyfill/ie11'; // For IE 11 support
import ReactDOM from 'react-dom';
import { OverridableContext } from 'react-overridable';
import 'semantic-ui-less/semantic.less';
import { InvenioILSApp } from './lib';
import 'semantic-ui-less/semantic.less';
import { Divider, Table } from 'semantic-ui-react';
import _merge from 'lodash/merge';
import _keys from 'lodash/keys';

const CDSDocumentMetadataExtensions = ({ extensions }) => {
  let result = {};

  _keys(extensions).map(key => {
    const [objName, objProp] = key.split(':');
    result[objName] = _merge({}, result[objName]);
    result[objName][objProp] = extensions[key];
    return result;
  });

  return (
    result &&
    _keys(result).map(property => (
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
    ))
  );
};

CDSDocumentMetadataExtensions.propTypes = {
  extensions: PropTypes.object.isRequired,
};

const overriddenCmps = {
  'DocumentMetadata.extensions.layout': CDSDocumentMetadataExtensions,
};

ReactDOM.render(
  <OverridableContext.Provider value={overriddenCmps}>
    <InvenioILSApp />
  </OverridableContext.Provider>,
  document.getElementById('app')
);
