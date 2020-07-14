import { invenioConfig } from '@config';
import { AccordionField } from '@forms/core/AccordionField';
import { BooleanField } from '@forms/core/BooleanField';
import { DateInputField } from '@forms/core/DateTimeFields/DateInputField';
import { StringField } from '@forms/core/StringField';
import _forOwn from 'lodash/forOwn';
import _get from 'lodash/get';
import _keys from 'lodash/keys';
import _merge from 'lodash/merge';
import PropTypes from 'prop-types';
import React from 'react';

const getFormComponent = fieldType => {
  switch (fieldType) {
    case 'string':
      return StringField;
    case 'boolean':
      return BooleanField;
    case 'date':
      return DateInputField;
    default:
      throw new Error(
        `${fieldType} did not match any of the supported types: string, date or boolean`
      );
  }
};

export const MetadataExtensions = ({ extensions }) => {
  const { label, fields } = invenioConfig.DOCUMENTS.extensions;
  const configDefaults = {};
  _keys(fields).map(key => (configDefaults[key] = fields[key]['default']));
  const allExtensions = _merge(configDefaults, extensions);

  let components = [];
  _forOwn(allExtensions, (value, key) => {
    const componentType = invenioConfig.DOCUMENTS.extensions.fields[key].type;
    const Component = getFormComponent(componentType);

    components.push(
      <Component
        fieldPath={`extensions.${key}`}
        key={key}
        label={_get(
          invenioConfig,
          `extensions.document.fields.${key}.label`,
          key
        )}
        optimized
        required={_get(
          invenioConfig,
          `extensions.document.fields.${key}.isRequired`,
          false
        )}
      />
    );
  });

  return (
    <AccordionField
      label={label}
      fieldPath="extensions"
      content={<>{components.map(cmp => cmp)}</>}
    />
  );
};

MetadataExtensions.propTypes = {
  extensions: PropTypes.object.isRequired,
};
