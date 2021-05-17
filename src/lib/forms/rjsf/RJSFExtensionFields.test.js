import {
  getSchemaExtensions,
  getUiSchemaExtensions,
} from './RJSFExtensionFields';

const EXTENSIONS = {
  label: 'Extensions',
  fields: {
    string_field: {
      label: 'String field title',
      type: 'string',
    },
    required_field: {
      label: 'Required title',
      type: 'string',
      isRequired: true,
    },
    default_required_field: {
      label: 'Default required title',
      type: 'string',
      isRequired: true,
      default: 'A value',
    },
    date_field: {
      label: 'Date title',
      type: 'date',
    },
    boolean_field: {
      label: 'Boolean title',
      type: 'boolean',
    },
    boolean_no_title_default_field: {
      type: 'boolean',
      default: true,
    },
    vocabulary_field: {
      label: 'Vocabulary title',
      type: 'string',
      widget: 'vocabulary',
      vocabularyType: 'vocabulary_name',
    },
    vocabulary_search_field: {
      label: 'Vocabulary Search title',
      type: 'string',
      widget: 'vocabularySearch',
      vocabularyType: 'vocabulary_name',
    },
    array_string_field: {
      label: 'Array string title',
      type: 'array',
      items: {
        label: 'String item title',
        type: 'string',
      },
    },
    array_boolean_field: {
      label: 'Array boolean title',
      type: 'array',
      items: {
        label: 'Boolean item title',
        type: 'boolean',
      },
    },
  },
};

describe('test schema extensions', () => {
  const schemaExtensions = getSchemaExtensions(EXTENSIONS);

  it('should get an empty object when no extensions configured', () => {
    function assertEmpty(extension) {
      expect(getSchemaExtensions(extension)).toEqual({});
    }

    assertEmpty({});
    assertEmpty(null);
    assertEmpty({
      label: 'title',
    });
    assertEmpty({
      label: 'title',
      fields: {},
    });
  });

  it('should get all schema fields', () => {
    expect(schemaExtensions).toEqual({
      extensions: {
        properties: {
          string_field: {
            title: 'String field title',
            type: 'string',
          },
          required_field: {
            title: 'Required title',
            type: 'string',
          },
          default_required_field: {
            default: 'A value',
            title: 'Default required title',
            type: 'string',
          },
          date_field: {
            format: 'date',
            title: 'Date title',
            type: 'string',
          },
          boolean_field: {
            title: 'Boolean title',
            type: 'boolean',
          },
          boolean_no_title_default_field: {
            default: true,
            type: 'boolean',
          },
          vocabulary_field: {
            title: 'Vocabulary title',
            type: 'string',
          },
          vocabulary_search_field: {
            title: 'Vocabulary Search title',
            type: 'string',
          },
          array_string_field: {
            title: 'Array string title',
            type: 'array',
            items: {
              title: 'String item title',
              type: 'string',
            },
          },
          array_boolean_field: {
            title: 'Array boolean title',
            type: 'array',
            items: {
              title: 'Boolean item title',
              type: 'boolean',
            },
          },
        },
        required: ['required_field', 'default_required_field'],
        title: 'Extensions',
        type: 'object',
      },
    });
  });
});

describe('test ui schema extensions', () => {
  const { uiSchemaExtensions, uiSchemaExtensionsGrid } =
    getUiSchemaExtensions(EXTENSIONS);

  it('should get an empty object when no extensions configured', () => {
    function assertEmpty(extension) {
      const { uiSchemaExtensions: testA, uiSchemaExtensionsGrid: testB } =
        getUiSchemaExtensions(extension);

      expect(testA).toEqual({});
      expect(testB).toEqual([]);
    }

    assertEmpty({});
    assertEmpty(null);
    assertEmpty({ label: 'title' });
    assertEmpty({ label: 'title', fields: {} });
  });

  it('should get the ui schema config for all fields', () => {
    expect(uiSchemaExtensions).toEqual({
      extensions: {
        boolean_field: {
          'ui:options': {
            semantic: {
              toggle: true,
            },
          },
        },
        boolean_no_title_default_field: {
          'ui:options': {
            semantic: {
              toggle: true,
            },
          },
        },
        vocabulary_field: {
          'ui:widget': 'vocabulary',
          'ui:options': {
            vocabularyType: 'vocabulary_name',
          },
        },
        vocabulary_search_field: {
          'ui:widget': 'vocabularySearch',
          'ui:options': {
            vocabularyType: 'vocabulary_name',
          },
        },
        array_string_field: {
          'ui:options': {
            orderable: false,
            semantic: {
              wrapItem: true,
            },
          },
        },
        array_boolean_field: {
          'ui:options': {
            orderable: false,
            semantic: {
              wrapItem: true,
            },
          },
          items: {
            'ui:options': {
              semantic: {
                toggle: true,
              },
            },
          },
        },
        'custom:grid': [
          {
            string_field: 8,
            required_field: 8,
          },
          {
            default_required_field: 8,
            date_field: 8,
          },
          {
            boolean_field: 8,
            boolean_no_title_default_field: 8,
          },
          {
            vocabulary_field: 8,
            vocabulary_search_field: 8,
          },
          {
            array_string_field: 8,
            array_boolean_field: 8,
          },
        ],
      },
    });

    expect(uiSchemaExtensionsGrid).toEqual([
      {
        'custom:divider': 16,
      },
      { extensions: 16 },
    ]);
  });

  it('should get the right custom:grid when number of fields is odd', () => {
    const ODD = {
      label: 'Extensions',
      fields: {
        string_field: {
          label: 'String field title',
          type: 'string',
        },
      },
    };

    const { uiSchemaExtensions: gridOdd } = getUiSchemaExtensions(ODD);
    expect(gridOdd).toEqual({
      extensions: {
        'custom:grid': [
          {
            string_field: 8,
          },
        ],
      },
    });
  });

  it('should get the right custom:grid when number of fields is even', () => {
    const EVEN = {
      label: 'Extensions',
      fields: {
        string_field: {
          type: 'string',
        },
        string2_field: {
          type: 'string',
        },
      },
    };

    const { uiSchemaExtensions: gridOdd } = getUiSchemaExtensions(EVEN);
    expect(gridOdd).toEqual({
      extensions: {
        'custom:grid': [
          {
            string_field: 8,
            string2_field: 8,
          },
        ],
      },
    });
  });
});
