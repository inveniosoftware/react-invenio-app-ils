import _merge from 'lodash/merge';
import { APP_CONFIG, RECORDS_CONFIG } from '../defaultConfig';

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

const mockConfig = _merge({}, RECORDS_CONFIG, mockExtensionsConfig);

export const invenioConfig = {
  APP: { ...APP_CONFIG },
  ...mockConfig,
  merge: jest.fn(),
};
