import { invenioConfig } from '@config';
import { getUiSchemaExtensions } from '@forms/rjsf/RJSFExtensionFields';
import _merge from 'lodash/merge';

const booleanUiOptions = {
  'ui:options': {
    semantic: {
      toggle: true,
    },
  },
};

const arrayUiOptions = {
  'ui:options': {
    orderable: false,
    // no wrapItem to keep everything more compact
  },
};

const identifierUiSchema = (schemeVocabulary) => ({
  ...arrayUiOptions,
  items: {
    scheme: {
      'ui:widget': 'vocabulary',
      'ui:options': {
        vocabularyType: schemeVocabulary,
      },
    },
    'custom:grid': [
      {
        scheme: 6,
        value: 10,
      },
    ],
  },
});

const identifierWithMaterialUiSchema = (schemeVocabulary) => {
  const identifier = identifierUiSchema(schemeVocabulary);
  identifier['items']['custom:grid'] = [
    {
      material: 4,
      scheme: 6,
      value: 6,
    },
  ];
  return identifier;
};

export const uiSchema = (title, { tooManyAuthors = false } = {}) => {
  const { uiSchemaExtensions, uiSchemaExtensionsGrid } = getUiSchemaExtensions(
    invenioConfig.DOCUMENTS.extensions
  );
  const authorsField = tooManyAuthors
    ? { _tooManyAuthorsCustomField: 16 }
    : { authors: 16 };

  const _uiSchema = {
    ...uiSchemaExtensions,
    abstract: {
      'ui:widget': 'textarea',
    },
    alternative_abstracts: {
      ...arrayUiOptions,
      items: {
        'ui:widget': 'textarea',
      },
    },
    alternative_identifiers: identifierUiSchema(
      invenioConfig.VOCABULARIES.document.alternativeIdentifier.scheme
    ),
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
            language: 10,
            type: 6,
          },
        ],
      },
    },
    _tooManyAuthorsCustomField: {
      'ui:disabled': true,
    },
    authors: {
      ...arrayUiOptions,
      items: {
        affiliations: {
          items: {
            identifiers: identifierUiSchema(
              invenioConfig.VOCABULARIES.document.author.affiliation.identifier
                .scheme
            ),
            'custom:grid': [{ name: 8, identifiers: 8 }],
          },
        },
        alternative_names: arrayUiOptions,
        identifiers: identifierUiSchema(
          invenioConfig.VOCABULARIES.document.author.identifier.scheme
        ),
        roles: {
          ...arrayUiOptions,
          items: {
            'ui:widget': 'vocabulary',
            'ui:options': {
              vocabularyType:
                invenioConfig.VOCABULARIES.document.author.roles.type,
            },
          },
        },
        type: {
          'ui:widget': 'vocabulary',
          'ui:options': {
            vocabularyType: invenioConfig.VOCABULARIES.document.author.type,
          },
        },
        'custom:grid': [
          {
            full_name: 6,
            type: 4,
            alternative_names: 6,
          },
          {
            identifiers: 10,
            roles: 6,
          },
          {
            affiliations: 16,
          },
        ],
      },
    },
    conference_info: {
      ...arrayUiOptions,
      items: {
        country: {
          'ui:widget': 'vocabularySearch',
          'ui:placeholder': 'Type a country...',
          'ui:options': {
            vocabularyType: 'country',
          },
        },
        identifiers: identifierUiSchema(
          invenioConfig.VOCABULARIES.document.conferenceInfo.identifier.scheme
        ),
        'custom:grid': [
          {
            title: 16,
          },
          {
            place: 6,
            country: 10,
          },
          {
            acronym: 6,
            series: 10,
          },
          {
            dates: 10,
            year: 6,
          },
          {
            identifiers: 16,
          },
        ],
      },
    },
    copyrights: {
      ...arrayUiOptions,
      items: {
        statement: {
          'ui:widget': 'textarea',
        },
        'custom:grid': [
          {
            holder: 6,
            statement: 10,
          },
          {
            url: 8,
            year: 4,
            material: 4,
          },
        ],
      },
    },
    curated: booleanUiOptions,
    identifiers: identifierWithMaterialUiSchema(
      invenioConfig.VOCABULARIES.document.identifier.scheme
    ),
    imprint: {
      'custom:grid': [
        { publisher: 8, date: 8 },
        { place: 8, reprint: 8 },
      ],
    },
    internal_notes: {
      ...arrayUiOptions,
      items: {
        value: {
          'ui:widget': 'textarea',
        },
        'custom:grid': [{ value: 16 }, { field: 8, user: 8 }],
      },
    },
    keywords: {
      ...arrayUiOptions,
      items: {
        'custom:grid': [{ value: 8, source: 8 }],
      },
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
    licenses: {
      ...arrayUiOptions,
      items: {
        internal_notes: {
          'ui:widget': 'textarea',
        },
        license: {
          id: {
            'ui:widget': 'vocabularySearch',
            'ui:placeholder': 'Type a license...',
            'ui:options': {
              vocabularyType: 'license',
            },
          },
          'custom:grid': [{ id: 16 }],
        },
        'custom:grid': [{ license: 16 }, { material: 6, internal_notes: 10 }],
      },
    },
    note: {
      'ui:widget': 'textarea',
    },
    restricted: booleanUiOptions,
    other_authors: booleanUiOptions,
    physical_description: {
      'ui:widget': 'textarea',
    },
    publication_info: {
      ...arrayUiOptions,
      items: {
        note: {
          'ui:widget': 'textarea',
        },
        'custom:grid': [
          { journal_title: 6, journal_volume: 5, journal_issue: 5 },
          { artid: 6, pages: 5, year: 5 },
          { note: 16 },
        ],
      },
    },
    subjects: {
      ...arrayUiOptions,
      items: {
        scheme: {
          'ui:widget': 'vocabulary',
          'ui:options': {
            vocabularyType: invenioConfig.VOCABULARIES.document.doc_subjects,
          },
        },
        'custom:grid': [{ scheme: 6, value: 10 }],
      },
    },
    table_of_content: arrayUiOptions,
    tags: {
      ...arrayUiOptions,
      items: {
        'ui:widget': 'vocabulary',
        'ui:options': {
          vocabularyType: invenioConfig.VOCABULARIES.document.tags,
        },
      },
    },
    urls: {
      ...arrayUiOptions,
      items: {
        'custom:grid': [{ value: 10, description: 6 }],
      },
    },
    'custom:grid': [
      { title: 8, document_type: 4, restricted: 4 },
      {
        edition: 3,
        publication_year: 3,
        number_of_pages: 2,
        languages: 8,
      },
      {
        source: 4,
        curated: 4,
        imprint: 8,
      },
      { 'custom:divider': 16 },
      authorsField,
      { other_authors: 16 },
      { 'custom:divider': 16 },
      { identifiers: 10, alternative_identifiers: 6 },
      { alternative_titles: 8 },
      { abstract: 8, alternative_abstracts: 8 },
      { 'custom:divider': 16 },
      { physical_description: 8, table_of_content: 8 },
      { subjects: 8, tags: 4, keywords: 4 },
      { 'custom:divider': 16 },
      { publication_info: 8, conference_info: 8 },
      { 'custom:divider': 16 },
      { copyrights: 8, licenses: 8 },
      { 'custom:divider': 16 },
      { urls: 16 },
      { 'custom:divider': 16 },
      { internal_notes: 16 },
      { note: 16 },
      ...uiSchemaExtensionsGrid,
    ],
    'custom:root': {
      'custom:formTitle': title,
    },
  };
  return _merge(_uiSchema, invenioConfig.DOCUMENTS.editorUiSchema);
};
