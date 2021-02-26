export const schema = {
  type: 'object',
  required: ['name', 'opening_weekdays'],
  properties: {
    name: {
      type: 'string',
      title: 'Name',
    },
    address: {
      type: 'string',
      title: 'Address',
    },
    email: {
      type: 'string',
      title: 'Contact email',
    },
    phone: {
      type: 'string',
      title: 'Contact phone',
    },
    notes: {
      type: 'string',
      title: 'Notes',
    },
    opening_weekdays: {
      title: 'Opening days',
      description: 'Weekly opening schedule',
      type: 'array',
      minItems: 7,
      maxItems: 7,
      items: {
        type: 'object',
        required: ['weekday'],
        properties: {
          weekday: {
            title: 'Weekday',
            type: 'string',
          },
          is_open: {
            title: 'Is open',
            type: 'boolean',
            default: true,
          },
          times: {
            title: 'Opening times',
            type: 'array',
            maxItems: 2,
            items: {
              type: 'object',
              required: ['start_time', 'end_time'],
              properties: {
                start_time: {
                  title: 'Start time',
                  type: 'string',
                },
                end_time: {
                  title: 'End time',
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    opening_exceptions: {
      title: 'Opening exceptions',
      description:
        'Exceptional openings or closures with respect to the weekly schedule',
      type: 'array',
      items: {
        type: 'object',
        required: ['title', 'start_date', 'end_date'],
        properties: {
          title: {
            title: 'Title',
            type: 'string',
          },
          is_open: {
            title: 'Is open',
            type: 'boolean',
            default: false,
          },
          start_date: {
            title: 'Start date',
            type: 'string',
            format: 'date',
          },
          end_date: {
            title: 'End date',
            type: 'string',
            format: 'date',
          },
        },
      },
    },
  },
};
