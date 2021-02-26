export const uiSchema = (title) => ({
  location_pid: {
    'ui:widget': 'referencedLocation',
  },
  notes: {
    'ui:widget': 'textarea',
  },
  'custom:grid': [
    {
      name: 8,
      location_pid: 8,
    },
    {
      physical_location: 8,
      notes: 8,
    },
  ],
  'custom:root': {
    'custom:formTitle': title,
  },
});
