import { invenioConfig } from '@config';
import { getSchemaExtensions } from '@forms/rjsf/RJSFExtensionFields';

const schemaExtensions = getSchemaExtensions(invenioConfig.SERIES.extensions);

export const schema = {
  type: 'object',
  required: ['title', 'mode_of_issuance'],
  properties: {
    ...schemaExtensions,
    abstract: {
      title: 'Abstract',
      type: 'string',
    },
    access_urls: {
      items: {
        properties: {
          access_restriction: {
            items: {
              title: 'Restriction type',
              type: 'string',
            },
            title: 'Restriction types',
            type: 'array',
            uniqueItems: true,
          },
          open_access: {
            type: 'boolean',
            title: 'access is open',
            default: true,
          },
          description: {
            minLength: 1,
            title: 'Description',
            type: 'string',
          },
          value: {
            format: 'uri',
            minLength: 1,
            title: 'URL',
            type: 'string',
          },
        },
        required: ['value'],
        title: 'Access URLs',
        type: 'object',
      },
      title: 'Access URLs',
      type: 'array',
      uniqueItems: true,
    },
    alternative_titles: {
      items: {
        properties: {
          language: {
            title: 'Language',
            type: 'string',
          },
          value: {
            minLength: 1,
            title: 'Value',
            type: 'string',
          },
          type: {
            title: 'Type',
            type: 'string',
          },
        },
        required: ['value'],
        title: 'Alternative title',
        type: 'object',
      },
      title: 'Alternative titles',
      type: 'array',
    },
    authors: {
      items: {
        title: 'Author',
        type: 'string',
      },
      title: 'Authors',
      type: 'array',
    },
    edition: {
      title: 'Edition',
      type: 'string',
    },
    identifiers: {
      items: {
        properties: {
          material: {
            title: 'Material',
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
    internal_notes: {
      items: {
        properties: {
          field: {
            title: 'Refers to field',
            type: 'string',
          },
          user: {
            title: 'User',
            type: 'string',
          },
          value: {
            title: 'Note',
            type: 'string',
          },
        },
        required: ['value'],
        title: 'Note',
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
      type: 'array',
      title: 'Languages',
    },
    mode_of_issuance: {
      title: 'Mode of issuance',
      type: 'string',
      enum: ['MULTIPART_MONOGRAPH', 'SERIAL'],
      default: 'MULTIPART_MONOGRAPH',
    },
    note: {
      title: 'Notes',
      type: 'string',
    },
    publication_year: {
      minLength: 1,
      title: 'Publication year',
      type: 'string',
    },
    publisher: {
      title: 'Publisher',
      type: 'string',
    },
    tags: {
      items: {
        title: 'Tag name',
        type: 'string',
      },
      title: 'Tags',
      type: 'array',
      uniqueItems: true,
    },
    title: {
      title: 'Title',
      type: 'string',
    },
    urls: {
      items: {
        properties: {
          description: {
            minLength: 1,
            title: 'Description',
            type: 'string',
          },
          value: {
            format: 'uri',
            minLength: 1,
            title: 'Value',
            type: 'string',
          },
        },
        required: ['value'],
        title: 'URL',
        type: 'object',
      },
      title: 'URLs',
      type: 'array',
      uniqueItems: true,
    },
  },
};
