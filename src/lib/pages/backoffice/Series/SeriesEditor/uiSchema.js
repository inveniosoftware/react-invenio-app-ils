import { invenioConfig } from '@config';
import { getUiSchemaExtensions } from '@forms/rjsf/RJSFExtensionFields';
import _merge from 'lodash/merge';

const arrayUiOptions = {
  'ui:options': {
    orderable: false,
    semantic: {
      wrapItem: true,
    },
  },
};

export const uiSchema = (title) => {
  const { uiSchemaExtensions, uiSchemaExtensionsGrid } = getUiSchemaExtensions(
    invenioConfig.SERIES.extensions
  );

  const _uiSchema = {
    ...uiSchemaExtensions,
    abstract: {
      'ui:widget': 'textarea',
    },
    languages: {
      ...arrayUiOptions,
      items: {
        'ui:widget': 'vocabularySearch',
        'ui:placeholder': 'Type a language...',
        'ui:options': {
          vocabularyType: 'language',
        },
      },
    },
    authors: arrayUiOptions,
    identifiers: {
      ...arrayUiOptions,
      items: {
        scheme: {
          'ui:widget': 'vocabulary',
          'ui:options': {
            vocabularyType: invenioConfig.VOCABULARIES.series.identifier.scheme,
          },
        },
        'custom:grid': [
          {
            material: 4,
            scheme: 4,
            value: 8,
          },
        ],
      },
    },
    urls: {
      ...arrayUiOptions,
      items: {
        description: {
          'ui:widget': 'textarea',
        },
        'custom:grid': [
          {
            value: 16,
          },
          {
            description: 16,
          },
        ],
      },
    },
    access_urls: {
      ...arrayUiOptions,
      items: {
        description: {
          'ui:widget': 'textarea',
        },
        access_restriction: {
          'ui:options': {
            orderable: false,
            semantic: {
              wrapItem: true,
            },
          },
        },
        open_access: {
          'ui:options': {
            semantic: {
              toggle: true,
            },
          },
        },
        'custom:grid': [
          {
            value: 10,
            open_access: 6,
          },
          {
            description: 16,
          },
          {
            access_restriction: 16,
          },
        ],
      },
    },
    keywords: {
      ...arrayUiOptions,
      items: {
        'custom:grid': [
          {
            source: 6,
            value: 10,
          },
        ],
      },
    },
    tags: {
      ...arrayUiOptions,
      items: {
        'ui:widget': 'vocabulary',
        'ui:options': {
          vocabularyType: invenioConfig.VOCABULARIES.document.tags,
        },
      },
    },
    internal_notes: {
      ...arrayUiOptions,
      items: {
        'custom:grid': [
          {
            field: 4,
            user: 4,
            value: 8,
          },
        ],
      },
    },
    note: {
      'ui:widget': 'textarea',
    },
    alternative_titles: {
      ...arrayUiOptions,
      items: {
        language: {
          'ui:widget': 'vocabularySearch',
          'ui:placeholder': 'Type a language...',
          'ui:options': {
            vocabularyType: 'language',
          },
        },
        type: {
          'ui:widget': 'vocabulary',
          'ui:options': {
            vocabularyType:
              invenioConfig.VOCABULARIES.document.alternativeTitle.type,
          },
        },
        'custom:grid': [
          {
            value: 16,
          },
          {
            language: 6,
            type: 10,
          },
        ],
      },
    },
    physical_volumes: {
      'ui:options': {
        orderable: false,
        semantic: {
          wrapItem: true,
        },
      },
      items: {
        'custom:grid': [
          {
            description: 16,
          },
          {
            location: 16,
          },
        ],
      },
    },
    'custom:grid': [
      {
        title: 8,
        alternative_titles: 8,
      },
      {
        mode_of_issuance: 6,
        edition: 3,
        languages: 7,
      },
      {
        abstract: 16,
      },
      {
        authors: 6,
        identifiers: 10,
      },
      {
        tags: 8,
        keywords: 8,
      },
      {
        publication_year: 8,
        publisher: 8,
      },
      {
        electronic_volumes_description: 8,
        physical_volumes: 8,
      },
      {
        urls: 8,
        access_urls: 8,
      },
      {
        'custom:divider': 16,
      },
      {
        internal_notes: 16,
      },
      {
        note: 16,
      },
      ...uiSchemaExtensionsGrid,
    ],
    'custom:root': {
      'custom:formTitle': title,
    },
  };
  return _merge(_uiSchema, invenioConfig.SERIES.editorUiSchema);
};
