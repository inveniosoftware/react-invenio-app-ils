import { invenioConfig } from '@config';
import { getSchemaExtensions } from '@forms/rjsf/RJSFExtensionFields';
import _merge from 'lodash/merge';

export const schema = () => {
  const schemaExtensions = getSchemaExtensions(invenioConfig.SERIES.extensions);
  const _schema = {
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
            },
            open_access: {
              type: 'boolean',
              title: 'access is open',
              default: true,
            },
            description: {
              title: 'Description',
              type: 'string',
            },
            login_required: {
              type: 'boolean',
              title: 'user login required',
              default: false,
            },
            value: {
              format: 'uri',
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
      },
      alternative_titles: {
        items: {
          properties: {
            language: {
              title: 'Language',
              type: 'string',
            },
            value: {
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
        title: 'Publication year',
        type: 'string',
      },
      publisher: {
        title: 'Publisher',
        type: 'string',
      },
      physical_volumes: {
        items: {
          properties: {
            description: {
              minLength: 1,
              title: 'Description',
              type: 'string',
            },
            location: {
              minLength: 1,
              title: 'Location',
              type: 'string',
            },
          },
          title: 'Physical volume',
          type: 'object',
        },
        title: 'Physical volumes',
        type: 'array',
      },
      series_type: {
        enum: [
          '',
          ...invenioConfig.SERIES.types
            .sort((a, b) => a.order - b.order)
            .map((status) => status.value),
        ],
        enumNames: [
          'None',
          ...invenioConfig.SERIES.types
            .sort((a, b) => a.order - b.order)
            .map((status) => status.text),
        ],
        title: 'Series type',
        type: 'string',
      },
      tags: {
        items: {
          title: 'Tag name',
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
      },
    },
  };

  return _merge(_schema, invenioConfig.SERIES.editorSchema);
};
