import { invenioConfig } from '@config';
import _merge from 'lodash/merge';

export const schema = () => {
  const _schema = {
    properties: {
      address: {
        type: 'string',
        title: 'Address',
      },
      email: {
        type: 'string',
        title: 'Email',
      },
      name: {
        type: 'string',
        title: 'Name',
      },
      notes: {
        type: 'string',
        title: 'Notes',
      },
      phone: {
        type: 'string',
        title: 'Phone',
      },
      type: {
        type: 'string',
        title: 'Type',
      },
    },
    required: ['name', 'type'],
    type: 'object',
  };
  return _merge(_schema, invenioConfig.PROVIDERS.editorSchema);
};
