import { invenioConfig } from '@config';
import _merge from 'lodash/merge';

export const uiSchema = (title) => {
  const _uiSchema = {
    location_pid: {
      'ui:widget': 'referencedLocation',
    },
    notes: {
      'ui:widget': 'textarea',
    },
    'custom:grid': [
      {
        name: 8,
        location_pid: 8,
      },
      {
        physical_location: 8,
        notes: 8,
      },
      {
        restricted: 8,
      },
    ],
    'custom:root': {
      'custom:formTitle': title,
    },
  };
  return _merge(_uiSchema, invenioConfig.INTERNAL_LOCATIONS.editorUiSchema);
};
