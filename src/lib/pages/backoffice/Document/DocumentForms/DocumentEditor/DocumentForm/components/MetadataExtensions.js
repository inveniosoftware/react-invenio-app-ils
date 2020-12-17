import { invenioConfig } from '@config';
import { AccordionField } from '@forms/core/AccordionField';
import { BooleanField } from '@forms/core/BooleanField';
import { DateInputField } from '@forms/core/DateTimeFields/DateInputField';
import { StringField } from '@forms/core/StringField';
import { VocabularyField } from '@forms/core/VocabularyField';
import _forOwn from 'lodash/forOwn';
import _get from 'lodash/get';
import _keys from 'lodash/keys';
import _merge from 'lodash/merge';
import PropTypes from 'prop-types';
import React from 'react';
import { GroupField } from '@forms/core/GroupField';

const getFormComponent = (fieldType) => {
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

/**
 * Sort the components by line
 * @param {components.<Object>} a
 * @param {components.<Object>} b
 */
const sortByLine = (a, b) => {
  if (a.line < b.line) {
    return -1;
  }
  if (a.line > b.line) {
    return 1;
  }
  return 0;
};

const createComponents = (extensions) => {
  let components = [];
  _forOwn(extensions, (value, key) => {
    const componentType = invenioConfig.DOCUMENTS.extensions.fields[key].type;
    const line = invenioConfig.DOCUMENTS.extensions.fields[key].line;
    const label = invenioConfig.DOCUMENTS.extensions.fields[key].label;
    if (componentType === 'vocabulary') {
      components.push({
        component: (
          <VocabularyField
            type={invenioConfig.DOCUMENTS.extensions.fields[key].vocabularyType}
            fieldPath={`extensions.${key}`}
            label={label}
            multiple
            placeholder={`Select ${label} ...`}
          />
        ),
        line: line,
      });
    } else {
      const Component = getFormComponent(componentType);
      components.push({
        component: (
          <Component
            fieldPath={`extensions.${key}`}
            key={key}
            label={label}
            optimized
            toggle={componentType === 'boolean' ? true : undefined}
            required={_get(
              invenioConfig,
              `extensions.document.fields.${key}.isRequired`,
              false
            )}
          />
        ),
        line: line,
      });
    }
  });
  return components;
};

const addToOrderedComponents = (orderedComponents, lineComponents) => {
  orderedComponents.push(
    <GroupField widths="equal">
      {lineComponents.map((element) => element)}
    </GroupField>
  );
};

export const MetadataExtensions = ({ extensions }) => {
  const { label, fields } = invenioConfig.DOCUMENTS.extensions;
  const configDefaults = {};
  _keys(fields).map((key) => (configDefaults[key] = fields[key]['default']));
  const allExtensions = _merge(configDefaults, extensions);

  let orderedComponents = [];
  let lineComponents = [];
  let oldLine = 1;

  const components = createComponents(allExtensions);
  // Sort the components by line, to be able to loop through all the components by line
  components.sort(sortByLine);
  components.forEach((element) => {
    if (element.line === oldLine) {
      lineComponents.push(element.component);
    } else {
      if (lineComponents) {
        addToOrderedComponents(orderedComponents, lineComponents);
        lineComponents = [element.component];
        oldLine = element.line;
      }
    }
  });
  if (lineComponents) {
    addToOrderedComponents(orderedComponents, lineComponents);
    lineComponents = [];
  }

  return (
    <AccordionField
      label={label}
      fieldPath="extensions"
      content={<>{orderedComponents.map((cmp) => cmp)}</>}
    />
  );
};

MetadataExtensions.propTypes = {
  extensions: PropTypes.object.isRequired,
};
