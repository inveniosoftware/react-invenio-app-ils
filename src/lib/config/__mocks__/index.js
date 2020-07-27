import { defaultConfig, DEFAULT_APP_CONFIG } from '../defaultConfig';
import _merge from 'lodash/merge';

const mockExtensionsConfig = {
  circulation: { maxExtensionsCount: 42 },
  DOCUMENTS: {
    extensions: {
      label: 'document',
      fields: {
        'fooObject:fooProp': {
          label: 'Foo',
          type: 'string',
          default: '',
        },
        'barObject:barProp': {
          label: 'Bar',
          type: 'boolean',
          default: false,
        },
      },
    },
  },
  SERIES: {
    extensions: {
      label: 'series',
      fields: {
        'fooObject:fooProp': {
          label: 'Foo',
          type: 'string',
          default: '',
        },
        'barObject:barProp': {
          label: 'Bar',
          type: 'boolean',
          default: false,
        },
      },
    },
  },
  PATRONS: {
    customFields: {
      mockField: {
        field: 'test-pid',
        label: 'Test Label',
      },
    },
  },
};

const mockConfig = _merge({}, defaultConfig, mockExtensionsConfig);

export const invenioConfig = {
  APP: { ...DEFAULT_APP_CONFIG },
  ...mockConfig,
  setValue: jest.fn(),
};
