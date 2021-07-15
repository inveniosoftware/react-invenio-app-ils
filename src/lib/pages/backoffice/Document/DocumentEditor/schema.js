import { invenioConfig } from '@config';
import { getSchemaExtensions } from '@forms/rjsf/RJSFExtensionFields';
import _merge from 'lodash/merge';

export const schema = () => {
  const schemaExtensions = getSchemaExtensions(
    invenioConfig.DOCUMENTS.extensions
  );
  const _schema = {
    type: 'object',
    required: [
      'title',
      'authors',
      'publication_year',
      'document_type',
      'languages',
    ],
    definitions: {
      identifier: {
        properties: {
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
        type: 'object',
      },
    },
    properties: {
      ...schemaExtensions,
      abstract: {
        title: 'Abstract',
        type: 'string',
      },
      alternative_abstracts: {
        items: {
          title: 'Abstract',
          type: 'string',
        },
        title: 'Supplementary abstracts',
        type: 'array',
      },
      alternative_identifiers: {
        items: {
          $ref: '#/definitions/identifier',
        },
        title: 'Alternative identifiers',
        type: 'array',
      },
      alternative_titles: {
        items: {
          properties: {
            language: {
              title: 'Language',
              type: 'string',
            },
            type: {
              title: 'Type',
              type: 'string',
            },
            value: {
              title: 'Value',
              type: 'string',
            },
          },
          required: ['value'],
          type: 'object',
        },
        title: 'Alternative titles',
        type: 'array',
      },
      _tooManyAuthorsCustomField: {
        title: 'Authors',
        description:
          'There are too many authors in this document and they cannot be edited via this form.',
        type: 'string',
      },
      authors: {
        items: {
          properties: {
            affiliations: {
              items: {
                properties: {
                  identifiers: {
                    items: {
                      $ref: '#/definitions/identifier',
                    },
                    title: 'Identifiers',
                    type: 'array',
                  },
                  name: {
                    title: 'Name',
                    type: 'string',
                  },
                },
                required: ['name'],
                type: 'object',
              },
              title: 'Affiliations',
              type: 'array',
            },
            alternative_names: {
              items: {
                type: 'string',
              },
              title: 'Alternative names',
              type: 'array',
            },
            full_name: {
              title: 'Full name',
              type: 'string',
            },
            identifiers: {
              items: {
                $ref: '#/definitions/identifier',
              },
              title: 'Identifiers',
              type: 'array',
            },
            roles: {
              items: {
                title: 'Role',
                type: 'string',
              },
              title: 'Roles',
              type: 'array',
            },
            type: {
              title: 'Type',
              type: 'string',
            },
          },
          required: ['full_name'],
          title: 'Author',
          type: 'object',
        },
        minItems: 1,
        title: 'Authors',
        type: 'array',
      },
      conference_info: {
        items: {
          properties: {
            acronym: {
              title: 'Acronym',
              type: 'string',
            },
            country: {
              title: 'Country',
              type: 'string',
            },
            dates: {
              title: 'Dates',
              type: 'string',
            },
            identifiers: {
              items: {
                $ref: '#/definitions/identifier',
              },
              required: ['scheme', 'value'],
              title: 'Identifiers',
              type: 'array',
            },
            place: {
              title: 'Place',
              type: 'string',
            },
            series: {
              title: 'Conference series',
              type: 'string',
            },
            title: {
              title: 'Title',
              type: 'string',
            },
            year: {
              title: 'Year',
              type: 'number',
            },
          },
          required: ['place', 'title'],
          title: 'Conference',
          type: 'object',
        },
        title: 'Conferences',
        type: 'array',
      },
      copyrights: {
        items: {
          properties: {
            holder: {
              title: 'Copyright holder',
              type: 'string',
            },
            material: {
              title: 'Refers to material',
              type: 'string',
            },
            statement: {
              title: 'Notice',
              type: 'string',
            },
            url: {
              format: 'uri',
              title: 'Notice URL',
              type: 'string',
            },
            year: {
              title: 'Year',
              type: 'number',
            },
          },
          type: 'object',
        },
        title: 'Copyrights',
        type: 'array',
      },
      curated: {
        default: false,
        title: 'is curated',
        type: 'boolean',
      },
      document_type: {
        enum: invenioConfig.DOCUMENTS.types
          .sort((a, b) => a.order - b.order)
          .map((status) => status.value),
        enumNames: invenioConfig.DOCUMENTS.types
          .sort((a, b) => a.order - b.order)
          .map((status) => status.text),
        title: 'Document type',
        type: 'string',
      },
      edition: {
        title: 'Edition',
        type: 'string',
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
        },
        title: 'Identifiers',
        type: 'array',
      },
      imprint: {
        properties: {
          date: {
            title: 'Date',
            type: 'string',
          },
          place: {
            title: 'Place',
            type: 'string',
          },
          publisher: {
            title: 'Publisher',
            type: 'string',
          },
          reprint: {
            title: 'Reprint identifier',
            type: 'string',
          },
        },
        title: 'Imprint',
        type: 'object',
      },
      internal_notes: {
        items: {
          properties: {
            field: {
              title: 'Refers to field',
              type: 'string',
            },
            user: {
              title: 'Created by',
              type: 'string',
            },
            value: {
              title: 'Note',
              type: 'string',
            },
          },
          required: ['value'],
        },
        title: 'Internal notes',
        type: 'array',
      },
      keywords: {
        items: {
          properties: {
            source: {
              title: 'Source',
              type: 'string',
            },
            value: {
              title: 'Value',
              type: 'string',
            },
          },
        },
        title: 'Keywords',
        type: 'array',
      },
      languages: {
        items: {
          title: 'Language',
          type: 'string',
        },
        minItems: 1,
        title: 'Languages',
        type: 'array',
      },
      licenses: {
        items: {
          properties: {
            internal_notes: {
              title: 'Notes',
              type: 'string',
            },
            license: {
              properties: {
                id: {
                  title: 'License',
                  type: 'string',
                },
              },
              title: '',
              type: 'object',
            },
            material: {
              title: 'Refers to material',
              type: 'string',
            },
          },
          type: 'object',
        },
        title: 'Licenses',
        type: 'array',
      },
      note: {
        title: 'Note',
        type: 'string',
      },
      number_of_pages: {
        title: 'Number of pages',
        type: 'string',
      },
      restricted: {
        default: false,
        title: 'is restricted',
        type: 'boolean',
      },
      other_authors: {
        default: false,
        title: 'contains other authors not listed',
        type: 'boolean',
      },
      physical_description: {
        title: 'Physical description',
        type: 'string',
      },
      publication_info: {
        items: {
          properties: {
            artid: {
              title: 'Article ID',
              type: 'string',
            },
            journal_issue: {
              title: 'Journal issue',
              type: 'string',
            },
            journal_title: {
              title: 'Journal title',
              type: 'string',
            },
            journal_volume: {
              title: 'Journal volume',
              type: 'string',
            },
            note: {
              title: 'Note',
              type: 'string',
            },
            pages: {
              title: 'Page range',
              type: 'string',
            },
            year: {
              title: 'Publication year',
              type: 'number',
            },
          },
          type: 'object',
        },
        title: 'Publications',
        type: 'array',
      },
      publication_year: {
        title: 'Publication year',
        type: 'string',
      },
      source: {
        title: 'Source',
        type: 'string',
      },
      subjects: {
        items: {
          properties: {
            scheme: {
              title: 'Scheme',
              type: 'string',
            },
            value: {
              title: 'Classification',
              type: 'string',
            },
          },
          required: ['value', 'scheme'],
          type: 'object',
        },
        title: 'Subjects',
        type: 'array',
      },
      table_of_content: {
        items: {
          type: 'string',
        },
        title: 'Table of contents',
        type: 'array',
      },
      tags: {
        items: {
          title: 'Tag',
          type: 'string',
        },
        title: 'Tags',
        type: 'array',
      },
      title: {
        title: 'Title',
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
          },
          required: ['value'],
          type: 'object',
        },
        title: 'External resources URLs',
        type: 'array',
      },
    },
  };
  return _merge(_schema, invenioConfig.DOCUMENTS.editorSchema);
};
