import { invenioConfig } from '@config';

export const uiSchema = (title) => ({
  description: {
    'ui:widget': 'textarea',
  },
  document_pid: {
    'ui:widget': 'referencedDocument',
  },
  internal_notes: {
    'ui:widget': 'textarea',
  },
  identifiers: {
    'ui:options': {
      orderable: false,
      semantic: {
        wrapItem: true,
      },
    },
    items: {
      scheme: {
        'ui:widget': 'vocabulary',
        'ui:options': {
          vocabularyType: invenioConfig.VOCABULARIES.document.identifier.scheme,
        },
      },
      'custom:grid': [
        {
          material: 4,
          scheme: 6,
          value: 6,
        },
      ],
    },
  },
  open_access: {
    'ui:options': {
      semantic: {
        toggle: true,
      },
    },
  },
  urls: {
    'ui:options': {
      orderable: false,
      semantic: {
        wrapItem: true,
      },
    },
    items: {
      description: {
        'ui:widget': 'textarea',
      },
      login_required: {
        'ui:options': {
          semantic: {
            toggle: true,
          },
        },
      },
      'custom:grid': [
        {
          value: 6,
          description: 6,
          login_required: 4,
        },
      ],
    },
  },
  'custom:grid': [
    {
      document_pid: 8,
      open_access: 8,
    },
    {
      description: 16,
    },
    {
      urls: 16,
    },
    {
      identifiers: 16,
    },
    {
      'custom:divider': 16,
    },
    {
      internal_notes: 16,
    },
  ],
  'custom:root': {
    'custom:formTitle': title,
  },
});
