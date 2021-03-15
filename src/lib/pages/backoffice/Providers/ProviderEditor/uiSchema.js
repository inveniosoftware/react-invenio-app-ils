import { invenioConfig } from '@config';
import _merge from 'lodash/merge';

export const uiSchema = (title) => {
  const _uiSchema = {
    notes: {
      'ui:widget': 'textarea',
    },
    type: {
      'ui:widget': 'vocabulary',
      'ui:options': {
        vocabularyType: invenioConfig.VOCABULARIES.providers.provider_type,
      },
    },
    'custom:grid': [
      {
        name: 10,
        type: 6,
      },
      {
        email: 4,
        phone: 4,
        address: 8,
      },
      {
        notes: 16,
      },
    ],
    'custom:root': {
      'custom:formTitle': title,
    },
  };
  return _merge(_uiSchema, invenioConfig.PROVIDERS.editorUiSchema);
};
