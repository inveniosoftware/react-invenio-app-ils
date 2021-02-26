export const uiSchema = (title) => ({
  notes: {
    'ui:widget': 'textarea',
  },
  opening_weekdays: {
    'ui:options': {
      orderable: false,
    },
    items: {
      weekday: { 'ui:field': 'labelField' },
      is_open: {
        'ui:options': {
          semantic: {
            toggle: true,
          },
        },
      },
      times: {
        'ui:options': {
          orderable: false,
        },
        items: {
          start_time: {
            'ui:widget': 'timeWidget',
          },
          end_time: {
            'ui:widget': 'timeWidget',
          },
          'custom:grid': [
            {
              start_time: 8,
              end_time: 8,
            },
          ],
        },
      },
      'custom:grid': [
        {
          weekday: 2,
          is_open: 3,
          times: 11,
        },
      ],
    },
  },
  opening_exceptions: {
    'ui:options': {
      orderable: false,
    },
    items: {
      is_open: {
        'ui:options': {
          semantic: {
            toggle: true,
          },
        },
      },
      'custom:grid': [
        {
          title: 4,
          is_open: 4,
          start_date: 4,
          end_date: 4,
        },
      ],
    },
  },
  'custom:grid': [
    {
      name: 8,
      email: 8,
    },
    {
      address: 8,
      phone: 8,
    },
    {
      'custom:divider': 16,
    },
    {
      notes: 16,
    },
    {
      'custom:divider': 16,
    },
    {
      opening_weekdays: 16,
    },
    {
      'custom:divider': 16,
    },
    {
      opening_exceptions: 16,
    },
  ],
  'custom:root': {
    'custom:formTitle': title,
  },
});
