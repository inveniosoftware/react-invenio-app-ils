import { invenioConfig } from '@config';
import _merge from 'lodash/merge';

export const schema = () => {
  const _schema = {
    type: 'object',
    required: ['location_pid', 'name'],
    properties: {
      location_pid: {
        type: 'string',
        title: 'Location',
      },
      name: {
        type: 'string',
        title: 'Name',
      },
      notes: {
        type: 'string',
        title: 'Notes',
      },
      physical_location: {
        type: 'string',
        title: 'Physical location',
      },
      accessible_by_patrons: {
        type: 'boolean',
        title: 'Is this location accessible by patrons?',
        default: true,
      },
    },
  };
  return _merge(_schema, invenioConfig.INTERNAL_LOCATIONS.editorSchema);
};
