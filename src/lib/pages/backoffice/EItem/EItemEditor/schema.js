import { invenioConfig } from '@config';
import _merge from 'lodash/merge';

export const schema = () => {
  const _schema = {
    properties: {
      description: {
        type: 'string',
        title: 'Description',
      },
      document_pid: {
        type: 'string',
        title: 'Document',
      },
      internal_notes: {
        type: 'string',
        title: 'Internal notes',
      },
      open_access: {
        type: 'boolean',
        title: 'access is open',
        default: true,
      },
      identifiers: {
        items: {
          properties: {
            material: {
              title: 'Refers to material',
              type: 'string',
            },
            scheme: {
              title: 'Scheme',
              type: 'string',
            },
            value: {
              title: 'Value',
              type: 'string',
            },
          },
          required: ['value', 'scheme'],
          title: 'Identifier',
          type: 'object',
        },
        title: 'Identifiers',
        type: 'array',
      },
      eitem_type: {
        enum: invenioConfig.EITEMS.types
          .sort((a, b) => a.order - b.order)
          .map((status) => status.value),
        enumNames: invenioConfig.EITEMS.types
          .sort((a, b) => a.order - b.order)
          .map((status) => status.text),
        title: 'EItem type',
        type: 'string',
        default: 'E-BOOK',
      },
      source: {
        title: 'Source',
        type: 'string',
      },
      urls: {
        items: {
          properties: {
            description: {
              title: 'Description',
              type: 'string',
            },
            value: {
              format: 'uri',
              title: 'URL',
              type: 'string',
            },
            login_required: {
              type: 'boolean',
              title: 'user login required',
              default: false,
            },
          },
          required: ['value'],
          title: 'URL',
          type: 'object',
        },
        title: 'URLs',
        type: 'array',
      },
    },
    required: ['document_pid', 'eitem_type'],
    type: 'object',
  };
  return _merge(_schema, invenioConfig.EITEMS.editorSchema);
};
