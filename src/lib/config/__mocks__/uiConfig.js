export const uiConfig = {
  extensions: {
    document: {
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
    series: {
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
};
