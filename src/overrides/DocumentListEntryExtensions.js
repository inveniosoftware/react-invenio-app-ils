import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Header } from 'semantic-ui-react';
import _merge from 'lodash/merge';
import _keys from 'lodash/keys';

export const DocumentListEntryExtensions = ({ extensions }) => {
  let result = {};

  _keys(extensions).map(key => {
    const [objName, objProp] = key.split(':');
    result[objName] = _merge({}, result[objName]);
    result[objName][objProp] = extensions[key];
    return result;
  });

  return _keys(result).map(property => (
    <React.Fragment key={property}>
      <Divider />
      <Header size="small">{property}</Header>
      {_keys(result[property]).map(key => (
        <div key={key}>
          <label>{key}</label> {result[property][key]}
        </div>
      ))}
    </React.Fragment>
  ));
};

DocumentListEntryExtensions.propTypes = {
  extensions: PropTypes.object.isRequired,
};
