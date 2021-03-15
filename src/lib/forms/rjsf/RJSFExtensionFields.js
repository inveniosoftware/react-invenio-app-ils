import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

const getSchemaFieldProps = (fieldConfig) => {
  const schemaProps = {};
  switch (fieldConfig.type) {
    case 'string':
    case 'number':
    case 'boolean':
      schemaProps['type'] = fieldConfig.type;
      break;
    case 'date':
      schemaProps['type'] = 'string';
      schemaProps['format'] = 'date';
      break;
    case 'array':
      schemaProps['type'] = 'array';
      schemaProps['items'] = getSchemaFieldProps(fieldConfig.items);
      break;
    default:
      throw new Error(
        `Unknown field type ${fieldConfig.type}. Supported types: string, number, date, boolean or array.`
      );
  }

  if ('label' in fieldConfig) {
    schemaProps['title'] = fieldConfig.label;
  }

  if ('default' in fieldConfig) {
    schemaProps['default'] = fieldConfig.default;
  }

  return schemaProps;
};

export const getSchemaExtensions = (extensions) => {
  if (_isEmpty(extensions) || _isEmpty(_get(extensions, 'fields'))) {
    return {};
  }

  const schemaExtensions = {};

  const { label, fields } = extensions;
  const requiredFields = [];
  const schemaFields = {};
  Object.keys(fields).forEach((fieldName) => {
    const fieldConfig = fields[fieldName];
    if (_get(fieldConfig, 'isRequired', false)) {
      requiredFields.push(fieldName);
    }
    schemaFields[fieldName] = getSchemaFieldProps(fieldConfig);
  });

  if (!_isEmpty(schemaFields)) {
    schemaExtensions['extensions'] = {
      properties: schemaFields,
      required: requiredFields,
      title: label,
      type: 'object',
    };
  }

  return schemaExtensions;
};

const ALLOWED_UI_WIDGETS_VOCABULARIES = ['vocabulary', 'vocabularySearch'];

const getUiSchemaFieldProps = (fieldConfig) => {
  const uiSchemaProps = {};
  switch (fieldConfig.type) {
    case 'number':
    case 'date':
      // no extra props
      break;
    case 'boolean':
      uiSchemaProps['ui:options'] = {
        semantic: {
          toggle: true,
        },
      };
      break;
    case 'string':
      if ('widget' in fieldConfig) {
        if (!ALLOWED_UI_WIDGETS_VOCABULARIES.includes(fieldConfig.widget)) {
          throw new Error(
            `Unknown widget ${fieldConfig.widget} for field ${fieldConfig}.
            Supported types are ${ALLOWED_UI_WIDGETS_VOCABULARIES}.`
          );
        }

        uiSchemaProps['ui:widget'] = fieldConfig.widget;
        uiSchemaProps['ui:options'] = {
          vocabularyType: fieldConfig.vocabularyType,
        };
      }
      // no extra props if not a vocabulary
      break;
    case 'array': {
      uiSchemaProps['ui:options'] = {
        orderable: false,
        semantic: {
          wrapItem: true,
        },
      };
      const nestedFieldProps = getUiSchemaFieldProps(fieldConfig.items);
      if (!_isEmpty(nestedFieldProps)) {
        uiSchemaProps['items'] = nestedFieldProps;
      }
      break;
    }
    default:
      throw new Error(
        `Unknown field type ${fieldConfig.type}. Supported types: string, number, date, boolean or array.`
      );
  }

  return uiSchemaProps;
};

export const getUiSchemaExtensions = (extensions) => {
  if (_isEmpty(extensions) || _isEmpty(_get(extensions, 'fields'))) {
    return {
      uiSchemaExtensions: {},
      uiSchemaExtensionsGrid: [],
    };
  }

  let uiSchemaExtensions = {};
  let uiSchemaExtensionsGrid = {};
  const { fields } = extensions;
  const fieldNames = Object.keys(fields);
  const fieldNamesLength = fieldNames.length;

  const customGrid = [];
  let customGridRow = {};

  const schemaFields = {};
  fieldNames.forEach((fieldName, index) => {
    // field props
    const fieldConfig = fields[fieldName];
    const uiSchemaProps = getUiSchemaFieldProps(fieldConfig);
    if (!_isEmpty(uiSchemaProps)) {
      schemaFields[fieldName] = uiSchemaProps;
    }

    // custom:grid
    customGridRow[fieldName] = 8;
    const odd = index % 2 === 1;
    const isLast = index === fieldNamesLength - 1;
    if (odd || isLast) {
      customGrid.push(customGridRow);
      customGridRow = {};
    }
  });

  if (customGridRow) {
    uiSchemaExtensions = {
      extensions: {
        ...schemaFields,
        'custom:grid': [...customGrid],
      },
    };
    uiSchemaExtensionsGrid = [
      {
        'custom:divider': 16,
      },
      { extensions: 16 },
    ];
  }

  return {
    uiSchemaExtensions: uiSchemaExtensions,
    uiSchemaExtensionsGrid: uiSchemaExtensionsGrid,
  };
};
