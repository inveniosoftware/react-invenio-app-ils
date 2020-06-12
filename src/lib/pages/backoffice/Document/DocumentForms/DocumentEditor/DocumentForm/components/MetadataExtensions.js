import { extensionsConfig } from '@config';
import { AccordionField } from '@forms/core/AccordionField';
import { BooleanField } from '@forms/core/BooleanField';
import { DateInputField } from '@forms/core/DateTimeFields/DateInputField';
import { StringField } from '@forms/core/StringField';
import _defaultsDeep from 'lodash/defaultsDeep';
import _forOwn from 'lodash/forOwn';
import _get from 'lodash/get';
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
  extensions = _defaultsDeep(extensions, extensionsConfig.defaults());

  let fields = [];
  _forOwn(extensions, (value, key) => {
    const componentType = extensionsConfig.fields[key].type;
    const Component = getFormComponent(componentType);

    fields.push(
      <Component
        fieldPath={`extensions.${key}`}
        key={key}
        label={key}
        optimized
        required={_get(extensionsConfig.fields, `${key}.isRequired`, false)}
      />
    );
  });

  return (
    <AccordionField
      label={extensionsConfig.label}
      fieldPath="extensions"
      content={<>{fields.map(field => field)}</>}
    />
  );
};

MetadataExtensions.propTypes = {
  extensions: PropTypes.object.isRequired,
};
