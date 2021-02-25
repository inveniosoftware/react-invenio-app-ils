import { invenioConfig } from '@config';

export const schema = {
  properties: {
    acquisition_pid: {
      type: 'string',
      title: 'Acquisition order',
    },
    barcode: {
      type: 'string',
      title: 'Barcode',
    },
    circulation_restriction: {
      enum: invenioConfig.ITEMS.circulationRestrictions.map(
        (status) => status.value
      ),
      enumNames: invenioConfig.ITEMS.circulationRestrictions.map(
        (status) => status.text
      ),
      type: 'string',
      title: 'Circulation restriction',
    },
    description: {
      type: 'string',
      title: 'Description',
    },
    document_pid: {
      type: 'string',
      title: 'Document',
    },
    internal_location_pid: {
      type: 'string',
      title: 'Location',
    },
    internal_notes: {
      type: 'string',
      title: 'Internal notes',
    },
    isbns: {
      items: {
        properties: {
          description: {
            title: 'Refers to',
            type: 'string',
          },
          value: {
            minLength: 1,
            title: 'Value',
            type: 'string',
          },
        },
        required: ['value'],
        title: 'ISBN',
        type: 'object',
      },
      title: 'ISBNs',
      type: 'array',
      uniqueItems: true,
    },
    medium: {
      enum: invenioConfig.ITEMS.mediums.map((status) => status.value),
      enumNames: invenioConfig.ITEMS.mediums.map((status) => status.text),
      type: 'string',
      title: 'Medium',
    },
    number_of_pages: {
      minimum: 1,
      title: 'Number of pages',
      type: 'integer',
    },
    price: {
      properties: {
        currency: {
          title: 'Currency',
          type: 'string',
        },
        value: {
          minimum: 0,
          title: 'Value',
          type: 'number',
        },
      },
      dependencies: {
        value: ['currency'],
        currency: ['value'],
      },
      title: 'Price',
      type: 'object',
    },
    shelf: {
      type: 'string',
      title: 'Shelf',
    },
    status: {
      enum: invenioConfig.ITEMS.statuses.map((status) => status.value),
      enumNames: invenioConfig.ITEMS.statuses.map((status) => status.text),
      type: 'string',
      title: 'Status',
    },
  },
  required: [
    'internal_location_pid',
    'barcode',
    'status',
    'document_pid',
    'circulation_restriction',
    'medium',
  ],
  type: 'object',
};
