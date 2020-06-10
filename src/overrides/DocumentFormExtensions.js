import PropTypes from 'prop-types';
import React from 'react';
import { AccordionField } from '@forms/core/AccordionField';
import { config, defaults } from './extensionsConfig';
import _defaultsDeep from 'lodash/defaultsDeep';
import _forOwn from 'lodash/forOwn';
import _get from 'lodash/get';

export const DocumentFormExtensions = ({ extensions }) => {
  extensions = _defaultsDeep(extensions, defaults());
  let fields = [];
  _forOwn(extensions, (value, key) => {
    const Component = _get(config, `${key}.Component`);
    fields.push(
      <Component
        fieldPath={`extensions.${key}`}
        key={key}
        label={key}
        optimized
        required={_get(config, `${key}.isRequired`)}
      />
    );
  });

  return (
    <AccordionField
      label="Extensions"
      fieldPath="extensions"
      content={<>{fields.map(field => field)}</>}
    />
  );
};

DocumentFormExtensions.propTypes = {
  extensions: PropTypes.object.isRequired,
};
