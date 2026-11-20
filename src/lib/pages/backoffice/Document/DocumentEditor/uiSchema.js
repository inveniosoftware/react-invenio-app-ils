/*
 * SPDX-FileCopyrightText: 2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { invenioConfig } from '@config';
import { getUiSchemaExtensions } from '@forms/rjsf/RJSFExtensionFields';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _merge from 'lodash/merge';

const booleanUiOptions = {
  'ui:options': {
    semantic: {
      toggle: true,
    },
  },
};

// A getter, so that every `...arrayUiOptions` gets its own `ui:options` object
// (they are merged with the layouts of each array and must not be shared).
const arrayUiOptions = {
  get 'ui:options'() {
    return {
      orderable: false,
      // no wrapItem to keep everything more compact
    };
  },
};

const identifierUiSchema = (schemeVocabulary) => ({
  'ui:options': {
    ...arrayUiOptions['ui:options'],
    layout: 'table',
    itemLabel: 'identifier',
    orderable: true,
    columns: [{ name: 'scheme', width: '170px' }, { name: 'value' }],
  },
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
  identifier['items']['material'] = {
    'ui:widget': 'vocabulary',
    'ui:options': {
      vocabularyType:
        invenioConfig.VOCABULARIES.document.doc_identifiers_materials,
    },
  };
  identifier['ui:options'].columns = [
    { name: 'scheme', width: '170px' },
    { name: 'value' },
    { name: 'material', width: '200px' },
  ];
  identifier['items']['custom:grid'] = [
    {
      material: 4,
      scheme: 6,
      value: 6,
    },
  ];
  return identifier;
};

// How each array is rendered in the sectioned layout (see forms/rjsf/layout):
// table (flat objects), list (long text), chips (short values), cards (nested).
const layoutOptions = (options, items) => ({
  'ui:options': { orderable: true, ...options },
  ...(items ? { items } : {}),
});

const documentArrayLayouts = {
  alternative_abstracts: layoutOptions({
    layout: 'list',
    itemLabel: 'abstract',
  }),
  alternative_titles: layoutOptions({
    layout: 'table',
    itemLabel: 'title',
    columns: [
      { name: 'value', width: 'minmax(0, 3fr)' },
      { name: 'language', width: '220px' },
      { name: 'type', width: '190px' },
    ],
  }),
  authors: layoutOptions(
    {
      layout: 'cards',
      bare: true, // no box around the cards: they are boxes already
      cardTitle: 'full_name',
      itemLabel: 'author',
      orderable: true,
      emptyText: 'No author yet. At least one is required.',
    },
    {
      'ui:order': [
        'full_name',
        'type',
        'roles',
        'alternative_names',
        'identifiers',
        'affiliations',
        '*',
      ],
      alternative_names: layoutOptions({
        layout: 'list',
        itemLabel: 'name',
      }),
      affiliations: layoutOptions(
        {
          layout: 'cards',
          cardTitle: 'name',
          itemLabel: 'affiliation',
        },
        { 'ui:order': ['name', 'identifiers', '*'] }
      ),
    }
  ),
  conference_info: layoutOptions(
    {
      layout: 'cards',
      cardTitle: 'title',
      itemLabel: 'conference',
    },
    {
      'ui:order': [
        'title',
        'acronym',
        'place',
        'country',
        'series',
        'dates',
        'year',
        'identifiers',
        '*',
      ],
    }
  ),
  copyrights: layoutOptions({
    layout: 'table',
    itemLabel: 'copyright',
    columns: [
      { name: 'holder' },
      { name: 'statement', width: 'minmax(0, 2fr)' },
      { name: 'url' },
      { name: 'year', width: '90px' },
      { name: 'material', width: '170px' },
    ],
  }),
  internal_notes: layoutOptions({
    layout: 'table',
    itemLabel: 'note',
    columns: [
      { name: 'value', width: 'minmax(0, 3fr)' },
      { name: 'field', width: '160px' },
    ],
  }),
  keywords: layoutOptions({
    layout: 'table',
    itemLabel: 'subject',
    columns: [{ name: 'value' }, { name: 'source', width: '200px' }],
  }),
  licenses: layoutOptions(
    {
      layout: 'cards',
      cardTitle: 'license.id',
      itemLabel: 'license',
    },
    { 'ui:order': ['license', 'material', 'internal_notes', '*'] }
  ),
  publication_info: layoutOptions({
    layout: 'table',
    itemLabel: 'publication',
    columns: [
      { name: 'journal_title', width: 'minmax(0, 2fr)' },
      { name: 'journal_volume', width: '90px' },
      { name: 'journal_issue', width: '90px' },
      { name: 'pages', width: '110px' },
      { name: 'artid', width: '110px' },
      { name: 'year', width: '90px' },
      { name: 'note', width: 'minmax(0, 1.5fr)' },
    ],
  }),
  subjects: layoutOptions({
    layout: 'table',
    itemLabel: 'classification',
    columns: [{ name: 'scheme', width: '200px' }, { name: 'value' }],
  }),
  table_of_content: layoutOptions({ layout: 'list', itemLabel: 'entry' }),
  urls: layoutOptions({
    layout: 'table',
    itemLabel: 'URL',
    columns: [
      { name: 'value', width: 'minmax(0, 1.5fr)' },
      { name: 'description' },
    ],
  }),
};

export const uiSchema = (
  title,
  { tooManyAuthors = false, breadcrumb = [] } = {}
) => {
  const { uiSchemaExtensions } = getUiSchemaExtensions(
    invenioConfig.DOCUMENTS.extensions,
    { multiSelect: true }
  );
  // The extensions (e.g. CERN specific fields) are configured per instance.
  // `DOCUMENTS.extensions.sections` moves some of their fields to sections of
  // their own: `[{ id, label, hint?, fields: [extension field names] }]`.
  const extensionsConfig = _get(invenioConfig, 'DOCUMENTS.extensions', {});
  const extensionSections = _get(extensionsConfig, 'sections', []);
  const movedFields = extensionSections.flatMap((section) => section.fields);
  const ownFields = Object.keys(extensionsConfig.fields || {}).filter(
    (name) => !movedFields.includes(name)
  );
  const uiSchemaExtensionsSections = _isEmpty(uiSchemaExtensions)
    ? []
    : [
        ...(ownFields.length > 0
          ? [
              {
                id: 'extensions',
                title: extensionsConfig.label || 'Extensions',
                hint: '',
                fields: [
                  extensionSections.length > 0
                    ? { name: 'extensions', only: ownFields }
                    : 'extensions',
                ],
              },
            ]
          : []),
        ...extensionSections.map((section) => ({
          id: `extensions-${section.id}`,
          title: section.label,
          hint: section.hint || '',
          fields: [{ name: 'extensions', only: section.fields }],
        })),
      ];
  const _uiSchema = {
    ...uiSchemaExtensions,
    // the section already has the title of the extensions
    ...(_isEmpty(uiSchemaExtensions)
      ? {}
      : {
          extensions: {
            ...uiSchemaExtensions.extensions,
            'ui:options': { hideTitle: true },
          },
        }),
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
        alternative_names: { ...arrayUiOptions },
        identifiers: identifierUiSchema(
          invenioConfig.VOCABULARIES.document.author.identifier.scheme
        ),
        roles: {
          'ui:field': 'multiSelect',
          'ui:options': {
            source: 'all',
            vocabularyType:
              invenioConfig.VOCABULARIES.document.author.roles.type,
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
      'ui:order': ['publisher', 'place', 'date', 'reprint', '*'],
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
        // `user` is filled in by the system, it is not shown in the form
        user: { 'ui:widget': 'hidden' },
        'custom:grid': [{ value: 16 }, { field: 8 }],
      },
    },
    keywords: {
      ...arrayUiOptions,
      items: {
        'custom:grid': [{ value: 8, source: 8 }],
      },
    },
    languages: {
      'ui:field': 'multiSelect',
      'ui:options': {
        source: 'search',
        vocabularyType: 'language',
        placeholder: 'Type languages, separated by commas…',
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
      'ui:options': { rows: 2 },
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
    table_of_content: { ...arrayUiOptions },
    tags: {
      'ui:field': 'multiSelect',
      'ui:options': {
        source: 'all',
        vocabularyType: invenioConfig.VOCABULARIES.document.tags,
      },
    },
    urls: {
      ...arrayUiOptions,
      items: {
        'custom:grid': [{ value: 10, description: 6 }],
      },
    },
    // `_tooManyAuthorsCustomField` replaces `authors` when there are too many
    // authors to edit; only one of the two is ever rendered.
    'custom:hiddenFields': [
      tooManyAuthors ? 'authors' : '_tooManyAuthorsCustomField',
    ],
    // The form is rendered in numbered sections (see forms/rjsf/layout).
    // Fields of the schema that are not listed here end up in an "Other" section.
    'custom:sections': [
      {
        id: 'description',
        title: 'Description',
        hint: 'Title, type, languages, physical description, tags, other titles',
        fields: [
          'title',
          'document_type',
          'languages',
          'edition',
          'publication_year',
          'number_of_pages',
          'source',
          'physical_description',
          'tags',
          'alternative_titles',
        ],
      },
      {
        id: 'authors',
        title: 'Authors',
        hint: 'At least one author',
        // the tab and the header show how many authors there are
        count: ['authors'],
        fields: [
          tooManyAuthors ? '_tooManyAuthorsCustomField' : 'authors',
          'other_authors',
        ],
      },
      {
        id: 'publication',
        title: 'Publication',
        hint: 'Imprint, journal publications, conferences',
        fields: ['imprint', 'publication_info', 'conference_info'],
      },
      {
        id: 'identifiers',
        title: 'Identifiers & URLs',
        hint: '',
        fields: ['identifiers', 'alternative_identifiers', 'urls'],
      },
      {
        id: 'content',
        title: 'Content & subjects',
        hint: '',
        fields: [
          'abstract',
          'alternative_abstracts',
          'table_of_content',
          'subjects',
          'keywords',
        ],
      },
      {
        id: 'rights',
        title: 'Rights',
        hint: '',
        fields: ['copyrights', 'licenses'],
      },
      {
        id: 'admin',
        title: 'Admin',
        hint: 'Curation, visibility and internal notes',
        fields: ['curated', 'restricted', 'internal_notes', 'note'],
      },
      ...uiSchemaExtensionsSections,
    ],
    // MARC 21 equivalents of the fields, shown on demand; configured per
    // instance in `DOCUMENTS.editorMarc` (schema key -> MARC tag)
    'custom:marc': _get(invenioConfig, 'DOCUMENTS.editorMarc', {}),
    'custom:bar': {
      breadcrumb,
      titleField: 'title',
      pills: [
        { key: 'required' },
        {
          key: 'curated',
          field: 'curated',
          trueLabel: 'Curated',
          falseLabel: 'Not curated',
          trueTone: 'ok',
          falseTone: 'warn',
        },
        {
          key: 'restricted',
          field: 'restricted',
          trueLabel: 'Restricted',
          falseLabel: 'Public',
          trueTone: 'warn',
          falseTone: 'neutral',
        },
      ],
    },
    'custom:root': {
      'custom:formTitle': title,
    },
  };
  _merge(_uiSchema, documentArrayLayouts);
  return _merge(_uiSchema, invenioConfig.DOCUMENTS.editorUiSchema);
};
