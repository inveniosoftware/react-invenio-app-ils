import { invenioConfig } from '@config';
import _merge from 'lodash/merge';

export const uiSchema = (title) => {
  const _uiSchema = {
    acquisition_pid: {
      'ui:widget': 'referencedAcqOrder',
    },
    description: {
      'ui:widget': 'textarea',
    },
    document_pid: {
      'ui:widget': 'referencedDocument',
    },
    internal_location_pid: {
      'ui:widget': 'referencedInternalLocation',
    },
    internal_notes: {
      'ui:widget': 'textarea',
    },
    isbns: {
      'ui:options': {
        orderable: false,
        semantic: {
          wrapItem: true,
        },
      },
      items: {
        'custom:grid': [
          {
            value: 7,
            description: 9,
          },
        ],
      },
    },
    identifiers: {
      'ui:options': {
        orderable: false,
        semantic: {
          wrapItem: true,
        },
      },
      items: {
        'custom:grid': [
          {
            scheme: 10,
            value: 6,
          },
        ],
      },
    },
    price: {
      currency: {
        'ui:widget': 'vocabulary',
        'ui:options': {
          vocabularyType: invenioConfig.VOCABULARIES.currencies,
        },
      },
      'custom:grid': [
        {
          currency: 6,
          value: 10,
        },
      ],
    },
    'custom:grid': [
      {
        barcode: 4,
        medium: 4,
        document_pid: 8,
      },
      {
        status: 4,
        circulation_restriction: 4,
        number_of_pages: 2,
        description: 6,
      },
      {
        'custom:divider': 16,
      },
      {
        isbns: 10,
        internal_notes: 6,
      },
      {
        'custom:divider': 16,
      },
      {
        internal_location_pid: 8,
        shelf: 8,
      },
      {
        'custom:divider': 16,
      },
      {
        acquisition_pid: 6,
        price: 10,
      },
      {
        'custom:divider': 16,
      },
      {
        identifiers: 10,
      },
    ],
    'custom:root': {
      'custom:formTitle': title,
    },
  };
  return _merge(_uiSchema, invenioConfig.ITEMS.editorUiSchema);
};
