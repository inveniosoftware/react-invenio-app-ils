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
      restricted: {
        type: 'boolean',
        title: 'Restricted access (not accessible to patrons)',
        default: false,
      },
    },
  };
  return _merge(_schema, invenioConfig.INTERNAL_LOCATIONS.editorSchema);
};
